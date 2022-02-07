
import React from 'react';
import { Link , Route, Routes } from 'react-router-dom'
import Main from './component/Main';
import Payment from './component/Payment';
import Complete from './component/Complete';


const welcomeText = {
    position: "absolute",
    width: "600px",
    height: "300px",
    margin: "10% 30%",
    textAlign: "center"
}
const headText = {
    textAlign: "center",
    color: '#fff',
    textTransform: "uppercase",
    fontSize: "49px"
}
const headButton = {
    border: "1px solid #fff",
    padding: "10px 25px",
    textDecoration: "none",
    textTransform: "uppercase",
    fontSize: "14px",
    marginTop: "20px",
    display: "inline-block",
    color: "#fff"
}

const Home = () => {
  return (
  <div>
     <div>
          <div style={welcomeText}>
              <h1 style={headText}>Blue <span>Vending Machine</span></h1>
              <Link style={headButton} to="/main">Place your Order Here</Link>
          </div>
      </div>
  </div>
  )
}



export default function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/payment" element={<Payment />} />

       </Routes>
     </div>
  );
}
