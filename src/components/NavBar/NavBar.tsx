import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap"
import { Basket, Person } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom";
import { TaskService } from "../../services/TaskService";
import { Task } from "../../types/Task";
import { toast } from "react-toastify";
import ModalAgregarTarea from "../ModalAgregarTarea/ModalAgregarTarea";

const NavBar = () => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

      //Agregar nueva tarea
const createTask = async (newTask: Task) => {
  try {
    const result = await TaskService.createTask(newTask);
    console.log('Nuevo producto agregada:', result.id);
    navigate(`/detalle/${result.id}`); //Ir al detalle de el producto creada

    // Muestra una notificación de éxito utilizando react-toastify
    toast.success('Producto creado correctamente', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Cerrar automáticamente después de 2 segundos
    });
  } catch (error) {
    // Muestra una notificación de error si la creación de el producto falla
    toast.error('Error al crear el producto', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
    console.error('Error al crear el producto:', error);
  }
};

    return (

        <>
        <Navbar expand="lg" className="bg-info">
          <Container>

            <Navbar.Brand className="text-light">Pizzas Argentinas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link  onClick={() => navigate('/')} className="text-light"> Inicio </Nav.Link>
                {/* ---------- Agregar una nueva tarea -----------*/}
                <Nav.Link onClick={handleShowModal} className="text-light">Agregar producto</Nav.Link>
              </Nav>
    
            <Nav className="d-none d-md-flex ms-auto ">
                <Nav.Link href="#carrito" className="text-light">
                    <Basket />
                </Nav.Link>
    
                <Nav.Link href="#usuario" className="text-light">
                    <Person />
                </Nav.Link>
            </Nav>
    
            <div className="d-md-none">
                <ul className="navbar-nav me-auto-mb-2 mb-md-0">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#ticket">Ticket</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#perfil">Perfil</a>
                    </li>
                </ul>
            </div>
    
    
            </Navbar.Collapse>
          </Container>
          
        </Navbar>
        
        <ModalAgregarTarea showModal={showModal} handleClose={handleCloseModal} createTask={createTask} />

        </>
        
        
        
      )
}

export default NavBar