import React, { Component } from 'react';
import './App.css';
import AddTodo from './component/AddTodo.js';
import TodoDetail from './component/TodoDetail.js';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class Header extends Component {
  changeStateisAdd(isAddState) {
    this.props.changeStateisAdd(isAddState);
  }
  render() {
    return (
      <header className="App-header">
        <span className="App-title">My Todos</span>
        <span className="fa fa-plus" aria-hidden="true"
          onClick={this.changeStateisAdd.bind(this,true)}
        ></span>
      </header>
    );
  }
}

class Bottom extends Component {
  changeClassify(whichClassify) {
    this.props.changeClassify(whichClassify);
    history.push('/todos');
  }
  render() {
    const classify = this.props.classify;
    return (
      <div className="App-classify">
        <div className="App-all" onClick={this.changeClassify.bind(this,'all')}>
          <span className={`fa fa-tasks${classify === 'all' ? ' isShow' : ''}`} aria-hidden="true"></span>
        </div>
        <div className="App-active" onClick={this.changeClassify.bind(this,'completed')}>
          <span className={`fa fa-check-circle${classify === 'completed' ? ' isShow' : ''}`} aria-hidden="true"></span>
        </div>
        <div className="App-completed" onClick={this.changeClassify.bind(this,'active')}>
          <span className={`fa fa-clock-o${classify === 'active' ? ' isShow' : ''}`} aria-hidden="true"></span>
        </div>
      </div>
    );
  }
}

class Todos extends Component {
  handleClick(item) {
    this.props.handleTodoItem(item);
    history.push('/todoDetail');
  }
  render() {
    const classify = this.props.classify;
    const allTodos = this.props.todos;
    let showTodos = allTodos;
    if(classify === 'completed') {
      showTodos = allTodos.filter((item) => (
        item.state === 'completed'
      ));
    }else if(classify === 'active') {
      showTodos = allTodos.filter((item) => (
        item.state === 'active'
      ));
    }
    let todolist = showTodos.map((item) => {
      return (
        <div className="item-container" key={item.id} to="/detail" onClick={this.handleClick.bind(this,item)}>
          <span>{item.name}</span>
          <span className="item-createtime">{item.createTime}</span>
          <span className={`fa item-state${item.state === 'active' ? ' fa-clock-o' : ' fa-check-square-o'}`} aria-hidden="true"></span>
        </div>
      );
    });
    return (
      <div className="App-todos">
        {todolist}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.resetClassify = this.resetClassify.bind(this);
    this.changeStateisAdd = this.changeStateisAdd.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleTodoItem = this.handleTodoItem.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      classify: 'all',
      isAdd: false,
      detailItem:'',
      todos: [
        {
          id: '创1',
          name: '学习react',
          state: 'active',
          details: 'do todolist',
          createTime: '2017/12/10 上午10:25:53',
          completedTime: '',
          thought:'',
        },
        {
          id: '2',
          name: '洗衣服',
          state: 'active',
          details: 'own things',
          createTime: '2017/12/09 下午05:22:33',
          completedTime: '',
          thought:'',
        },
        {
          id: '3',
          name: '煮饭',
          state: 'completed',
          details: 'do todolist',
          createTime: '2017/12/10 上午09:21:08',
          completedTime: '2017/12/11 上午09:50:13',
          thought:'done well',
        }
      ]
    }
  }
  resetClassify(whichClassify) {
    this.setState({
      classify: whichClassify,
    });
  }
  changeStateisAdd(isAddState) {
    this.setState({
      isAdd: isAddState,
    });
  }
  addTodo(newTask) {
    let newTodos = this.state.todos.slice(0);
    newTodos.unshift(newTask);
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos));/* 更新本地存储 */
  }
  handleTodoItem(item) {
    this.setState({
      detailItem: item,
    });
  }
  handleDone(item,thought) {
    let newTodos = this.state.todos.slice(0);
    const time = new Date().toLocaleString();
    newTodos.forEach((todo) => {
      if(todo.id === item.id) {
        todo.state = 'completed';
        todo.thought = thought;
        todo.completedTime = time;
      }
    });
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos));/* 更新本地存储 */
    history.push('/todos');
  }
  handleUndo(item) {
    let newTodos = this.state.todos.slice(0);
    newTodos.forEach((todo) => {
      if(todo.id === item.id) {
        todo.state = 'active';
      }
    });
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos));/* 更新本地存储 */
    history.push('/todos');
  }
  handleDelete(item) {
    let tempTodos = this.state.todos.slice(0);
    let newTodos = tempTodos.filter((todo) => {
      return todo.id !== item.id;
    });
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos));/* 更新本地存储 */
    history.push('/todos');
  }
  componentDidMount() {
    const todos = this.state.todos;
    if(!localStorage.getItem('reactTodos')) {/* 检查本地存储 */
      localStorage.setItem('reactTodos', JSON.stringify(todos));
    }else{
      const storeTodos = JSON.parse(localStorage.getItem('reactTodos'));
      this.setState({
        todos:storeTodos,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Header changeStateisAdd={this.changeStateisAdd} />
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={(props) => (
              <Todos {...props} todos={this.state.todos} classify={this.state.classify} handleTodoItem={this.handleTodoItem} ></Todos>
            )} />
            <Route path="/todos" render={(props) => (
              <Todos {...props} todos={this.state.todos} classify={this.state.classify} ></Todos>
            )} />
            <Route path="/todoDetail" render={(props) => (
              <TodoDetail {...props} item={this.state.detailItem} handleDone={this.handleDone}
                handleUndo={this.handleUndo} handleDelete={this.handleDelete}
              ></TodoDetail>
            )} />
          </Switch>
        </Router>
        <Bottom classify={this.state.classify} changeClassify={this.resetClassify} />
        <AddTodo isAdd={this.state.isAdd} changeStateisAdd={this.changeStateisAdd} addTodo={this.addTodo}/>
      </div>
    );
  }
}

export default App;

//<Todos todos={this.state.todos} classify={this.state.classify} />
