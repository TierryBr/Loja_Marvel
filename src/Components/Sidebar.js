import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
import { FiShoppingBag } from 'react-icons/fi';
import "../styles/sidebar.scss";
 
import logo from '../assets/m.png';
 
export default function Header() {
const cartSize = useSelector(state => state.cart.length);

 return (
   <header className="header">
     <Link to="/" className="logo">
       <img className="logo-icon" src={logo} alt="Marvel" />
       <span className="logo-text">arvel</span>
     </Link>
 
     <Link to="/cart" className="header-cart">
       <div>
         <strong>Carrinho</strong>
         <span>
           <strong>{cartSize}</strong> quadrinhos
         </span>
       </div>
       <FiShoppingBag size={36} color="#1C1C1C" />
     </Link>
   </header>
 );
}