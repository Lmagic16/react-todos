import * as React from 'react';
import './App.css';
import AddTodo from './component/AddTodo';
import TodoDetail from './component/TodoDetail';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

interface HeaderPropsType {
  changeStateisAdd: {(isAddState: boolean): void};
}

class Header extends React.Component<HeaderPropsType, object> {
  changeStateisAdd(isAddState: boolean) {
    this.props.changeStateisAdd(isAddState);
  }
  render() {
    return (
      <header className="App-header">
        <span className="App-title">My Todos</span>
        <span
          className="fa fa-plus" 
          aria-hidden="true"
          onClick={this.changeStateisAdd.bind(this, true)}
        />
      </header>
    );
  }
}

interface BottomPropsType {
  classify: string;
  changeClassify: {(whichClassify: string): void};
}

class Bottom extends React.Component<BottomPropsType, object> {
  changeClassify(whichClassify: string) {
    this.props.changeClassify(whichClassify);
    history.push('/todos');
  }
  render() {
    const classify = this.props.classify;
    return (
      <div className="App-classify">
        <div className="App-all" onClick={this.changeClassify.bind(this, 'all')}>
          <span className={`fa fa-tasks${classify === 'all' ? ' isShow' : ''}`} aria-hidden="true" />
        </div>
        <div className="App-active" onClick={this.changeClassify.bind(this, 'completed')}>
          <span className={`fa fa-check-circle${classify === 'completed' ? ' isShow' : ''}`} aria-hidden="true" />
        </div>
        <div className="App-completed" onClick={this.changeClassify.bind(this, 'active')}>
          <span className={`fa fa-clock-o${classify === 'active' ? ' isShow' : ''}`} aria-hidden="true" />
        </div>
      </div>
    );
  }
}

interface TodosPropsType {
  classify: string;
  todos: itemType[];
  handleTodoItem?: {(item: object): void};
}

type itemType = {
  id: number;
  name: string;
  state: string;
  details: string;
  createTime: string;
  completedTime: string;
  thought: string;
};

class Todos extends React.Component<TodosPropsType, object> {
  handleClick(item: itemType) {
    if (this.props.handleTodoItem) {
      this.props.handleTodoItem(item);
      history.push('/todoDetail');
    }
  }
  render() {
    const classify = this.props.classify;
    const allTodos = this.props.todos;
    let showTodos = allTodos;
    if (classify === 'completed') {
      showTodos = allTodos.filter((item: itemType) => (
        item.state === 'completed'
      ));
    } else if (classify === 'active') {
      showTodos = allTodos.filter((item: itemType) => (
        item.state === 'active'
      ));
    }
    let todolist = showTodos.map((item: itemType) => {
      return (
        <div className="item-container" key={item.id} onClick={this.handleClick.bind(this, item)}>
          <span>{item.name}</span>
          <span className="item-createtime">{item.createTime}</span>
          <span className={`fa item-state${item.state === 'active' ? ' fa-clock-o' : ' fa-check-square-o'}`} aria-hidden="true"/>
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

interface AppStateType {
  classify: string;
  isAdd: boolean;
  detailItem: itemType;
  todos: itemType[];
}

class App extends React.Component<{}, AppStateType> {
  constructor(props: object) {
    super(props);
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
      detailItem: {
        id: 0,
        name: '',
        state: '',
        details: '',
        createTime: '',
        completedTime: '',
        thought: '',
      },
      todos: [
        {
          id: 1,
          name: '学习react',
          state: 'active',
          details: 'do todolist',
          createTime: '2017/12/10 上午10:25:53',
          completedTime: '',
          thought: '',
        },
        {
          id: 2,
          name: '洗衣服',
          state: 'active',
          details: 'own things',
          createTime: '2017/12/09 下午05:22:33',
          completedTime: '',
          thought: '',
        },
        {
          id: 3,
          name: '煮饭',
          state: 'completed',
          details: 'do todolist',
          createTime: '2017/12/10 上午09:21:08',
          completedTime: '2017/12/11 上午09:50:13',
          thought: 'done well',
        }
      ]
    };
  }
  resetClassify(whichClassify: string) {
    this.setState({
      classify: whichClassify,
    });
  }
  changeStateisAdd(isAddState: boolean) {
    this.setState({
      isAdd: isAddState,
    });
  }
  addTodo(newTask: itemType) {
    let newTodos = this.state.todos.slice(0);
    newTodos.unshift(newTask);
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos)); /* 更新本地存储 */
  }
  handleTodoItem(item: itemType) {
    this.setState({
      detailItem: item,
    });
  }
  handleDone(item: itemType, thought: string) {
    let newTodos = this.state.todos.slice(0);
    const time = new Date().toLocaleString();
    newTodos.forEach((todo: itemType) => {
      if (todo.id === item.id) {
        todo.state = 'completed';
        todo.thought = thought;
        todo.completedTime = time;
      }
    });
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos)); /* 更新本地存储 */
    history.push('/todos');
  }
  handleUndo(item: itemType) {
    let newTodos = this.state.todos.slice(0);
    newTodos.forEach((todo: itemType) => {
      if (todo.id === item.id) {
        todo.state = 'active';
      }
    });
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos)); /* 更新本地存储 */
    history.push('/todos');
  }
  handleDelete(item: itemType) {
    let tempTodos = this.state.todos.slice(0);
    let newTodos = tempTodos.filter((todo: itemType) => {
      return todo.id !== item.id;
    });
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem('reactTodos', JSON.stringify(newTodos)); /* 更新本地存储 */
    history.push('/todos');
  }
  componentDidMount() {
    const todos = this.state.todos;
    if (!localStorage.getItem('reactTodos')) {/* 检查本地存储 */
      localStorage.setItem('reactTodos', JSON.stringify(todos));
    } else {
      let tempStorageItem = localStorage.getItem('reactTodos');
      if (tempStorageItem) {
        const storeTodos = JSON.parse(tempStorageItem);
        this.setState({
          todos: storeTodos,
        });
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Header changeStateisAdd={this.changeStateisAdd} />
        <Router history={history}>
          <Switch>
            <Route 
              exact={true}
              path="/" 
              render={(props) => (
                <Todos {...props} todos={this.state.todos} classify={this.state.classify} handleTodoItem={this.handleTodoItem} />
              )}
            />
            <Route 
              path="/todos" 
              render={(props) => (
                <Todos {...props} todos={this.state.todos} classify={this.state.classify} handleTodoItem={this.handleTodoItem}/>
              )} 
            />
            <Route 
              path="/todoDetail" 
              render={(props) => (
                <TodoDetail 
                  {...props}
                  item={this.state.detailItem} 
                  handleDone={this.handleDone} 
                  handleUndo={this.handleUndo} 
                  handleDelete={this.handleDelete}
                />
              )} 
            />
          </Switch>
        </Router>
        <Bottom classify={this.state.classify} changeClassify={this.resetClassify} />
        <AddTodo isAdd={this.state.isAdd} changeStateisAdd={this.changeStateisAdd} addTodo={this.addTodo}/>
      </div>
    );
  }
}

export default App;
