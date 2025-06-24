START TRANSACTION;


create table if not exists prize (
    id varchar(36) primary key,
    name varchar(255) not null,
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table if not exists playfield_prize (
    id varchar(36) primary key,
    playfield_id varchar(36) not null,
    prize_id varchar(36) not null,
    added_at timestamp default current_timestamp,
    removed_at timestamp,
    foreign key (playfield_id) references playfield(id),
    foreign key (prize_id) references prize(id)
);

alter table playfield_stats add column if not exists prize_id varchar(36) references prize(id);

alter table playfield_stats drop constraint playfield_stats_unique;
alter table playfield_stats add constraint playfield_stats_unique unique nulls not distinct (range, start_date, end_date, playfield_id, tenant_id, tenant_location_id, prize_id);

alter table game_session add column if not exists prize_id varchar(36) references prize(id);

COMMIT;
