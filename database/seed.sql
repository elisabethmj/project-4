TRUNCATE users, kits, injections;

INSERT INTO users(firstname, surname, email, password, dob, is_staff) VALUES('Elise', 'James', 'elisej@test.com', '$2b$10$60PbXs/nuGxpxjoaZHO87eSFazvqo9ap1ZiAaZcxtzGWiQ6XPeTr6', '1997-07-10', true);
INSERT INTO users(firstname, surname, email, password, dob, is_staff) VALUES('Maggie', 'Nurse', 'maggie@test.com', '$2b$10$60PbXs/nuGxpxjoaZHO87eSFazvqo9ap1ZiAaZcxtzGWiQ6XPeTr6', '1966-05-12', true);
INSERT INTO users(firstname, surname, email, password, dob, is_staff, date_of_last_review, referral_expiry) VALUES('Jane', 'Doe', 'janedoe@test.com', '$2b$10$60PbXs/nuGxpxjoaZHO87eSFazvqo9ap1ZiAaZcxtzGWiQ6XPeTr6', '2006-10-05', false, '2022-01-29', '2022-01-30');
INSERT INTO users(firstname, surname, email, password, dob, is_staff, date_of_last_review, referral_expiry) VALUES('John', 'Doe', 'johndoe@test.com', '$2b$10$60PbXs/nuGxpxjoaZHO87eSFazvqo9ap1ZiAaZcxtzGWiQ6XPeTr6', '1983-03-04', false, '2021-01-29', '2022-10-30');

INSERT INTO kits(user_id, user_kit_id, product, order_status) VALUES(3, 1, 'Clustek Max', 'patient to order initial');
INSERT INTO kits(user_id, user_kit_id, product, order_status, batch_number, expiry, mL_left_in_bottle) VALUES(4, 1, 'Clustek Max', 'finished', 'AU849384X', '2023-10-01', 0);
INSERT INTO kits(user_id, user_kit_id, product, order_status, batch_number, expiry, mL_left_in_bottle) VALUES(4, 2, 'Clustek Max', 'patient to order maint', 'AU849384X', '2023-10-01', 2.5);

INSERT INTO injections(user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction) VALUES(4, 1, 1, '2022-06-10', 0.2, 'local');
INSERT INTO injections(user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction) VALUES(4, 1, 2, '2022-06-17', 0.3, 'local');
INSERT INTO injections(user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction) VALUES(4, 1, 3, '2022-07-15', 0.5, 'local');
INSERT INTO injections(user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction) VALUES(4, 1, 4, '2022-08-12', 0.5, 'nil');
INSERT INTO injections(user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction) VALUES(4, 1, 5, '2022-09-16', 0.5, 'nil');
INSERT INTO injections(user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction, notes) VALUES(4, 1, 6, '2022-10-14', 0.5, 'other', 'Started coughing. Given 0.5 adrenaline. Observed for 2 hours without further reaction. Told to take antihistamine before nxt inj.');
