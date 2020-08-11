PGDMP     "                    x           d9apoe2nkdg1do     12.3 (Ubuntu 12.3-1.pgdg16.04+1)    12.2 n    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    1403787    d9apoe2nkdg1do    DATABASE     �   CREATE DATABASE d9apoe2nkdg1do WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE d9apoe2nkdg1do;
                mxopgphymtzegq    false            �           0    0    DATABASE d9apoe2nkdg1do    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE d9apoe2nkdg1do FROM PUBLIC;
                   mxopgphymtzegq    false    4003            �           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO mxopgphymtzegq;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   mxopgphymtzegq    false    3            �           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO mxopgphymtzegq;
                   postgres    false    715            �            1259    1656650    Beams    TABLE     s  CREATE TABLE public."Beams" (
    id integer NOT NULL,
    org_id integer NOT NULL,
    ion character varying(30) NOT NULL,
    amev double precision NOT NULL,
    max_energy double precision,
    let double precision[],
    beam_range double precision,
    max_flux double precision,
    air boolean[],
    device character varying(30),
    let_peak double precision
);
    DROP TABLE public."Beams";
       public         heap    mxopgphymtzegq    false            �            1259    1656648    Beams2_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Beams2_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Beams2_id_seq";
       public          mxopgphymtzegq    false    218            �           0    0    Beams2_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public."Beams2_id_seq" OWNED BY public."Beams".id;
          public          mxopgphymtzegq    false    217            �            1259    1421908    Beams_depreciated    TABLE     l  CREATE TABLE public."Beams_depreciated" (
    id integer NOT NULL,
    org_id integer NOT NULL,
    ion character varying(30) NOT NULL,
    mass double precision,
    amev double precision,
    max_energy double precision,
    max_energy_units character varying(20),
    let double precision[],
    let_units character varying(20),
    let_peak double precision[],
    beam_range double precision,
    range_peak double precision,
    range_units character varying(20),
    max_flux double precision,
    max_flux_units character varying(20),
    let_material character varying(20)[],
    air character varying(20)[]
);
 '   DROP TABLE public."Beams_depreciated";
       public         heap    mxopgphymtzegq    false            �            1259    1421906    Beams_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Beams_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Beams_id_seq";
       public          mxopgphymtzegq    false    214            �           0    0    Beams_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Beams_id_seq" OWNED BY public."Beams_depreciated".id;
          public          mxopgphymtzegq    false    213            �            1259    1436911    Calendar    TABLE     �  CREATE TABLE public."Calendar" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    facility character varying(50),
    integrator character varying(50),
    "totalTime" integer,
    "startDate" timestamp without time zone NOT NULL,
    private boolean,
    title character varying(50),
    "requestId" integer,
    "rangeId" integer,
    beam boolean,
    energy double precision
);
    DROP TABLE public."Calendar";
       public         heap    mxopgphymtzegq    false            �            1259    1436909    Calendar1_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Calendar1_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Calendar1_id_seq";
       public          mxopgphymtzegq    false    216            �           0    0    Calendar1_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public."Calendar1_id_seq" OWNED BY public."Calendar".id;
          public          mxopgphymtzegq    false    215            �            1259    1421130    Company    TABLE     ?   CREATE TABLE public."Company" (
    org_id integer NOT NULL
);
    DROP TABLE public."Company";
       public         heap    mxopgphymtzegq    false            �            1259    1421099    Facility    TABLE     @   CREATE TABLE public."Facility" (
    org_id integer NOT NULL
);
    DROP TABLE public."Facility";
       public         heap    mxopgphymtzegq    false            �            1259    1421115 
   Integrator    TABLE     �   CREATE TABLE public."Integrator" (
    org_id integer NOT NULL,
    range timestamp without time zone[],
    facility character varying[],
    hours integer[]
);
     DROP TABLE public."Integrator";
       public         heap    mxopgphymtzegq    false            �            1259    4810251    LBNL    TABLE     s  CREATE TABLE public."LBNL" (
    id integer NOT NULL,
    request_id integer NOT NULL,
    address character varying(128),
    "officePhone" character varying(15),
    abstract character varying(200),
    "alternateDate" date,
    "targetMaterials" character varying(100),
    "safetyConcerns" character varying(200),
    "beamType" character varying(50),
    "specialIons" character varying(50),
    "specialEnergies" character varying(50),
    "desiredIntensity" character varying(50),
    "airOrVacuum" character varying(20),
    "controlRestrictions" character varying(200),
    "electricallySafe" character varying(25)
);
    DROP TABLE public."LBNL";
       public         heap    mxopgphymtzegq    false            �            1259    4810249    LBNL_id_seq    SEQUENCE     �   CREATE SEQUENCE public."LBNL_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."LBNL_id_seq";
       public          mxopgphymtzegq    false    226            �           0    0    LBNL_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."LBNL_id_seq" OWNED BY public."LBNL".id;
          public          mxopgphymtzegq    false    225            �            1259    4810296    NSRL    TABLE     4  CREATE TABLE public."NSRL" (
    id integer NOT NULL,
    request_id integer NOT NULL,
    "endDate" date,
    "experimentType" character varying(50),
    "isNasa" boolean,
    let character varying(100),
    "beamSize" character varying(100),
    "maxDose" character varying(100),
    energies integer[]
);
    DROP TABLE public."NSRL";
       public         heap    mxopgphymtzegq    false            �            1259    4810294    NSRL_id_seq    SEQUENCE     �   CREATE SEQUENCE public."NSRL_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."NSRL_id_seq";
       public          mxopgphymtzegq    false    228            �           0    0    NSRL_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."NSRL_id_seq" OWNED BY public."NSRL".id;
          public          mxopgphymtzegq    false    227            �            1259    1421081    Organization    TABLE     �  CREATE TABLE public."Organization" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    poc_name character varying(50),
    poc_email character varying(254),
    poc_phone character varying(15),
    address character varying(95),
    city character varying(50),
    state character varying(20),
    zipcode integer,
    abbrv character varying(6),
    org_type character varying(15),
    type_id integer
);
 "   DROP TABLE public."Organization";
       public         heap    mxopgphymtzegq    false            �            1259    1421079    Organization_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Organization_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Organization_id_seq";
       public          mxopgphymtzegq    false    209            �           0    0    Organization_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Organization_id_seq" OWNED BY public."Organization".id;
          public          mxopgphymtzegq    false    208            �            1259    3746241    Ranges    TABLE     �   CREATE TABLE public."Ranges" (
    id integer NOT NULL,
    org_id integer NOT NULL,
    start_date timestamp without time zone,
    facility character varying,
    hours integer,
    scheduled boolean
);
    DROP TABLE public."Ranges";
       public         heap    mxopgphymtzegq    false            �            1259    3746239    Ranges_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Ranges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Ranges_id_seq";
       public          mxopgphymtzegq    false    222            �           0    0    Ranges_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Ranges_id_seq" OWNED BY public."Ranges".id;
          public          mxopgphymtzegq    false    221            �            1259    4810177    TAMU    TABLE     o   CREATE TABLE public."TAMU" (
    id integer NOT NULL,
    bad_dates date[],
    request_id integer NOT NULL
);
    DROP TABLE public."TAMU";
       public         heap    mxopgphymtzegq    false            �            1259    4810175    TAMU_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TAMU_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."TAMU_id_seq";
       public          mxopgphymtzegq    false    224            �           0    0    TAMU_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."TAMU_id_seq" OWNED BY public."TAMU".id;
          public          mxopgphymtzegq    false    223            �            1259    1403799    TokenBlacklist    TABLE       CREATE TABLE public."TokenBlacklist" (
    id integer NOT NULL,
    jti character varying(36) NOT NULL,
    token_type character varying(10) NOT NULL,
    user_identity character varying(50) NOT NULL,
    revoked boolean NOT NULL,
    expires date NOT NULL
);
 $   DROP TABLE public."TokenBlacklist";
       public         heap    mxopgphymtzegq    false            �            1259    1403802    TokenBlacklist3_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TokenBlacklist3_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."TokenBlacklist3_id_seq";
       public          mxopgphymtzegq    false    202            �           0    0    TokenBlacklist3_id_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public."TokenBlacklist3_id_seq" OWNED BY public."TokenBlacklist".id;
          public          mxopgphymtzegq    false    203            �            1259    1403804    Users    TABLE     �  CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(128) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    affiliation character varying(100),
    user_type character varying(20),
    phone character varying(20),
    email character varying(50),
    org_id integer,
    "isAuthenticatedAdmin" boolean NOT NULL,
    "isAdmin" boolean NOT NULL,
    "isAuthenticatedIntegrator" boolean
);
    DROP TABLE public."Users";
       public         heap    mxopgphymtzegq    false            �            1259    1403810    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          mxopgphymtzegq    false    204            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          mxopgphymtzegq    false    205            �            1259    1737888    requests    TABLE     %  CREATE TABLE public.requests (
    name character varying(50),
    email character varying(128),
    cell character varying(15),
    company character varying(30),
    integrator character varying(30),
    funding_contact character varying(50),
    address character varying(128),
    city character varying(50),
    state character varying(30),
    zipcode integer,
    approved_integrator boolean,
    approved_facility boolean,
    facility character varying(30),
    ion character varying(30),
    energy double precision,
    id integer NOT NULL,
    funding_cell character varying(15),
    funding_email character varying(128),
    start timestamp without time zone,
    ions integer[],
    comments character varying(200),
    po_number integer,
    username character varying(50) NOT NULL,
    beam_time integer,
    scheduled_start timestamp without time zone,
    integrator_comment character varying(200),
    modified boolean,
    date_of_request timestamp without time zone,
    status character varying(40),
    rejected boolean,
    "order" integer,
    request_range integer,
    priority boolean,
    ion_hours integer[],
    shifts smallint[],
    "hoursOn" smallint[],
    "hoursOff" smallint[],
    "totalHours" integer[],
    personnel character varying(200),
    title character varying(100)
);
    DROP TABLE public.requests;
       public         heap    mxopgphymtzegq    false            �            1259    1737886    requests_id_seq    SEQUENCE     �   CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.requests_id_seq;
       public          mxopgphymtzegq    false    220            �           0    0    requests_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;
          public          mxopgphymtzegq    false    219            �            1259    1403812    test    TABLE     R   CREATE TABLE public.test (
    id integer NOT NULL,
    text character varying
);
    DROP TABLE public.test;
       public         heap    mxopgphymtzegq    false            �            1259    1403818    test_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.test_id_seq;
       public          mxopgphymtzegq    false    206            �           0    0    test_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.test_id_seq OWNED BY public.test.id;
          public          mxopgphymtzegq    false    207            �           2604    1656653    Beams id    DEFAULT     i   ALTER TABLE ONLY public."Beams" ALTER COLUMN id SET DEFAULT nextval('public."Beams2_id_seq"'::regclass);
 9   ALTER TABLE public."Beams" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    218    217    218            �           2604    1421911    Beams_depreciated id    DEFAULT     t   ALTER TABLE ONLY public."Beams_depreciated" ALTER COLUMN id SET DEFAULT nextval('public."Beams_id_seq"'::regclass);
 E   ALTER TABLE public."Beams_depreciated" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    214    213    214            �           2604    1436914    Calendar id    DEFAULT     o   ALTER TABLE ONLY public."Calendar" ALTER COLUMN id SET DEFAULT nextval('public."Calendar1_id_seq"'::regclass);
 <   ALTER TABLE public."Calendar" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    215    216    216            �           2604    4810254    LBNL id    DEFAULT     f   ALTER TABLE ONLY public."LBNL" ALTER COLUMN id SET DEFAULT nextval('public."LBNL_id_seq"'::regclass);
 8   ALTER TABLE public."LBNL" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    226    225    226            �           2604    4810299    NSRL id    DEFAULT     f   ALTER TABLE ONLY public."NSRL" ALTER COLUMN id SET DEFAULT nextval('public."NSRL_id_seq"'::regclass);
 8   ALTER TABLE public."NSRL" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    227    228    228            �           2604    1421084    Organization id    DEFAULT     v   ALTER TABLE ONLY public."Organization" ALTER COLUMN id SET DEFAULT nextval('public."Organization_id_seq"'::regclass);
 @   ALTER TABLE public."Organization" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    209    208    209            �           2604    3746244 	   Ranges id    DEFAULT     j   ALTER TABLE ONLY public."Ranges" ALTER COLUMN id SET DEFAULT nextval('public."Ranges_id_seq"'::regclass);
 :   ALTER TABLE public."Ranges" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    222    221    222            �           2604    4810180    TAMU id    DEFAULT     f   ALTER TABLE ONLY public."TAMU" ALTER COLUMN id SET DEFAULT nextval('public."TAMU_id_seq"'::regclass);
 8   ALTER TABLE public."TAMU" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    224    223    224            �           2604    1403820    TokenBlacklist id    DEFAULT     {   ALTER TABLE ONLY public."TokenBlacklist" ALTER COLUMN id SET DEFAULT nextval('public."TokenBlacklist3_id_seq"'::regclass);
 B   ALTER TABLE public."TokenBlacklist" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    203    202            �           2604    1403821    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    205    204            �           2604    1737894    requests id    DEFAULT     j   ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);
 :   ALTER TABLE public.requests ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    220    219    220            �           2604    1403822    test id    DEFAULT     b   ALTER TABLE ONLY public.test ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);
 6   ALTER TABLE public.test ALTER COLUMN id DROP DEFAULT;
       public          mxopgphymtzegq    false    207    206            �          0    1656650    Beams 
   TABLE DATA           v   COPY public."Beams" (id, org_id, ion, amev, max_energy, let, beam_range, max_flux, air, device, let_peak) FROM stdin;
    public          mxopgphymtzegq    false    218   Ƌ       �          0    1421908    Beams_depreciated 
   TABLE DATA           �   COPY public."Beams_depreciated" (id, org_id, ion, mass, amev, max_energy, max_energy_units, let, let_units, let_peak, beam_range, range_peak, range_units, max_flux, max_flux_units, let_material, air) FROM stdin;
    public          mxopgphymtzegq    false    214   ��       �          0    1436911    Calendar 
   TABLE DATA           �   COPY public."Calendar" (id, username, facility, integrator, "totalTime", "startDate", private, title, "requestId", "rangeId", beam, energy) FROM stdin;
    public          mxopgphymtzegq    false    216   Ȓ       �          0    1421130    Company 
   TABLE DATA           +   COPY public."Company" (org_id) FROM stdin;
    public          mxopgphymtzegq    false    212   e�       �          0    1421099    Facility 
   TABLE DATA           ,   COPY public."Facility" (org_id) FROM stdin;
    public          mxopgphymtzegq    false    210   ��       �          0    1421115 
   Integrator 
   TABLE DATA           F   COPY public."Integrator" (org_id, range, facility, hours) FROM stdin;
    public          mxopgphymtzegq    false    211   ��       �          0    4810251    LBNL 
   TABLE DATA             COPY public."LBNL" (id, request_id, address, "officePhone", abstract, "alternateDate", "targetMaterials", "safetyConcerns", "beamType", "specialIons", "specialEnergies", "desiredIntensity", "airOrVacuum", "controlRestrictions", "electricallySafe") FROM stdin;
    public          mxopgphymtzegq    false    226   ߚ       �          0    4810296    NSRL 
   TABLE DATA           }   COPY public."NSRL" (id, request_id, "endDate", "experimentType", "isNasa", let, "beamSize", "maxDose", energies) FROM stdin;
    public          mxopgphymtzegq    false    228   ��       �          0    1421081    Organization 
   TABLE DATA           �   COPY public."Organization" (id, name, poc_name, poc_email, poc_phone, address, city, state, zipcode, abbrv, org_type, type_id) FROM stdin;
    public          mxopgphymtzegq    false    209   �       �          0    3746241    Ranges 
   TABLE DATA           V   COPY public."Ranges" (id, org_id, start_date, facility, hours, scheduled) FROM stdin;
    public          mxopgphymtzegq    false    222   0�       �          0    4810177    TAMU 
   TABLE DATA           ;   COPY public."TAMU" (id, bad_dates, request_id) FROM stdin;
    public          mxopgphymtzegq    false    224   ĝ       �          0    1403799    TokenBlacklist 
   TABLE DATA           `   COPY public."TokenBlacklist" (id, jti, token_type, user_identity, revoked, expires) FROM stdin;
    public          mxopgphymtzegq    false    202   C�       �          0    1403804    Users 
   TABLE DATA           �   COPY public."Users" (id, username, password, first_name, last_name, affiliation, user_type, phone, email, org_id, "isAuthenticatedAdmin", "isAdmin", "isAuthenticatedIntegrator") FROM stdin;
    public          mxopgphymtzegq    false    204   �	      �          0    1737888    requests 
   TABLE DATA           �  COPY public.requests (name, email, cell, company, integrator, funding_contact, address, city, state, zipcode, approved_integrator, approved_facility, facility, ion, energy, id, funding_cell, funding_email, start, ions, comments, po_number, username, beam_time, scheduled_start, integrator_comment, modified, date_of_request, status, rejected, "order", request_range, priority, ion_hours, shifts, "hoursOn", "hoursOff", "totalHours", personnel, title) FROM stdin;
    public          mxopgphymtzegq    false    220   �      �          0    1403812    test 
   TABLE DATA           (   COPY public.test (id, text) FROM stdin;
    public          mxopgphymtzegq    false    206         �           0    0    Beams2_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Beams2_id_seq"', 103, true);
          public          mxopgphymtzegq    false    217            �           0    0    Beams_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Beams_id_seq"', 5, true);
          public          mxopgphymtzegq    false    213            �           0    0    Calendar1_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Calendar1_id_seq"', 10734, true);
          public          mxopgphymtzegq    false    215            �           0    0    LBNL_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."LBNL_id_seq"', 16, true);
          public          mxopgphymtzegq    false    225            �           0    0    NSRL_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."NSRL_id_seq"', 9, true);
          public          mxopgphymtzegq    false    227            �           0    0    Organization_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Organization_id_seq"', 40, true);
          public          mxopgphymtzegq    false    208            �           0    0    Ranges_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Ranges_id_seq"', 19, true);
          public          mxopgphymtzegq    false    221            �           0    0    TAMU_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."TAMU_id_seq"', 31, true);
          public          mxopgphymtzegq    false    223            �           0    0    TokenBlacklist3_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."TokenBlacklist3_id_seq"', 1342, true);
          public          mxopgphymtzegq    false    203            �           0    0    Users_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Users_id_seq"', 132, true);
          public          mxopgphymtzegq    false    205            �           0    0    requests_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.requests_id_seq', 162, true);
          public          mxopgphymtzegq    false    219            �           0    0    test_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test_id_seq', 1, false);
          public          mxopgphymtzegq    false    207            �           2606    1656658    Beams Beams2_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."Beams"
    ADD CONSTRAINT "Beams2_pkey" PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public."Beams" DROP CONSTRAINT "Beams2_pkey";
       public            mxopgphymtzegq    false    218            �           2606    1421916    Beams_depreciated Beams_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Beams_depreciated"
    ADD CONSTRAINT "Beams_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Beams_depreciated" DROP CONSTRAINT "Beams_pkey";
       public            mxopgphymtzegq    false    214            �           2606    1436916    Calendar Calendar1_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Calendar"
    ADD CONSTRAINT "Calendar1_pkey" PRIMARY KEY (id);
 E   ALTER TABLE ONLY public."Calendar" DROP CONSTRAINT "Calendar1_pkey";
       public            mxopgphymtzegq    false    216            �           2606    1421134    Company Company_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (org_id);
 B   ALTER TABLE ONLY public."Company" DROP CONSTRAINT "Company_pkey";
       public            mxopgphymtzegq    false    212            �           2606    1421103    Facility Facility_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Facility"
    ADD CONSTRAINT "Facility_pkey" PRIMARY KEY (org_id);
 D   ALTER TABLE ONLY public."Facility" DROP CONSTRAINT "Facility_pkey";
       public            mxopgphymtzegq    false    210            �           2606    1421119    Integrator Integrator_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Integrator"
    ADD CONSTRAINT "Integrator_pkey" PRIMARY KEY (org_id);
 H   ALTER TABLE ONLY public."Integrator" DROP CONSTRAINT "Integrator_pkey";
       public            mxopgphymtzegq    false    211            �           2606    4810259    LBNL LBNL_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."LBNL"
    ADD CONSTRAINT "LBNL_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."LBNL" DROP CONSTRAINT "LBNL_pkey";
       public            mxopgphymtzegq    false    226            �           2606    4810301    NSRL NSRL_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."NSRL"
    ADD CONSTRAINT "NSRL_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."NSRL" DROP CONSTRAINT "NSRL_pkey";
       public            mxopgphymtzegq    false    228            �           2606    1421086    Organization Organization_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Organization" DROP CONSTRAINT "Organization_pkey";
       public            mxopgphymtzegq    false    209            �           2606    3746249    Ranges Ranges_pkey1 
   CONSTRAINT     U   ALTER TABLE ONLY public."Ranges"
    ADD CONSTRAINT "Ranges_pkey1" PRIMARY KEY (id);
 A   ALTER TABLE ONLY public."Ranges" DROP CONSTRAINT "Ranges_pkey1";
       public            mxopgphymtzegq    false    222            �           2606    4810185    TAMU TAMU_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."TAMU"
    ADD CONSTRAINT "TAMU_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."TAMU" DROP CONSTRAINT "TAMU_pkey";
       public            mxopgphymtzegq    false    224            �           2606    1403826 #   TokenBlacklist TokenBlacklist3_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."TokenBlacklist"
    ADD CONSTRAINT "TokenBlacklist3_pkey" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."TokenBlacklist" DROP CONSTRAINT "TokenBlacklist3_pkey";
       public            mxopgphymtzegq    false    202            �           2606    1403828    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            mxopgphymtzegq    false    204            �           2606    8925840    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public            mxopgphymtzegq    false    204            �           2606    1737903    requests requests_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_pkey;
       public            mxopgphymtzegq    false    220            �           2606    1403830    test test_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.test DROP CONSTRAINT test_pkey;
       public            mxopgphymtzegq    false    206            �           2606    1421104    Facility id_to_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public."Facility"
    ADD CONSTRAINT id_to_organization FOREIGN KEY (org_id) REFERENCES public."Organization"(id);
 G   ALTER TABLE ONLY public."Facility" DROP CONSTRAINT id_to_organization;
       public          mxopgphymtzegq    false    210    3813    209            �           2606    1421120    Integrator id_to_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public."Integrator"
    ADD CONSTRAINT id_to_organization FOREIGN KEY (org_id) REFERENCES public."Organization"(id);
 I   ALTER TABLE ONLY public."Integrator" DROP CONSTRAINT id_to_organization;
       public          mxopgphymtzegq    false    211    3813    209            �           2606    1421135    Company id_to_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT id_to_organization FOREIGN KEY (org_id) REFERENCES public."Organization"(id);
 F   ALTER TABLE ONLY public."Company" DROP CONSTRAINT id_to_organization;
       public          mxopgphymtzegq    false    212    209    3813                        2606    1421917 $   Beams_depreciated id_to_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public."Beams_depreciated"
    ADD CONSTRAINT id_to_organization FOREIGN KEY (org_id) REFERENCES public."Organization"(id);
 P   ALTER TABLE ONLY public."Beams_depreciated" DROP CONSTRAINT id_to_organization;
       public          mxopgphymtzegq    false    3813    209    214            �           2606    1422071    Users id_to_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT id_to_organization FOREIGN KEY (org_id) REFERENCES public."Organization"(id) NOT VALID;
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT id_to_organization;
       public          mxopgphymtzegq    false    209    3813    204                       2606    1656659    Beams org_id_to_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public."Beams"
    ADD CONSTRAINT org_id_to_organization FOREIGN KEY (org_id) REFERENCES public."Organization"(id);
 H   ALTER TABLE ONLY public."Beams" DROP CONSTRAINT org_id_to_organization;
       public          mxopgphymtzegq    false    3813    218    209                       2606    5637306    TAMU request_id_to_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."TAMU"
    ADD CONSTRAINT request_id_to_id FOREIGN KEY (request_id) REFERENCES public.requests(id) NOT VALID;
 A   ALTER TABLE ONLY public."TAMU" DROP CONSTRAINT request_id_to_id;
       public          mxopgphymtzegq    false    220    3827    224                       2606    5640712    NSRL request_id_to_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."NSRL"
    ADD CONSTRAINT request_id_to_id FOREIGN KEY (request_id) REFERENCES public.requests(id) NOT VALID;
 A   ALTER TABLE ONLY public."NSRL" DROP CONSTRAINT request_id_to_id;
       public          mxopgphymtzegq    false    228    3827    220                       2606    5640889    LBNL request_id_to_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."LBNL"
    ADD CONSTRAINT request_id_to_id FOREIGN KEY (request_id) REFERENCES public.requests(id) NOT VALID;
 A   ALTER TABLE ONLY public."LBNL" DROP CONSTRAINT request_id_to_id;
       public          mxopgphymtzegq    false    3827    226    220            �   �  x��X݊7��~�F�J��t91,�,���%��&�I0���Ǽ��S��u`Ǝ]���ԩ҈ne��d����v�I�z��ll�����_�I�K9��R��xc_����`�(�u|^R9��e3�;kO��hZ�׋5~~����<V�� �[��;��e�b��O�Nɰ�T�}�3��i�3�j��7D�^�����x�6b�9RU+B�6�Yìl��Tֱ!��D��G"%���j^�[Mv�TQ�1.��'�o��Z�Y��/��?�0�a��+�v�n�]���{�V�"eD�,��|0�A�+$��ܑ�tD%��(�2� F�8!ư��va����yA*�S"�/� ���v�����v	:5�@��<�N?�~jfW��{�#ɽ�o�IrȨ���l���@���x�9HBO5���d�T���r�{����x���7o�����Rw��ӯҧ�F/�p4DJ�}d������OfĄ���G.��P�R7�~�,�wK�s��DoZ�_�|~܋��1̽%�����3�����x
DiTNJ��J��{�@@���/����������M�df ��<1=+�ړË�T�#8��?���"�~2w��:�m�@��ጁ�mw�j�� �8�*(�H�K��ꆣ%+��k�$�T��t�ǐ(3�g)3:������o�����/J���2{�Y�}��!����nd����04���R��b�]��H�O�Nd��vc�3����H�&F�#Fj�YGcA��3��䞲p	��5@���QI���K��$�@T@(tI���4 ��j��L������4!hc�Oq�1P�5�29-\�3�G�5\�ZP�����:�4�`�����j�2*#&AZ�3�,/\�>9H� �m�~8���i����f`(�K�P �
�����LL��J�4�ə�Ę�&B�x�A������CT@euCZ�AM�T$Tׄ�$�W���q{���@��GC:a�����8�@�tQ&3���a�(��}1fn'3��C�R!����.<ԓ�H��x�ܲ������Q�.f�8 J$���{;�웓V��J�� ���}rٷ�>v�?<>�͘�	�q2�y��^�x��@L�yͧ��@�ܘP��U �u�s��gNΠ��d}�}Q�F|�����q�Ij(A��=��l���<�b�vj� �Ҹ���c$Σa�qiu�D��أ!�^~�/�,/�u��a%6����_T���ƅO����+ z�y<,!D4�q^e�Vx �*mL�`Uc�CW�,2��Ŏ�yv/A��T;ظQVj�|���5z}��P�2�]cr	T�x9A�&�t�~��x�X�4�y���f�
��]br{;�#�^O���`���^N9C�`n� A}��@�l��;qO|��:^Q��N��!��|ɾ�!l�_���������6�"�O�> � zr ��:�
�Xu��#�%xt���{`�I��ҫ�o���-�p4�����W�H)(���V��Q���R�Bp��f�V/Xn@P�+�
s�3��޺� � +>}���z�n(�ڗr+GJ��	���I~���"�5>��� #���t�SC��>��yE��T��3J^��lj+ׅ�3���4x������س`�; �����)?<�J���Cp�( $�|�Y�")�3^M'n���2;���ޒ�0n����ρ>�}��۴      �      x������ � �      �   �  x���]oT7���_�?@uf�ݻ��B(l�*q @!Bi�=f��8�3��H+.���a{��	Mi"��������_���WO<ݛʽ)�O���{�N��>^�{�n���ӵ{���ۣ6
���g� ���D������������X�o?V���w������zJ}j�Ü4z����ݙ#曃0���M{���)�0�<��Q��)�c��:�1Vm�ۏU��:��d��QZ֜^��Jq+�w�2�ȿ���Z�]��k���H[C�y���rt�/uהto1,}F�{z?V��x1Y݇C�ڤ�~r�V&�$ur�̫��E,��?B�~^���)eyŔ��O1k+�lv�?��b��	c�365�N�����?��4�ι(�B7�l�dv�W-[1[�j�RB����d��q��{������[(�]8�wGqaZ�ܗ�-��C4��Xl��$�v���ř��S�Cۜ���g�Z���]>)Q[1f�}:j�OP��M�oa�Xdqo���vq��@�\��y�Y!��/��d��V�[1�ݯ�$���sp�?��f{���n��=�$g�ł�qN������Zd���X�-�pg-e�'�l,L�6�\,D۶Yy9�	G���w�,6�:ͩ�K"/5]=n���Nbt,6�
U�<	��ơ�ܱ�I�,�vT�5��i���Z(G�2rqc���"���Kg�p��ǍM��ib1),4�ݮ,��ow1�-���@4���.����E�����DA=+,2�Ǣ�&������[q�06T��mʛR^^/F�W�bFTV}�J�Zh�W�6-r1���X�枈��-��D����.�H�_q|�A��<J�痍�(7��iìm�4�h���l�DsGCQt��hYh�AV�e��Z��ݳ&��{Z(�56����/K!�L���R2�@۹�����Fr'�I!��)���0��ά�L�V����hq�P�klQ� M�u���\Tok�Q�*f�M}Ų��x!��~��BŬ��O6i�Yh�r��"�Q�Z���P|jh��;�-�P�Rc��.-eKw����W���T��Ϊ�Ɇ�*!�&��8$���[{!e#TG
���+MaZ��~�)KF�����,�T9���/ڥlz-�E�j�*oS&Izi`��[(s4vxؙ��A�dS�
�l��<�=[(W�u���
�$Oz�b��>��V����n���
ZK����R� �{I��٢瓅��2���y�QvO��rt,�l�	k+�.YU�2٬��5
�"j��*_�%���<��h>��6k6ڗ�,����Yk/�e?A��e]��$���b��rt0:��7Q�*Ũ�W&������Aq�:+�2&�����.�H�d��_Rh�+��^l�l��B��r]�)e�����"O����+�B����Z��&�T�F��g,�z�e�tP��X����k��������3��
*Y���U�2Ѫ_ь�����I8),V���D=H',�Pkߵ�G��[�Ɏ��R��;`�iQ됌�Xn�=�� �R�q� ��������"�\���E�Xbb��6Y�Vn�!n=��/��M���<|උ"��YѶ�,��>Z�b�m���	���R�����;�<-F�^�b��9�����-Td2��SQ��X�b?�B��=�����kp�M�ý��oE��$���,�◀"����+&�0í�֮ �?�۵�qR�^3ܚ��0^�z��ƺǠo���e����X]�e�q��ǐmݰz[(�"!c%��i�u���gK�9n���/1��x|^H�^y�a�آ�)���Ί�������V���e
�Z̎�����L��/�q�X!��]g�E��c񊳮�Yh��U��%����w6[a5Q��Ѡ?cc��O{{{_���      �      x������ � �      �      x������ � �      �   0   x�3�V2202�50�50S00�26�20P��q�R�\1z\\\ ��	G      �   �   x��P�� |Sx Rq`�D'ȧR7��RMTA������}	{�/�x��`�J��z�!DE1,�,�����A`��֕�N�F��[e����r^R��`�m��5��*�T�!�@��T�^j�e�6n(���1�d�mȪ�lX�˱)z	OS.f'2��x������T9O�8ι/c�J*      �   [   x�]ͱ� D��<�|X"Pg���cQ!�k�t�D�ր�5�N1P۲w1}J����&�݃��VA㞲)w�����a�q���"      �     x���=o�0@��Wx����B�lY.� �+�i˿/�U$:T
�ϲ����
r�B�"���w$��@^m�hQ�V��v�w�ץ]�bC2���j� ����J�\ �]w�A�%��A�g��j���>�Ǒ��)��P��He���K�/�ll�'g(��-7��n!�OE� �j����h�ز�r���&k1NO+� �'���8��� =ፏ���ll�SM�NS�^ԼB�2���Y�R��ma�M;��yK,���&�WC?�a��y����_��|����      �   �   x�M�;�0�Y>�/������9��f����� ��$9Q%� �a/�@��~P/�u\����!C�IJ�B�$�렦�聓vDXg������m��6�ǕD}�o'��أ#M�>7��p-�      �   o   x�%��C1��ar�d��K6�e�8fE$Q���l1nN��ź�Q��Z!]�P�&�Kh�No�Z��ۦE�/7���ui*���~vTv� �I�Q���6i�h�_�$�1      �      x���Y� �rd��o/�<�{6]h�Y�G��Q�|�$�c���j�":��4�����ڝߐ}~�o�]u��ڊnۧ���뿞������8��k�k�\��nf�P�kǎo�v�%���FO�L7Ɨ�����Xa������[g�9�/!~I��ڭ���zKoּ���<���8?�"=�-���Ѿ���3��6F[c�Tܗ���j�+�s-p���}� �K�],��/	�)>�L�c����NĿ��f�n��%�>�4[j��-�gi��/����Rc��C�S�m�7�I6�i�oO;%����K�}�0˺ߝzy�\�օ�W�їm�^_ܳ�����n'���A�h�UN5J������w7���`�ڌ���۞�)_�"�g�Q"?����Rݬ�����S�$D��7����ԑ0�~kp�d�e��1�ϓD'c��s�]ǽX����u˩��?�"?���4o1�I�[�wo���6[�&}I(O��-���q�
ߵ��^����<W�SBE�߽���dy�i�ᮛ�m��?���$���i�7���-�[sL��ŽM07c�3GK>.U˃�e��#�޽)%�,̑��n�2���X��[���l��;1�1�$�g�<F4��q<H��\���p��/	�I܂�mx�):ɔ8�28���C�)�W��=C�i�������]�.n�f���<GJ�oc,���z���1���/	�q�[�c�:�!��E�}��v���5�;V=5nw�$u,Q�E>nN�{q$�g�P��B'?����[2�9��1W���*�\e�_�^�r!շo�fî�5��/��DѠU�a'�"����.}7c�~��G:g���7�A�7��y��������N���K�a_�Qǐ�ؼ���va��fO!Ƙ�;��&o��ֻv���{�ه#;i<=�צ�3,�L�Ŕ�m�����5��N��}n=Cz����{�b=�,̑�n�-o<N�[L\f�w5a��n�|�$:	�h	��f	��Z�����>5�>�S�b�Ǥ��hT+���+�R����A'S�������n�lࢅ�y�U _�Ӄ��/u���aV6��������$����^�2pK�х�;����x���m�f��Fm��f���Z{�]oX�H��S;�k= "�\޺&Ʋ��pjv�}�&>���J��A���A�w��ܨ��%!=�w+'s���f��'�..����C��`�b�[V�҇�>t��	�-�ٜ?��<�GM��wF>C6�����՝I�%Av2�.e��b'q���X�{�����-�yL�e�b�m'�zy��N<�ţ@ݗ���p���X��qi�7������Ď����� ��oa @Օ�r�ŶeRu�π�xHA_�5�E�'0_�6�o����F�{G������Q6>��a`�#W;���4<��nQ�$$�������]�('K۸!5�\�H���%!?�� o���^x�@ױ,�9.W�<����G����) Or7ys~�n�}�Mt�9g
Tl"����1�]8�꒩�Z�I���"�r�CC�bĝ����/�����[��!|!�QeU�r��<+��u�=>�j�˯�7:�#v�=���(�����P{�#�d��ى/��7�>�D��nw�z�-�ET�$�V��w7��Ƴ���/C$���Vc��t�u�=���$���z����P�j3�.Ř����� ���(֪՞�=�a�X㗍r��we��<;ύ}�\�^r�sc}j:	���o����N0ޢL<r��~H��q�߸�XuE�:� 
���C�+c=�8}l�
v��-�cm��8;�=���%�=q�7F�,��2��Rj���|�l�9��_k7k�L�o�s'����ݝ��=p�s���'�ʬ�f�e|�$�d�:��IX~���f�A���Y^�/�w~E���<M�x/�Ш���������0sS���qD�2g�����O�˳��[����ܧ���6�j������H����Y8�*k����R��(��B�?$tͳpԷ�z�1�5;)}	}I�S/�Z[�s���`S�{�Fޑ�$�(����D�_�c�%B�@ۢ�(��������X	2G
�u�0窠�/	ᙱ��8։� 9޲:�9H��2�z/$!>�Յy0�X�x���-yxߧ����T
Rc+��-�,��?Ylp_�Κ%��/-�w����x�C��7�9�r�W[-	n*�`H����.(���`���(�$������� �x��w������3���Y �"��r�ΝM��)k֧��Z�ּ��}�Z���w����^������r��0F�_.%�A���VK���[<
�F<Qw��a7����T���#!<(�Z��Ŋ�5`�a�9D��_� ��"�(T���Y�ž\O檓���*��K4$D�z�^t� �/	�I>��˿��>xf���R��%s�r�P������3�=y ��0�W�w}���t��G�丂廖��%v0/��^o�yb��e��N�b�(�� ���t�I�p�v���k�Mm�`���z��)�=�	���"i�D�{��N�aU���_H��f���S�?!$�� s;L�Tk��X�c7?9��$K��m3Xl��w�@�"RI�O�
N�EY�f������;
�|7gmn7籕}��D8(�6�m��Q��e���BO���f�g��}���"���$��X�)~�����
�q�����5#	�q :�n��nhw ��ްO���If���b�k�,��"����v�m�����>f��"�Kq{�� 	�_8!_��f$8N�`̀X��I0T�e��c�qGA����n���*C&׫lߠ�ꚳ�ja$!<���/����_���̭��í���A.y�{�m[@(N�Wm�����$��A��2N�H����5�)�DY#]�$��\���+s��mx���&�޼�nI��,�����#��mł�k �~�~a�_*o�A_A���D)`<C���6+��CB1O���(I�;��:�¸�����I��x.ŭ��0����)�Q��A�W�'	�n`�v���&j���	��ߙo9�Ρ�w/_ZP��zo|���T���'Y�I��W>b�x��6�)��F�%!>|0����t��[�A�\��W��9���:�r���_�l,�w�� l�VN��`w�|ǒ�q��� ��0f�=���;�,�t��
B�1qa�]��8�HL�S����q�AAEC@ظ��ԯ���I�Jԏ�@��0p�s������_oQ��|q�vE��y�ME�W�	4l�׷�7P���	ۡhR�C�	�O���I�w���SGЇ~�Jb����ӫ��]P�i����n4�Y����$!>3;����rJ�v~��
0��ɴ�7���5M�ۥ�f�E�
Mr9�' 9�e�W�-	�In�M-�c����R:����p���$�<��
n{M��&f�c�h{�a���%��x^��X=��ʇ}O�u0m���vA5
��w8�d@����A���=>)	�I�i��ߜP̠r�"l�=�'��K��H��k���m��p��>7l�S�rn[#\��9l���P ��`dJ���`���rpE0<�Ӑ�J��jw�Ї`��ۮys�!��/A��b��y缒���<&�]NDƂ��3��v2W$&	���1cQ^�(>y*(8X3������|�h�^ �֨�?'��ß���L�fA��CB5Nq9%�� 8t�����n�䟞����?��h@��zN�}��L����o�+?��
�˚�b|I�w�=vS(Ϥ��Ld�o�s���}wk���*M՗�a�0حs)br��!�O	���ѹӘ~lui���,>����JB|ؾ%^��g��I��M8�^{9���-$<Y���7`O�?�e�v��0�5s�Hg�W)p^�'}�z����`�P������XT���߁5A���    ���Dz��Ւ �L%��5T��_�)h�1K�E��Y���[SF���dZs9U�?H�},߯fD0�@p\@�tNd.pq	_o����{�}2 �[�כ`�P�\�Z{I�,���V�e�������������a�#��qűQp��3�n�oد{�ڑ��S��7aB�p^~Z� �j���/����XW�8�t�Ji 	�1ơa�P��k�g�n�ͥGa1{��I��-*��%�k�ì�O�cź�q>�	��[x���X*oJ��t�Y��g�v���$��BW�K̽*ʊ�����ea<'9��
׮�Y+�"�-\ߣ՞���
\�XY,}͉��fa,�x�q�o�z�����_d_��X�,}��o�)!>��'��^T�VSxo؍�*ʚ�����3�\���IYL���nXEP�� G���/���E7Ѳ@�nG��=�.	����ϧ*��j�k
/4�h�\Q�$��@D0���VL��O��/P�&���>x9����-<W���O>���o��� �@1'�T�y�b�N�����@Sʗ}���Ri��	�p�#�5�Q�͗�b��J��U��P9/��o�V ���_w3l�N3�S?)����[+�]��� T�tbmo��5T㽰��#l\�@�o��^��AQ�9��q"g�
��~�;s����/�h0��d�a
f:B���� ��Q�$`'��5��N3��I��@,Pr�ٿ|7�d-�QhU���)�۳�%v�����I�{ͷ��d������k���+~�4C�˲��bVe�3:�(
(Ӣ9|{�h�!5�(.���(����,%�$8NrXI�-�5qTb�'�kb����r�kK�z����.��QVI@|}��$��� Jv�̺0.@�x��?�c!��m�TWlz�p�1�W��[��kf���K�j��B�Q�9SЈ/��Su
/�1kb�N>�A�F͵[L}��@$����ʨ��	�*�axmK%��=� 	�iտv���epa]��8�_.;�y/�r�X��t�H�O�֯'���8�%�$��ٔ��p��ʀ�fO�_ ^��q9Ip�˦x�3�u��w��N}��
���� ���ΟF?��BN��#M��-R�$ω��_���V+�
UE��5�"	��6
,«�+����[�v�_�h�tނH��s�-�	���1�y�ꔟ*2�PG����x��*U�G����P���;��~,Lw��lUD·L��f%)$#d�Oj�V�px)���ț��U�ҿ��8����
��v_�:z\�YH*�O	�M�X����Q��*Y��ĚJ����,�V*.�?[zU��:|?dva>����j�վW���"M��̽?��$!<s��T��S�b��@;�
��l�$D�}�X�*K�̠��P��h<|���qܭb'sKR�YPi��٩QL��	��!�?Ҝ*�,�.h�1n��͒��L���Ѿ�ǈ5+��z��½C��	����U��E�J���q��#Ay>Z�ܬ����kT;�ۙ������З��A.�kM:�|��ޚ�`
���s(�d)���Yک�UC�1.�=?��?i�_Ĩ.{�/�� R��Ή����MI�{����E�|=�m��}uM)�}�bJ|zG�7l�U�-U&���=1R|�{�_� �t0��^Y���H�bj���x��L ��#|K�<Hqx�XV�����/	}�HO��)��&��;4j������bI���o"�	=R�~΀Q�Xn�9�@g�,L5�,
�玦�b��l�-zx�p��I�}j�êZ~e�����������}�$�NUH��P��L�Í*�ý��]�t��%��Ƥ�<�S��o��b�g�%A1sd�q�{�H;π�Z�����K�d|���s�w�^/��]���1��ϐ�N�=(ZH��~��T���M����Xp�Eu�OE���5��l���π���w�_$�XP��B��U�n��G�$`��w�S
���T�[���w���C��xX�jz2� ���[���������͒��\����Χ�H���G����%!<@Э4-��D�2�8�������5F*	�ꅃ0P�n~�&�*�7.�7�Шh�Ϋg�����$t��2��9�$�g�!`K�Q��YC�j��x���.I�_́&�8����ئʝF�Z~�����g{.����n���j&�+�����1���"��yWZ�f}�I� R�Y`�%��U���c���0����H����$��\U�i=���^��Tc˥�Y�M���k�xˎu�������� �`q� v�qR�|��������g*�n߆Qe2�O�.|��
^��Ԑ��3KG��x�}�0��^�
?j�{J��Ȭ�s�ԯWTl������5���_��:��B��CߐN<ݚ\����a��
�Q�Y�2J�0�����Q���d.�Z���v��L�Ī��+��~y���`tK��P��G����u����x��u�l���\GV%����o�jpA�j�/{��rǁA~��G�R�� ���B)}鶲9eok��'V���1��O�:�@�}\����TҬNR�A�R�5�5������al�W�����`=<eB��G}�$����H^5�!�k�1�F~���e�}x<Vњ���X�p�m�̽/	�>�-[����O�0A��)�b���Π���QC���YI'+wp'��f��PIt�bZ��އ՝�1W�&�/��\ѵ$����UE��<��;�P�������Bv��K#�5�z��*�ڈ�����zpIȚ�b��Mfq%��	%j5����$�gW�0H�\>���^̂g���w-�IGB}|�Y�B}!:��D�H(�2���1$�n?q��I�O��Z�Di#c�k4F�}y��xy:~g�
���h��1�_�B8�K5���T)(рs.�}��?�V�Bm����U���v�p�^-�$p�<Г�(
Q�:(�}w�H��_:��}_ZwJ:dEk����h�-\9 �ja$!=,X<G�f�D>C�V�tr��꯶Z�Ф�1ﮟ�A���1ya��N�I|l1���0��"���h�ྲNIPFɍ1��4wH#R���,4t}i��A��ו5��;X�Z^�!�6sJ_oX+XF���I�^Uq�˘q���'�	������2r�o�8ph���}c��Nw����r}n7C���+��ϩ��ƕ�wD� EGo]��*���k�{4���N��ށ�����AT��KH��Q^_�F��1j��������g�Hކ"S���M�~��~|8l~�HO�P�]�^}��7\���	n-Н��?�Ȫmq9�f*����b	>(2]ۿ�B�,�<�T do/����N�:cө$ܿ1�e�gG�2N_%s�H��fչ��83�d��T�հi�O(h��n�������245f���,�4e�𖢊���N��t���y�8��D��1��Č}�B���[F~̂+�f�u��!�-���°�fj��Q�")�1�ӪL�a����m(����.�	s��5e�TT �y��9��Wn�!�j�^�<4��"�s95�3�:��|�G�����S��
���7�]�@}y�)8<B�]*?Sd���W��/�+ﵾ�T��T���z��jU%�}hWN�C�$#�r�"5-7-HP�ȵ�Q�?�K��Fa�����)~M�?x�2�4P��s\�=�eD��|��Z�UR�����C�>l!2z�������䎬
,7pz%Kڽ�E4wc�ȣ�]�p���|�,b�S��`������)������a�yV�1;�����u ��Q�2�~�s�����ؾwkH���ȣ8�W�JI�~,�
zxg��풄�����^^ت&��֕؅0Vܧ �����rp"C�qi���n�'jzG���z�5���1��t�o��\vUY�:�$�'sI��g�L��Iъ��Дf��W�$Tn�ijH��*b�*�     �ǲ����:O��v��^9P�{ݪ���E�K�Z��?%�g� ��7�_yĔ����.��Z]��ԥ�W���G3Ԧ�,�\��[�@t�s���s�I^p�<��M.ڴ1�����5%!<��X�h+A;K�(f��Vl���$�2�W�һի�r�N��O�K~�9����l�)����F�x��/���D�#A� u3�:-��X�〠�i\��	�� �>��TMs��hu�y�P�y�#�����nÙs�oѨ�K6���!(��+/�U[_��[� {w5��[X$����p�~r��ƹhd >�<nl�HP���M��Nv�E2�b����#�?��7o�x� �-�����넂#!�/΀�NtB�'��L8�N�o!	Qs�����ZQ��S�-�95�r�5
	�Y�R 4q4E�\oJ�R+�휿kg������,��*E*��P�TV��O����x��"J�X5A��ja�8���<&/��,�H(�T��F��r��u5����V|I����,�v��(���a��A�< !�onu75iki�R�x��4F"��ZO���#�>nh����S��h ������`ǵo��Hp�f5��VS���01t���LpKN��r)26�OF�	�K믲э�q�6Vΐ�/	A#<�ü�,"c0��@�8�Z��h���s�XG�?��4JD�egPL#��q��?A9v�D��(�Ey$W�FM�_�N*�CF�]Š;+�`Տ�	�KI�n}=۬��M�W]v����=�5Q)[��	V�Ό���{*-k�$]��-�#+�����9�7��2xs�Ȉh]�ڞ$�'۬�N^\�+�.�ɫ�Uܐ��k��HL-/����Ma��W���ɶ4uW���9�}f,�oAz͵�h3{>O��
