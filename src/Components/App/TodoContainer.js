import './App.css';
import React, { Component } from 'react';
import TodosList from '../TodosList/TodosList';

export default class TodoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      todos: [
        {
          id: 1,
          title: 'Setup development environment',
          completed: false,
        },
        {
          id: 2,
          title: 'Develop website and add content',
          completed: false,
        },
        {
          id: 3,
          title: 'Deploy to live server',
          completed: false,
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addCheck = this.addCheck.bind(this);
    this.modifyTitle = this.modifyTitle.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  modifyTitle(index, title) {
    const id = parseInt(index, 10);
    const { todos } = this.state;
    const temporal = [...todos];
    const arr = temporal.map((obj) => {
      const shallowCopy = { ...obj };
      if (shallowCopy.id === id) {
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
    const task = { id: todos.length + 1, title: clean, completed: false };
    shallowCopy.push(task);
    this.setState({ todos: shallowCopy });
  }

  addCheck(event) {
    const id = parseInt(event.target.id, 10);
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
        <input className="nextTD" type="text" value={input} onChange={this.handleChange} />
        <button className="addBtn" type="button" onClick={this.addItem}>Add To do</button>
        <TodosList todos={todos} addCheck={this.addCheck} modifyTitle={this.modifyTitle} />
      </div>
    );
  }
}
