import React, { Component, useState } from 'react';
import PropTypes, { bool, string } from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class TodosList extends Component {
  render() {
    const {
      todos,
      addCheck,
      modifyTitle,
      deleteItem,
    } = this.props;
    const items = todos.map((object) => (
      <ItemList
        key={object.id}
        id={object.id}
        title={object.title}
        completed={object.completed}
        addCheck={addCheck}
        modifyTitle={modifyTitle}
        deleteItem={deleteItem}
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
    deleteItem,
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
      <button type="submit" id={id} onClick={(event) => deleteItem(event.target.id)} className="trashBtn">
        delete
      </button>
    </li>
  );
};

ItemList.defaultProps = {
  deleteItem: PropTypes.func,
  modifyTitle: null,
  id: '0',
  title: string,
  completed: bool,
  addCheck: bool,
};

ItemList.propTypes = {
  deleteItem: PropTypes.func,
  modifyTitle: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  completed: PropTypes.bool,
  addCheck: PropTypes.func,
};

TodosList.defaultProps = {
  deleteItem: null,
  modifyTitle: null,
  addCheck: {},
  todos: [],
};

TodosList.propTypes = {
  deleteItem: PropTypes.func,
  modifyTitle: PropTypes.func,
  addCheck: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string,
        title: PropTypes.string,
        completed: PropTypes.bool,
      },
    ),
  ),
};
