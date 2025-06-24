START TRANSACTION;

alter table game_session
    add column if not exists player_id varchar(36);

COMMIT;
