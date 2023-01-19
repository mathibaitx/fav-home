import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { guardarBusquedas, guardarFavoritos, guardarDescartados, seleccionarArticulo } from "../features/busquedasSlice";

const Descubrir = () => {    
    const dispatch = useDispatch();

    const busquedas = useSelector(state => state.busquedas.busquedas);
    const histBusqueda = useSelector(state => state.busquedas.histBusqueda);

    const agregarFavorito = (event) => {
        let actualID = event.currentTarget.getAttribute("data");
        dispatch(guardarFavoritos(busquedas[actualID]));
        const removeFavorito = (arr, id) => {
            return arr.filter((e) => e.id !== id);
        }
        const favoritosRemovidos = removeFavorito(busquedas, busquedas[actualID].id);
        dispatch(guardarBusquedas(favoritosRemovidos));
    }

    const descartarArticulo = (event) => {
        let actualID = event.currentTarget.id;
        dispatch(guardarDescartados(busquedas[actualID]));
        const removeDescartado = (arr, id) => {
            return arr.filter((e) => e.id !== id);
        }
        const descartadosRemovidos = removeDescartado(busquedas, busquedas[actualID].id);
        dispatch(guardarBusquedas(descartadosRemovidos));
    }

    const verArticuloDetalle = (event) => {
        let actualID = event.currentTarget.id;
        dispatch(seleccionarArticulo(actualID));
    }

    return (
        <section className="container">
            <h2>Resultados de "{histBusqueda}"</h2>
            <div>
                {busquedas.map((b, index) => (
                    <article key={b.id}>
                        <img src={"http://http2.mlstatic.com/D_NQ_NP_" + b.thumbnail_id + "-F.jpg"} alt="vivienda"></img>
                        <div>
                            <Link to="/articuloDetalle" onClick={verArticuloDetalle} id={b.id}>
                                <h3>{b.title}</h3>
                                <p>${b.price}</p>
                            </Link>
                        </div>
                        <div className="divButtons">
                            <button className="buttonRemove" onClick={descartarArticulo} id={index}><i className="bi bi-file-minus-fill"></i></button>
                            <button className="buttonAdd" onClick={agregarFavorito} data={index}><i className="bi bi-file-plus-fill"></i></button>
                        </div>
                    </article>
                ))}
            </div>
        </section >
    )
}

export default Descubrir;