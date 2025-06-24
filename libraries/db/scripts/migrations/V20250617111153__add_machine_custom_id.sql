START TRANSACTION;

alter table playfield add column if not exists external_id varchar(12);

COMMIT;
