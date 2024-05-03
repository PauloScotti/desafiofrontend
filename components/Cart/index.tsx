/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

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

    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        // Obter os itens do carrinho do localStorage
        const cartItemsJSON = localStorage.getItem('cart');
        if (cartItemsJSON) {
            // Converter os itens do carrinho de JSON para um array de objetos
            const parsedCartItems = JSON.parse(cartItemsJSON) as Product[];
            setCartItems(parsedCartItems);
            console.log(parsedCartItems)
        }
    }, []);

    const removeItemFromCart = (itemId: number) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: 0 };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const sumFinalPrice = (itemId: number, price: string) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                const updatedFinalPrice = finalPrice + parseInt(price)
                return { ...item, quantity: quantity + 1, finalPrice: JSON.stringify(updatedFinalPrice) };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

        setQuantity(quantity + 1)
        const finalPrice = total + parseInt(price);
        setTotal(finalPrice);
    }

    const subFinalPrice = (itemId: number, price: string) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                const updatedFinalPrice = finalPrice + parseInt(price)
                return { ...item, quantity: quantity + 1, finalPrice: JSON.stringify(updatedFinalPrice) };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

        setQuantity(quantity + 1)
        const finalPrice = total + parseInt(price);
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
                    {
                        cartItems.length > 0
                            ?
                            <>
                                {
                                    cartItems.map((item) => (
                                        <div className="checkout-product" key={item.id}>
                                            <span className={mobile ? "remove-product" : "close-icon product"} onClick={(() => removeItemFromCart(item.id))}>X</span><div className="name-product">
                                                <img src={item.photo} alt={item.name} />
                                                <span>
                                                    {item.name}
                                                </span>
                                            </div><div className="selected-item-container">
                                                <span className={mobile ? 'display-none' : "quantity"}>Qtd</span>
                                                <div className="selected-item">
                                                    <span className="action" onClick={(() => subFinalPrice(item.id, item.price))}>-</span>
                                                    <div className="line"></div>
                                                    <span>{item.quantity}</span>
                                                    <div className="line"></div>
                                                    <span className="action" onClick={(() => sumFinalPrice(item.id, item.price))}>+</span>
                                                </div>
                                                <span className='span-price'>R${item.price}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <div>
                                <p>O carrinho está vazio.</p>
                            </div>
                    }
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