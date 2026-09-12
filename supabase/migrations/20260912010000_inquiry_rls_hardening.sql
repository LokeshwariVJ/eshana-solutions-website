begin;

-- Reassert the private-table boundary for existing installations.
alter table public.inquiries enable row level security;
alter table public.inquiries force row level security;
alter table public.inquiry_rate_limits enable row level security;
alter table public.inquiry_rate_limits force row level security;
revoke all on public.inquiries, public.inquiry_rate_limits from public, anon, authenticated;
revoke all on function public.consume_inquiry_rate_limit(text, integer) from public, anon, authenticated;
revoke all on function public.set_inquiry_updated_at() from public, anon, authenticated;

-- No browser role should ever have a policy on these private tables.
do $$
declare policy record;
begin
  for policy in select tablename, policyname from pg_policies
    where schemaname = 'public' and tablename in ('inquiries', 'inquiry_rate_limits')
  loop
    execute format('drop policy %I on public.%I', policy.policyname, policy.tablename);
  end loop;
end;
$$;

commit;
