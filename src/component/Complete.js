import React from 'react'
import Header from './Header';
import  { useState, useEffect } from 'react';
import axios from 'axios';
 
export default function Payment() {

    const tempChgArr = [];
    const change =  localStorage.getItem("change");
    const money =  JSON.parse(localStorage.getItem("money"));
    const cash =  JSON.parse(localStorage.getItem("cash"));
    const products =  JSON.parse(localStorage.getItem("products"));
    const cartItems =  JSON.parse(localStorage.getItem("cartItems"));
    
    const [chgArr, setchgArr] = useState([])


    useEffect(() => {
        // console.log(money);
        calcurateChange(change, money );
        
     }, []);

    const calcurateChange = (change,money) => {
      let tempArray = [1000,500,100,50,20,10,5,1];
      for (let i = 0; i < tempArray.length; i++) {
        if(change >= tempArray[i]){
          let moneyValue = tempArray[i];
          let changeQty = Math.floor(change / moneyValue);
          change = change - (changeQty*moneyValue);
          let obj = {
            id : moneyValue,
            qty: changeQty,
            type: money.find(x => x.money_value == moneyValue).money_type
          }
          tempChgArr.push(obj)
        }
      }
      setchgArr(tempChgArr)
      updateMoney(money,cash,tempChgArr)
    }

    const updateMoney = (money,cash, tempChgArr) => {
      tempChgArr.forEach(element=>{
        const money_amount = money.find(i=> i.money_value === element.id).money_amount;
        if(money_amount < element.qty){
          window.location = '/cantServe'
        }
      })
      money.forEach(async element => {
        const incomeObj = cash.find(i=> i.id === element.money_value);
        const outcomeObj = tempChgArr.find(i => i.id === element.money_value);
        let income = 0;
        let outcome = 0;
        if (incomeObj){
          income = incomeObj.qty;
        }
        if (outcomeObj){
          outcome = outcomeObj.qty;
        }
        if(incomeObj || outcomeObj){
          element.money_amount = element.money_amount + income - outcome;
          await axios.put('http://127.0.0.1:8000/money/', element);
        }

      });
      updateProduct(products,cartItems)
    }
    const updateProduct = (products, cartItems) => {
      cartItems.forEach(async element => {
        const product = products.find(p=> p.product_id === element.product_id);
        if(product){
          product.product_amount = product.product_amount - element.qty;
          const response = await axios.put('http://127.0.0.1:8000/product/', product);
        }
      });
    }
    const goHome = () =>{
        localStorage.clear();
        window.location = '/main'
    }
 
  return (
    <div>
       <Header></Header>
       <div className='row'>
           <div className="block col-2">
               <div><strong>Thank you</strong></div>
                <div>
                    <p>Please collect your products {change != 0 && ( <> and the {change}฿ change </> )}, Thank you!</p>
                    {change != 0 && ( <>
                      <ul>
                      The change you will receive is
                      {chgArr.map((item)=>(
                           <li key={item.id} style={{padding:'10px'}}>{item.qty}x {item.id} {item.type}</li>
                      ))}
                    </ul>
                    </> )}
                   
                </div>
                <div>
                    <button onClick={() => goHome()}>Buy again</button>
                </div>
           </div>
           
        </div>
    </div>
  )
}
 