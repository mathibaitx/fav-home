import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { guardarBusquedas, guardarDescartados } from "../features/busquedasSlice";

const ArticuloDetalle = () => {
    const dispatch = useDispatch();
    const busquedas = useSelector(state => state.busquedas.busquedas);
    const articuloSeleccionado = useSelector(state => state.busquedas.articuloSeleccionado);
    const [detalles, setDetalles] = useState([]);
    const [detallesDes, setDetallesDes] = useState([]);
    const [detallesPictures, setDetallesPictures] = useState([]);

    useEffect(() => {
        const fetchDetalles = () => {
            fetch("https://api.mercadolibre.com/items/" + articuloSeleccionado)
                .then(r => r.json())
                .then(data => {
                    setDetalles(data);
                    setDetallesPictures(data.pictures);
                })
        };
        const fetchDetallesDes = () => {
            fetch("https://api.mercadolibre.com/items/" + articuloSeleccionado + "/description")
                .then(r => r.json())
                .then(data => {
                    setDetallesDes(data);
                })
        };
        fetchDetalles();
        fetchDetallesDes();
    }, [articuloSeleccionado]);

    const descartarArticulo = (event) => {
        let tituloArticulo = event.currentTarget.getAttribute("data");
        // eslint-disable-next-line array-callback-return
        const filtro = busquedas.filter((e) => {
            if(e.id === tituloArticulo){
                return e.title;
            }
        });
        dispatch(guardarDescartados(filtro[0]));
        const removeDescartado = (arr, id) => {
            return arr.filter((e) => e.id !== id);
        }
        const descartadosRemovidos = removeDescartado(busquedas, filtro[0].id);
        dispatch(guardarBusquedas(descartadosRemovidos));
    } 

    const [current, setCurrent] = useState(0);
    const length = detallesPictures.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(detallesPictures) || detallesPictures.length <= 0) {
        return null;
    }

    return (
        <div id="divArticleDetail" className="container">
            <div>
                <Link to="/descubrir"><i className="bi bi-arrow-left"></i></Link>
            </div>
            <div className="slider">
                <button className='left-arrow' onClick={prevSlide}><i className="bi bi-arrow-left-circle-fill"></i></button>
                <button className='right-arrow' onClick={nextSlide}><i className="bi bi-arrow-right-circle-fill"></i></button>
                {detallesPictures.map((slide, index) => {
                    return (
                        <div
                            className={index === current ? 'slide active' : 'slide'}
                            key={index}
                        >
                            {index === current && (
                                <img src={slide.url} alt='vivienda' className='image' />
                            )}
                        </div>
                    )
                })}
            </div>
            <div>
                <div>
                    <h3>{detalles.title}</h3>
                    <p>${detalles.price}</p>
                </div>
                <p>{detallesDes.plain_text}</p>
                <div>
                    <button className="buttonRemove" onClick={descartarArticulo} data={articuloSeleccionado}><i className="bi bi-file-minus-fill"></i></button>
                    <button className="buttonAdd"><i className="bi bi-file-plus-fill"></i></button>
                </div>
            </div>
        </div>
    )
}

export default ArticuloDetalle;