import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { guardarBusquedas, actualizarHistorial, actualizarFavoritos, actualizarDescartados, historialBusSeleccionada } from "../features/busquedasSlice";

const Historial = () => {
    const historial = useSelector(state => state.busquedas.historial);

    const dispatch = useDispatch();

    const repetirBusqueda = (event) => {
        let actualID = event.currentTarget.id;
        dispatch(historialBusSeleccionada(actualID));
        fetch("https://api.mercadolibre.com/sites/MLU/search?q=" + actualID)
            .then(r => r.json())
            .then(data => {
                dispatch(guardarBusquedas(data.results));
            })
    }

    const historialCopy = [...historial];

    const eliminarBusqueda = (event) => {
        let busquedaSeleccionada = event.currentTarget.getAttribute("data");
        let posBusquedaSeleccionada = historial.indexOf(busquedaSeleccionada);
        historialCopy.splice(posBusquedaSeleccionada, 1);
        dispatch(actualizarHistorial(historialCopy));
    }
    const borrarHistorial = () => {
        dispatch(historialBusSeleccionada([]));
        dispatch(guardarBusquedas([]));
        dispatch(actualizarHistorial([]));
        dispatch(actualizarFavoritos([]));
        dispatch(actualizarDescartados([]));
    }

    return (
        <>
            <section id="sectionHistorial" className="container">
                <div>
                    <h2>Historial</h2>
                    <button className="buttonRemoveAll" onClick={borrarHistorial}><i className="bi bi-trash-fill"></i></button>
                </div>
                <ul>
                    {historial.map((b, index) => (
                        <li key={index}>
                            <Link to="/descubrir" onClick={repetirBusqueda} id={b}><p>{b}</p></Link>
                            <button className="buttonRemoveSearch" onClick={eliminarBusqueda} data={b}><i className="bi bi-x"></i></button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Historial;