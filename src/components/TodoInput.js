import React from 'react';
import '../styles/TodoInput.scss';

const TodoInput = ({value, onChange, onInsert}) => {

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      onInsert();
    }
  };

  return(
    <div className="todo-input uk-margin-large-bottom">
      <input className="uk-input" placeholder="내용 입력" onChange={onChange} onKeyPress={handleKeyPress} value={value} />
      <button className="uk-button uk-button-default" onClick={onInsert}>추가</button>
    </div>
  );
};

export default TodoInput;