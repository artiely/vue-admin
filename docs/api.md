# api 使用说明

目录结构

```bash
│  base-url.js
│  error-handler.js
│  fetch.js
│  index.js
│  tree.txt
│
└─modules
        auth.js

```

可以在 api/modules/下穿件任意.js 文件作为模块

# 如何定义一个接口

```js
// 最简洁的示例
export const LOGIN = {
  url: 'login',
  method: 'post',
}

// 全部参数示例
export const LOGIN = {
  url: 'login',
  method: 'post',
  // 接口的默认值一般用不到
   // __noCancel该字段为true表示 该请求任何情况不会被关闭
  // 不填写该字段同一时间段多次的请求只会以最后的一次请求为准，前面的请求会被关闭
  // 值得注意的是这里的关闭并不是取消了请求发送，服务器会照常接收到请求，只是axios没有处理结果，详情见axios文档
  // __noCancel也可以在调用的时候传入 见下
  defaultData:{
    __noCancel:true,
  },
  // 接口的备注信息
  __remark: '登录',
  // 接口的参数信息
  __argus:{
    code:'',
    username:'',
    password:''
  }
}
```

以`__`开头的参数用于接口管理调试非必须

# 如何使用

```js
// vue中
this.$api.LOGIN({ code: "", username: "15926290460", password: "",__noCancel:true });
// js中
import { api } from "@/api";
api.LOGIN({ code: "", username: "15926290460", password: "" });
```
