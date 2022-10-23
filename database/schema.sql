DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS kits;
DROP TABLE IF EXISTS injections;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname TEXT NOT NULL,
  surname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  dob DATE NOT NULL,
  is_staff BOOLEAN NOT NULL,
  date_of_last_review DATE,
  referral_expiry DATE 
);

CREATE TABLE kits (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    user_kit_id INT NOT NULL,
    product TEXT NOT NULL,
    order_status TEXT NOT NULL,
    batch_number TEXT,
    expiry TEXT,
    mL_left_in_bottle DECIMAL(13,2)
);

CREATE TABLE injections (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    kit_id INT NOT NULL,
    user_inj_id INT NOT NULL,
    date_of_inj DATE NOT NULL,
    dose_given_mL DECIMAL(13,2),
    reaction TEXT,
    notes TEXT
);


