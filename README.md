## TypeScript练手项目 ts-react-todo
用 TypeScript 改写 react-todo 项目
### 所用技术
框架：React
语言：JavaScript、TypeScript（类型约束）
路由：react-router@V4
图标：font-awesome

### 项目结构
```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx        //主页面
│   ├── component
│   │   ├── AddTodo.css
│   │   ├── AddTodo.tsx         //新增todo组件
│   │   ├── TodoDetail.css
│   │   └── TodoDetail.tsx     //todo详情组件
│   ├── index.css
│   ├── index.tsx       //页面入口
│   └── registerServiceWorker.ts
├── tsconfig.json
├── tsconfig.test.json
├── tslint.json
└── yarn.lock

```
## 如何运行

### 安装
$npm install

### 启动
$npm start

### 项目详情
见项目react-todo

### ts记录
- 开发环境下需要安装相关@types包，例如：`$ npm install @types/react --save-dev`
- 根组件 ReactDOM render时需要 `document.getElementById('root') as HTMLElement`
- 组件类型约束：需要对react组件传入的props和自身state状态做类型约束，`class Header extends React.Component<HeaderPropsType, HeaderstateType> `，其中HeaderPropsType 是该组件prop的接口, HeaderstateType 是该组件state的接口。
- 函数、变量类型约束
- 事件event约束，例如`event: React.ChangeEvent<HTMLTextAreaElement>)`，HTMLTextAreaElement为对应html元素类型
- `JSON.parse(localStorage.getItem('reactTodos'));`，会报错[ts]
类型“string | null”的参数不能赋给类型“string”的参数。不能将类型“null”分配给类型“string”。可以利用if()域内类型保护。