
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Product } from '../../types/Product';
import categories from '../../utils/categories.utils';


type ModalAgregarTareaProps = {
  showModal: boolean;
  handleClose: () => void;
  createTask: (newTask: Product) => void;
};

const ModalAgregarTarea: React.FC<ModalAgregarTareaProps> = ({ showModal, handleClose, createTask }) => {
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Este campo es obligatorio'),
    description: Yup.string().required('Este campo es obligatorio'),
    image: Yup.string().required('Este campo es obligatorio'),
    category: Yup.string().required('Este campo es obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      category: '',
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      
      // Llama a la función para agregar la nueva tarea
      await createTask(values);
      handleClose(); // Cierra el modal después de enviar el formulario
    },
  });

  return (

    <Modal show={showModal} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Agregue una tarea</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form onSubmit={formik.handleSubmit}>
        
        {/* ----- Titulo ----- */}
          <div className="mb-3 mt-1">
              <label htmlFor="name" className="form-label"> Título </label>
              <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              />

              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger"> {formik.errors.name} </div>
              ) : null} 

            </div>

        {/* ----- Descripción ----- */}
          <div className="mb-3 mt-3">
            <label htmlFor="description" className="form-label"> Descripción </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows={3} // Número de filas
              cols={50} // Número de columnas
            />

            {formik.touched.description && formik.errors.description ? (
              <div className="text-danger"> {formik.errors.description} </div>
            ) : null} 
          </div>
        
        {/* ----- Imagen ----- */}
        <div className="mb-3 mt-3">
              <label htmlFor="image" className="form-label"> Imagen </label>
              <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image}
              />

              {formik.touched.image && formik.errors.image ? (
                <div className="text-danger"> {formik.errors.image} </div>
              ) : null} 

            </div>

        {/* ----- Estado ----- */}
        <div className="mb-3 mt-3">
              <label htmlFor="category" className="form-label"> Estado </label>

              <Form.Select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              >
              <option value="">Selecciona una categoría</option>
              {
                categories.map((category, index)=> {
                  const {name, beautifulName} = category
                  return (
                      <option key={index} value={name}>{beautifulName}</option>
                  )
                })
              }
              </Form.Select>

              {formik.touched.category && formik.errors.category ? (
                <div className="text-danger"> {formik.errors.category} </div>
              ) : null} 

            </div>
          
        <div className='text-end'>
        <Button className='px-5' variant="primary" type="submit" >
            Enviar
          </Button>
        </div>


        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAgregarTarea;
