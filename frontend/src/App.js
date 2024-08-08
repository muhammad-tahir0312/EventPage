import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import Homepage from './components/Homepage';
import ViewEvents from './components/ViewEvents';
import UpdateEvent from './components/UpdateEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="register" element={<Register />} />
          <Route path="allEvents" element={<ViewEvents />} />
          <Route path="/:id" element={<UpdateEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
