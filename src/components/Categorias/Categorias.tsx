import { useEffect, useState } from 'react';
import { ProductService } from '../../services/ProductService';

import { Product } from '../../types/Product';
import CategoriasSelector from '../CategoriasSelector/CategoriasSelector';
import CategoriasTareas from '../CategoriasTareas/CategoriasTareas';

const Categorias = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Estado para la categoría seleccionada

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  // Filtra las tareas por la categoría seleccionada
  const filtereProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="container mt-5">
      <CategoriasSelector onSelectCategory={setSelectedCategory} /> {/* Pasa la función para manejar la selección de categoría */}
      <CategoriasTareas products={filtereProducts} /> {/* Pasa las tareas filtradas al componente CategoriasTareas */}
    </div>
  );
};

export default Categorias;
