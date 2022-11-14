"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = exports.RC = exports.HOME = exports.VERSION = undefined;

var _package = require("../../package.json");

var _projectConfig = require("../../project.config.json");

//当前 package.json 的版本号
var VERSION = exports.VERSION = _package.version;

// 用户的家目录
var HOME = exports.HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

// 配置文件目录
var RC = exports.RC = HOME + "/" + _projectConfig.rcFile.name;

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/ouyangsuo/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
var DEFAULTS = exports.DEFAULTS = {
  registry: _projectConfig.rcFile.default.registry,
  type: _projectConfig.rcFile.default.type
};