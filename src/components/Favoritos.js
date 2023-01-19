import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { guardarDescartados, actualizarFavoritos, seleccionarArticulo } from "../features/busquedasSlice";

const Favoritos = () => {
    const favoritos = useSelector(state => state.busquedas.favoritos);

    const dispatch = useDispatch();

    const descartarArticulo = (event) => {
        let actualID = event.currentTarget.id;
        dispatch(guardarDescartados(favoritos[actualID]));
        const removeDescartado = (arr, id) => {
            return arr.filter((e) => e.id !== id);
        }
        const descartadosRemovidos = removeDescartado(favoritos, favoritos[actualID].id);
        dispatch(actualizarFavoritos(descartadosRemovidos));
    }

    const verArticuloDetalle = (event) => {
        let actualID = event.currentTarget.id;
        dispatch(seleccionarArticulo(actualID));
    }

    return (
        <>
            <section className="container">
                <h2>Favoritos</h2>
                <div>
                    {favoritos.map((b, index) => (
                        <article key={index + b.id}>
                            <img src={"http://http2.mlstatic.com/D_NQ_NP_" + b.thumbnail_id + "-F.jpg"} alt="vivienda"></img>
                            <div>
                                <Link to="/articuloDetalle" onClick={verArticuloDetalle} id={b.id}>
                                    <h3>{b.title}</h3>
                                    <p>${b.price}</p>
                                </Link>
                            </div>
                            <div className="divButtons">
                                <button className="buttonRemove" onClick={descartarArticulo} id={index}><i className="bi bi-file-minus-fill"></i></button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Favoritos;