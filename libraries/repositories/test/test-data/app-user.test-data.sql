insert into app_user (id, email, tenant_id, username, role, is_blocked, last_login, last_seen, hashed_password,
                      has_temp_password, language, allow_password_login)
values
-- ELAUT_ADMIN
('00000000-0000-0000-0000-000000000001', 'admin@example.com', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'admin',
 'ELAUT_ADMIN', false,
 null, null, 'PLEASE_CHANGE_ME', false, 'en', true),
-- ELAUT_DEVELOPER
('00000000-0000-0000-0000-000000000002', 'developer@example.com', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'developer',
 'ELAUT_DEVELOPER',
 false,
 null, null, 'PLEASE_CHANGE_ME', false, 'en', true),
('00000000-0000-0000-0000-000000000003', 'employee@example.com', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'employee',
 'TENANT_EMPLOYEE',
 false,
 null, null, 'PLEASE_CHANGE_ME', false, 'en', true);

insert into app_user_tenant_location (user_id, tenant_location_id)
values ('00000000-0000-0000-0000-000000000003', 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6');
