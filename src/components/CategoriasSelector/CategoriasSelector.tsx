import React from 'react';
import style from './CategoriasSelector.module.css'
import langostino from '../../assets/categories/langostino.png'
import maceta from '../../assets/categories/maceta.png'
import pizza from '../../assets/categories/pizza.png'
import soda from '../../assets/categories/soda.png'

interface CategoriasSelectorProps {
  onSelectCategory: (categoria: string) => void;
}

const CategoriasSelector: React.FC<CategoriasSelectorProps> = ({ onSelectCategory }) => {
  const categorias = [
    { description: 'Pizzas tradicionales', icono: pizza, name: "PIZZA_TRAD" },
    { description: 'Pizzas de mar', icono: langostino,  name: "PIZZA_MAR"},
    { description: 'Pizzas vegetarianas', icono: maceta, name: "PIZZA_VEG"},
    { description: 'Bebidas', icono: soda, name: "BEBIDA" }
  ];

  return (
    <section className="container mt-3" id="selector-categorias">
      <div className="d-flex gap-5 justify-content-between">
        {categorias.map((categoria, index) => (
          <div
            key={index}
            onClick={() => onSelectCategory(categoria.name)}
            className={`${style.selector}`}
          >
            <div className={`${style.selectorIcon}`}>
              <img src={categoria.icono} alt="" />
            </div>
            <div className={`${style.selectorText}`}>
              <span>{categoria.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriasSelector;