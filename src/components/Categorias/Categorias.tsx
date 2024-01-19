import { useEffect, useState } from 'react';
import { ProductService } from '../../services/ProductService';

import { Product } from '../../types/Product';
import CategoriasSelector from '../CategoriasSelector/CategoriasSelector';
import CategoriasTareas from '../CategoriasTareas/CategoriasTareas';

const Categorias = () => {
  const [tasks, setTasks] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Estado para la categoría seleccionada

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await ProductService.getAllProducts();
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  // Filtra las tareas por la categoría seleccionada
  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.category.toUpperCase() === selectedCategory.toUpperCase())
    : tasks;

  return (
    <div className="container mt-5">
      <CategoriasSelector onSelectCategory={setSelectedCategory} /> {/* Pasa la función para manejar la selección de categoría */}
      <CategoriasTareas product={filteredTasks} /> {/* Pasa las tareas filtradas al componente CategoriasTareas */}
    </div>
  );
};

export default Categorias;
