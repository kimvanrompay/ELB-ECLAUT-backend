START TRANSACTION;

insert into gametype (id, name, created_at, updated_at, description)
values ('573b52ef-7f9b-4180-88a3-567973d39aee', 'SMURFS_CLAW', current_timestamp, current_timestamp, 'Smurf Claw');

insert into cabinet (serial_number, name, tenant_id, tenant_location_id, created_at, updated_at)
values ('002b-0049-4232-5008-2030-3059', 'Smurf Claw 1-player', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6', current_timestamp, current_timestamp),
       ('0030-002d-4232-5008-2030-3059', 'Test Cabinet', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6', current_timestamp, current_timestamp);

insert into playfield (id, serial_number, name, status, created_at, updated_at, gametype_id)
values ('002b-0049-4232-5008-2030-3059', '002b-0049-4232-5008-2030-3059', 'Smurf Claw 1-player', 'UNKNOWN',
        current_timestamp, current_timestamp, '573b52ef-7f9b-4180-88a3-567973d39aee'),
       ('0050-0023-4d33-5015-2034-3137', '0030-002d-4232-5008-2030-3059', 'Test Machine 1', 'UNKNOWN',
        current_timestamp, current_timestamp, '4b648335-fc7c-46e8-b98e-5a0e51122597'),
       ('0030-002d-4232-5008-2030-3059', '0030-002d-4232-5008-2030-3059', 'Test Machine 2', 'UNKNOWN',
        current_timestamp, current_timestamp, '4b648335-fc7c-46e8-b98e-5a0e51122597');


COMMIT;
