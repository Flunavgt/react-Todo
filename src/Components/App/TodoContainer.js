import './App.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from '../TodosList/TodosList';

export default class TodoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      todos: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addCheck = this.addCheck.bind(this);
    this.modifyTitle = this.modifyTitle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      const temp = JSON.stringify(todos);
      localStorage.setItem('todos', temp);
    }
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleEnter(event) {
    if (event.key !== 'Enter') return;
    this.addItem();
  }

  deleteItem(index) {
    this.setState((previousState) => {
      const { todos } = previousState;

      const newArr = todos.filter(({ id }) => id !== index);
      return { todos: newArr };
    });
  }

  modifyTitle(index, title) {
    // const id = parseInt(index, 10);
    const { todos } = this.state;
    const temporal = [...todos];
    const arr = temporal.map((obj) => {
      const shallowCopy = { ...obj };
      if (shallowCopy.id === index) {
        shallowCopy.title = title;
      }
      return shallowCopy;
    });
    this.setState({ todos: arr });
  }

  addItem() {
    const { input, todos } = this.state;
    const shallowCopy = [...todos];
    if (input === '' || input.charCodeAt(0) === 32) return;
    const clean = input.trim();
    const task = { id: uuidv4(), title: clean, completed: false };
    shallowCopy.push(task);
    this.setState({ todos: shallowCopy, input: '' });
  }

  addCheck(event) {
    const { id } = event.target;
    const { todos } = this.state;
    const temporal = [...todos];

    const arr = temporal.map((obj) => {
      const shallowCopy = { ...obj };
      if (shallowCopy.id === id) {
        shallowCopy.completed = event.target.checked;
      }
      return shallowCopy;
    });
    this.setState({ todos: arr });
  }

  render() {
    const { todos, input } = this.state;
    return (
      <div className="app">
        <h1 className="titleTD">To Do List</h1>
        <input className="nextTD" type="text" value={input} onChange={this.handleChange} onKeyPress={this.handleEnter} />
        <button className="addBtn" type="button" onClick={this.addItem}>Add To do</button>
        <TodosList
          todos={todos}
          addCheck={this.addCheck}
          modifyTitle={this.modifyTitle}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
