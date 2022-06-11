import React, { FC, useState } from 'react';

type CategoriesProps = {
  value:number;
  onClickCategory:(i:number)=> void
}

const Categories:FC<CategoriesProps> = ({ value, onClickCategory })=> {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;