<�PE�mo�Ѯ����@��&|IȀk����D�'VCq-J
�sr-_9�ʑzԄɨ"E��60
�����KB}���c!���R�b8��F���^Ip���P��(�
��n��j �3�뀠#�>����8tu��I���o�����:��H8m�%�M)j��*�T��w}z��p�K���K͢���Y'����ve��5�zI�6d˙��h�J����J!�5�z$� /�=�/������6�s��{y$`a\�a
��HS�~i�i6�h�%!?]5��h��t��r�Bj������#�<Ƙ�ǋbx�g�r����M�;��G�Fך2�[��J~u��ff��C�����S@p�c)�6`�����!:�wג`Hz4�D�̊u��Ƴ)�U��LG�{�L�p��J��I�1��r Y}>�8mU��1����sL�  N}�_w�Ȗw����k	�Y�Й�ӂ�?��)��a��i"��lr��{�ʿ�		��Q������Y����e��\�>_���GS�m���"����1����!�6최�H(�n	��
��{^O\$c@6�\G�	+g��X��5
� k�\նb���}��$ z��L�nЛ�������c���y^Ŋ}.]�X���#jzH�1Wom�����輽���Ne<�	ô��q5B��Z�r$�G-6Q���v�M�����2w�iT@'�ڕ������+|��9����&����6S�ڟgP���啗�L&���RGB�9�m>h5�V�U�+���¼Q?�S��b�5�K��*R�/Z\纆�t2�2!�olJ�TL][�i���Uӏ?�X�a����P��f�jbfT��UE���"$!B�5�.T{�姸���ju
�C�O�M}���3�B�Z�Y�	DV��'���QuTa%%��l�Kh�ɭqm�>�S�L4jB���@�5�®=U(eǵ��HX��U�րH������9�[��'	�(�@��x^*k~�KM����C��B��"W�ک����>	�T�^��|7������0��t���&��z����I�<�}�?��qj'@�!����#A�Ǔ
W�����M{o�C}���|�C2O�׫�����>`�B�Ʒ�gHJ�O�:'���9d�Z�޽]�N	rWDp�SkN��v��6��������(^mDQ��`ۂ�_C]�{�~�/	��JNh/�I���Z�*���;��GB|J�]{�������Y
���}�͔?��o4i�آ�kژ���|��C펄3p�������9���?m_�B�����ä��,�Ru��`���GB}`W(8�7�c]�^՗d1a���of�h���7<�V$4��4�x=�	�ڰy$(���rjW-?�π������6��_�>�'�d���3B�$�T7M��e5��K�Bhk��tJT���u�	y�s��|Y�37(ei���|j̮�G�Q��5����c��z�>E�Icu�ٖO
�0!\G%HBI������t�0nZӀ�����פ֑ �Vu�А'���^W�԰5Õ��=��HN}�(^�v*Y�T/��$8D�&;��ü�S�/�:Ujj�߼�T�B����}���9�t��k>��R�05*1�tv��w��!�GB~N���rdm��Hθ�1<XL�KBy��6K����I_yy�94�X�##���lkhH�ǍJûf��o n��/�Eo~k���Vƌ���;�,4g����H����hb'�ם BL�H`{'n��g �׎���Q������w�P�oR����)L���8�m�;P���ǀIvx�u�Ǒ�t����ǡB�P5})�� ��}]�p$����g4RV1)��V6�D�s��QG�P�k���9���>�q�
M�j���uj�)\�ԭ��h[�������~��K�b�����{��b�ؚ:���֯lM��q�IU�)F9%a�*K���{<H�b*9�~֏�-4�a�"0��\S�GB�� Ie}�sZ�����?%h�l
�z�gC��Cc�:��;Yw� H�7 �ךSp��a+e��wTb�z7%�<��b�M;��/P���yɟ�P��,exu��hT�)�E!q�Ou���_0�G]�N����a:�ōE��Wf�#cI S�]�X���S�OӀ?��;�ֽ�Hpx�����\c��j�VB��fS�vR���0��O��hu|˙K��t*�nw�&	�Q/d+��N�+Cާ)^\2�O��Z�{$��k#��_^�-�k�ڡ�i�c�8�>d��aC7��Z��赦Q���Q�Hj������L��)��Dx�zy����J&|I�g�ͽ6g���m�B��K��|��k֧�v��L!B�����M�3q��uݔ$����K����5`%�m6M\�ב�G>+�Z4�)j�B0o�rF���v�}$��{�g|�SvR_t��Y����gP�#�{�W�4%W��t`q��%���}��u�d�S���>��T�x�0��1��)v��X�Z����ma`�u�����jG�`�W#�����J"�̝r���<I�d�����*���HA����n�n��u���y	rJ}� ��R�,�����H�O@k�R�]#7C��Hr2�MM#I_�6k�&�	�d���;VwW(�$�,���0y$�Zq�K�7�T;SDZ�qzk8�เ����h�P���!V�E��������2ғ�殫ˏ�,t�4ҵ���͵�:?�e�]�{��U���T��u���Em8��Ր}֗���R���<��?P�d(G75�H���VO�˪xw��8S�'V;�9L�\���X�y��\o�$8�Vb+���%�kKe6Z��]wњr�5J�V����$8AD1i��dq�mq�>�K<6���4'�+e~��m+� utz~�����m�H<��ϰ�	�˫�n]�	xaȊ���
O����g@GNk �9I�X_�T=��o�rgݻ��<Fu]��$�'@��:P�<VW%�	��t
3@+�7]t?tZ���Օ-u������ S��� ym�h�n	!����SS�-[��?K}�(Ю��Q�����,��Sjc��)$s}�Z���/�Q5�ݵF+����_    ��h�<��M�]˪�L?i*����l�=��"T0l_A�b�ɦkm����l4�����^�e���p6�UU�����~�� !h���o��0�gcS�&� ��z�#A����w��0xM��&ƶs<F���$�?��Z<Fk�'�ZUp�����ۯk��G�Ww���	��#���W\�q	��U�$�GgԤx̕
�`SC��*�����ֲir�A>����Bf�]f����`SE�  �Y'���	5t����#A��/j�X9�3K:ɏx0A�JtH����w�>S���,%]�zH|�:=�Hp�	[K����"Ȧcy��6o\{b��ԙM+Z4Xe��������� 4�N$����k��Z�&%�4�ub4S���.M��n0"#>�v�n{%�ըԜJ��Q�n���/qd$%�V�����Y�յP�=��Uwu!�P�8��}�cl��\���� !���ݫZ�6�Z��јgD�<#��o:�gC��{����>��SPWZ�'f-e���f�,D��j�1��sW0u �K<%�?sл�!jɁ�Xeĕ�>K��P�ꊽ7P����L�UaD��J ��z?��'����� K�S�(��H��YGS�T����t�i����"�ϵ7[�ɕo���0YKӡ��i���d�Լ��Α.�jh����������rsn��u�������^4'���%�p�sK)�Ņ8����Qu5.����<��Dc��v��
��t����x`���JB|�v��9�:��&36x�0�=i"	Y�=6��#m�VG���\��21S�IPJT�5�x�}�j��U+��i��[�ŧ�Pck�Za�z�4��k�ouz�*��$^I����B70���R<��Z1������#�>ɚ\�b�a�RNA�� |�5��		��S�V�F�jд��z�oe�p���ൟ�A��*F���Аi���>��\I��Su�)�>jb��3��P�{Ʉ$��!��N[k5'�)\��XS�B]��+����/���ө㡎��� ~׸u^;��$�s�U�k&�ڈ�Qo���-7���tI(��kC6�O��A�����b��a����G��\���z���%�-�������bpE�i��l��-UQ�\)^$,eJ�$��Ly�P������W�ɂ{�h�u�=��F� D�5�A*w��VW�qB!�)��3��π��(&�U�N����[�$k�� Y����P�ӻ����WXQ�RiV/��U3��rڽ�S�*(�ZhdU`=��f;���<�Y�vXOӢvaU_�f�7��Tu�=&	�X9(촶u���j��@b1<י�GB}���a/�����N\5d��Ә�	 hRS����v3inɲUu�(�u�����P}�Q���D���UM�p�r��������4��y&��1�n���#!>.F��v�:�u'�Ԓ.'�zOiJv&�644~�C�a�M%����"	I�Gұ�$������gTa���\'�	E[SgW(s9�,�Sz�Ë>����/	��v5�J�(�O�p�5<3wk����-�*�h��;�6�G�7.�����{˃$X���j��PJ�|�^��`̵�n��)	 	6���hb��@��Za��k�l�ذV'*��Pa�f�O���xOaIB Ex{z������@��c�y�倯������hHT)���-�'z3F3$@��Lɀ�*��9��i/�J����Ŵ�\�}���Շ박i�)0^m�0N"�n�S��M����U�����5'i:,���-��u��P�ڞC����Y��]9'����!\��<��9��<���d���q{���U/%N��a�"�P�2��;U;,X�5�vJ��S��r!������c�GS70�U���-ڟ��ډ��R7H�^3/�ubב O���dҶN��D#�*Ǒ�[���5���вP�}ŷ^m��E;�}����t�
j���Fe�Ν"PUu�>�z�S&ޓ�ݶg�v�΄	�iA] ��>}�Ȁ�lؽJŒ)'	Sy"0V��(�u��P�W@���;P���j��>!�:�S�%�fU�o�I
����}#t�D��u���`�'���r?��rrA�ªJ��\{���`&F)h7�B��?9��<��j�W?.	^�&�+(c[*�C�~�D;C~��`H�l��)zP�����J�!"������%!?c��T��:�qe},�p���
��)!=!Yؑ��W��hű��[ o@���K�(y�.ܥ���b�=�ƖXM8-���)0����Qa��y�O�g��i�,sMS-��}D�$�=>e?�LG2��	��p�nW�qO%C]Rא-A{�f�}^;�q z���y(pf�� ��Q�ɨB�iBph�v���yN�")0���Q⻂�,V;F���K�&� x�y�ڄږ��Q���`k�����Xz��15���Aj�o)(��֓m��c�5�R��-�N5�jc�F�?�E�F�4�7]S{P4��i�P@[���>Z[%C���=���ksdkCт
�����-g@� �]��c�g�6(��l�;�l�K��I;T����Uó����4�q.���'	�j0��5g����%�ؚ�ȿ�^�x��S�x�[�^��O�R�������QHq�;�)8x�Tg��*<p�I��*؉�+.*�
n�)��œ-���SZ�gJ'������� G��ݠ��-k��P(�i/�R�xg�n���:�0N1����s�-�^�'��h��P�EÖ�
��A�G:�zop�5�!	*4	%�X�y��U�8M3.g[�'�	���=P�a�v癣\ 8	��pO�K<;u&�w$�r����
�2u8U�~Hȏ�_O��]I��9V���r�>/C�3L
�$�5����3��@� �m�H���������\pM��a���������h���+P���� �pg�����=Z�����ͧ(_����)8l���_e��5l��x����5�6υ)�E��4��[F}��h���	M쐟{��ѰC-��S�?dx�/�������k1�!�E�cjLV�Lc�}nÇ��Ϡ��U���������ce��;��)�?������$#b��A�jY#��U�E�x�Z�i5e�7	�D�b@�	��^�n41)�*�E`\�6���I�ۜՔ�޾��ح��9^f���Z	������GϚ#|�i��J��1��y�GBy���G���R��
F4Fk��R�		���ڡ�{
%���]K}��c���c	�Oe�����U�uW���=_K��`��@���i[EG��A��D���5�x$�c.S���e�K�Z�t�^��O�H �{[��!��Ey��T6W����unՑ �Ꚉ���=�9��JAQ��k�ÑP������Y*UQG�;\b+��ɺ��,����94�LY���̖��Q;4�
E����p�Ϋ�8��jڴ���:��H:��m�z��F��<-�\��!GB|b�ި!Ο��g#\���j�q�ʐЏ�h���U4K���e1����]�������k�����%��9����0����PS�5�h2�uޑ�bd% ��� a�V�7�`E��o(������c��\-�ijoϗr�vM!�|�/;Q�&m`h����I���hA�:˭3z��GB|L]�+��%|��
�(�����>��L�mky�ɝ�ѭ�gjR������,��1�#a��\&��zN4ޗ��|��j%��]���2kYw�+��ؑ^���wL໶��Uᴳ˷��̓Ռ:|�V��g�d��)�]gƴ���[���2���.�?˨�v�@���^����i��+�^ݗM]�̼4�g��pg��T����o�)N`��+�L��L��o�����ۜ�?�@?��kg��P.����cE��mN��w�=�ڙ�1�i�W���w�������d��.�<Z�t:��|ܓ���򧜅]9�����7-�OtJ	?L�0Zk����!��:s-v�,���	f�����/_�gJMu#�;ܣ�,8Y��    �=g-�>1UӨں��=�PO+��γq2ZEex@`���:j�H�X΄yԤ�3�ݩqP�F5ӣ���5�~$$�!hG�P�]P��Ƽ�Z.�ϖ/�U��k���4���y��ή�����w4tc[<�P�.g{���hN�,9e3v��q8����M�U���߳�h��8C�n�:���Ϧ�� 5��EZ�!��R� n]9ᑐ�Z�5U��h�0�cس���#�>����.V�u����6ڸ�Y׌
�K>�75NȄ��p�[c��=0����݂�= ����I��`ϲ�)�W�����nq�#�jG�K�	��h�Tw ����*z��S�&�s�4P,X�n���#&4�n�l�*W��� ޕ�W��'M�!w��ˮ��s�Y�G�86����b�0�����m�R�hɑp��4��k�*bǉ_:�6H�p�";�!�	8�l�v�DQW��[e���zg�`��Zݴ
��X�&�:��P?���HpOhyO��v��v��4�n�` A_��Zg�T�s��UQ�U�z6��ך]�-�m���(=4�}CF<�tU�j����w���f�YFR�cOh-�iz�N�I<��i�U��͊l���h�*6g�u��@��zu���<'����I)}��	lц-��Z�{>���:�50 X�zZ-��*�j*h��o���,���*�NNuL݀]��WX��ɑ�+Ny{u��$-������Z�vԅ{bD2�}�"��CUZwzȽQ@c�֝����Q��L�/?���@wP]]S|95�\M��#����C���2Au?m�}��[|a4ײ�s�W�jU߶�Y:���7�f̺"�K*��9y��R~��֧�vioq���8g韨�Z�ф݁�Q;,<��
H��u�>pѡ&TR-wV�$}[�j+X�+,���ҮϞߜ��aT:�u�� ����;_�����Dɠi�EdC�`��HsIF4������Q}�U��U4�C4.~k��X��j��������Ю���~�
����P�+` '
%I�Q�x��Tّ��Qz��W��R���z����������U��J�k�@��Z��WM�˟2J�X��A5�պ>�[�מ͊]���f�<���h���Kj������.},92�S�rM����bl�7,��c4���|/�9T������BQ�険�K1y����%�*�]M��2�IlS�l���`u���}~�ͪlC��P2�*��~����e��v�R�vF+���v*u[
d��z����T�V;DDc���/���˕��ڶt���֙0� (ܪrRO3+{�"�[_ޟ=�}RB��朩n@�}� 鸀�Yo�-é@ؤq<�.�Oj�QOA�)��槎I�@�����a��}��иB��o���bx�I̟Q
[�R���x��}t���﹠��.�9R @���ٚm��	Z��,������3t�3P���`��"<u�8�e'T��j�
DCq��D�h"��*aN�s����U�c��bW>��CB��j���̡ͫ('�fc���j�.O;ⳖѸ���3?�k�Hg��k1���/�mD�ѫ-Wp�{�H:�I[H�?��z+��NS�Cê��p �����Ȁ�F3d�*Ȭ*��ڋ����O����I�Ǭ���5�X�m�z؞�Ye� ��XnY�ЕV'A�|�j��?�X���kafk��UaO���S�F稾�p�b��s��t�i��J����W""��'~f�h��|B�#f��J��gIy~���ڰ�F7���j�گ��m@�eBGFx�6���bWaTx���x�\����m�S|���MF��7V5|������m�2�5M�������])G�՞]���V���;�&F��E|H��(Fy�3�в�LYO����>	
Y�5�h�F=n�2&~��ٛ�S|��T�4�=ibi��J�0O���?`(�lܫ���U�����s��������P�ێ����EU�R��W���� ��2�{>''��u��4��,�(�q�+}�Y��r�s�O9��_�$�\:�+���(m����ke��=�,��`�oZ'�
ʹ��g� ���Oü^�+�);�iE��Q�r����_��Dw] |$���LԂR�j�i���4Y�N��넥#�>]�c˵k�)�� �6CIH��:��|���f��V;��vm5zK�K�i���	Q�&���ߙÙȯ�$܋���k�xKB沎��P4;��>������u-�9�� ���q���D5JG3|*P�|�`	�O-H��<�tyI2CZ�e�A�K(�� a@��P���� ��g�h������A�K�h�f�ka�6�-/qm�8���)����j�����q{?µ��H���2�h�����x���4+辬J��<������]V�-��]�,�Q�ca�j��m,r���IAÙV�{hg�n�8���V"uk�H�t)X��Y�f�_�X�&�a���i�M��S�	B��A����`��ٮ�r���>]L`�pm�:�ÿ�a��g��"J���i(���ψFM
h���̦�[��5��i�e��/j=򳜶L��Ο%��qz���#k�޵\�H(�ט�vVA�>�ص4-_��9�L��S�n�.���,��._��u� �7��NC���S埚]����Y�P;�a(a��*w�ƹQi�*�W���m��@�{t��s��d�a�**�������4
��R�7�T\�� �Ш�~m��\K�թ�^�d��_s'_�R29���{�Dħ*{�J�y&�.D6���m7��]�gG�0ՁV��P�.h/g)���ʵG�G�+�[��a��0*Z+\H�~r�t�Q�K;�F�:P�8��#
���"8q�PX��P�G1B�Z�~ �O���g���~�_"4��w|�a��퇫�9�o��7�Y���!��oRTK{�>�N61j��V@������5�K��*�cָ��AESDO�xsI�M�����Omc}���`U�z�S��GA�d�'��U��q�E�X5i#;-�X}��8�3��־��4��EST��'.էi��e�ӓ�#`���=T��Mˡ��>��۸��I�T�Ͼ!Eb�>�3p'$�����V����W��d������t.����_*��;eEG�)�Ѥ�3PF�y���Q�%"<�M��!Ag;�M����L(�mu�D�U3;��Z�঺Φ�,Ju���.s���
�2,�gO8W{�O�%��I��� 3��Շ+���������fs�Z��"N��tP3tLkn������符��<��܊��}2@ �U<���l7��S$��<�fk�}�����0����v�H�D��=D!s����3��h���6�d��ɜ�D`I1�c��ڔ�fGL����֫t���jW� C��A�� ��Ucx��2���`�R��-`���ą�H��\�%�x��'�=1�#�?f.@�J?�KD|���i�m?3T�z"�F�'O���g��KDB�{)?��4�e�k��9< �R��K�R/�kJ���TVЭ�L�r�=��}�՚ZG_h� K�,��	(���	��D������~&�hS��?�Y�ӆ�^2��P�����Q��U&i��7��0ѣ\��)�D@s=�R�g�vKj�ЪX�
mQ���M="�ӗkN�=��{�4g�����w���K��F�hrbV�R:�����y!xw�t���ɉ�K5�E�#�86M�k�3!y{_o��8��/�ӟ���5H����j�)�/U+l����Ղ�N����Dˊx�Kq�_"���t�p��}�kz_S�,Îd���,�Lp��9��ܤ\�_3K{� �P���M�;l:R<@aN74'!������kс�~dp��@���ө���$:4n�j�n�s�eCaA��~��~�
�9F>��-�hn�_B�kQc
8I�:҈1�35�U:���K����tp�m��"���vmM����M��W!���'�=�J
�o��ЦEͤ    �������	���Ƌ��gX�>|d�J(4�Z߅e�8��kS7�Fr��M�:�z+k��Ǔ!�����+�����E���kjM�-�K_�º����Y�"4���Vʻ������%�kkY?=����GF{<G�.�����)F�X��I����e��EX�t�V�bKԬ�53���_��׹z���Ǫ�J6͝�l�♠� \��`���`5kH������WK%��(�� ����O��xEd�II��em��W��q�%�?�[hr2KQ��^�n��θX�2u�"@|��5���i��{��U|;��}����_��EE3�@���&�6���[;�������E]Ϊ��~�v4޴�5����q�_"�l��X�;u��#�Cf��W�ۼ���%��/�Lr-ə�<�/G`��E�A��/��y���Ϊ
�^q"Hw3�ݬ>� �l��^
�O֍BE�8��/.B�Cd��z�c�q�����9gtak/��(�+�����ih4���}��-�k���?�ǫ8l�����״�w��d^_g1�RQ���\f��-�Je�R����/.�
x
�l�(>$�p�O+���{��}V������O��(�8�F�}?7��ռm��\ǿA��ڶ��3���8��R�B"����c�M�����锍�+�����ݮ}�d�2�Ҁ��o��
�y��O�ڶ��Zh=#��+�%S�c��i����ò�X#5��XP��]돬*�j]�C��߃ H�������Q�§!4��l��z[�{�8An-G�9�[��~N�q��tV ����q������Qe[�00>�Lm\&�RZ���S�%��V�x|���"j�S���R^�*�����YHg��}�1�E���
6w1��]�u�E�(%?���he�:/*�К�wɸo�wψ��t�T����t�r��ͱTa�k?��C�G�5h��8:��'N�hy��s�@N>t	���Z��&z����3�l�5-��f��9s�r��
��'�����U(���HVMZ�9w3��;}|2(k�/�V�BX���L��s��"'�F�p�.B��{=f�F��I��L�TO����'�js*������1�*�xs E�zB�I�*aZ�o/n$lf"�PMo�[C�;&.u���P���W0j�o�tv�����N�"+DqJ��3�)LeZA�<Kr��􏹎����9�[% ��jVA%W���h��^��L�y;\��bY��bxJ�{�M��jN|��fA��H�g	�8j��^��Aʓ8k@d3�s��T2�g/�]����9A*w8���u	o���9[�C�d^�d�A�eT#��u�e���9��!�L�����)w��_)�Wa��FTL�T)��+�9!��s���M�����ն����H�*h�Mm�B'����^��]�%�!�0������q/(,a}���|1P����7�0eT|̑E����#��:�-�y�@U'of��*�����(�DѨ�N�(ʦE	$BpEn�8R
)��ĩWC��QD�v��h��8�7�.�|8
�7U�o����3:!�.��q֋X�Ԛ����ȜBޫ�vZ�o�2H��/��b�-�K|!����F��p�QBv�̌���<³�L}�yl��騌�������o��9������2�2���_�m�!ғؗ�{�Cri��t*{�i�*������B����6�����~	-���Ex��`f6�:1��9{�����@x����k��6���K'�z�x-�x
)	�
$���V+d�����E�������G�_�IK�SPmύ�6�:������V�j�(1E���?i6C�����_YEL[X�D\*�,�SX{���D�fn�p�U*�s���ǿ��B�<�!�����hR3<���J<\����.���C�-��#��6d��e�.&�����Ѿ��f:ɶV����UR�b�����Ý���9;j����I�3^����O��O�ɐ�R���xDSVZ�����z� E�*��^�z2��{!��n-/�������B_ 0�(4�/i�������.�%��~N��9�@�B`w^���!�S��EzOlR���**�n�E/�"��t�w�yێc�親B����O3/���ZZF/������DԱ̈\�ھ!���.���Yt�`��P�5Z;����4��KK .�F���G}�4����>�ز*�n}5��E
���������>� ��3z�wn�⇎���~]�z������W�b;�̾T|�P�k�8%�#�QD�iCtD�E	�5g^6�	����R��aЦ�G�.�D�{��W�'��=����D?�d�j�����k�]���!��&�Jc��f(1_��oR��(�|C���?�ɧ�j��W�����6��?Ey�\�z��&W�8R��J��c���(��Q��C��tl�cU&�� �B��5�}�W�E�n��܆�N��n!-��k8!�S,J�J�Nف�46�J�VIj�:-��w!�'��IT�V T����b)�RN��5R�y���$�Za+禕6���ﴓ BAz����?�㕓��E�bv�
㏦�����:1�W]uU�usu^~>�#>�M���!�y���ek>;��NK���e�����~9�;�@8E��i%k}�D;Ik?�G)���r�w�d��iR`&v�3�.�8��p�>	g�\��n,i�Q]=Ԣ��7���/�-���|���	q;�8Х4�����UR�]����1�o�O�"�3������[�RP������&�r�.a!(�2o%j3��<:{��9���0}�a觶���SZ<��hQ��h�kⲋ�3�*3ҫ%���Gt��,��,�&�m[�@�7]uo=bgً�5��9����T�D�>y�3���%y�&zE�8J9�G���p�un��b�v����������p(� ��+�1�wbQ�$�i�A�c�Yh����b3��K� ��L�?Q�	�n��so	wU`���tF	�� �B�l�1+�:�C�����G�~b��Q�p���Ӵ��C�g��݊����'%�(N�Kc|n�Is���?�{�Q��ڨG��<λV�8a�����t>���*���ʛ6@Ϩ��D,9#��/j)���:_�DƓnS4���gNs	$yՀW<U�wJ�͚�o)	 �֯��U�{g�	Q���f߁L50r��#�+ p�D(+����}�Q�.�Y���)h��\���o���~L�J��9o��R��]�0߽3��Y|Q+9�a�T@U���8��R-}#���:����¨BuG�RK�?�/�[��韜�3�*~:�øs��Ϟ��<R��zjtB�G�#W���l�f�"R�Y���7��h˜8o1	E��U�*�E�Mj�x��)�d|f܄q��g��S���1��+�?!P��+�0qf�$�`W��O���/���4�
��R�2�L82�6�y�!���6�#Q��T#��r�s�,���E�[!����A�ns�w��G�.�4�N�_�*L���:�Ҩ���bQ�n`"V�W'�6�s�ԇ��v�B�RF�]2J��2���I�*�@nЅ�s�qz��En���{�~�G�u"���U��c8�r�uB�Ǫ�F��&��6��u�{���k�z�����C*o��I����7D~�����0'�i�K_?;9}��˺����a���D+�6�B~��/�^�?�!�?RЂ�������X_nDL ���@1��E����m�M�8�GyH�{�,��="�ϵ�C��'��h0[�B���N��C�g���E���r.�x�>��S��!pݓ����>:�	�W�(�X9��b�o΅�p�w�G+��dH�Y�������[��:З�����`��T��+tu'Zn�*���3��nq�Ű���,����S�^�H�����ɂg朘��W�dq��܉˩��"���_~݅� 7  C��"^\���!^���X������fh���9��_M9b�3�VUC�.[���{��b�Ւ�O��I���Jq-?���`�I�c����)Se0��P7Au�V&���K�����'Dx�f�������	� �������u����Wp17z��D�i�PWR]P�1�/�!�W[��#��w��bt+�.��Bo!��.~A��Q���C]�3��1L��2��!��EK𸩋�Gɴ�D�p�C`�5D}�]e7�Bt/Pc�|Ct���C���L�D?�2�yo� N�TҊW5;;�k5;!��{غ2��(�lae�i�k�]f�!X��M1��L(��eN��b�z"�"pB�jD�k��h� k�����oƘ�ʝ��#xܨ���?#��蔋Z��!ⓚQ~�s�X]�����b%s�^κO�$��ĞUM<��La6l7��DR|��9���GQ�x��X9��n����5_�Ս��X?���=
�J�Q��_���[�r~+��>�V� �X��g�<�;Aҳ?ES��u���n�v[��,�w O랡�,���@"uв�Vqq���o�'_�ƙ-���
�1�L��kŸz��?q��cg1E���Q�6�֛�bm*/��D콕#���I#T՚�x�HC%�����G�P��Ǒ"[4���`�ukq��,}��G+���.����x
WEo��#��i���c9+��`�����os�֫������	b���Q�}��5)T�DkZ3��4��Z�)_�C�[��9�D
C�ٕ[lo�D�,�{�ƝpS��ᐻ�v�JN�������E�}��B���=$���q�E�kqH��K�MR�T)�ϜNJ���v���n>�-��Q@Zg�^�����E��-i��y8�1��Ym��U5�Ȋ�c�"w0V��g���QFߺ
�����k������ڦ�Wa
͉$D�E�~��w��K�\JL\qsGz7�~�
w4x��r+AT��6C�Ќ��V׌B<>Ym��oR�纘�[������s��)����=�_K��H�[�x�i��jY�_Q!�r��R�c]Z閪�����y��~J��;��\Ϙw�!IƑ3eЮ��/?��b�g����?�Vȟ��N5�/��cE����Ge@y�3�d���[��iQ�@D��Iħ���V�g0�ʅV���Q"p�g��~�i_X�������6�ؕb�!�u�K����T�1��*���G��aN�Q^ރd���<�9��r�v�����@-7�qr����Ɗ�Pw�l岚 ���U7�EE�"<oMX��ǟ"jUm��/���b�¤<5��4�t������ބ���k����3H��^�OL�.}aQo�>zqB�3t_i��c����\�l�c�� �~��p|��D�*����+Fی1��������-� xi���\���q��S��������܎�j�XHO7=�WaUe����r���]�@r��J�%���F��Ο�ѷO&(}�����L�M�D���lc��[D�3I��h��}�OF~�������Pa�ȭ��������Zo��{;R�������VHȇL�T�a9B�6	m���^@*�c��>������8HE8p{o�:!�@��\�G���v�J��N(d�h�z���ܪ�hF�4 �Y����V�=��n�F9�[��ޑ�$�G��TxET1��������lQO^�����h1�%���v�!���!��ZEb<��q-�OߌI�Q��{id8!��]%�^K?7�@��2�Ƭ�~F{Bh×����%g�g��t��7w�~��@o�S�Л;�90��������?�����!r���z�W}c�	��*4Z���g]~�!�Ԯ��0��ѨSRg|Ԭ�F�x8~C(si�����9����_������kI5���hG���08�s���FG�V����o�ղƕ�@׹�f��2&����ռ� �(�IO�Ϧ[�����������o�Q'J}���ה.�?[���e�S�	��M�5�|��P���-�8��W`��De��Swo��((-m�P�3n}�zL�jERU������)��/f.���볗��:'�{�T� �1��3@��qMLX}Dsya2���1C.zPIG�$.z���$����Xk��?*e&H[oZ��
J�{N(Q<S�Yx����Wؼ�lC�%a"(f�ǌ�Q�\�q��y��*���7��:�}T{.{(��7��-:�kdu���8��z��f���=Dz"��n+�2(��YǪQ9n�Ww?�?!�S�݆Ct�5����ZoJ�E�4E,�_�-͜�����Ѧ��e�>�qB y}�b����zd�݌$��F��3�QS{�I������ӵtv�����עe)vo#F��\�����4�ü?EPj7mU����wT�;"��ǝ�z���d��\ȅӅ��{��Gm�$��C�3z��ܵ3�2N�����S?��OIue�����Ӓ�Y�U�~F��:��Ri]�	�4�!,R������zO�_t�ꪕ��4�;�m�.�4�\���Ŷ��>������! �di���%؜�'�<G�7�}ƈ��|���� 墸�;G�F�z�
k-�)@��0�CY'�%搳�1s��܏��0h=7���~B��A�
; 
B���ZU����G��pIA��HI;n19�b�i�=�������A���9<��+���_�)o�=��G�� dM��+���:PW��ӫ��hZ���'���(
����uO"����Zu)��RKN��!��=�:�1��|x��\�q7u}���?����c=�Y      �   ;  x��VY��X}���ЯÎ�[��"��"��e��
���J��~��@�K�sO�=�A"��H������ �3d���%�]Y9?�#}��+���]�QH�<dr�����zڢȺ�=dUV�:D�s��4O�41^=��i�#��g�W���*�!�}�<��	_�Z�]��C%�X�W�ƃ����QZ�qte쉏=gG�b/Ԉ{�2D�RP���ȶ�@�8]� �&����_,������}����x}#H|���{��++�Ɍz�A����[�n��x���pV��&�P�د�3���:�,�D�?jA�8�9p��TDE�o�S y�t;5�+Ϲ�~�����v�p�l�e�+Q�P�� �)��5/��oRt�??:��B���n�dc�K��S}03�:�(L��Pw����n��񊉮$���UC�����G�;��163�|��!�3ZUN5Љ��b�܊v���2Z쩖��h˥����3���gh�F��E<E�O�<���UrC��.1�7uA�V9��*E��D `��N�f-"��(�
��t�k��>^�)$i9���W�N�s�0{TW� ��30��Y����Y^�%�.�;�6�mk Rܗ%b�E�Z8cYRIr츹�eg�� >|�� I���<���Q�����rF9�b ��������#�,���%v�HcDr��9�Z0��b
pH�`U>s�Η'�b��z�$�My�ծn��pXoO�ݗ�w�����>�&p�?d
�5��%>;*Fw��gy;̙;[���G�^�����;���9<ء�4b�<*k��G�yBG��E��0.���#�T.h�ц>Ⱦ�)�ܫ���`�]��(J�t5ٗ��j�'gz�ēlܵ��f�L���H��C�#� ��`��g9<� &�`�b�\���v��e��)��G6��:҉I���2,�W��� ��"�����K����o-x���M��Ϛh8�&7�a�,�D�P�m�Ҁ�gw���;����ɽ��}�PmG����=(��iz,�/��GMB�t��]�����I7噶% ��yإkE`6¦HW�{�
X4w?��	�K'���7��7�_�:E����:>�Ԯ�)�m�U8w=e�,i	ﻪ����E�[a����1o�ߘ��#Xv��c|>��M�q������~vk���svKt����A��K�bv,��]�fJdp��u������h���O{��ܾ�M$��M,K��TV����l������|ږǻ੡�^��=���~��qZ��{;�K�1R;�VB��=Zn=��^@�ۢ��cq+ђ}.P�����6�>�p,Ҕ��.KO����aU.΋:R<�E��4��S�!�fN��I�2�/{C7�?�A��4]=i�x�,�sw��I�	%���Y7Sz�l,�M�){��8�5Y�IJ�9� _�8 O���,6���q�$�8��\:���L�K5�ij� �۞DcL���9m��7���{��H~��6��-*���t]��:����R�o.n@�ۆ%�ȃ<N�zN�D�FhX鼍��!7cN�>Ϙ��S��8S4�k�]j����k�N��-s���T���{�N�RsOLvO�פ�꽊��*q3��[A^���hN�P6��GM�%-�f�&(<0�_��6��j�i���5n�c쮤�$���0�"�P^������%�����������Ӗy6,�v٬_�7ƈ=j��p��0�\�~f���z���%�Ø�ίv�i�%���gM��zjh(Q S��zg��E�	p����[Ts���_(J��>�[�y�m�?t���o߾��	�      �     x��[[s�6~�~�}���_��q���n'vgv;}a$*V#��$;�d��{ �@�{�Cʒxχs��|����}>_$?ݕ�"�(�W������y2{XN�ˏ�\n��6�nf��,���N��	|Nnϯ~N~���!���N�~�b�ϰ>�"�x����
��S�o�=�b�%�%D�o��i�.~������3�R"�X�)΄�L'�ߊɶ�&[{a���`{J�h���|t��ޗ�Y��xe�$ Ri����s7 �f��}���K8ٟ�Ɋu�y �)��c�����ݥ���1s��ٙ?`���s�q��0��j�.�l���A��[Cl�]�-Q�\��W�攏���q;W7��i�¥�p�ں�zw[�D���圩�f�� :����Z�/��������F���H�U�t��)ɴ4.����V%����{�tjݎRϚU��w��(�NZ9��Z���Ye�~E`�b,�������k�����]:�˗�M�u�(irW;��>��#��B��L��p�ȓ;_{�x�<���p�wz�X������{�6h�<jC�׃M���3"�b��2Dt���BJ�(Ę�ڰ٠l�N?z����q�m��oP�.�|���NM�ʵ��Wn�d�R��z�e���2��pN߱�h��p]�瓝�WQ��#ߤ�^n���b�������uK� ,��#�;�N�}v<�l�3?��bl�I�%W�t3��[��]�b����,���,�T��Rf���sY�7%��K�3A�V "Xs�Q����Z�@�l.�"��*` ��[����.,�|�;2 n�3I�����KCM$��r:�i�
5d���U3�U`9�t��4��+Ԍ9˰��a��q^���]��zZ�������׋����/c���ջ����.l?^	�CB Ő�H��7�q�c����)��	Q�Y�g�=�a<4�6�5w�{k{v(�1ۭ��0jI�7y5��_Yq�Z�X��c�3�0�X5`�6ϒ�pʎBU�)�)��a7;��Ij�M�v���ïB�5�u�ڑ(��RP��a��Q�C�A�&��(�y� ;���t����`�/x�r�/���~����]m g�Y�(�7��>����u�+4.��.U�4a�ک�q^=X�Qe�V���x�	�a�VK^������@�J�����xv5�LoŽ�1b�N�-�`h�$�,99��?M:�f���7�jU,�I1��h��cc/�p����Ϸn(h��1!�:^��R�vJ.��I�ɘP�
�1���_`���Ǜ����/�h�X��H����݁}fk|7(GL���n��&��2`�X�1�5��f�;�vB����b�8/>���>���˽�V_b�Dze���v�����!��$ߓ8c=0��Hq�Ft���".n� �:��S����} � 4����F��u��O6����_X���j~6��?ljH"���䮘>,��[]u�:�+�n��Eq��4.�6����V��c#���{$�qjwx� ử�<a���1�|r�9`��,G��'�P2�}ˑ���hu7���u�6��sE{�EC|�q��!Q�Lj���7⊧d���?\���7�U}2�TV壢�cU�v�DL�B�aT��1�+������)'B��M��,�y���S�,5V���^��D�|=n��I���j��3},֛y�L�K z%"��P`(�G���} _�Q�lJD�Mw�h�NS�/X����i�f=,�g��G�_o!b��������Ԙ�(­�U��J�e�=rUn���҂� 4�А&��j�ܬ�I�������g�:�wO��,�$�۠Sr�p!!��I�b�M5�4��@V�ajl�w����:�f�S�g��6�h�W؜&#9��H-fmg��]!�lc(n��ʎ� 2��e��rA}	>�Ӎ`�ƺ���;Xî�ֱ@��$Ɯ
v�cASeo/6�a����G���Ց�iY�kK��|Q|p�����1�:$lɐ��! �l�E��z(T)��H%���	��1N>V��$_,V��c7�l�|Y��c���&l������������n�7�m��#��רD��]�8}�O������� v������ n��f�5�ʒo&m;�oH�e�>|SyD�<��%��c�s
�C�DY�\�9hc-�@�=Zd7ƨ>��~
�Ň�'"&�*���V��]�Z�?���-%�5��D������i� ��2��Z�zʦS�0ˤ�� �q���`?�=V�~Ïu��Cmni� Aj!��[��ԏ�8h�˸ȶ�p��	�ql�9�M��u�hc�J���Z�Z��H�Ţ��u����/[L�U0`=��u���0Δ���������@_ʯ�X�-ud�����b�i�$.cLxG�}�Cx2�v�ɓ��Բ��n/#�e��V��K;QR+x�M���u��C���@��u��,"�ȏ�D�BJ"{���3#ʦ�O��Tk~ܪ���qoI{S&h��T��s�ڠ���bߙ�=թ��F#�#���3�q�
�䁔�����K#�c�I�!�,eU��vs>_x�_e^�)�i�r՚�i���Ǹ%g����)a�t(��m:=e��
&��s����|[���]PO͗v�d2�:��u8@��#3��)l�&�t���J؍�_
Q|Ԝ�+�����gՆ���Z竻�d�^�V���̧~v�����0�`���a;�[a����;F�VhW%�]��9��H��Ť.�G>�Iw�x���J��02�� ��Z�)����5L�av�$;�7(��ˮ���1K�J�d�.�֋>��uߊѬ��I�����L`�����LS�E��֯��qC D7�4<3�Hold��P%�C=A�îfL�ϗ�b�������W�������~���z�[q~������r�y�/Er�.aB�nN���O�"���Z#�Z��������TK���K�,�vK����Wh�>��J��B�|^?%oJ�^�(�Ez�}��F�f���/��I�      �      x�3���,V �D�����=... J(�     