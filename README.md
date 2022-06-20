To run the application, install Node.js, create a postgress database and enter credentials in the /src/api/config/dbConfig.js file, then enter the following commands into the terminal at parent directory(/):

# npm install
# npm run packages
# npm run dev

## DB structure:

CREATE TABLE IF NOT EXISTS public.superheros
(
    id integer NOT NULL DEFAULT nextval('superheros_id_seq'::regclass),
    nickname character varying(255) COLLATE pg_catalog."default",
    real_name character varying(255) COLLATE pg_catalog."default",
    origin_description character varying(255) COLLATE pg_catalog."default",
    superpowers character varying(255) COLLATE pg_catalog."default",
    catch_phrase character varying(255) COLLATE pg_catalog."default",
    "mainImage" character varying(255) COLLATE pg_catalog."default",
    images character varying(255)[] COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT superheros_pkey PRIMARY KEY (id)
);

## Assumptions: 

From the text of the test task, I've assumed that there should only be one table in the database