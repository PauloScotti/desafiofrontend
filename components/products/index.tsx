/* eslint-disable @next/next/no-img-element */
import Skeleton from 'react-loading-skeleton'
import React, { useState } from 'react';

import shoppingBagIcon from '../../public/icons/shoppingBagIcon.svg';
import Image from 'next/image';
import { ProductServices } from '../../services/ProductsServices';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const productsServices = new ProductServices()

const Products: React.FC = () => {

  const [items, setItems] = useState<Product[]>(() => {
    const storedItems = localStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Função para salvar o carrinho no localStorage sempre que houver mudanças
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const [ids, setIds] = useState(0);
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('itens')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

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
      var updatedFinalPrice = parseInt(newItem.price);
      updatedItems[itemIndex].quantity += 1;
      updatedItems[itemIndex].finalPrice = JSON.stringify(updatedFinalPrice);
      setItems(updatedItems);
      console.log(updatedItems[itemIndex].finalPrice)
    } else {
      newItem.quantity = 1;
      var updatedFinalPrice = parseInt(newItem.finalPrice) + parseInt(newItem.price)
      newItem.finalPrice = JSON.stringify(updatedFinalPrice);
      setItems(prevItems => [...prevItems, newItem]);
    }
  };

  return (
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
  );
}

export default Products;
