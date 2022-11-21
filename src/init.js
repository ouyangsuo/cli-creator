import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

/* init命令的执行逻辑 下载templateName对应的代码到本地 + 修改目录名称为projectName */
let init = async (templateName, projectName) => {

    //项目不存在
    if (!fs.existsSync(projectName)) {

        //命令行询问器
        inquirer.prompt([
            // 要求用户输入项目描述 将来写入package.json中description字段
            {
                name: 'description',
                message: 'Please enter the project description: '
            },
            {
                name: 'author',
                message: 'Please enter the author name: '
            }
        ])
        
        /* 用户输入完毕以后执行下载 */
        .then(async (answer) => {
            //下载模板 选择模板
            //通过配置文件，获取模板信息
            let loading = ora('🚀🚀 downloading template ...');
            loading.start();

            /* 下载templateName对应的代码到本地 + 修改目录名称为projectName */
            downloadLocal(templateName, projectName)
            
            // 下载完毕
            .then(() => {
                // 标记下载成功
                loading.succeed();

                // 准备写出myserver/package.json
                const fileName = `${projectName}/package.json`;

                // 如果myserver/package.json已经存在
                if(fs.existsSync(fileName)){

                    // 读入本来数据
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    
                    /* 修改package.json中的数据 */
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    
                    // 修改项目文件夹中package.json文件 + 成功提示
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                }

            }, () => {
                loading.fail();
            });

        });

    }
    
    else {
        //项目已经存在
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}

module.exports = init;