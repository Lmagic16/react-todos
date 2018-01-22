import * as React from 'react';
import './AddTodo.css';

type itemType = {
  id: number;
  name: string;
  state: string;
  details: string;
  createTime: string;
  completedTime: string;
  thought: string;
};

interface AddTodoPropsType {
  isAdd: boolean;
  changeStateisAdd: {(isAddState: boolean): void};
  addTodo: {(item: itemType): void};
}

interface AddTodoStateType {
  name: string;
  descrip: string;
}

class AddTodo extends React.Component<AddTodoPropsType, AddTodoStateType> {
  constructor(props: AddTodoPropsType) {
    super(props);
    this.state = {
      name: '',
      descrip: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescripChange = this.handleDescripChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeStateisAdd(isAddState: boolean) {
    this.props.changeStateisAdd(isAddState);
  }
  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({name: event.target.value});
  }
  handleDescripChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({descrip: event.target.value});
  }
  handleSubmit() {
    if (this.state.name === '') {
      alert('please input the task name.');
    } else {
      let currentDate = new Date();
      let newTask: itemType = {
        id: currentDate.getTime(),
        name: this.state.name,
        state: 'active',
        details: this.state.descrip,
        createTime: currentDate.toLocaleString(),
        completedTime: '',
        thought: ''
      };
      this.props.addTodo(newTask);
      this.changeStateisAdd.bind(this, false)();
    }
  }
  render() {
    return (
      <div className={`AddTodo${this.props.isAdd ? ' isShow' : ' noShow'}`}>
        <div className="AddTodo-Box">
          <p className="AddTodo-title">Add Task</p>
          <div className="AddTodo-inputdiv">
            <label className="AddTodo-label">name:</label>
            <input className="AddTodo-input" type="text" value={this.state.name} onChange={this.handleNameChange}/>
          </div>
          <div className="AddTodo-inputdiv">
            <label className="AddTodo-label">descrip:</label>
            <textarea className="AddTodo-textarea" data-type="text" value={this.state.descrip} onChange={this.handleDescripChange}/>
          </div>
          <button className="AddTodo-submit" onClick={this.handleSubmit}>Submit</button>
          <span className="fa fa-times" onClick={this.changeStateisAdd.bind(this, false)} />
        </div>
      </div>
    );
  }
}

export default AddTodo;
