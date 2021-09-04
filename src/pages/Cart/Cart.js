import { FiPlusCircle, FiMinusCircle, FiXCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import './styles.scss';

function Cart() {
  const cart = useSelector(state =>
    state.cart.map(comic => ({
      ...comic,
      subtotal: comic.price * comic.amount,
    }))
  );

  const total = useSelector(state =>
    state.cart.reduce((totalSum, comic) => {
      return totalSum + comic.prices[0].price * comic.amount;
    }, 0)
  );

  const dispatch = useDispatch();
 
  function increment(comic) {
    dispatch(CartActions.updateAmount({
      id: comic.id,
      amount: comic.amount + 1,
    }));
  }

  function decrement(comic) {
    dispatch(CartActions.updateAmount({
      id: comic.id,
      amount: comic.amount - 1,
    }));
  }



  return (
    <main className="container">
     <div className="bag-container">
       <table className="book-table">
         <thead>
           <tr>
             <th />
             <th>Quadrinhos</th>
             <th>Quantidade</th>
             <th>Subtotal</th>
             <th />
           </tr>
         </thead>
         <tbody>
          {cart.map(comic => (
             <tr key={comic.id}>
               <td>
                 <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`Capa da ${comic.title}`} />
               </td>
               <td>
                 <strong>{comic.title}</strong>
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
               </td>
               <td>
                 <div>
                   <button type="button" onClick={() => decrement(comic)}>
                     <FiMinusCircle size={20} color="#CD4F39" />
                   </button>
                   <input type="number" readOnly value={comic.amount} />
                   <button type="button" onClick={() => increment(comic)}>
                     <FiPlusCircle size={20} color="#CD4F39" />
                   </button>
                 </div>
               </td>
               <td>
               {comic.prices.map((value) => (
                    <strong>
                      { value.price === 0 ? (
                          <strong>$ 0</strong>
                        ) : (
                          <strong>{`$ ${value.price}`}</strong>
                        ) 
                      }
                    </strong>
                  ))}
               </td>
               <td>
                 <button
                   type="button"
                   onClick={() => dispatch(CartActions.removeFromCart(comic.id))}
                 >
                   <FiXCircle size={20} color="#CD4F39" />
                 </button>
               </td>
             </tr>
            ))}
         </tbody>
       </table>
 
       <footer>
         <button type="button">Encomendar</button>
 
         <div className="total">
           <span>Total</span>
           <strong>$ {total.toFixed(3).slice(0,-1)}</strong>
         </div>
       </footer>
     </div>
   </main>
  );
}

export default Cart;