import './style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store/store';
import { Provider } from 'react-redux';

import Layout from './components/Layout';
import Header from './components/Header';
import Descubrir from './components/Descubrir';
import Favoritos from './components/Favoritos';
import Historial from './components/Historial';
import ArticuloDetalle from './components/ArticuloDetalle';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Header />}></Route>
          <Route path="/descubrir" element={<Descubrir />}></Route>
          <Route path="/favoritos" element={<Favoritos />}></Route>
          <Route path="/historial" element={<Historial />}></Route>
          <Route path="/articuloDetalle" element={<ArticuloDetalle />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
