import { getAll } from "./rc";
import downloadGit from "download-git-repo";

import { templates } from "../../project.config.json";

export const downloadLocal = async (templateName, projectName) => {
  let config = await getAll();
  let api = `${config.registry}/${templateName}`;
  
  console.log();
  console.log(`开始下载[${templates[templateName]}] from`, api);

  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
