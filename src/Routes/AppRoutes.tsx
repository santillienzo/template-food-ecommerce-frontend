
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DetalleTarea from '../components/DetalleTarea/DetalleTarea';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/detalle/:taskId" element={<DetalleTarea />} />
    </Routes>
  );
};

export default AppRoutes;
