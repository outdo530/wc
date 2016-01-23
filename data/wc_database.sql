/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/1/23 22:32:46                           */
/*==============================================================*/


drop table if exists tbl_area;

drop table if exists tbl_buyer;

drop table if exists tbl_const;

drop table if exists tbl_customer;

drop table if exists tbl_func;

drop table if exists tbl_lp;

drop table if exists tbl_seller;

drop table if exists tbl_user;

drop table if exists tbl_user__customer;

drop table if exists tbl_user__func;

/*==============================================================*/
/* Table: tbl_area                                              */
/*==============================================================*/
create table tbl_area
(
   id                   int not null auto_increment,
   first_name           varchar(64),
   last_name            varchar(64),
   user_name            varchar(64),
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp on update current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

/*==============================================================*/
/* Table: tbl_buyer                                             */
/*==============================================================*/
create table tbl_buyer
(
   id                   int not null auto_increment,
   cust_id              int default 0 comment '客户id',
   ship_type            varchar(64) comment '需求船型	',
   ship_weigth          varchar(32) comment '船舶吨位（载重吨）',
   require_type         varchar(64) comment '需求类型	',
   urgent               varchar(64) comment '需求紧迫度',
   fund_require         varchar(64) comment '融资需求',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   can_to_lp            int default 0 comment '是否能成为LP',
   reason_to_lp         varchar(1024) comment '成为LP的原因',
   primary key (id)
);

alter table tbl_buyer comment '买方';

/*==============================================================*/
/* Table: tbl_const                                             */
/*==============================================================*/
create table tbl_const
(
   id                   int not null auto_increment,
   _type                varchar(64),
   _desc                varchar(128),
   primary key (id)
);

alter table tbl_const comment '一些常数:
   1.  卖方 科目一： 
   2.  卖方科目二：
   3. ';

/*==============================================================*/
/* Table: tbl_customer                                          */
/*==============================================================*/
create table tbl_customer
(
   id                   int not null auto_increment,
   nm                   varchar(256) comment '名称',
   contact_nm           varchar(16) comment '联系人名称',
   fix_phone            varchar(16) comment '固话',
   mobile               varchar(16) comment '手机',
   addr                 varchar(128) comment '客户地址',
   is_buyer             int default 0 comment '按照位进行操作,  char1 买方，chart 2 卖方， char 3LP  多选',
   is_seller            int default 0,
   is_lp                int default 0,
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_customer comment '客户基本信息';

/*==============================================================*/
/* Table: tbl_func                                              */
/*==============================================================*/
create table tbl_func
(
   id                   int not null auto_increment,
   title                varchar(64),
   url                  varchar(128),
   templateurl          varchar(128),
   controller           varchar(64),
   is_navy              int default 0,
   item_name            varchar(64),
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp on update current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

/*==============================================================*/
/* Table: tbl_lp                                                */
/*==============================================================*/
create table tbl_lp
(
   id                   int not null auto_increment,
   cust_id              int default 0,
   _type                varchar(64) comment 'LP 类型
            p2p、行业内高净值人群、私人银行、境外资金',
   risk_prefer_desc     varchar(1024) comment '风险偏好描述',
   expect_of_contrib    varchar(64) comment '出资期限',
   reward_of_contrib    varchar(512) comment '期望回报描述',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_lp comment '出资人';

/*==============================================================*/
/* Table: tbl_seller                                            */
/*==============================================================*/
create table tbl_seller
(
   id                   int not null auto_increment,
   cust_id              int default 0,
   property_desc        varchar(2048) comment '船舶资产描述',
   bad_property_desc    varchar(2048) comment '船舶不良资产描述',
   class_1              varchar(128) comment '银行, 资产管理公司,租赁公司,其他',
   class_2              varchar(128) comment '银行:
            		（二级）包括：四大国有银行、股份制商业银行、地方性银行、民营银行
            	    资产管理公司:
            		（二级）信达资管、华融资管、长城资管、东方资管
            	    租赁公司:
            		（二级）银监会所属租赁公司、非银监会所属租赁公司	
            	    其他
            		其他类的就直接填写	',
   class_3              varchar(512) comment '直接填写',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_seller comment '卖方';

/*==============================================================*/
/* Table: tbl_user                                              */
/*==============================================================*/
create table tbl_user
(
   id                   int not null auto_increment,
   emp_no               varchar(32) comment '雇员号',
   real_nm              varchar(64) comment '真实名称',
   gender               int default 0 comment '性别',
   email                varchar(64) comment '邮件地址',
   mobile               varchar(16) comment '手机',
   fix_phone            varchar(16) comment '固话',
   id_card_no           varchar(32) comment '身份证号码',
   enter_date           date comment '入司日期',
   left_date            date comment '离司日期',
   user_type            int default 0 comment '用户类型',
   sign_id              varchar(64) comment '登录id',
   nick_nm              varchar(32) comment '昵称',
   password             varchar(128) comment '登录密码',
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
   id                   bigint not null auto_increment,
   user_id              int default 0,
   cust_id              int default 0,
   visitor_type         int default 0 comment '拜访客户的事由类型， 买方，卖方，LP',
   visitor_id           int default 0 comment '事由对应的序号',
   start_dt             datetime comment '拜访起始日期时间',
   end_dt               datetime comment '拜访结束日期时间',
   content              varchar(1024) comment '拜访日志',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_user__customer comment '拜访客户记录
注意字段： visitor_type -->拜访的客户事由是啥？  买方 -1 ，卖方 -2 ';

/*==============================================================*/
/* Table: tbl_user__func                                        */
/*==============================================================*/
create table tbl_user__func
(
   id                   int not null auto_increment,
   user_id              int default 0,
   func_id              int default 0,
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

