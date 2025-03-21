START TRANSACTION;

create table if not exists machine_log (
    id varchar(36) primary key,
    serial_number varchar(36) not null references cabinet(serial_number),
    playfield_id varchar(36) references playfield(id),
    type varchar(255) not null,
    level varchar(24) not null,
    timestamp timestamp not null,
    app_user_id varchar(36) references app_user(id),
    data jsonb
);

COMMIT;
