START TRANSACTION;

insert into app_user (id, username, email, is_active, is_blocked, tenant_id, role, last_login, last_seen, created_at, updated_at, language, hashed_password, hastemppassword, allow_password_login)
VALUES ('80f9555c-a948-4faa-abad-808e81614696', 'Eric', 'eric.verstraeten@elaut-group.com', true, false, '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'ELAUT_ADMIN', null, null, current_timestamp, current_timestamp, 'en', 'NOT_SET', false, true),
       ('6fe482fe-e9dc-48de-8fa9-c6629e46e586', 'Laura', 'laura.verstraeten@elaut-group.com', true, false, '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'ELAUT_ADMIN', null, null, current_timestamp, current_timestamp, 'en', 'NOT_SET', false, true),
       ('55de966d-7d5e-4005-b497-b72af8947363', 'Benjamin', 'benjamin.odetola@elaut-group.com', true, false, '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'ELAUT_ADMIN', null, null, current_timestamp, current_timestamp, 'en', 'NOT_SET', false, true),
       ('c1a3c5f6-4a7e-4b8c-8d1c-2f3b5e6d7e8f', 'Stefaan', 'stefaan.vaerewyck@elaut-group.com', true, false, '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'ELAUT_ADMIN', null, null, current_timestamp, current_timestamp, 'en', 'NOT_SET', false, true);


insert into client (id, name, secret_key, security_group, description, created_at, updated_at, tenant_id, is_active, is_blocked, last_login)
values ('72bb7564-605a-4035-9f8e-4b1b9b8cf6af', 'StriveCloud API', '$2b$10$BJooUyZZg52O0mL9UOm3yu75jPfHinEtMmFtW.QIor1I8yz64Uh6W', 'INITIALIZE_GAMESESSION', 'Strivecloud API for players and leaderboards integration', current_timestamp, current_timestamp, null, true, false, null);


insert into game_session (id, playfield_id, tenant_id, tenant_location_id, started_at, ended_at, payment_method, amount_money_in, amount_credits, result, created_at, updated_at, amount_money_out, prize_id, player_id)
values ('f8737693-ff4f-42b8-b5f7-ae45253bc801', '002b-0049-4232-5008-2030-3059', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6', current_timestamp, null, 'CASH', 100, 10, null, current_timestamp, current_timestamp, null, null, null);

COMMIT;
