import { version } from "../../package.json";
import { rcFile } from "../../project.config.json";

//当前 package.json 的版本号
export const VERSION = version;

// 用户的家目录
export const HOME =
  process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

// 配置文件目录
export const RC = `${HOME}/${rcFile.name}`;

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/ouyangsuo/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
export const DEFAULTS = {
  registry: rcFile.default.registry,
  type: rcFile.default.type,
};
