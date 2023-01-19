import logo from './img/logo.svg'
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarHistorial, guardarBusquedas, historialBusSeleccionada } from '../features/busquedasSlice';

const Header = () => {
    const dispatch = useDispatch();
    const refBusqueda = useRef(null);

    const STORE_busquedas = useSelector(state => state.busquedas);
    console.log(STORE_busquedas);

    const buscar = () => {
        /* localStorage.setItem("histBusqueda", refBusqueda.current.value) */
        /* localStorage.getItem("histbusqueda") */
        let inputBusqueda = refBusqueda.current.value;
        fetch("https://api.mercadolibre.com/sites/MLU/search?q=" + inputBusqueda)
            .then(r => r.json())
            .then(data => {
                dispatch(historialBusSeleccionada(inputBusqueda));
                dispatch(guardarHistorial(inputBusqueda));
                /* localStorage.setItem("busquedas", JSON.stringify(data.results)) */
                /* JSON.parse(localStorage.getItem("busquedas")) */
                dispatch(guardarBusquedas(data.results));
            })
    }

    return (
        <>
            <header className="container">
                <Link to="/descubrir"><img src={logo} alt="logo"></img></Link>
                <nav>
                    <Link to="/descubrir">Descubrir</Link>
                    <Link to="/favoritos">Favoritos</Link>
                    <Link to="/historial">Historial</Link>
                </nav>
                <form action="">
                    <input type="text" name="" id="" ref={refBusqueda}></input>
                    <Link to="/descubrir"><input type="button" value="Buscar" onClick={buscar}></input></Link>
                </form>
                <hr></hr>
            </header>
        </>
    )
}

export default Header;