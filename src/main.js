// 终端执行工具
import commander from "commander";

import { VERSION, HOME } from "./utils/constants";

/* 引入中断命令解析器函数 */
import apply from "./index";

import chalk from "chalk";
import fs from "fs";
import path from "path";

/* 读入project.config.json中的配置 */
import { cmdName, rcFile } from "../project.config.json";

/* 写出rc文件 */
let rcContent = "";
for (let key in rcFile.default) {
  rcContent += `${key}=${rcFile.default[key]}\n`;
}
fs.writeFileSync(path.join(HOME, rcFile.name), rcContent);
console.log("===== rcFile completed =====");

/**
 * 定义命令速查表
 * sto commands
 * - config
 * - init
 */
let actionMap = {

  /* init命令配置 */
  init: {
    // init命令描述 终端：sto
    description: "generate a new project from a template",

    // init命令用法提示
    usages: [`${cmdName} init templateName projectName`],
  },

  /* config命令配置 */
  config: {
    // config别名
    alias: "cfg",

    // config 命令描述
    description: `config ${rcFile.name}`,

    // config 用法提示
    usages: [
      `${cmdName} config set <k> <v>`,
      `${cmdName} config get <k>`,
      `${cmdName} config remove <k>`,
    ],
  },

  //other commands
};

/* 派发命令给指定的处理器函数 */
Object.keys(actionMap).forEach((action) => {

  commander
    .command(action)//接收终端命令 init/config
    .description(actionMap[action].description)//添加命令描述
    .alias(actionMap[action].alias) //添加别名

    /* 定义命令的执行逻辑 */
    .action(() => {
      switch (action) {

        case "config":
          /* config真正的命令执行逻辑 */
          // sto config set key value
          // apply("config",key,value)
          apply(action, ...process.argv.slice(3));
          break;

        case "init":
          /* init真正的命令执行逻辑 */
          // sto init templateName projectName
          // apply("init",templateName projectName)
          apply(action, ...process.argv.slice(3));
          break;

        default:
          break;
      }
    });

});


/* sto --help */
function help() {
  console.log("\r\nUsage:");
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach((usage) => {
      console.log("  - " + usage);
    });
  });
  console.log("\r");
}

/* 定义命令的帮助信息 */
commander.usage("<command> [options]");

// sto -h 或 sto --help
commander.on("-h", help);
commander.on("--help", help);

// sto --version
commander.version(VERSION, "-V --version").parse(process.argv);

// sto init
// sto 不带参数时 对外输出帮助信息+文字绿色
if (!process.argv.slice(2).length) {
  commander.outputHelp(make_green);
}

/* 帮助信息绿色显示 */
function make_green(txt) {
  return chalk.green(txt);
}
