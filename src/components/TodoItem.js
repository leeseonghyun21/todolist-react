import React, { Component, Fragment } from 'react';

class TodoItem extends Component {
  textInput = React.createRef();

  state = {
    editing: false,
    text: ''
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

  handleToggleEdit = () => {
    const{ todo, onUpdate } = this.props;
    
    if(this.state.editing) {
      onUpdate(todo.id, {
        text: this.state.text
      });
    }
    else {
      this.setState({
        text: todo.text
      });
    }
    this.setState({
      editing: !this.state.editing
    });
    this.textInput.current.focus();
  }

  render() {
    const {children} = this.props;
    const { editing } = this.state;
    return (
      <div>
        {
          editing ? (
            <Fragment>
              <div className="uk-card uk-card-default uk-card-hover">
                <div className="uk-card-body">
                  <input
                    ref={this.textInput}
                    className="uk-input" 
                    placeholder="수정할 내용" 
                    onChange={this.handleChange}
                    value={this.state.text} /> 
                </div>
                <div className="uk-card-footer">
                  <a href="#" className="uk-icon-link uk-margin-medium-right" uk-icon="check"></a>
                  <a href="#" className="uk-icon-link uk-margin-medium-right" uk-icon="check" onClick={this.handleToggleEdit}></a>
                  <a href="#" className="uk-icon-link" uk-icon="trash" onClick={this.handleRemove}></a>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="uk-card uk-card-default uk-card-hover">
                <div className="uk-card-body">
                  <p>{children}</p>
                </div>
                <div className="uk-card-footer">
                  <a href="#" className="uk-icon-link uk-margin-medium-right" uk-icon="check"></a>
                  <a href="#" className="uk-icon-link uk-margin-medium-right" uk-icon="file-edit" onClick={this.handleToggleEdit}></a>
                  <a href="#" className="uk-icon-link" uk-icon="trash" onClick={this.handleRemove}></a>
                </div>
              </div>
            </Fragment>
          )
        }
      </div>
        
    );
  }
}

export default TodoItem;