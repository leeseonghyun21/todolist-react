import React, { Component } from 'react';
import '../styles/LeftCol.scss';

class LeftCol extends Component {
  render() {
    return (
      <aside className="left-col uk-light">
        <div className="left-logo uk-padding-small">
          <h2 className="uk-margin-remove uk-text-center">Todo-list</h2>
        </div>

        <div className="left-box">
          <img src="images/left-col/avatar.svg" className="left-box-logo uk-margin-small-bottom" alt="계정 로고" width="80" uk-img="true"/>
          <h4 className="uk-text-center uk-margin-small uk-margin-remove">Lee Seong Hyun</h4>
          <div className="uk-position-relative uk-text-center">
            <a href="#" className="uk-text-center" type="button">
              Account
              <span uk-icon="icon: triangle-down"></span> 
            </a>
            <div uk-dropdown="mode: click">
              <ul className="uk-nav uk-dropdown-nav">
                <li className="uk-active"><a href="#">Active</a></li>
                <li><a href="#">Item</a></li>
                <li className="uk-nav-header">Header</li>
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
                <li className="uk-nav-divider"></li>
                <li><a href="#">Item</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="left-nav">
          <ul className="uk-nav-default uk-nav-parent-icon uk-padding-small" uk-nav="multiple: true">
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
            <li className="uk-parent">
              <a href="#">Parent</a>
              <ul className="uk-nav-sub">
                <li><a href="#">Sub item</a></li>
                <li><a href="#">Sub item</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default LeftCol;