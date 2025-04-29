START TRANSACTION;

create table if not exists playfield_stats
(
    id                     VARCHAR(36) PRIMARY KEY,
    range                  VARCHAR(10),
    start_date             date,
    end_date               date,

    tenant_id              VARCHAR(36),
    tenant_location_id     VARCHAR(36),
    playfield_id           VARCHAR(36),
    serial_number          VARCHAR(36),
    gametype_id            VARCHAR(36),

    count_game_sessions    INT,

    sum_money_in           INT,
    avg_money_in           INT,
    min_money_in           INT,
    max_money_in           INT,

    sum_money_out          INT,
    avg_money_out          INT,
    min_money_out          INT,
    max_money_out          INT,

    sum_credits            INT,
    avg_credits            INT,
    min_credits            INT,
    max_credits            INT,

    sum_profit             INT,

    avg_play_time          INT,
    min_play_time          INT,
    max_play_time          INT,
    sum_play_time          INT,

    game_sessions_per_hour jsonb,
    payment_methods        jsonb,

    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    constraint playfield_stats_unique unique (range, start_date, playfield_id, tenant_id, tenant_location_id)
);

COMMIT;
