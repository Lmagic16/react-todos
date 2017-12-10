### 记录
- npm全局安装的模块放在 /usr/local/lib/node_modules/ 目录下
- 不要直接对state进行修改，例如数组的一些方法会直接修改原数组
- react-router4.*版本使用browerHistory的方法：[https://github.com/brickspert/blog/issues/3](https://github.com/brickspert/blog/issues/3)
- 安装history[https://github.com/ReactTraining/history](https://github.com/ReactTraining/history)
```
  const history = createHistory({
  forceRefresh: true,
})
```
这样可以方便使用history，但页面跳转时是自动刷新的；
- 事件函数的参数传递onClick={this.handleClick.bind(this,传递的参数)}

### 问题
- 划分组件时，由于各个组件之前是有联系的，即 可能相互传数据，如果把其纳入一个组件会减少组件间通信，但是又会让组件显得在UI上划分不合理。如何做一个平衡？

### 项目逻辑
1. 组件划分
2. 状态state考虑(涉及到页面数据展示和页面变化)  
1）页面展示的数据需要state来维护，即todo数组，数组每个对象会维护多个属性；   
2）页面task，completed，active图标和相关todolist的展示，可以用一个状态来维护，即classify，这样可以同时控制图标的展示和相应todolist的展示；      
3) 状态isAdd，表示是否新增todo，控制css类名变化，即控制页面的显示；  

### 踩坑
1. 描述：history.push之后页面路径会变化，但没有跳转。所以加了forceRefresh:true的初始化参数，强制每次路径变化刷新页面。这样页面就才会有刷新。   
解决方法：主要我之前采用的import { BrowserRouter as Router } 加 ```<Router></Router>```的方式，现在采用```<Router history={history}></Router>```这种方式，就可以默认跳转了。


