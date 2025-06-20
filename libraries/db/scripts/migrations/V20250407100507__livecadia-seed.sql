START TRANSACTION;


insert into tenant_location (id, tenant_id, name, address, city, state, zip, country, phone, email)
values ('f021a041-ae00-4999-9d20-2bcfe5c22af0', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'Livecadia Hall',
        'Europark-Oost 1', 'Sint-Niklaas', 'Oost-Vlaanderen', '9100', 'BE', 'unkown', 'unknown');

insert into gametype (id, name, description, created_at, updated_at)
values ('00000000-0000-0000-0000-000000000001', 'LICA_CLAW',
        'Claw machines within the livecadia hall. These are EIC machines.', now(), now()),
       ('00000000-0000-0000-0000-000000000002', 'LICA_TICKET_CIRCUS',
        'Coinpushers within the livecadia hall. These are EIC machines.', now(), now()),
       ('00000000-0000-0000-0000-000000000007', 'LICA_TICKET_TRAIL',
        'Ticket trails within the livecadia hall. These are EIC machines.', now(), now()),
       ('00000000-0000-0000-0000-000000000003', 'LICA_MONSTERDROP',
        'Monster drop machines within the livecadia hall. These are EIC machines.', now(), now()),
       ('00000000-0000-0000-0000-000000000009', 'LICA_FLINT_STONES',
        'Flintstones pusher within the livecadia hall. These are EIC machines.', now(), now());


