START TRANSACTION;


create table if not exists cabinet
(
    serial_number varchar(36) primary key,
    name          varchar(255) not null,
    tenant_id     varchar(36)  not null references tenant (id),
    tenant_location_id   varchar(36)  not null references tenant_location (id),

    created_at    timestamp    not null default current_timestamp,
    updated_at    timestamp    not null default current_timestamp
);

alter table machine RENAME TO playfield;
alter table playfield alter column id type varchar(36);
alter table playfield alter column serial_number type varchar(36);
alter table playfield drop column tenant_id;
alter table playfield drop column tenant_location_id;
alter table playfield add constraint playfield_serial_number_fkey foreign key (serial_number) references cabinet (serial_number);
alter table playfield add column status varchar(255) not null default 'UNKNOWN';
alter table playfield rename constraint machine_pkey to playfield_pkey;
alter table playfield rename constraint machine_gametype_id_fkey to playfield_gametype_id_fkey;

alter table machine_tenant_history RENAME TO cabinet_tenant_history;
alter table cabinet_tenant_history drop constraint machine_tenant_history_machine_id_fkey;
alter table cabinet_tenant_history rename column machine_id to serial_number;
alter table cabinet_tenant_history add constraint cabinet_tenant_history_serial_number_fkey foreign key (serial_number) references cabinet (serial_number);
alter table cabinet_tenant_history rename constraint machine_tenant_history_pkey to cabinet_tenant_history_pkey;
alter table cabinet_tenant_history rename constraint machine_tenant_history_tenant_id_fkey to cabinet_tenant_history_tenant_id_fkey;
alter table cabinet_tenant_history rename constraint machine_tenant_history_tenant_location_id_fkey to cabinet_tenant_history_tenant_location_id_fkey;

alter table game_session drop constraint game_session_machine_id_fkey;
alter table game_session rename column machine_id to playfield_id;
alter table game_session add constraint game_session_playfield_id_fkey foreign key (playfield_id) references playfield (id);
alter table game_session alter column playfield_id type varchar(36);

drop table machine_sofware_version;
drop type software_update_status;

COMMIT;
