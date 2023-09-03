import React from 'react';

export const listCategories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

interface ICategoriesProps {
  value: number;
  onClickCategory: (index: number) => void;
}

export const Categories: React.FC<ICategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {listCategories.map((el, index) => {
            return (
              <li
                key={index}
                className={value === index ? 'active' : ''}
                onClick={() => onClickCategory(index)}
              >
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
