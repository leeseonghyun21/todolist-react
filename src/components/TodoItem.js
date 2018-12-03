import React, { Component, Fragment } from 'react';

import DatePicker from 'react-datepicker';
import { CirclePicker } from 'react-color';

import '../styles/TodoItem.scss';

class TodoItem extends Component {
  state = {
    displayColorPicker: false,
    editing: false,
    isUrgent: false,
    text: '',
    date: '',
    color: '#000'
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
  
  handleColorChange = (color) => {
    this.setState({
      color: color.hex
    });
  };
  
  handleColorClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };
  
  handleClose = () => {
    this.setState({
      displayColorPicker: false
    });
  };
  
  
  handleRemove = (e) => {
    this.props.onRemove();
    e.stopPropagation();
  }
  
  handlePress = (e) => {
    if(e.key === 'Enter') this.handleToggleEdit();
  }

  handleToggleUrgent = () => {
    const { isUrgent } = this.state;
    console.log('isUrgent = ' + isUrgent);
    if(isUrgent) {
      this.cardRef.classList.remove('urgent');
      this.setState({
        isUrgent: !isUrgent
      });
      
    } else {
      this.cardRef.classList.add('urgent');
      this.setState({
        isUrgent: !isUrgent
      });
    }
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
    
    this.setState({
      editing: !this.state.editing
    });
    
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
  }
  
  render() {
    const { editing, displayColorPicker } = this.state;
    const { text, date, color } = this.props.todo;
    const colorbox ={
      width: '30px',
      height: '20px',
      borderRadius: '2px',
      background: color
    };
    
    return (
      <div>
        <div 
          className="uk-card uk-card-default uk-card-hover"
          ref={(ref) => {this.cardRef = ref}}>
          <div className="uk-card-header">
            <div className="uk-grid uk-flex">
              {
                editing ? (
                  <Fragment>
                    <DatePicker 
                      className="uk-input uk-form-small"
                      selected={this.state.date}
                      onChange={this.handleDateChange}
                      dateFormat="YYYY/MM/DD"                  
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="uk-width-auto">
                      <p>{date.format('YYYY/MM/DD')}</p>
                    </div>
                  </Fragment>
                )
              }
              <div className="uk-width-expand uk-text-right">
                <div style={colorbox} className="uk-inline colorbox" onClick={this.handleColorClick}></div>
                { 
                  (editing && displayColorPicker) ? 
                    <div className="popover">
                      <div className="cover"/>
                      <CirclePicker color={ this.state.color } onChange={this.handleColorChange} onChangeComplete={this.handleClose} />
                    </div> : 
                    null 
                }
              </div>
            </div>
          </div>
          <div className="uk-card-body">
            {
              editing ? (
                <Fragment>
                  <textarea
                    className="uk-textarea uk-form-small" 
                    placeholder="수정할 내용" 
                    onChange={this.handleTextChange}
                    onKeyPress={this.handlePress}
                    value={this.state.text}
                  /> 
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
                  <button 
                    className="uk-icon-link uk-margin-medium-right"
                    uk-icon="close" 
                    onClick={() => {this.setState({ editing: !this.state.editing})}}></button>
                  <div className="uk-inline">
                    
                  </div>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="check" onClick={this.handleToggleEdit}></button>
                </Fragment>
              ) : (
                <Fragment>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="check" onClick={this.handleToggleCheck}></button>
                  <button className="uk-icon-link uk-margin-medium-right" uk-icon="bolt" onClick={this.handleToggleUrgent}></button>
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