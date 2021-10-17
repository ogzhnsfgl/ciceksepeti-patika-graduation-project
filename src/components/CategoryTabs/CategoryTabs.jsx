// import propTypes from 'prop-types';
import './categoryTabs.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CategoryTabs = () => {
  const categoryState = useSelector((state) => state.category);

  /* Add 'hepsi' item to categoryList that will render */
  const navBarList = [...categoryState.categoryList];
  navBarList.unshift({ id: 1, title: 'hepsi' });

  /* Check query to mark related category */
  const query = useQuery();
  const currentQuery = query.get('category') ? query.get('category') : 'hepsi';

  return (
    <div className="category-container">
      <ul className="category-list">
        {navBarList?.map((category) => (
          <Link to={`?category=${category.title} `} key={category.id}>
            <li
              className={
                currentQuery?.trim() === category.title.trim()
                  ? 'category-list-item item-active'
                  : 'category-list-item'
              }
            >
              {category.title.trim()}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTabs;
