START TRANSACTION;


alter table game_session drop column is_active;

COMMIT;
