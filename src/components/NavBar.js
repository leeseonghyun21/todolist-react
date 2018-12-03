import React, { Component } from 'react';
import TodoInput from './TodoInput';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/NavBar.scss';

class NavBar extends Component {
  state = {
    text: ''
  }

  handleTextChange = (e) => {
    this.props.onChange(e.target.value);
  }
  
  render() {

    return(
      <nav className="uk-navbar uk-navbar-container uk-navbar-transparent">
        <div className="uk-navbar-left">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="search"/>
            <input 
              className="uk-input uk-form-width-large uk-form-blank"
              placeholder="검색"
              onChange={this.handleTextChange}
            />
          </div>
          <TodoInput onInsert={this.props.onInsert}/>
        </div>
        <div className="uk-navbar-right">
          <a className="uk-navbar-toggle" uk-icon="menu" href="#"></a>
        </div>
      </nav>
      
    );
  }
};

export default NavBar;