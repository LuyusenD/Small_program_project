-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet
-- Create the new database if it does not exist already

SET NAMES UTF8;
DROP DATABASE IF EXISTS smallsql;
CREATE DATABASE smallsql CHARSET=UTF8;

USE smallsql;

CREATE TABLE `user` (
  `openId` varchar(128) NOT NULL COMMENT '唯一标示',
  `img` varchar(128) NOT NULL COMMENT '头像',
  `name` varchar(8) NOT NULL COMMENT '用户名',
  `sex` int(1) NOT NULL COMMENT '性别',
  `address` varchar(64) NOT NULL COMMENT '地址'
);

CREATE TABLE `the_order` (
  `id` int NOT NULL COMMENT '编号' PRIMARY KEY AUTO_INCREMENT,
  `oId` varchar(128) NOT NULL COMMENT '订单编号',
  `oName` varchar(8) NOT NULL COMMENT '姓名',
  `oTel` int(11) NOT NULL COMMENT '联系方式',
  `oAddress` varchar(64) NOT NULL COMMENT '地址',
  `createTime` int(10) NOT NULL COMMENT '创建时间',
  `deleteTime` int(10) NOT NULL COMMENT '订单取消时间',
  `oType` int(1) NOT NULL COMMENT '订单类型',
  `oStart` int(1) NOT NULL COMMENT '订单状态',
  `oTime` int(10) NOT NULL COMMENT '预约时间',
  `oRemark` varchar(128) NOT NULL COMMENT '备注',
  `openId` varchar(128) NOT NULL COMMENT '唯一标示'
);

CREATE TABLE `serve` (
  `id` INT NOT NULL COMMENT '编号' PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(8) NOT NULL COMMENT '服务名称'
);

INSERT INTO `serve` (`name`) VALUES
('机场接送'),
('家具安装'),
('清洁服务'),
('搬家');