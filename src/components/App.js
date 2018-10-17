import React, { Component } from 'react';
import moment from 'moment';

import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

import '../styles/App.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 0, text: '리액트 공부하기', date:moment(), done: false},
        {id: 1, text: '리덕스 예습하기', date:moment(), done: false}
      ],
      keyword: ''
    };
  }

  id = 1;
  
  getId = () => {
    return ++this.id;
  }

  handleUpdate = (id, data) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map(
        todo => {
          if(todo.id === id) return {...data, id};
          return todo;
        }
      )
    });
  }

  handleDone = (id) => {
    const { todos } = this.state;
    // 토글링해야하는 객체의 id 검색
    const index = todos.findIndex(todos => todos.id === id);
    // 찾은 객체에서 나머지부분은 그대로 냅두고 done값 반전.
    const toggled = {...todos[index],
      done: !todos[index].done
    };
    // 만들어진 객체를 원래 객체를 삭제하고(slice) toggled객체로 바꿔넣기.
    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }

  handleInsert = (data) => {
    const { todos } = this.state;

    if(data.text !== '') {
      const newTodo = {
        id: this.getId(),
        text: data.text,
        date: data.date,
        done: false
      };
      this.setState({
        todos:[...todos, newTodo ],
      });
      console.log(todos);
    }
    else {
      alert('내용을 입력하세요!');
    }
  }

  handleRemove = (id) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      const { todos } = this.state;
      this.setState({
        todos: todos.filter(todo => todo.id !== id),
      });
    }    
  }

  render() {
    const { todos } = this.state;
    
    return(
      <div>
        <PageTemplate>
          <TodoInput onInsert={this.handleInsert}/>
          <input 
            className="uk-input uk-form-width-medium uk-margin"
            placeholder="검색"
            onChange={(e) => {this.setState({
              keyword: e.target.value});}}
          />
          <TodoList
            todos={todos.filter(
              todo => todo.text.indexOf(this.state.keyword) > -1
            )}
            onDone={this.handleDone}
            onUpdate={this.handleUpdate}
            onRemove={this.handleRemove}/>
        </PageTemplate>

      </div>
    );
  }
}

export default App;