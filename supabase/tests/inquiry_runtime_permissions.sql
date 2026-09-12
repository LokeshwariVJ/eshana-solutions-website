-- Run as postgres in SQL Editor. All test writes are rolled back; no emails are sent.
begin;

-- Refuse a test insert if an insert trigger could produce an external side effect.
do $$
begin
  if exists (select 1 from pg_trigger where tgrelid = 'public.inquiries'::regclass
    and not tgisinternal and tgenabled <> 'D' and (tgtype & 4) <> 0) then
    raise exception 'Review INSERT triggers before running the rollback-only test';
  end if;
end;
$$;

set local role anon;
do $$
declare command text;
begin
  foreach command in array array[
    'select id from public.inquiries limit 0',
    'update public.inquiries set status = status where false',
    'delete from public.inquiries where false',
    'insert into public.inquiries default values'
  ] loop
    begin
      execute command;
      raise exception 'Unexpected permission for role %: %', current_user, command;
    exception when insufficient_privilege then null;
    end;
  end loop;
end;
$$;

set local role authenticated;
do $$
declare command text;
begin
  foreach command in array array[
    'select id from public.inquiries limit 0',
    'update public.inquiries set status = status where false',
    'delete from public.inquiries where false',
    'insert into public.inquiries default values'
  ] loop
    begin
      execute command;
      raise exception 'Unexpected permission for role %: %', current_user, command;
    exception when insufficient_privilege then null;
    end;
  end loop;
end;
$$;

set local role service_role;
do $$
declare inserted_id uuid; inserted_at timestamptz;
begin
  insert into public.inquiries (inquiry_type, name, email, service, timeline, message)
  values ('general', 'Rollback Permission Test', 'rollback-test@example.com',
    'Test Automation', 'Exploring options', 'Transaction-only security verification. Never committed.')
  returning id, created_at into inserted_id, inserted_at;
  if inserted_id is null or inserted_at is null or not exists
    (select 1 from public.inquiries where id = inserted_id) then
    raise exception 'Service-role insert/select failed';
  end if;
end;
$$;

rollback;
