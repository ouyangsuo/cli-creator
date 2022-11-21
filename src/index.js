/* 
派发init命令给init.js 
派发config命令给config.js 
*/

// sto init vue-manager mymanager
let apply = (action, ...args) => {
    // 找到init.js导出的处理器函数 调用之
    // init("vue-manager","mymanager")
    require(`./${action}`)(...args);
};

export default apply;