import { useCart } from "../store/cart-context";
import CustomModal from './CustomModal';
import styles from '../styles/Cart.module.css';
import { getAuthToken } from "../utils/auth";
import { PURCHASE_URL } from "../utils/urls";
import { useRef, useState } from "react";

export default function Cart({ cartChanged, cartChangeIndicator }) {

  const { items, updateItemQuantity, clearCart } = useCart();
  const modal = useRef();
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const token = getAuthToken();

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (items.length === 0) {
      setCheckoutMessage('No services were selected.');
      modal.current.open();
      return;
    }

    const purchasedServices = items.map(i => ({ name: i.name, quantity: i.quantity }));

    try {
      const response = await fetch(PURCHASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(purchasedServices)
      });

      const contentType = response.headers.get('Content-Type');
      let resData;
      if (contentType && contentType.includes('application/json')) {
        resData = await response.json();
      } else {
        resData = await response.text();
      }

      if (!response.ok) {
        console.error('HTTP error', response.status, resData);
        return;
      }

      setCheckoutMessage(resData);
      modal.current.open();
      clearCart();
      cartChangeIndicator(!cartChanged)
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
    <CustomModal ref={modal} message={checkoutMessage} />
      <div className={styles.wrapper}> 
        <ul className={styles['services-list']}>
        <h2>Cart</h2>
          {items.map(i => (
            <li key={i.id} className={styles['service-item']}>
              <span className={styles['item-name']}>{i.name}</span>
              <span className={styles['quantity-controls']}>
                <button onClick={() => updateItemQuantity(i.id, 1)} className={styles.btn}>+</button>
                <span className={styles.quantity}>{i.quantity}</span>
                <button onClick={() => updateItemQuantity(i.id, -1)} className={styles.btn}>-</button>
              </span>
            </li>
          ))}
          <p className={styles['total-price']}>
            {items.length > 0 ? `Total Price: ${totalPrice} ILS` : 'Nothing here yet'}
          </p>
          <button onClick={handleCheckout} className={styles.btn}>Checkout</button>
        </ul>
      </div>
    </>
  );
}