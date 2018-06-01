CREATE TABLE public.weighings
(
    "time" date NOT NULL,
    animal_id integer NOT NULL,
    weight double precision,
    CONSTRAINT weighings_pkey PRIMARY KEY (animal_id),
    CONSTRAINT animal_id FOREIGN KEY (animal_id)
        REFERENCES public.animals_new (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.weighings
    OWNER to james337;