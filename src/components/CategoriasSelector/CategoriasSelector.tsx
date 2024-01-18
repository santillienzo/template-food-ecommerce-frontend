import React from 'react';
import style from './CategoriasSelector.module.css'
import categories from '../../utils/categories.utils';


interface CategoriasSelectorProps {
  onSelectCategory: (categoria: string) => void;
}

const CategoriasSelector: React.FC<CategoriasSelectorProps> = ({ onSelectCategory }) => {

  return (
    <section className="container mt-3" id="selector-categorias">
      <div className="d-flex gap-5 justify-content-between">
        {categories.map((category, index) => {
          const {name, beautifulName, icon} = category
          return (
            <div
              key={index}
              onClick={() => onSelectCategory(name)}
              className={`${style.selector}`}
            >
              <div className={`${style.selectorIcon}`}>
                <img src={icon} alt="" />
              </div>
              <div className={`${style.selectorText}`}>
                <span>{beautifulName}</span>
              </div>
          </div>
          )
        })}
      </div>
    </section>
  );
};

export default CategoriasSelector;