import React from "react";
import Product from './Product'

const styles = {
    display: 'flex',
    "flexWrap": 'wrap'
}
 
export default function Menu(props){
    const {products , onAdd} = props
 
    return (
        <main className="block col-2">
            <h2>Products</h2>
            <div  style={{padding:"0 0 0 40px"}}>
                <div className="row" style={styles}>
                {products.map((product) => (
                    <Product key={product.product_id} product={product} onAdd={onAdd} ></Product>
                ))}
                </div>
            </div>
        </main>        
    )
}