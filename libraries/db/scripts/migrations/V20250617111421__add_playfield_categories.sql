START TRANSACTION;

create table if not exists playfield_category
(
    id          varchar(36) not null primary key,
    tenant_id   varchar(36) not null,
    name        varchar(50) not null,
    description text,
    created_at  timestamp default current_timestamp,
    updated_at  timestamp default current_timestamp
);

alter table playfield
    add column if not exists category_id varchar(36) references playfield_category (id) on delete set null;

alter table playfield_stats
    add column if not exists playfield_category_id varchar(36) references playfield_category (id) on delete set null;


COMMIT;
