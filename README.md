### @概述
- 每当面试时被问到“有没有写过自己的脚手架”时，是不是尴尬了？
- 今天送大家一款超级好用的脚手架生成工具cli-creator；
- 下次记得轻描淡写地告诉面试官：“我也没写过特别多脚手架，不过我们公司几十个脚手架都是我写的工具生成的~”

### @源码地址
- [码云地址](https://gitee.com/steveouyang/cli-creator)
- [Github地址](https://github.com/ouyangsuo/cli-creator)

### @使用方式
#### 下载源码

```js
# 码云下载
git clone https://gitee.com/steveouyang/cli-creator.git

# github下载
git clone https://github.com/ouyangsuo/cli-creator.git
```
#### 安装依赖

```js
cd cli-creator
npm install
```
- 安装的最后会报错说某个命令找不到，无需理会，我们后续会注册该命令，也就是我们要造的脚手架了；

#### 配置要生成的脚手架信息
- 修改工程根目录的project.config.json

```js
{
    // 包名，应与package.json中包名相同，后续如果需要注销脚手架时会用到该包名
    "package": "cli-creator", 
    
    // 想要生成的脚手架名称/命令名称
    "cmdName": "sto",
    
    // 想要生成的默认配置文件信息 该文件会被生成在用户的家目录下
    "rcFile": {
        "name": ".storc",//文件名
        
        // 一些默认信息 后续可以通过sto config set key value的形式去修改
        "default": {
            // 重要！！github账号，用于下载项目的模板代码
            "registry": "ouyangsuo", 
            
            // 一些自定义的其它信息
            "type": "users",
            "author": "steveouyang"
        }
    },
    
    // 重要！！
    // 模板名称是自己github账号下的一个工程（也就是我们要使用的模板代码了）
    // value是该模板的描述信息，给自己看的
    "templates": {
        "mongo-expresser": "express+mongodb服务端代码生成器", //事实存在
        "vue-client": "vue3+vueRouter+vuex+vant移动端项目", //暂时不存在
        "vue-manager": "vue3+vueRouter+vuex+element中后台项目", //暂时不存在
        "vue-uniapp": "vue3+uniapp小程序项目" //暂时不存在
    }
}
```

#### 编译工程
```js
npm run compile
```
- 编译完成后会在src的同级生成`dist`目录，这是稍后实际运行的代码
- 同时还会在用户的家目录下生成默认配置存储文件，本例中为`.storc`
- 通过`sto config get xxx`能读取到当前的一些配置信息

#### 注册CMD命令
```js
npm link
```
- 在cli-creator下注册则局部有效，否则全局有效

#### 注销CMD命令
- 将来不想用时可在任意位置输入以下命令予以注销

```js
npm unlink -g <cli-creator或自定义的包名>
```

### @功能清单
#### 根据指定模板创建工程

```js
sto init <模板名称/对应自己在github中的模板仓库名> <项目名称>

# 实例：快速创建生成一个所有模块CRUD接口齐全的服务端工程
sto init mongo-expresser myserver
```
#### 读写配置信息

```js
sto config set <key> <value>
sto config get <key>

# 实例
sto config set registry steveouyang // 编辑配置
sto config get registry // 查询配置
sto config remove registry // 移除配置
```

#### 帮助信息

```js
sto
sto -h
sto --help
```

### @运行效果

![Video_2022-11-15_054020 00_00_00-00_00_30.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a85790d8a44a4d65ad4fe31bd42d0471~tplv-k3u1fbpfcp-watermark.image?)

### The Lanisters Send their Regards

**勿忘码农三连哦：star! follow! fork!**

  🚀🚀🚀 [🤪](https://emojipedia.org/zany-face/)[🤪](https://emojipedia.org/zany-face/)[🤪](https://emojipedia.org/zany-face/)