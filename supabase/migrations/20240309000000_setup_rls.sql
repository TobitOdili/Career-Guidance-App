-- Enable RLS
alter table users enable row level security;

-- Create policies
create policy "Allow public insert to users" on users
  for insert
  with check (true);

create policy "Allow users to update their own data" on users
  for update using (
    auth.uid() = id
  );

create policy "Allow users to read their own data" on users
  for select using (
    auth.uid() = id or
    auth.uid() is null -- Allow reading during initial setup
  );