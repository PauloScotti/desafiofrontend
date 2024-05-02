/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface CartProps {
    toggleMenu: () => void;
}

interface CartProductsProps {
    cart: Product[];
}

export default function Cart({ toggleMenu }: CartProps, { cart }: CartProductsProps) {
    const mobile = window.innerWidth <= 992;
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [price, setPrice] = useState("500");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    console.log(cart)

    const sumFinalPrice = (price: string) => {
        setQuantity(quantity + 1)
        const finalPrice = total + parseInt(price);
        setTotal(finalPrice);
    }

    const subFinalPrice = (price: string) => {
        setQuantity(quantity - 1)
        const finalPrice = total - parseInt(price);
        setTotal(finalPrice);
    }

    return (
        <>
            <div className="checkout">
                <div className="checkout-header">
                    <h2>Carrinho&nbsp; de compras</h2>
                    <p className="close-icon" onClick={toggleMenu}>X</p>
                </div>
                <div className="checkout-products">
                    <div className="checkout-product">
                        <span className={mobile ? "remove-product" : "close-icon product"}>X</span>
                        <div className="name-product">
                            <img src={photo} alt={name} />
                            <span>
                                {name}
                            </span>
                        </div>
                        <div className="selected-item-container">
                            <span className={mobile ? 'display-none' : "quantity"}>Qtd</span>
                            <div className="selected-item">
                                <span className="action" onClick={(() => subFinalPrice(price))}>-</span>
                                <div className="line"></div>
                                <span>{quantity}</span>
                                <div className="line"></div>
                                <span className="action" onClick={(() => sumFinalPrice(price))}>+</span>
                            </div>
                            <span className='span-price'>R${price}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="final-action">
                <div className="final-value">
                    <span>Total:</span>
                    <span>R${total}</span>
                </div>
                <div className="final-action-button">
                    <span>Finalizar Compra</span>
                </div>
            </div>
        </>
    )
}