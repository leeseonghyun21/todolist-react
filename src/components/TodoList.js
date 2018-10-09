import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, onDone, onUpdate, onRemove } = this.props;
    const todoList = todos.map(
      todo => (
        // 매핑하기위해서는 각각의 값을 구분하기위한 키값을 필요로 함.
        <TodoItem
          key={todo.id}
          done={todo.done}
          onRemove={() => onRemove(todo.id)}
          onUpdate={onUpdate}
          todo={todo}
          onDone={() => onDone(todo.id)}>
          {todo.text}
        </TodoItem>

      )
    );

    return (
      <div uk-grid="true" className="uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m">
        {todoList}
      </div>
    );
  }
}

export default TodoList;