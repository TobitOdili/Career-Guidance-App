-- Add metadata column to documents table if it doesn't exist
do $$
begin
  if not exists (select 1 from information_schema.columns 
    where table_schema = 'public' 
    and table_name = 'documents' 
    and column_name = 'metadata') then
    
    alter table public.documents 
    add column metadata jsonb default '{}'::jsonb not null;
    
  end if;
end $$;