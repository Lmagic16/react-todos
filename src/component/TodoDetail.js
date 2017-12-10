import React, { Component } from 'react';
import './TodoDetail.css';


class TodoDetail extends Component {
  handleDone(item) {
    this.props.handleDone(item);
  }
  handleUndo(item) {
    this.props.handleUndo(item);
  }
  render() {
    const item = this.props.item;
    const activeItem = (
      <div className="TodoDetail">
        <div className="TodoDetail-title">
          <span className="TodoDetail-name">{item.name}</span>
          <span className="TodoDetail-time">{item.createTime}</span>
        </div>
        <hr />
        <div className="TodoDetail-descrip">
          {item.details}
        </div>
        <div className="TodoDetail-state">
          State: <span className="fa fa-clock-o" aria-hidden="true"></span>
        </div>
        <div className="TodoDetail-thought">
          <div>Thought: </div>
          <textarea className="TodoDetail-textarea"></textarea>
        </div>
        <button className="TodoDetail-done" onClick={this.handleDone.bind(this,item)}>Done</button>
      </div>
    );
    const completedItem = (
      <div className="TodoDetail">
        <div className="TodoDetail-title">
          <span className="TodoDetail-name">{item.name}</span>
          <span className="TodoDetail-time">{item.createTime}</span>
        </div>
        <hr />
        <div className="TodoDetail-descrip">
          {item.details}
        </div>
        <div className="TodoDetail-state">
          State: <span className="fa fa-check-circle" aria-hidden="true"></span>
        </div>
        <div className="TodoDetail-thought">
          <span>Thought: </span>
          <span className="TodoDetail-thoughtText">{item.thought}</span>
        </div>
        <button className="TodoDetail-done" onClick={this.handleUndo.bind(this,item)}>Undo</button>
      </div>
    );
    if(item.state === 'completed') {
      return completedItem;
    }
    return activeItem;
  }
}

export default TodoDetail;
