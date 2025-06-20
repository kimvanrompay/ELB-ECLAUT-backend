START TRANSACTION;

alter table game_session alter column payment_type type game_payment_type;
alter table game_session alter column amount_of_money type int;
alter table game_session rename column amount_of_money to amount_money_in;
alter table game_session alter column amount_of_credits set default 0;
alter table game_session rename column amount_of_credits to amount_credits;
alter table game_session rename column payment_type to payment_method;

alter table game_session add column amount_money_out int;

alter table game_session alter column payment_method type varchar(24) using payment_method::varchar(24);

alter table game_session alter column started_at drop not null;
alter table game_session alter column payment_method drop not null;
alter table game_session alter column amount_money_in drop not null;
alter table game_session alter column amount_credits drop not null;
alter table game_session alter column result drop not null;


drop type game_payment_type;

COMMIT;
