import './categoryTabs.scss';

import UseCategories from 'Hooks/UseCategories';
import useQuery from 'Hooks/UseQuery';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryTabs = () => {
  const categoryState = UseCategories();

  /* Add 'hepsi' item to categoryList that will render */
  const navBarList = [...categoryState.categoryList];
  navBarList.unshift({ id: 1, title: 'hepsi' });

  /* Check query to mark related category */
  const query = useQuery();
  const currentQuery = query.get('category') || 'hepsi';

  if (!categoryState.categoryList) {
    return null;
  }

  return (
    <div className="category-container">
      <div className="category-list">
        {navBarList?.map((category) => (
          <Link to={`?category=${category.title}&pages=1`} key={category.id}>
            <div
              className={
                currentQuery?.trim() === category.title.trim()
                  ? 'category-list-item item-active'
                  : 'category-list-item'
              }
            >
              {category.title.trim()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
