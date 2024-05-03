import Image from "next/image";
import cartIcon from '../../../public/icons/cartIcon.svg';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "../../Cart";


export default function Header() {
    const [counter, setCounter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const quantityProductsOnBag = () => {
        const cartItems = localStorage.getItem('cart')

        if (!cartItems) {
            return 0;
        }

        const cartLenght = JSON.parse(cartItems) as Product[];

        setCounter(cartLenght.length)

        return cartLenght.length;

    }

    useEffect(() => {
        quantityProductsOnBag()
    })

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
                        <Cart toggleMenu={toggleMenu} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}