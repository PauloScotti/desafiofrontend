/* eslint-disable @next/next/no-img-element */
import Skeleton from 'react-loading-skeleton'
import React, { useState } from 'react';

import shoppingBagIcon from '../../public/icons/shoppingBagIcon.svg';
import Image from 'next/image';
import { ProductServices } from '../../services/ProductsServices';
import { useQuery } from '@tanstack/react-query';

const productsServices = new ProductServices()

export default function Principal() {

    const hasWindow = typeof window !== 'undefined';
    const [items, setItems] = useState<Product[]>(() => {
        if (hasWindow) {
            const storedItems = localStorage.getItem('cart');
            return storedItems ? JSON.parse(storedItems) : [];
        }
    });

    // Função para salvar o carrinho no localStorage sempre que houver mudanças
    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async (): Promise<ApiResponse> => {
            const response = await productsServices.getProducts()
            console.log(response)
            return response.data;
        }
    });

    if (isLoading) {
        return (
            <div className="principal">
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
        finalPrice: string;
    }

    interface ApiResponse {
        products: Product[];
        count: number;
    }

    const addToCart = (newItem: Product) => {
        const itemIndex = items.findIndex(item => item.id === newItem.id);

        if (itemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[itemIndex].quantity += 1;
            setItems(updatedItems);
        } else {
            newItem.quantity = 1;
            setItems(prevItems => [...prevItems, newItem]);
        }
    };

    return (
        <div className="principal">
            <div className='products'>
                {data?.products.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.photo} alt={product.name} />
                        <div className="name">
                            <p>{product.name}</p>
                            <span className='span-price'>{'R$' + parseInt(product.price).toLocaleString('pt-BR')}</span>
                        </div>
                        <span className='description'>{product.description}</span>
                        <div className="shopping-bag" onClick={() => addToCart(product)}>
                            <Image src={shoppingBagIcon} alt="Adicionar ao carrinho" />
                            <span>{"Comprar"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}