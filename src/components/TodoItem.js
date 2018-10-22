import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';

import '../styles/TodoItem.scss';

class TodoItem extends Component {
  state = {
    editing: false,
    text: '',
    date: '',
  }

  dateFormat = 'YYYY/MM/DD';

  handleTextChange = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  handleDateChange = (d) => {
    this.setState({
      date: d
    });
  }

  handleRemove = (e) => {
    this.props.onRemove();
    e.stopPropagation();
  }

  handlePress = (e) => {
    if(e.key === 'Enter') this.handleToggleEdit();
  }

  handleToggleCheck = (id) => {
    if(this.props.onDone(id)){
      this.textRef.classList.remove('done');
    }
    else {
      this.textRef.classList.add('done');
    }
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
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    const { editing } = this.state;
    const { text, date } = this.props.todo;

    return (
      <div>
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-header">
            {
              editing ? (
                <DatePicker 
                  className="uk-input"
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  dateFormat="YYYY/MM/DD"                  
                />
              ) : (
                <p>{date.format('YYYY/MM/DD')}</p>
              )
            }
          </div>
          <div className="uk-card-body">
            {
              editing ? (
                <Fragment>
                  <input
                    className="uk-input" 
                    placeholder="수정할 내용" 
                    onChange={this.handleTextChange}
                    onKeyPress={this.handlePress}
                    value={this.state.text}/> 
                </Fragment>
              ) : (
                <p
                  ref={(ref) => this.textRef = ref}
                  className="uk-text-large">
                  {text}
                </p>
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
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="check" onClick={this.handleToggleCheck}></button>
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