create database shop;

CREATE TABLE shop_users
(
    id_user bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    s_first_name character varying(50) NOT NULL,
    s_last_name character varying(50) NOT NULL,
    s_email character varying(50) NOT NULL,
    s_password character varying(20) NOT NULL,
    b_del integer NOT NULL DEFAULT 0,
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user)
);

ALTER TABLE shop_users
    ADD CONSTRAINT "CNST_SHOP_USERS_MAIL" UNIQUE (s_email);
create index "IDX_SHOP_USERS_MAIL_PASS" on SHOP_USERS (s_email, s_password);

CREATE TABLE shop_goods
(
    id_goods bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    s_name character varying(50) NOT NULL,
    s_description character varying(255),
    i_cost integer NOT NULL,
    b_in_sail integer NOT NULL DEFAULT 1,
    b_del integer NOT NULL DEFAULT 0,
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_goods)
);

CREATE TABLE shop_basket
(
    id_user bigint NOT NULL,
    id_goods bigint NOT NULL,
    i_count integer NOT NULL DEFAULT 1,
    PRIMARY KEY (id_user, id_goods)
);

ALTER TABLE shop_basket
    ADD CONSTRAINT "FK_SHOP_BASKET_USER" FOREIGN KEY (id_user)
    REFERENCES shop_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
ALTER TABLE shop_basket
    ADD CONSTRAINT "FK_SHOP_BASKET_GOODS" FOREIGN KEY (id_goods)
    REFERENCES shop_goods (id_goods)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

CREATE TABLE shop_orders
(
    id_order bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_user bigint NOT NULL,
    s_delivery_adress character varying(100) NOT NULL,
    b_del integer NOT NULL DEFAULT 0,
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_order)
);

ALTER TABLE shop_orders
    ADD CONSTRAINT "FK_SHOP_ORDERS_USER" FOREIGN KEY (id_user)
    REFERENCES shop_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
create index "IDX_SHOP_ORDERS_ID_USER" on SHOP_ORDERS (id_user);

CREATE TABLE shop_orders_content
(
    id_order bigint NOT NULL,
    id_goods bigint NOT NULL,
    i_cost integer NOT NULL,
    i_count integer NOT NULL,
    PRIMARY KEY (id_order, id_goods)
);

ALTER TABLE shop_orders_content
    ADD CONSTRAINT "FK_SHOP_OC_ORDERS" FOREIGN KEY (id_order)
    REFERENCES shop_orders (id_order)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
ALTER TABLE shop_orders_content
    ADD CONSTRAINT "FK_SHOP_OC_GOODS" FOREIGN KEY (id_goods)
    REFERENCES shop_goods (id_goods)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
