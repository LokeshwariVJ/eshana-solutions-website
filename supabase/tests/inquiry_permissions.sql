-- Run as postgres in the SQL Editor after migrations. Read-only assertions; no customer data is selected.
begin;
do $$
declare
  relation text;
  role_name text;
  privilege_name text;
begin
  foreach relation in array array['inquiries', 'inquiry_rate_limits'] loop
    if not exists (select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = relation and c.relrowsecurity and c.relforcerowsecurity) then
      raise exception 'RLS not enabled and forced on %', relation;
    end if;
    if exists (select 1 from pg_policies where schemaname = 'public' and tablename = relation) then
      raise exception 'Unexpected policy on %', relation;
    end if;
    foreach role_name in array array['anon', 'authenticated'] loop
      foreach privilege_name in array array['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER'] loop
        if has_table_privilege(role_name, 'public.' || relation, privilege_name) then
          raise exception 'Unexpected % privilege for % on %', privilege_name, role_name, relation;
        end if;
      end loop;
    end loop;
  end loop;
  foreach role_name in array array['anon', 'authenticated'] loop
    if has_function_privilege(role_name, 'public.consume_inquiry_rate_limit(text,integer)', 'EXECUTE') then
      raise exception 'Public rate-limit function access for %', role_name;
    end if;
  end loop;
  if not has_table_privilege('service_role', 'public.inquiries', 'INSERT') or
     not has_table_privilege('service_role', 'public.inquiries', 'SELECT') or
     not has_function_privilege('service_role', 'public.consume_inquiry_rate_limit(text,integer)', 'EXECUTE') then
    raise exception 'Server access is missing';
  end if;
end;
$$;
rollback;
