import program from "commander";
import { VERSION, HOME } from "./utils/constants";
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
 * sto commands
 * - config
 * - init
 */
let actionMap = {
  init: {
    description: "generate a new project from a template",
    usages: [`${cmdName} init templateName projectName`],
  },
  config: {
    alias: "cfg",
    description: `config ${rcFile.name}`,
    usages: [
      `${cmdName} config set <k> <v>`,
      `${cmdName} config get <k>`,
      `${cmdName} config remove <k>`,
    ],
  },
  //other commands
};

Object.keys(actionMap).forEach((action) => {
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias) //别名
    .action(() => {
      switch (action) {
        case "config":
          apply(action, ...process.argv.slice(3));
          break;
        case "init":
          apply(action, ...process.argv.slice(3));
          break;
        default:
          break;
      }
    });
});

function help() {
  console.log("\r\nUsage:");
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach((usage) => {
      console.log("  - " + usage);
    });
  });
  console.log("\r");
}

program.usage("<command> [options]");
program.on("-h", help);
program.on("--help", help);
program.version(VERSION, "-V --version").parse(process.argv);

// stex 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}

function make_green(txt) {
  return chalk.green(txt);
}
