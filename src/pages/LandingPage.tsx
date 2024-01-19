import { useEffect, useState } from 'react';
import { ProductService } from '../services/ProductService';
import CategoriasSelector from '../components/CategoriasSelector/CategoriasSelector';
import CategoriasTareas from '../components/CategoriasTareas/CategoriasTareas';
import { Product } from '../types/Product';
import CarouselHome from '../components/CarouselHome/CarouselHome';


const LandingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Estado para almacenar tareas filtradas
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Estado para la categoría seleccionada
  

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  // Efecto para filtrar las tareas cuando se selecciona una categoría
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(task => task.category.toUpperCase() === selectedCategory.toUpperCase());
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Si no hay categoría seleccionada, mostrar todas las tareas
    }
  }, [selectedCategory, products]);

  return (
    <>
      <CarouselHome/>
      <CategoriasSelector onSelectCategory={setSelectedCategory} />
      <CategoriasTareas products={filteredProducts.length > 0 ? filteredProducts : products} />
    </>
  );
};

export default LandingPage;
