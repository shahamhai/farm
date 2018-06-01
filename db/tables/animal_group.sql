CREATE TABLE public.animal_group
(
    animal_id integer NOT NULL,
    group_id integer NOT NULL,
    CONSTRAINT aniaml_group_pkey PRIMARY KEY (animal_id, group_id),
    CONSTRAINT animal_id FOREIGN KEY (animal_id)
        REFERENCES public.animals_new (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT group_id FOREIGN KEY (group_id)
        REFERENCES public.groups (_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.animal_group
    OWNER to james337;