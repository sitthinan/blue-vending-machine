import React from "react";
import  { useState, useEffect } from 'react';

export default function Cart(props){
    const {cartItems , onAdd, onRemove } = props;

    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.product_price, 0);
    const totalPrice = itemsPrice;
    const [products, setProducts] = useState([])
    
    
    useEffect(()=>{
      fetch('http://127.0.0.1:8000/product/')
        .then(response => response.json())
        .then(products => setProducts(products))
    }, [])

    const checkout = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('totalPrice', itemsPrice);
      localStorage.setItem('products',  JSON.stringify(products))
      window.location = '/payment';
    };

    return (
        <aside className="block col-1">
            <h2>Cart Item</h2>
            <div>
                {cartItems.length === 0 && <div>Cart Is Empty</div> }
            </div>
            {cartItems.map((item)=>(
                <div key={item.product_id} className="row"> 
                    <div className="col-2">{item.product_name}</div>
                    <div className="col-2">
                        <button onClick={()=>onAdd(item)} className="add">+</button>
                        <button onClick={()=>onRemove(item)} className="remove">-</button>
                    </div>
                    <div  className="col-2 text-right">
                        {item.qty} x {item.product_price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                 <>
                 <hr></hr>
                 <div className="row">
                   <div className="col-2">
                     <strong>Total Price</strong>
                   </div>
                   <div className="col-1 text-right">
                     <strong>{totalPrice.toFixed(2)} ฿</strong>
                   </div>
                 </div>
                 <hr />
                 <div className="row">
                   <button onClick={() => checkout()}>
                     Checkout
                   </button>
                 </div>
               </>
            )}
        </aside>
    )
}