insert into cabinet (serial_number, name, tenant_id, tenant_location_id, created_at, updated_at, last_machine_message)
values ('69ade5223ce4', 'Coinpusher 3-1', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('80d6f6650375', 'Ticket Trail 2', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('def12456789', 'Flintstones 1', '191e84db-b52f-46f9-bd53-b0b68241b0d2', 'f021a041-ae00-4999-9d20-2bcfe5c22af0',
        now(), now(), null),

       ('621aead7ff79', 'Coinpusher 1-1', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('ed902b6ee336', 'Coinpusher 1-3', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(),
        now(), null),

       ('a593f91c6af4', 'Coinpusher 1-2', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('testNikita123', 'Rowlet', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('277e190dc58f', 'Minions', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('563f08b55b48', 'Ticket Trail 1', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('58d00fb41369', 'Ticket Trail 1', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6c153e89f38c', 'Octopus Blue/Pink', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('926420b6e678', 'Ticket Trail 1', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('248', 'Automat No.3', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6566', 'Peppa Pig Blue', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('19f07197b030', 'Sonic', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6598', 'Wildlife Lion', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('7b766eb1f884', 'Ticket Trail!!!', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6596', 'Vibrator Turquoise', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('457', 'Win 225 tickets!!!', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6593', 'Kawaii Deer', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6591', 'Harry Potter Snitch', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('e1664024b935', 'Spyro the Dragon', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6574', 'Cute Strawberry', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6608', 'Squid Game Guard', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6590', 'Win 1700 tickets!', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('159', 'Coinpusher 3-3', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6576', 'Win 3400 tickets!', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6589', 'Sexy Dice', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6571', 'Sloth in Blue Hoodie', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6586', 'Cute Watermelon', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('1024', 'Cute Squirrel', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6599', 'Vegetable Tomato', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('812c3202de38', 'Turtle', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('381', 'Coinpusher 3-2', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('7f81d503a837', 'Octopus', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('f0d8993761fa', 'Bear Nightcap Blue', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6568', 'Disney Dalmatian', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('d33c38afe70c', 'Octopus Blue/Pink', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('87a59a6f7c02', 'Automat No.2', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6582', 'T&J Jerry', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6577', 'Lion', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('e99d60078d81', 'Flamingo', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6580', 'Kawaii Bear', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('e286904d7fe2', 'Batman Dark Blue', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('017fdbcc9200', 'Automat No.1', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6602', 'Vegetable Garlic', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6578', 'Smart Watch', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('94971fc3c495', 'Dragon', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6564', 'Vegetable Eggplant', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6597', 'Vegetable Sugersnap', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6601', 'These Cards Will Get You Drunk (Too)', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6584', 'T&J Tom', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6570', 'Disney Lady', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6609', 'Polar Bear with Pink Hoodie', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6562', 'Bear Tie Pink', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('f80e4a9f4b9e', 'Wildlife Leopard', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('4aa04c4b1f32', 'Monsterdrop', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('c63e57fcb91a', 'Minions', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('6600', 'Wildlife Tiger', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('f52fa3a3b12e', 'Win 500 tickets!', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('5639e1668e2d', 'Sonic', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('32e36e9d63e5', 'Monsterdrop', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null),

       ('3aa65e893775', 'Mario Bros', '191e84db-b52f-46f9-bd53-b0b68241b0d2',
        'f021a041-ae00-4999-9d20-2bcfe5c22af0', now(), now(), null);


insert into playfield (id, serial_number, name, gametype_id, created_at, updated_at, status, last_machine_message)
values ('69ade5223ce4', '69ade5223ce4', 'Coinpusher 3-1', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('80d6f6650375', '80d6f6650375', 'Ticket Trail 2', '00000000-0000-0000-0000-000000000007', now(), now(),
        'UNKNOWN', null),

       ('def12456789', 'def12456789', 'Flintstones 1', '00000000-0000-0000-0000-000000000009', now(), now(), 'UNKNOWN',
        null),

       ('621aead7ff79', '621aead7ff79', 'Coinpusher 1-1', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('ed902b6ee336', 'ed902b6ee336', 'Coinpusher 1-3', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('a593f91c6af4', 'a593f91c6af4', 'Coinpusher 1-2', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('testNikita123', 'testNikita123', 'Rowlet', '00000000-0000-0000-0000-000000000001', now(), now(), 'UNKNOWN',
        null),

       ('277e190dc58f', '277e190dc58f', 'Minions', '00000000-0000-0000-0000-000000000001', now(), now(), 'UNKNOWN',
        null),

       ('563f08b55b48', '563f08b55b48', 'Ticket Trail 1', '00000000-0000-0000-0000-000000000007', now(), now(),
        'UNKNOWN', null),

       ('6c153e89f38c', '6c153e89f38c', 'Octopus Blue/Pink', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('e7dd68763bd2', '248', 'Automat No.3', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('ab73aed027d3', '6566', 'Peppa Pig Blue', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('19f07197b030', '19f07197b030', 'Sonic', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('a184f4de93b8', '6598', 'Wildlife Lion', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('7b766eb1f884', '7b766eb1f884', 'Ticket Trail!!!', '00000000-0000-0000-0000-000000000007', now(), now(),
        'UNKNOWN', null),

       ('a006b3a5a9a5', '6596', 'Vibrator Turquoise', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('7edb42a344b5', '457', 'Win 225 tickets!!!', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('ca3fa4b58120', '6593', 'Kawaii Deer', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('4f84782ce7e7', '6591', 'Harry Potter Snitch', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('58d00fb41369', '58d00fb41369', 'Ticket Trail!!', '00000000-0000-0000-0000-000000000007', now(), now(),
        'UNKNOWN', null),

       ('e1664024b935', 'e1664024b935', 'Spyro the Dragon', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('926420b6e678', '926420b6e678', 'Ticket Trail!', '00000000-0000-0000-0000-000000000007', now(), now(),
        'UNKNOWN', null),

       ('c2e56cfba688', '6574', 'Cute Strawberry', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('8bc3bbf88d74', '6608', 'Squid Game Guard', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('635e9406f6d4', '6590', 'Win 1700 tickets!', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('38bdc3800acd', '159', 'Coinpusher 3-3', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('fb85612f27f0', '6576', 'Win 3400 tickets!', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('a16fbf4cfcf3', '6589', 'Sexy Dice', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('3b7ad062ca53', '6571', 'Sloth in Blue Hoodie', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('1a2725b92cda', '6586', 'Cute Watermelon', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('40d00f82415d', '1024', 'Cute Squirrel', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('967eb7b23635', '6599', 'Vegetable Tomato', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('812c3202de38', '812c3202de38', 'Turtle', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('90e06c89c015', '381', 'Coinpusher 3-2', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('7f81d503a837', '7f81d503a837', 'Octopus', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('f0d8993761fa', 'f0d8993761fa', 'Bear Nightcap Blue', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('02da308f9953', '6568', 'Disney Dalmatian', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('d33c38afe70c', 'd33c38afe70c', 'Octopus Blue/Pink', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('87a59a6f7c02', '87a59a6f7c02', 'Automat No.2', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('62cdc965d805', '6582', 'T&J Jerry', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('f284f0b49360', '6577', 'Lion', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('e99d60078d81', 'e99d60078d81', 'Flamingo', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('3d5a052d64f4', '6580', 'Kawaii Bear', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('e286904d7fe2', 'e286904d7fe2', 'Batman Dark Blue', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('017fdbcc9200', '017fdbcc9200', 'Automat No.1', '00000000-0000-0000-0000-000000000002', now(), now(),
        'UNKNOWN', null),

       ('de04b7b7a1b8', '6602', 'Vegetable Garlic', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('9ce553ccd3e8', '6578', 'Smart Watch', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('94971fc3c495', '94971fc3c495', 'Dragon', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('6eec55e75b5f', '6564', 'Vegetable Eggplant', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('d1b29d23b51d', '6597', 'Vegetable Sugersnap', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('18cdc94d7374', '6601', 'These Cards Will Get You Drunk (Too)', '00000000-0000-0000-0000-000000000001',
        now(), now(), 'UNKNOWN', null),

       ('08860dccbcfc', '6584', 'T&J Tom', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('9ae374ac24e1', '6570', 'Disney Lady', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('0f5ffbec8f5c', '6609', 'Polar Bear with Pink Hoodie', '00000000-0000-0000-0000-000000000001', now(),
        now(), 'UNKNOWN', null),

       ('06c259712cc1', '6562', 'Bear Tie Pink', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('f80e4a9f4b9e', 'f80e4a9f4b9e', 'Wildlife Leopard', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('4aa04c4b1f32', '4aa04c4b1f32', 'Monsterdrop', '00000000-0000-0000-0000-000000000003', now(), now(),
        'UNKNOWN', null),

       ('c63e57fcb91a', 'c63e57fcb91a', 'Minions', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('3d3a8a34cb1c', '6600', 'Wildlife Tiger', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('f52fa3a3b12e', 'f52fa3a3b12e', 'Win 500 tickets!', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('5639e1668e2d', '5639e1668e2d', 'Sonic', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null),

       ('32e36e9d63e5', '32e36e9d63e5', 'Monsterdrop', '00000000-0000-0000-0000-000000000003', now(), now(),
        'UNKNOWN', null),

       ('3aa65e893775', '3aa65e893775', 'Mario Bros', '00000000-0000-0000-0000-000000000001', now(), now(),
        'UNKNOWN', null);


COMMIT;
