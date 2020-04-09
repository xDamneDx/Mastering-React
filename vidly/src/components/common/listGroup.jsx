import React from 'react';

const ListGroup = (props) => {
  const { items, selectedItem, textProperty, valueProperty } = props;
  return (
    <ul className='list-group'>
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={item === selectedItem ? 'list-group-item active' : 'list-group-item'}
          onClick={() => props.onItemSelect(item)}
        >{item[textProperty]}
        </li>))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
