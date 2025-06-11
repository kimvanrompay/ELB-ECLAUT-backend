START TRANSACTION;


create table if not exists client (
    id varchar(36) primary key,
    tenant_id varchar(36) not null references tenant(id),
    name varchar(255) not null,
    secret_key varchar(255) not null,
    security_group varchar(255) not null,
    description text,
    is_active boolean default true,
    is_blocked boolean default false,
    last_login timestamp,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

alter table refresh_token alter column user_id drop not null;
alter table refresh_token add column if not exists client_id varchar(36) references client(id);

-- create table if not exists app_security_groups (
--     id varchar(36) primary key,
--     client_id varchar(36) not null,
--     name varchar(255) not null,
--     description text,
--     created_at timestamp default current_timestamp,
--     updated_at timestamp default current_timestamp,
--     foreign key (client_id) references client(id)
-- );


create table if not exists client_tenant_location (
    client_id varchar(36) not null,
    tenant_location_id varchar(36) not null,
    created_at timestamp default current_timestamp,
    primary key (client_id, tenant_location_id),
    foreign key (client_id) references client(id),
    foreign key (tenant_location_id) references tenant_location(id)
);


COMMIT;
