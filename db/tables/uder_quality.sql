CREATE TABLE public.udder_quality
(
    animal_id integer NOT NULL,
    "time" date NOT NULL,
    quality integer,
    CONSTRAINT udder_quality_pkey PRIMARY KEY (animal_id, "time"),
    CONSTRAINT animal_id FOREIGN KEY (animal_id)
        REFERENCES public.animals_new (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.udder_quality
    OWNER to james337;