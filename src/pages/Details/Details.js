import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import "./styles.scss";

function Details() {
  const params = useParams();
  const [comicsDetail, setComicsDetail] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    api.get(`/comics/${params.id}`)
    .then((res) => {
      setComicsDetail(res.data.data.results);
      console.log(res.data.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  if (!comicsDetail) {
    return <p>carregando...</p>;
  }

  function handleAddProduct(comic) {
    dispatch(CartActions.addToCart(comic));
    history.push("/cart");
  }

  return (
    <div className="Container">
      {comicsDetail.map((comic) => (
        <div key={comic.id} className="Informations">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={`Capa da ${comic.title}`}
          />

          <div className="Info">
            <h2 className="Title">{comic.title}</h2>

            <div className="Details">
              <h2>Descrição</h2>
              <div className="Description">
                {comic.description === null ? (
                  <p>Desconhecido</p>
                ) : (
                  <p>{comic.description}</p>
                )}
              </div>

              <h2>Quantidade de páginas</h2>
              <div className="PageCount">
                {comic.pageCount === 0 ? (
                  <p>Desconhecido</p>
                ) : (
                  <p>{comic.pageCount}</p>
                )}
              </div>

              <h2>Preço</h2>
              <div className="Price">
                {comic.prices.map((value) => (
                  <p>
                    { value.price === 0 ? (
                      <p>Grátis</p>
                    ) : (
                      <p>{`$ ${value.price}`}</p>
                    ) }
                  </p>
                ))}
              </div>
            </div>
            <button type="button" className="btn-purchase" onClick={() => handleAddProduct(comic)}>
              <span>Comprar</span>
              <FaShoppingCart className="ShoppingCart" size={25} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Details;