--
-- create user if not exists app with password 'example';
--

SET TIME ZONE 'UTC';

create table if not exists gametype
(
    id         varchar(36) primary key,
    name       varchar(255) not null,

    created_at timestamp    not null default current_timestamp,
    updated_at timestamp    not null default current_timestamp
);

create table if not exists tenant
(
    id         varchar(36) primary key,
    name       varchar(255) not null,
    is_active  boolean      not null default true,

    created_at timestamp    not null default current_timestamp,
    updated_at timestamp    not null default current_timestamp
);

create table if not exists tenant_location
(
    id         varchar(36) primary key,
    tenant_id  varchar(36)  not null references tenant (id),
    name       varchar(255) not null,
    address    varchar(255) not null,
    city       varchar(255) not null,
    state      varchar(255) not null,
    zip        varchar(255) not null,
    country    varchar(255) not null,
    phone      varchar(255),
    email      varchar(255) not null,

    created_at timestamp    not null default current_timestamp,
    updated_at timestamp    not null default current_timestamp
);

create table if not exists machine
(
    id                 varchar(12) primary key,
    serial_number      varchar(12)  not null,
    name               varchar(255) not null,
    gametype_id        varchar(36)  not null references gametype (id),
    tenant_location_id varchar(36)  not null references tenant_location (id),
    tenant_id          varchar(36)  not null references tenant (id), -- redundant but useful for queries

    created_at         timestamp    not null default current_timestamp,
    updated_at         timestamp    not null default current_timestamp
);


-- if too slow, create indexes
-- create index if not exists machine_tenant_idx on machine(tenant_id);
-- create index if not exists machine_gametype_idx on machine(gametype_id);
-- create index if not exists machine_tenant_location_idx on machine(tenant_location_id);

create table if not exists machine_tenant_history
(
    id                 varchar(36) primary key,
    machine_id         varchar(12) not null references machine (id),
    tenant_id          varchar(36) not null references tenant (id),
    tenant_location_id varchar(36) not null references tenant_location (id),
    start_date         timestamp   not null,
    end_date           timestamp,

    created_at         timestamp   not null default current_timestamp,
    updated_at         timestamp   not null default current_timestamp
);


create type game_payment_type as enum ('CASH', 'GAMECARD', 'FREE', 'CARD', 'OTHER');
create table if not exists game_session
(
    id                 varchar(36) primary key,
    machine_id         varchar(12)       not null references machine (id),
    tenant_id          varchar(36)       not null references tenant (id),
    tenant_location_id varchar(36)       not null references tenant_location (id),
    started_at         timestamp         not null,
    ended_at           timestamp,
    is_active          boolean           not null default true,
    payment_type       game_payment_type not null,
    amount_of_money    integer           not null default 0,
    amount_of_credits  integer           not null default 0,

    -- games have different types of results, so we store them as jsonb
    -- different tables ??
    result             jsonb             not null default '{}',

    created_at         timestamp         not null default current_timestamp,
    updated_at         timestamp         not null default current_timestamp
);

-- USER MANAGEMENT


create type user_role as enum (
    'ELAUT_ADMIN',
    'ELAUT_DEVELOPER',
    'ELAUT_SERVICE',
    'ELAUT_QC',
    'ELAUT_USER'
        'TENANT_ADMIN',
    'TENANT_GLOBAL_ARCADE_MANAGER',
    'TENANT_ARCADE_MANAGER',
    'TENANT_EMPLOYEE',
    'TENANT_TECHNICIAN'
    );

create table if not exists app_user
(
    id         varchar(36) primary key,
    username   varchar(255) not null,
    email      varchar(255) not null,
    is_active  boolean      not null default true,
    is_blocked boolean      not null default false,

    tenant_id  varchar(36) references tenant (id),
    role       user_role    not null,

    last_login timestamp,
    last_seen  timestamp,

    created_at timestamp    not null default current_timestamp,
    updated_at timestamp    not null default current_timestamp,

    unique (email),
    unique (username)
);

create table if not exists app_user_tenant_location
(
    user_id            varchar(36) not null references app_user (id),
    tenant_location_id varchar(36) not null references tenant_location (id),

    created_at         timestamp   not null default current_timestamp,
    primary key (user_id, tenant_location_id)
);

create table if not exists login_verification_code
(
    email      varchar(255) not null,
    code       varchar(60)  not null,
    expires_at timestamp    not null,

    created_at timestamp    not null default current_timestamp,
    primary key (email, code)
);


-- SOFTWARE
create type software_status as enum ('ACTIVE', 'TESTING', 'INACTIVE', 'DEPRECATED');

create table if not exists software_release
(
    id          varchar(36) primary key,
    gametype_id varchar(36)     not null references gametype (id),
    version     varchar(255)    not null,
    source      varchar(255)    not null,
    status      software_status not null default 'TESTING',

    created_at  timestamp       not null default current_timestamp,
    updated_at  timestamp       not null default current_timestamp
);

create type software_update_status as enum ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', 'ROLLED_BACK');

create table if not exists machine_sofware_version
(
    id                  varchar(36) primary key,
    software_release_id varchar(36)            not null references software_release (id),
    machine_id          varchar(12)            not null references machine (id),
    update_started_at   timestamp              not null,
    update_ended_at     timestamp,
    status              software_update_status not null default 'PENDING',
    started_by          varchar(36)            not null references app_user (id),

    created_at          timestamp              not null default current_timestamp,
    updated_at          timestamp              not null default current_timestamp
);

create table if not exists refresh_token
(
    id          varchar(36) not null primary key,
    user_id     varchar(36) not null references app_user (id),
    usage_count smallint    not null default 0,

    created_at  timestamp   not null default current_timestamp
);
