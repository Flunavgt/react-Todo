import React, { Component, useState } from 'react';
import PropTypes, { bool, string } from 'prop-types';
/* eslint-disable react/jsx-boolean-value */

// eslint-disable-next-line react/prefer-stateless-function
export default class TodosList extends Component {
  render() {
    const { todos, addCheck, modifyTitle } = this.props;
    const items = todos.map((object) => (
      <ItemList
        key={object.id}
        id={object.id}
        title={object.title}
        completed={object.completed}
        addCheck={addCheck}
        modifyTitle={modifyTitle}
      />
    ));
    return (
      <ul>
        { items }
      </ul>
    );
  }
}

const ItemList = (props) => {
  const {
    id,
    title,
    completed,
    addCheck,
    modifyTitle,
  } = props;

  const [editable, setEditable] = useState(true);
  const [input, setInput] = useState(title);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleDoubleClick = () => {
    setEditable(false);
  };

  const handleBlur = () => {
    setEditable(true);
    setInput(title);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      const clean = input.trim();
      if (clean === '') {
        return;
      }
      modifyTitle(event.target.id, clean);
    }
  };

  let style = { textDecoration: 'none' };

  if (completed === true) {
    style = { textDecoration: 'line-through' };
  }

  return (
    <li id={id}>
      <input id={id} type="checkbox" checked={completed} onChange={addCheck} />
      <input
        id={id}
        value={input}
        onChange={handleInput}
        className="currentTD"
        type="text"
        style={style}
        onKeyDown={handleEnter}
        readOnly={editable}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
      />
    </li>
  );
};

ItemList.defaultProps = {
  modifyTitle: null,
  id: 0,
  title: string,
  completed: bool,
  addCheck: bool,
};

ItemList.propTypes = {
  modifyTitle: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  addCheck: PropTypes.func,
};

TodosList.defaultProps = {
  modifyTitle: null,
  addCheck: {},
  todos: [],
};

TodosList.propTypes = {
  modifyTitle: PropTypes.func,
  addCheck: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number,
        title: PropTypes.string,
        completed: PropTypes.bool,
      },
    ),
  ),
};
