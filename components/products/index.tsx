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
  }

  interface ApiResponse {
    products: Product[];
    count: number;
  }

  const addProductsOnBag = async (product: any) => {
    try {
      const itensOnBag = localStorage.getItem('itens')
      let quantidade = 0;

      if (!itensOnBag) {
        const list = {
          product: product,
          quantity: quantidade + 1
        }
        localStorage.setItem('cart', JSON.stringify(list))
      }

      const existsInCard = cart.find(p => p.id === product.id);

      if (existsInCard) {

        cart.map(product => {
          let novaQuantidade = 0;
          quantidade = product.quantity + 1;
          return quantidade
        })
      }


    } catch (erro: any) {
      const result = (erro as Error).message;
      toast.error(result);
    }
  }

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
          <div className="shopping-bag" onClick={() => addProductsOnBag(product)}>
            <Image src={shoppingBagIcon} alt="Adicionar ao carrinho" />
            <span>{"Comprar"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
