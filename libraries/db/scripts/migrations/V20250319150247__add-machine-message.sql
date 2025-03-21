START TRANSACTION;

alter table playfield
    add column last_machine_message timestamp;
alter table cabinet
    add column last_machine_message timestamp;

create table if not exists machine_message
(
    id            varchar(36) primary key,
    serial_number varchar(36) not null references cabinet (serial_number),
    playfield_id  varchar(36) references playfield (id),
    data          jsonb       not null,
    type          varchar(36) not null,
    timestamp     timestamp   not null,
    status        smallint    not null
);

COMMIT;
