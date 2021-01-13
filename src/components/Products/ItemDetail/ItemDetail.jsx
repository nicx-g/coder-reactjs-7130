import {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Store} from '../../../store/index';

const ItemDetail = ({props}) => {

    const [cantidadProductos, setCantidadProductos] = useState(6)

    const itemCountSuma = () => {

        if(cantidadProductos < props.stock) {

            setCantidadProductos( () => parseInt(cantidadProductos) + 6)
            
        } else{

            return
        }
    }

    const itemCountResta = () => {

        if(cantidadProductos < 0 || cantidadProductos === 0) {

            return
            
        } else{

            setCantidadProductos( () => parseInt(cantidadProductos) - 6)
        }
    }

    const [btnSuccess, setBtnSuccess] = useState(false)

    const alternarSuccess = () => {
        setBtnSuccess(true)
        goToCartBtnShow();
        setTimeout(() => {
            setBtnSuccess(false)
        }, 2000)
        
    }

    const [showGoToCart, setShowGoToCart] = useState(false);

    const goToCartBtnShow = () => {
        setShowGoToCart(true);
    }

    let history = useHistory();

    const GoToCartRedirect = () => {
        history.push('/cart')
    }

    const [data, setData] = useContext(Store);
    
    const onAdd = () => {
        alternarSuccess();
        setData({...data, 
            cantidad: data.cantidad + cantidadProductos,
            items: [...data.items, props]})            
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="itemDetail">
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__image">
                    <img src="https://loremflickr.com/300/300" alt="Cerveza Andes Origen Rubia lata 473ml"/>
                </div>
                
            </div>
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__title">
                    <span className="itemDetail__wrapper__title-title">{props.titulo}</span>
                    <span className="itemDetail__wrapper__title-description">{props.descripcion}</span>
                </div>
                <div className="itemDetail__wrapper__variants">
                    <span className="itemDetail__wrapper__variants-text">¿Cuántas unidades?</span>
                    <span className="itemDetail__wrapper__variants-subText">Sólo múltiplos de 6</span>
                    <span className="itemDetail__wrapper__variants-stockText">Stock disponible: {props.stock} unidades</span>
                    <div className="itemDetail__wrapper__variants__options">
                        <button className="itemDetail__wrapper__variants__options-itemCount"
                        onClick={itemCountResta}
                        disabled={cantidadProductos === 6 ? "disabled" : null}
                        >-</button>
                
                        <input className="itemDetail__wrapper__variants__options-itemCountInput"
                        type="text" 
                        name="itemCountInput" 
                        readOnly={true}
                        value={cantidadProductos}
                        />
                
                        <button className="itemDetail__wrapper__variants__options-itemCount"
                        onClick={itemCountSuma}
                        disabled={cantidadProductos == props.stock ? "disabled" : null}
                        >+</button>
                    </div>
                </div>
                <div className="itemDetail__wrapper__price">
                    <span>${props.precio}</span>
                </div>
                <div className="itemDetail__wrapper__buy">
                    <button
                    disabled={btnSuccess ? 'disabled' : null}
                    onClick={onAdd}
                    className={btnSuccess ? "success" : ""}
                    >{btnSuccess ? "Agregado con éxito" : "Agregar al carrito"}</button>
                </div>
                <div className="itemDetail__wrapper__goToCart">
                    <button
                    onClick={GoToCartRedirect}
                    className={showGoToCart ? "show" : ""}
                    >Ver carrito</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;