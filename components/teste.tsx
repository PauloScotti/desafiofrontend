/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "@/components";
import Skeleton from "react-loading-skeleton";
import { ProductServices } from "@/services/ProductsServices";
import { useQuery } from "@tanstack/react-query";

import cartIcon from '../public/icons/cartIcon.svg';
import shoppingBagIcon from '../public/icons/shoppingBagIcon.svg';

const productsServices = new ProductServices()

export default function Teste() {
    const [counter, setCounter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const mobile = window.innerWidth <= 992;
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [price, setPrice] = useState("500");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [cart, setCart] = useState<Product[]>([]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async (): Promise<ApiResponse> => {
            const response = await productsServices.getProducts()
            return response.data;
        }
    });

    if (isLoading) {
        return (
            <div className='products'>
                <div className="product">
                    <div className="name">
                        <p>{<Skeleton />}</p>
                        <span className='span-price'>{<Skeleton />}</span>
                    </div>
                    <span className='description'>{<Skeleton />}</span>
                    <div className="shopping-bag">
                        <span>{<Skeleton />}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return <div>Erro ao carregar todos</div>
    }

    interface Product {
        id: number;
        name: string;
        brand: string;
        description: string;
        photo: string;
        price: string;
        createdAt: string;
        updatedAt: string;
        quantity: number;
    }

    interface ApiResponse {
        products: Product[];
        count: number;
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

    function addProductsOnBag(id: number, photo: string, name: string, price: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="header">
            <div className="logo">
                <h1>MKS</h1><span>Sistemas</span>
            </div>
            <div className="cart" onClick={toggleMenu}>
                <Image src={cartIcon} alt="Carrinho" />
                <span>{counter}</span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        style={{ position: 'fixed', top: 0, right: 0, height: '100%', background: '#0F52BA', zIndex: '2' }}
                    >
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
                    </motion.div>
                )}
            </AnimatePresence>
            <div className='products'>
                {data?.products.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.photo} alt={product.name} />
                        <div className="name">
                            <p>{product.name}</p>
                            <span className='span-price'>{'R$' + parseInt(product.price).toLocaleString('pt-BR')}</span>
                        </div>
                        <span className='description'>{product.description}</span>
                        <div className="shopping-bag" onClick={() => addProductsOnBag(product.id, product.photo, product.name, product.price)}>
                            <Image src={shoppingBagIcon} alt="Adicionar ao carrinho" />
                            <span>{"Comprar"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}