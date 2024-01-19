import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../types/Product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom'; //Redirigir al usuario a la pagina principal
import { Button } from 'react-bootstrap';
import categories from '../../utils/categories.utils';

const DetalleTarea = () => {
  const { productId } = useParams<{ productId?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string>('');
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);

  const navigate = useNavigate(); //Redirigir al usuario a la pagina principal
  useEffect(() => {

    //---------- OBTENER UNA TAREA ----------
    const fetchTask = async () => {
      try {
        if (productId && !isNaN(parseInt(productId, 10))) {
          const productData = await ProductService.getOneProduct(parseInt(productId, 10));
          setProduct(productData);

          const ProductInCategory = await ProductService.getProductInCategory(productData.category);
          setRelatedProduct(ProductInCategory);
        } else {
          console.error('Identificador de tarea no válido');
        }
      } catch (error) {
        console.error('Error al cargar la tarea:', error);
      }
    };

    fetchTask();
  }, [productId]);


  //--------- CAMBIAR ESTADO A UNA TAREA --------

  const handleUpdateState = async () => {
    if (category !== '') {
      try {
        const updatedTask = await ProductService.updateStateTask(parseInt(productId!, 10), category);
        // Actualiza la tarea local con la tarea actualizada
        setProduct(updatedTask);
        // Muestra una notificación de éxito utilizando react-toastify
        toast.success('Estado de la tarea actualizado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        // Maneja errores de la actualización de la tarea y muestra una notificación de error
        toast.error('Error al actualizar el estado de la tarea', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    } else {
      // Si el estado está vacío, muestra un mensaje de error y una notificación
      toast.error('Selecciona un estado válido', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error('Selecciona un estado válido');
    }
  };


  //----------- ELIMINAR UNA TAREA -------------
  
  const handleDeleteTask = async () => {
    try {
      if (productId) {
        await ProductService.deleteProduct(parseInt(productId, 10));
        toast.success('Tarea eliminada correctamente', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        });
        console.log('Tarea eliminada con éxito')
        // Redirige al usuario a la página principal después de eliminar la tarea
        navigate('/');

        
      }
    } catch (error) {
      
      toast.error('Error al eliminar la tarea', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      });
      console.error('Error al eliminar la tarea:', error);
    }
  };



  return (
    <div className="container mt-5">
      {product && (
        <div className="row">
          <div className="col-12 col-md-6">
            <img className="card-img-top mb-5" src={product.image} alt={product.name} />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="display-5 fw-bolder">{product.name}</h1>
            <h5>
              {
                categories.find((category)=> category.name === product.category)?.beautifulName
              }
            </h5>
            <p className="lead" id="producto-descripcion">
              Descripción: {product.description}
            </p>
            <select className="form-select mb-3" onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">Seleccionar categoría</option>
              {
                categories.map((category, index)=> {
                  const {name, beautifulName} = category
                  return (
                      <option key={index} value={name}>{beautifulName}</option>
                  )
                })
              }
            </select>

            <button className="btn btn-danger" onClick={handleDeleteTask}>
              Eliminar producto
            </button>
            <button className="btn btn-primary ms-2" onClick={handleUpdateState}>
              Actualizar categoría
            </button>
          </div>
        </div>
      )}

      <div className="row mt-5">
        {relatedProduct.map((relatedTask) => (
          <div className="col-12 col-md-4 mb-4" key={relatedTask.id}>
            <div className="card">
              <img className="card-img-top" src={relatedTask.image} alt={relatedTask.name} />
              <div className="card-body">
                <h5 className="card-title">{relatedTask.name}</h5>
                
                <Button variant="primary" onClick={() => navigate(`/detalle/${relatedTask.id}`)}>
                  Ver más
                </Button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalleTarea;
