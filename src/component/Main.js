import React from 'react'
import Header from './Header';
import Menu from './Menu';
import Cart from './Cart';
import  { useState, useEffect } from 'react';

export default function Main() {

  const [cartItems, setCartItems ] = useState([]);
  const [products, setProducts] = useState([])
  
  useEffect(()=>{
    localStorage.clear();
    fetch('http://127.0.0.1:8000/product/')
      .then(response => response.json())
      .then(products => setProducts(products))
  }, [])
 
  const onAdd = (product) => {
    if(product.product_amount == 0){
      return;
    }
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    console.log(exist)
    if(exist && exist.qty + 1 > product.product_amount){
      return;
    }
    if(exist) {
      setCartItems(
        cartItems.map((x) => 
        x.product_id === product.product_id ? {...exist, qty: exist.qty + 1 } : x
        )
      );
    }else{
      setCartItems([...cartItems, { ...product, qty:1}]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.product_id !== product.product_id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
 
  return (
    <div>
        <Header></Header>
        <div className='row'>
            <Menu onAdd={onAdd} products={products} ></Menu>
            <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} ></Cart>
        </div>
     </div>
  );
}
