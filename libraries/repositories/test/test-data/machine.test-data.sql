insert into cabinet (serial_number, name, tenant_id, tenant_location_id, created_at, updated_at, last_machine_message)
values ('2ba8565a-aa9c-4f74-b6ea-df1d4784ab69', 'Test Cabinet', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
        '2025-01-01 12:00:00', '2025-01-01 12:00:00', '2025-01-01 12:00:00'),
       ('3c9f8b2d-4e5f-6a7b-8c9d-e0f1a2b3c4d5', 'Test Cabinet 2', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
        '2025-01-01 12:00:00', '2025-01-01 12:00:00', '2025-01-01 12:00:00');


insert into playfield (id, serial_number, name, gametype_id, created_at, updated_at, status, last_machine_message)
values ('effcdd6f-d15a-473f-9eb2-b5cd8eee12d6', '2ba8565a-aa9c-4f74-b6ea-df1d4784ab69', 'Test Playfield 1.1',
        '547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba', '2025-01-01 12:00:00', '2025-01-01 12:00:00', 'ACTIVE',
        '2025-01-01 12:00:00'),
        ('3d676b06-eba8-46a9-bc5b-7e95b21fb3a5', '2ba8565a-aa9c-4f74-b6ea-df1d4784ab69', 'Test Playfield 1.2',
        '547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba', '2025-01-01 12:00:00', '2025-01-01 12:00:00', 'ACTIVE',
        '2025-01-01 12:00:00'),
       ('f1119742-d17d-4f8a-9673-c0489bc83f18', '3c9f8b2d-4e5f-6a7b-8c9d-e0f1a2b3c4d5', 'Test Playfield 2.1',
        '8b210d88-3e2c-4e71-883c-5d5706e674ec', '2025-01-01 12:00:00', '2025-01-01 12:00:00', 'INACTIVE',
        '2025-01-01 12:00:00');


