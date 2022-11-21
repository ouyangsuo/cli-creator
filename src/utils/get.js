import { getAll } from "./rc";
import downloadGit from "download-git-repo";

import { templates } from "../../project.config.json";

export const downloadLocal = async (templateName, projectName) => {

  let config = await getAll();

  // baseUrl就是github.com 后续内容ouyangsuo/vue-manager
  let api = `${config.registry}/${templateName}`;
  
  console.log();
  console.log(`开始下载[${templates[templateName]}] from`, api);

  return new Promise((resolve, reject) => {
    // 根据配置好的api地址从github上下载模板代码存储在projectName命名的路径下
    downloadGit(api, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
  
};
