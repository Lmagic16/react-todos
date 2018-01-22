import * as React from 'react';
import './TodoDetail.css';

type itemType = {
  id: number;
  name: string;
  state: string;
  details: string;
  createTime: string;
  completedTime: string;
  thought: string;
};

interface TodoDetailPropsType {
  item: itemType;
  handleDone: {(item: itemType, thought: string): void};
  handleUndo: {(item: itemType): void};
  handleDelete: {(item: itemType): void};
}

interface TodoDetailStateType {
  thought: string;
}

class TodoDetail extends React.Component<TodoDetailPropsType, TodoDetailStateType> {
  constructor(props: TodoDetailPropsType) {
    super(props);
    this.state = {
      thought: '',
    };
    this.handleThoughtChange = this.handleThoughtChange.bind(this);
  }
  handleDone(item: itemType, thought: string) {
    this.props.handleDone(item, thought);
  }
  handleUndo(item: itemType) {
    this.props.handleUndo(item);
  }
  handleThoughtChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      thought: event.target.value,
    });
  }
  handleDelete(item: itemType) {
    this.props.handleDelete(item);
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
          State: <span className="fa fa-clock-o" aria-hidden="true"/>
        </div>
        <div className="TodoDetail-thought">
          <div>Thought: </div>
          <textarea className="TodoDetail-textarea" data-type="text" value={this.state.thought} onChange={this.handleThoughtChange}/>
        </div>
        <button className="TodoDetail-done" onClick={this.handleDone.bind(this, item, this.state.thought)}>Done</button>
        <button className="TodoDetail-delete" onClick={this.handleDelete.bind(this, item)}>Delete</button>
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
          State: <span className="fa fa-check-square-o" aria-hidden="true"/>
        </div>
        <div className="TodoDetail-thought">
          <span>Thought: </span>
          <span className="TodoDetail-thoughtText">{item.thought}</span>
        </div>
        <div className="TodoDetail-completedTime">
          <span>Completed Time: </span>
          <span className="TodoDetail-completedTimeText">{item.completedTime}</span>
        </div>
        <button className="TodoDetail-done" onClick={this.handleUndo.bind(this, item)}>Undo</button>
        <button className="TodoDetail-delete" onClick={this.handleDelete.bind(this, item)}>Delete</button>
      </div>
    );
    if (item.state === 'completed') {
      return completedItem;
    }
    return activeItem;
  }
}

export default TodoDetail;
