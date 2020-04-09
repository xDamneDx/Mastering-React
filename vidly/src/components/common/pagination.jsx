import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className='pagination'>
        {pages.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'} style={{ cursor: 'pointer' }}>
            <a className='page-link' onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;

// <li className='page-item'><a class='page-link' href='#'>1</a></li>
// <li className='page-item'><a class='page-link' href='#'>2</a></li>
// <li className='page-item'><a class='page-link' href='#'>3</a></li>
