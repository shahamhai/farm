CREATE TABLE public.groups
(
    _id integer NOT NULL DEFAULT nextval('groups__id_seq'::regclass),
    name character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT groups_pkey PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.groups
    OWNER to james337;