import React from 'react'
 
const styles = {
     width: "30%",
     padding:"5px"
 }
export default function Product(props) {
    const {product, onAdd} = props;
  return (
    <div style={styles}>
      <div style={{textAlign: "center"}}>
        <img className="small" src={require(`../assets/img/products/${product.product_id}.png`)} alt={product.name} />
      </div>
      <h3>{product.product_name}</h3>
      <div style={{margin: "10px 0px"}}>Price {product.product_price}  ฿ </div>
      <div style={{margin: "10px 0px"}}>Available {product.product_amount} </div>
      <div>
          <button onClick={()=>onAdd(product)} >Add To Cart</button>
      </div>
    </div>
  )
}
