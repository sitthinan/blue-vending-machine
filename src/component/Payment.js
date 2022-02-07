import React from 'react'
import Header from './Header';
import  { useState, useEffect } from 'react';


export default function Payment() {
   
    const [money, setMoney] = useState([])
    useEffect(()=>{
      fetch('http://127.0.0.1:8000/money/')
        .then(response => response.json())
        .then(money => setMoney(money))
    }, [])
    const [payObj] = useState([])
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const totalPrice = localStorage.getItem("totalPrice");
    let [paid, setPaid] = React.useState(0);
    let [debt, setDebt] = React.useState(totalPrice);

 

    // var payObj = []
    
    const handleChange = (id) => {
        const obj = {
            id:id,
            qty:document.getElementById(id).value
        }
        if(payObj.find((o)=> o.id === obj.id)){
            payObj.map((o) => {
                if(o.id === obj.id){
                    o.qty = obj.qty
                }
            })
        }else{
            payObj.push(obj)
        }
        pay()
    };
    const pay = () => {
        paid = payObj.reduce((a, c) => a + c.id * c.qty, 0)
       
        setPaid(paid)
        setDebt((totalPrice - paid) >=0 ? (totalPrice - paid) : 0 )

        if(paid >= totalPrice){
          payComplete()
        } 
        
    };
    const payComplete = () => {        
        localStorage.setItem('change', paid - totalPrice);
        localStorage.setItem('money',  JSON.stringify(money))
        localStorage.setItem('cash',  JSON.stringify(payObj))

        window.location = '/complete'
    };
   
      
      
  return (
    <div>
       <Header></Header>
       <div className='row'>
           <div className="block col-2">
               <div><strong>Payment Methed</strong></div>
                <div className="checkbox-group">
                    {money.map((item)=>(
                        <div key={item.money_value} className="row"> 
                            <img  style={{padding:10,maxWidth:200 }} className="small"  src={require(`../assets/img/money/${item.money_value}.png`)} alt={item.money_value} />
                            <div style={{padding:50}}>
                                <input style={{height:20}} type="number" name={item.money_value} min="0" access="false" id={item.money_value} onChange={() => handleChange(item.money_value)}></input>
                            </div>
                        </div>
                ))}
                </div>
           </div>
           <div className="block col-1">
           <div>Summary</div>
           <br />
           {cartItems.map((item)=>(
                <div key={item.product_id} className="row"> 
                    <div className="col-2">{item.product_name}</div>
                 
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
                     <strong>{totalPrice} ฿</strong>
                   </div>
                 </div>
                 <hr />
                 <div className="row">
                   <div className="col-2">
                     <strong>Paid</strong>
                   </div>
                   <div className="col-1 text-right">
                     <strong>{paid} ฿</strong>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-2">
                     <strong>Debt</strong>
                   </div>
                   <div className="col-1 text-right">
                     <strong>{debt} ฿</strong>
                   </div>
                 </div>
               </>
            )}
           
           </div>
        </div>
    </div>
  )
}
 