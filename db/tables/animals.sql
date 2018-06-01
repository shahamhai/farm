CREATE TABLE public.animals_new
(
    id serial,
    gov_id integer,
    iron_num integer,
    herd_num integer,
    gender character varying(1) NOT NULL,
    pregnant boolean NOT NULL,
    comments character varying(512),
    birth_date date,
    vaccine_1 boolean,
    vaccine_2 boolean,
    gen_1 integer,
    gen_2 integer,
    gen_3 integer,
    gen_4 integer,
    gen_5 integer,
    time_of_death date,
    cause_of_death character varying(64),
    animal_type integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT type FOREIGN KEY (id)
        REFERENCES public.types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.animals_new
    OWNER to james337;