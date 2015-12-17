/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2015/12/17 21:02:00                          */
/*==============================================================*/


drop table if exists tbl_customer;

drop table if exists tbl_func;

drop table if exists tbl_user;

drop table if exists tbl_user__customer;

drop table if exists tbl_user__func;

/*==============================================================*/
/* Table: tbl_customer                                          */
/*==============================================================*/
create table tbl_customer
(
   id                   int not null,
   nm                   varchar(256),
   contact_nm           varchar(16),
   fix_phone            varchar(16),
   mobile               varchar(16),
   addr                 varchar(128),
   type                 varchar(16) comment '按照位进行操作,  买方，卖方， LP  多选',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

/*==============================================================*/
/* Table: tbl_func                                              */
/*==============================================================*/
create table tbl_func
(
   id                   int not null,
   title                varchar(64),
   url                  varchar(128),
   templateurl          varchar(128),
   controller           varchar(64),
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp on update current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

/*==============================================================*/
/* Table: tbl_user                                              */
/*==============================================================*/
create table tbl_user
(
   id                   int not null,
   emp_no               varchar(32),
   real_nm              varchar(64),
   gender               int,
   email                varchar(64),
   mobile               varchar(16),
   fix_phone            varchar(16),
   id_card_no           varchar(32),
   enter_date           date,
   left_date            date,
   user_type            int,
   sign_id              varchar(64),
   nick_nm              varchar(32),
   password             varchar(128),
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

/*==============================================================*/
/* Table: tbl_user__customer                                    */
/*==============================================================*/
create table tbl_user__customer
(
   id                   bigint not null,
   user_id              int,
   cust_id              int,
   start_dt             datetime,
   end_dt               datetime,
   content              varchar(1024),
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_user__customer comment '拜访客户记录';

/*==============================================================*/
/* Table: tbl_user__func                                        */
/*==============================================================*/
create table tbl_user__func
(
   id                   int not null,
   user_id              int,
   func_id              int,
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

