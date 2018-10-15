import React, { Component, Fragment } from 'react';

import '../styles/TodoItem.scss';

class TodoItem extends Component {
  state = {
    editing: false,
    text: '',
    date: '',
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  handleRemove = (e) => {
    const { onRemove } = this.props;
    onRemove();
    e.stopPropagation();
  }

  handlePress = (e) => {
    if(e.key === 'Enter') this.handleToggleEdit();
  }
  
  handleToggle = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  handleToggleEdit = () => {
    const{ todo, onUpdate } = this.props;
    
    if(this.state.editing) {
      onUpdate(todo.id, {
        text: this.state.text,
        date: this.state.date
      });
    }
    else {
      this.setState({
        text: todo.text,
        date: todo.date
      });
    }
    this.handleToggle();
  }

  render() {
    const { editing } = this.state;
    const { text, date } = this.props.todo;
    return (
      <div>
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-header">
            <p>{date}</p>
          </div>
          <div className="uk-card-body">
            {
              editing ? (
                <Fragment>
                  <input
                    className="uk-input" 
                    placeholder="수정할 내용" 
                    onChange={this.handleChange}
                    onKeyPress={this.handlePress}
                    value={this.state.text}/> 
                </Fragment>
              ) : (
                <p className="uk-text-large">{text}</p>
              )
            }
          </div>               
          <div className="uk-card-footer">
            {
              editing ? (
                <Fragment>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="close" onClick={this.handleToggle}></button>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="paint-bucket" onClick={()=>{alert('기능 준비중입니다.')}}></button>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="check" onClick={this.handleToggleEdit}></button>
                </Fragment>
              ) : (
                <Fragment>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="check" onClick={()=>{alert('기능 준비중입니다.')}}></button>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="bolt" onClick={()=>{alert('기능 준비중입니다.')}}></button>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="file-edit" onClick={this.handleToggleEdit}></button>
                  <button className="uk-icon-link" uk-icon="trash" onClick={this.handleRemove}></button>
                </Fragment>
              )}
          </div>
        </div>
      </div>        
    );
  }
}

export default TodoItem;