import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import 'react-datepicker/dist/react-datepicker.css';
import '../styles/TodoInput.scss';

class TodoInput extends Component {  
  constructor (props) {
    super(props);
    this.state = {
      date: moment(),
      text:''
    };
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onInsert(this.state);

    this.setState({
      date: moment(),
      text: ''
    });
  }
  
  render() {
    const { text, date } = this.state;
    return(
      <div className="todo-input uk-margin-large-bottom">
        <input
          className="uk-input"
          placeholder="추가할 내용 입력"
          onChange={this.handleTextChange}
          onKeyPress={this.handleKeyPress}
          value={text}/>
        <DatePicker
          className="uk-input"
          selected={this.state.date}
          onChange={this.handleDateChange}
          dateFormat={this.dateFormat} 
          value={date.format(this.dateFormat)}/>
        <button onClick={this.handleSubmit} className="uk-button uk-button-default" uk-icon="plus"></button>
      </div>);
  }
};

export default TodoInput;