START TRANSACTION;

INSERT INTO gametype (id, name, created_at, updated_at, description)
VALUES ('4b648335-fc7c-46e8-b98e-5a0e51122597', 'MY_CLAW', current_timestamp, current_timestamp, 'Test Claw 2.0');

INSERT INTO tenant (id, name, created_at, updated_at)
VALUES ('50e80fed-e782-488e-9633-f1e68c9b339d', 'Europa-Park', current_timestamp, current_timestamp);

INSERT INTO tenant_location (id, name, tenant_id, created_at, updated_at, country, state, city, zip, address, email)
values ('7d2fba91-6d21-40a4-b8cb-7f338f0c336e', 'England', '50e80fed-e782-488e-9633-f1e68c9b339d', current_timestamp,
        current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2', 'unknown@example.com'),
       ('913a494c-3471-4c93-9697-9639def548d7', 'Netherlands', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com'),
       ('ed3d6da2-fa21-4cc0-b2a9-51db9f6d91c9', 'Spain', '50e80fed-e782-488e-9633-f1e68c9b339d', current_timestamp,
        current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2', 'unknown@example.com'),
       ('f1e68c9b-339d-4c0b-8e78-2e1e3f6a8e5d', 'Germany', '50e80fed-e782-488e-9633-f1e68c9b339d', current_timestamp,
        current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2', 'unknown@example.com'),
       ('21cbcf19-59d4-4874-8932-53a7498d3e26', 'France', '50e80fed-e782-488e-9633-f1e68c9b339d', current_timestamp,
        current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2', 'unknown@example.com'),
       ('46c704e2-f83d-4f02-9f45-5f4dbe332c6a', 'Hotel Krønosår', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com'),
       ('1971aa4a-3981-4027-96ce-f0e3562b2bf2', 'Hotel Bell Rock', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com'),
       ('bbfb7299-8ea6-48ce-8e7f-3f480fc8b81e', 'Hotel Colosseo', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com'),
       ('f9fa0281-e2e0-4400-b580-167cd267aebf', 'Hotel Santa Isabel', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com'),
       ('e63f87fd-c239-4783-a845-879a1c1e5d24', 'Hotel El Andaluz', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com'),
       ('edc44783-5ba6-4d12-b9dd-fc246a8e6e2a', 'Hotel Castillo Alcazar', '50e80fed-e782-488e-9633-f1e68c9b339d',
        current_timestamp, current_timestamp, 'DE', 'Baden-Württemberg', 'Rust', '77977', 'Europa-Park Straße 2',
        'unknown@example.com');

insert into cabinet (serial_number, name, tenant_id, tenant_location_id, created_at, updated_at)
values ('002e-0040-4232-5008-2030-3059', 'Europa-Park Test Claw 2.0', '50e80fed-e782-488e-9633-f1e68c9b339d',
        '7d2fba91-6d21-40a4-b8cb-7f338f0c336e', current_timestamp, current_timestamp);

insert into playfield (id, serial_number, name, status, created_at, updated_at, gametype_id)
values ('002e-0040-4232-5008-2030-3059', '002e-0040-4232-5008-2030-3059', '002e-0040-4232-5008-2030-3059', 'UNKNOWN',
        current_timestamp,
        current_timestamp, '4b648335-fc7c-46e8-b98e-5a0e51122597'),
       ('002e-001a-4232-5008-2030-3059', '002e-0040-4232-5008-2030-3059', '002e-001a-4232-5008-2030-3059', 'UNKNOWN',
        current_timestamp,
        current_timestamp, '4b648335-fc7c-46e8-b98e-5a0e51122597');


COMMIT;
