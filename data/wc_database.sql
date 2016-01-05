/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2015/12/26 22:18:31                          */
/*==============================================================*/


drop table if exists tbl_buyer;

drop table if exists tbl_const;

drop table if exists tbl_customer;

drop table if exists tbl_func;

drop table if exists tbl_lp;

drop table if exists tbl_seller;

drop table if exists tbl_user;

drop table if exists tbl_user__customer;

drop table if exists tbl_user__func;

drop table if exists tbl_area;

/*==============================================================*/
/* Table: tbl_buyer                                             */
/*==============================================================*/
create table tbl_buyer
(
   id                   int not null auto_increment,
   cust_id              int comment '�ͻ�id',
   ship_type            varchar(64) comment '������	',
   ship_weigth          varchar(32) comment '������λ�����ض֣�',
   require_type         varchar(64) comment '��������	',
   urgent               varchar(64) comment '������ȶ�',
   fund_require         varchar(64) comment '��������',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   can_to_lp            int default 0 comment '�Ƿ��ܳ�ΪLP',
   reason_to_lp         varchar(1024) comment '��ΪLP��ԭ��',
   primary key (id)
);

alter table tbl_buyer comment '��';

/*==============================================================*/
/* Table: tbl_const                                             */
/*==============================================================*/
create table tbl_const
(
   id                   int not null auto_increment,
   type                 varchar(64),
   "desc"               varchar(128),
   primary key (id)
);

alter table tbl_const comment 'һЩ����:
   1.  ���� ��Ŀһ�� 
   2.  ������Ŀ����
   3. ';

/*==============================================================*/
/* Table: tbl_customer                                          */
/*==============================================================*/
create table tbl_customer
(
   id                   int not null auto_increment,
   nm                   varchar(256) comment '����',
   contact_nm           varchar(16) comment '��ϵ������',
   fix_phone            varchar(16) comment '�̻�',
   mobile               varchar(16) comment '�ֻ�',
   addr                 varchar(128) comment '�ͻ���ַ',
   type                 varchar(16) comment '����λ���в���,  char1 �򷽣�chart 2 ������ char 3LP  ��ѡ',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_customer comment '�ͻ�������Ϣ';

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
   item_name		    varchar(64),
   is_navy              int default 0,
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
   cust_id              int,
   type                 varchar(64) comment 'LP ����
            p2p����ҵ�ڸ߾�ֵ��Ⱥ��˽�����С������ʽ�',
   risk_prefer_desc     varchar(1024) comment '����ƫ������',
   expect_of_contrib    varchar(64) comment '��������',
   reward_of_contrib    varchar(512) comment '�����ر�����',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_lp comment '������';

/*==============================================================*/
/* Table: tbl_seller                                            */
/*==============================================================*/
create table tbl_seller
(
   id                   int not null auto_increment,
   cust_id              int,
   property_desc        varchar(2048) comment '�����ʲ�����',
   bad_property_desc    varchar(2048) comment '���������ʲ�����',
   class_1              varchar(128) comment '����, �ʲ�����˾,���޹�˾,����',
   class_2              varchar(128) comment '����:
            		���������������Ĵ�������С��ɷ�����ҵ���С��ط������С���Ӫ����
            	    �ʲ�����˾:
            		���������Ŵ��ʹܡ������ʹܡ������ʹܡ������ʹ�
            	    ���޹�˾:
            		��������������������޹�˾����������������޹�˾	
            	    ����
            		������ľ�ֱ����д	',
   class_3              varchar(512) comment 'ֱ����д',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_seller comment '����';

/*==============================================================*/
/* Table: tbl_user                                              */
/*==============================================================*/
create table tbl_user
(
   id                   int not null auto_increment,
   emp_no               varchar(32) comment '��Ա��',
   real_nm              varchar(64) comment '��ʵ����',
   gender               int comment '�Ա�',
   email                varchar(64) comment '�ʼ���ַ',
   mobile               varchar(16) comment '�ֻ�',
   fix_phone            varchar(16) comment '�̻�',
   id_card_no           varchar(32) comment '���֤����',
   enter_date           date comment '��˾����',
   left_date            date comment '��˾����',
   user_type            int comment '�û�����',
   sign_id              varchar(64) comment '��¼id',
   nick_nm              varchar(32) comment '�ǳ�',
   password             varchar(128) comment '��¼����',
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
   user_id              int,
   cust_id              int,
   visitor_type         int comment '�ݷÿͻ����������ͣ� �򷽣�������LP',
   visitor_id           int comment '���ɶ�Ӧ�����',
   start_dt             datetime comment '�ݷ���ʼ����ʱ��',
   end_dt               datetime comment '�ݷý�������ʱ��',
   content              varchar(1024) comment '�ݷ���־',
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);

alter table tbl_user__customer comment '�ݷÿͻ���¼
ע���ֶΣ� visitor_type -->�ݷõĿͻ�������ɶ��  �� -1 ������ -2 ';

/*==============================================================*/
/* Table: tbl_user__func                                        */
/*==============================================================*/
create table tbl_user__func
(
   id                   int not null auto_increment,
   user_id              int,
   func_id              int,
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (id)
);


/*==============================================================*/
/* Table: tbl_area                                              */
/*==============================================================*/
create table tbl_area
(
   seq                  int not null auto_increment,
   first_name           varchar(64),
   last_name            varchar(64),
   user_name            varchar(64),
   remark               varchar(256),
   crt_ts               timestamp default current_timestamp,
   upd_ts               timestamp,
   is_del               int default 0,
   primary key (seq)
);

