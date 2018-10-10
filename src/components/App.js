import React, { Component } from 'react';
import '../styles/App.scss';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  state = {
    input: '',
    todos: [
      {id: 0, text: '리액트 공부하기', done: true},
      {id: 1, text: '컴포넌트 스타일링 연습하기', done: false},
      {id: 2, text: '리덕스 예습하기', done: false}
    ]
  }
  id = 2;

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  } 
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

  handleInsert = () => {
    const { input, todos } = this.state;

    const newTodo = {
      id: this.getId(),
      text: input,
      done: false
    };
    if(input === '') {
      alert('내용을 입력하세요!');
    }
    else {
      this.setState({
        todos:[...todos, newTodo ],
        input: ''
      });
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
    const {input, todos} = this.state;
    
    return(
      <PageTemplate>
        <TodoInput 
          onChange={this.handleChange}
          onInsert={this.handleInsert}
          value={input}
        />
        <TodoList
          todos={todos.filter(
            todo => todo.text.indexOf(input) > -1
          )}
          onDone={this.handleDone}
          onUpdate={this.handleUpdate}
          onRemove={this.handleRemove}/>
      </PageTemplate>
    );
  }
}

export default App;
