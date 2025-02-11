

insert into tenant (id, name)
values
    ('191e84db-b52f-46f9-bd53-b0b68241b0d2', 'Elaut Group');

insert into tenant_location (id, tenant_id, name, address, city, state, zip, country, phone, email)
values
    ('e5a0ec4e-e27f-4e41-9955-8d6e169c58f6', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'Elaut Belgium', 'passtraat 223', 'Sint-Niklaas', 'Oost-Vlaanderen', '9100', 'Belgium', 'unknown', '');

insert into gametype (id, name)
values
    ('00000000-0000-0000-0000-000000000001', 'SKILL_CLAW');

-- IDs are 12 characters long and serial is usually the same as the ID
insert into machine (id, serial_number, gametype_id, tenant_location_id, tenant_id, name)
values
    ('000000000001', '000000000001', '00000000-0000-0000-0000-000000000001', 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'Machine 1')
