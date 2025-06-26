START TRANSACTION;

alter table prize add column if not exists tenant_id varchar(36) not null default '' references tenant (id);
alter table prize alter column tenant_id set not null;

COMMIT;
