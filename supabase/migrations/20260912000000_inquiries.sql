begin;

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null check (inquiry_type in ('general', 'quality_audit', 'ai_initiative_gate')),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  company text check (char_length(company) <= 200),
  product_url text check (char_length(product_url) <= 2048 and product_url ~* '^https?://'),
  service text check (service in ('Quality Audit', 'Test Automation', 'API Testing', 'AI Quality', 'AI Initiative Gate', 'QA Strategy', 'Process Automation', 'Something else')),
  timeline text check (timeline in ('As soon as possible', 'Within 2 weeks', 'This month', 'Exploring options')),
  message text not null check (char_length(btrim(message)) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
-- No public policies: only the server's service role can insert or access inquiries.
revoke all on public.inquiries from public, anon, authenticated;
grant select, insert, update, delete on public.inquiries to service_role;

create function public.set_inquiry_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.set_inquiry_updated_at() from public, anon, authenticated;
create trigger inquiries_updated_at before update on public.inquiries
for each row execute function public.set_inquiry_updated_at();

-- Atomic shared limits survive Vercel instance restarts. Only HMAC digests are stored.
create table public.inquiry_rate_limits (
  bucket_key text primary key check (bucket_key ~ '^[0-9a-f]{64}$'),
  attempts integer not null check (attempts > 0),
  expires_at timestamptz not null
);
create index inquiry_rate_limits_expiry on public.inquiry_rate_limits (expires_at);
alter table public.inquiry_rate_limits enable row level security;
revoke all on public.inquiry_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on public.inquiry_rate_limits to service_role;

create function public.consume_inquiry_rate_limit(p_key text, p_limit integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  allowed boolean;
begin
  if p_limit < 1 or p_limit > 100 then
    raise exception 'Invalid rate limit';
  end if;
  delete from public.inquiry_rate_limits where expires_at < now();
  insert into public.inquiry_rate_limits (bucket_key, attempts, expires_at)
  values (p_key, 1, now() + interval '15 minutes')
  on conflict (bucket_key) do update
    set attempts = least(public.inquiry_rate_limits.attempts + 1, p_limit + 1)
  returning attempts <= p_limit into allowed;
  return allowed;
end;
$$;
revoke all on function public.consume_inquiry_rate_limit(text, integer) from public, anon, authenticated;
grant execute on function public.consume_inquiry_rate_limit(text, integer) to service_role;

commit;
