# Patient Immunotherapy Management created with React, NodeJS Express & PostgreSQL

## [See deployed app via Heroku](https://floating-anchorage-93531.herokuapp.com/)

## [Github repo](https://github.com/elisabethmj/project-4

### Description:
This software is to assist in the management of data for immunotherapy patients. It allows staff to log in, search patients and display various relevant data for the patient. 

Future versions will include a patient log in, so patients can view their own data and book appointments. It will also automate alerts for the patients when they log in to notify them when action is required e.g. order new kit, get new referral. 

### Approach taken:
I decided to design the database according to the end goal of having staff and patient log ins, with alerts regarding certain important data (see database/schema.sql for structure).

I proceeded to set up the backend and test routes on postman for various functions I imagined would be required.

I then designed the basic components to login as a staff member, query the database, add patients, delete patients and display the patient data (injections/kits i.e. immunotherapy data).

I added styling using CSS and Material UI components.

### Installation & testing instructions:
1. Navigate to appropriate folder in directory 
2. `git clone (insert SSH key from this repository)`
2. If successfully cloned run `npm install`
3. Navigate to client folder in directory and run `npm install` again
4. (Assuming PostgreSQL installed on your machine) Run `CREATE database immunotherapy`. Then `\q` to exit PostgreSQL.
5. Run `psql immunotherapy < database/schema.sql` (will create tables)
6. Run `psql immunotherapy < database/seed.sql`(will populate data)
7. Navigate back to root folder. Create .env file which should contain the following:

        EXPRESS_SESSION_SECRET_KEY="(insert your own secret key here)"

        DATABASE_URL="immunotherapy"

        PORT=3001

To start development server on local machine:
1. Run `node server.js` in root folder to start back-end server.
2. In a separate terminal, navigate to client folder and run `npm start` to start react server.

To run tests:
Run `npm run test` in client folder (5 tests total).

### Unsolved problems:
- Search patient query should exclude staff members (i.e. condition is_staff=false). Currently returning staff and patients.
- Buttons for updating patient details, adding injections are not operational. Set up these functions.
- Add new user function (i.e. ability to set up new staff account)
- Additional styling for components.
- Have separate patient log in.
- Have alerts upon log in for patients if their referral is coming up to expiry, their order status is "due to order", and so on.
- Have appointment booking capabilites.

