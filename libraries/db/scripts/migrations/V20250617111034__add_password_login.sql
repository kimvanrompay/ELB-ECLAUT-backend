START TRANSACTION;

alter table app_user
    add column if not exists language varchar(10) default 'en';
alter table app_user
    add column if not exists hashed_password varchar(255) not null default 'PLEASE_CHANGE_ME';
alter table app_user
    add column if not exists has_temp_password boolean default true;
alter table app_user
    add column if not exists allow_password_login boolean default true;

alter table app_user
    alter column hashed_password drop default;

create table if not exists password_reset_token
(
    email       varchar(255) not null,
    token       varchar(60) not null,
    created_at  timestamp default current_timestamp,
    expires_at  timestamp not null,
    primary key (email, token),
    unique (email) -- this ensures that only one token can be active per email at a time
);

COMMIT;
