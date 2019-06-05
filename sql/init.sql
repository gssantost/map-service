CREATE SEQUENCE public.marker_pk_marker_seq;

CREATE TABLE public.marker (
  pk_marker BIGINT NOT NULL DEFAULT nextval('public.marker_pk_marker_seq'),
  latitude NUMERIC(8,6) NOT NULL,
  longitude NUMERIC(8,6) NOT NULL,
  title VARCHAR(64) NOT NULL,
  info VARCHAR(1024) NOT NULL,
  CONSTRAINT marker_pk PRIMARY KEY (pk_marker)
);


ALTER SEQUENCE public.marker_pk_marker_seq OWNED BY public.marker.pk_marker;