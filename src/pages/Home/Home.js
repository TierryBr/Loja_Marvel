import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import { FiShoppingBag } from 'react-icons/fi';
import { FaShoppingBag, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';
 
import './styles.scss';

function Home() {
  const [comics, setComics] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, comic) => {
      sumAmount[comic.id] = comic.amount;
  
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/comics", {
      params: {
        limit: 18,
      },
    })
    .then((res) => {
      setComics(res.data.data.results);
      console.log(res.data.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleMore = useCallback(async () => {
    try {
      const offset = comics.length;
      const response = await api.get("/comics", {
        params: {
          offset,
          limit: 18,
        },
      });
      setComics([...comics, ...response.data.data.results]);
    } catch (error) {
      console.log(error);
    }
  }, [comics]);


  function handleAddProduct(comic) {
    dispatch(CartActions.addToCart(comic));
  }

  return (
    <main className="container">
     <ul className="book-catalog">
      {comics.map((comic) => (
        <li key={comic.id} className="book-container">
          <Link to={`/comics/${comic.id}`}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`Capa da ${comic.title}`} />
            <strong>{comic.title}</strong>
          </Link>
          {comic.prices.map((value) => (
            <span>
              { value.price === 0 ? (
                  <span>Grátis</span>
                ) : (
                  <span>{`Por $${value.price}`}</span>
                ) 
              }
            </span>
          ))}

          <button type="button" onClick={() => handleAddProduct(comic)}>
            <div>
              <FiShoppingBag size={16} color="#CD4F39" />{' '}
              {amount[comic.id] || 0}
            </div>

            <span>Adicionar</span>
          </button>
        </li>
      )) }
     </ul>

     <button type="button" className="more" onClick={handleMore}>
        VER MAIS QUADRINHOS
        <FaArrowDown size={20} className="arrowDown" />
      </button>
   </main>
  );
}

export default Home;