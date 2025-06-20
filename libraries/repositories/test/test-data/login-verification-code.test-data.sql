insert into login_verification_code (email, code, expires_at)
values
    ('admin@example.com', '123456', current_timestamp + interval '1 hour'),
    ('admin@example.com', '654321', current_timestamp - interval '1 hour');
