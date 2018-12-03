import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { CirclePicker } from 'react-color';

class TodoInput extends Component {
  dateFormat = 'YYYY/MM/DD';

  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      text: '',
      date: moment(),
      color: '#000000'
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

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
  
  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.props.onInsert(this.state)) {
      this.btnRef.classList.remove('uk-modal-close');
    }

    this.setState({
      date: moment(),
      text: ''
    });
  }
  
  render() {
    const { date, text } = this.state;
    const colors = [ '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ff9800', '#607d8b' ];

    return (
      <Fragment>
        <button className="uk-button uk-button-default" type="button" uk-toggle="target: .input-modal" uk-icon="plus"></button>

        <div className="input-modal" uk-modal="true">
          <div className="uk-modal-dialog">
            <button className="uk-modal-close-default" type="button" uk-close="true"></button>
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">할 일 추가</h2>
            </div>

            <div className="uk-modal-body">
              <form className="uk-form-stacked">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">내용</label>
                  <div className="uk-form-controls">
                    <input
                      className="uk-input uk-form-width-large"
                      placeholder="추가할 내용 입력"
                      onChange={this.handleTextChange}
                      onKeyPress={this.handleKeyPress}
                      value={text}/>
                  </div>

                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">날짜</label>
                  <div className="uk-form-controls">
                    <DatePicker
                      className="uk-input uk-form-width-large"
                      selected={date}
                      onChange={this.handleDateChange}
                      dateFormat={this.dateFormat} 
                      value={date.format(this.dateFormat)}/>
                  </div>
                </div>

                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">색상</label>
                  <div className="uk-form-controls">
                    <CirclePicker width="600px"  colors={colors} color={ this.state.color } onChange={this.handleColorChange} onChangeComplete={this.handleClose} />
                  </div>
                </div>
              </form>
            </div>

            <div className="uk-modal-footer uk-text-right">
              <button ref={(ref) => {this.btnRef = ref}} onClick={this.handleSubmit} className="uk-button uk-button-primary uk-modal-close">완료</button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TodoInput;