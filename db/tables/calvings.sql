CREATE TABLE public.calvings
(
    animal_id integer NOT NULL,
    "time" date NOT NULL,
    litter_size integer,
    CONSTRAINT calvings_pkey PRIMARY KEY (animal_id, "time"),
    CONSTRAINT mother FOREIGN KEY (animal_id)
        REFERENCES public.animals_new (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.calvings
    OWNER to james337;