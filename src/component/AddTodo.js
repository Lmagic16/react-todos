import React, { Component } from 'react';
import './AddTodo.css';


class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      descrip:'',
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescripChange = this.handleDescripChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeStateisAdd(isAddState) {
    this.props.changeStateisAdd(isAddState);
  }
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleDescripChange(event) {
    this.setState({descrip: event.target.value});
  }
  handleSubmit() {
    if(this.state.name === '') {
      alert('please input the task name.');
    }else{
      let currentDate = new Date();
      let newTask = {
        id: currentDate.getTime(),
        name: this.state.name,
        state: 'active',
        details: this.state.descrip,
        createTime: currentDate.toLocaleString(),
        completedTime: '',
      }
      this.props.addTodo(newTask);
      this.changeStateisAdd.bind(this,false)();
    }
  }
  render() {
    return (
      <div className={`AddTodo${this.props.isAdd ? ' isShow' : ' noShow'}`}>
        <div className="AddTodo-Box">
          <p className="AddTodo-title">Add Task</p>
          <div className="AddTodo-inputdiv">
            <label className="AddTodo-label">name:</label>
            <input className="AddTodo-input" type="text" value={this.state.name} onChange={this.handleNameChange}></input>
          </div>
          <div className="AddTodo-inputdiv">
            <label className="AddTodo-label">descrip:</label>
            <textarea className="AddTodo-textarea" type="text" value={this.state.descrip} onChange={this.handleDescripChange}></textarea>
          </div>
          <button className="AddTodo-submit" onClick={this.handleSubmit}>Submit</button>
          <span className="fa fa-times" onClick={this.changeStateisAdd.bind(this,false)}></span>
        </div>
      </div>
    );
  }
}

export default AddTodo;
