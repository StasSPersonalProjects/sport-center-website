import { useCart } from '../store/cart-context';
import styles from '../styles/OfferedServicesList.module.css';

export default function OfferedServicesList({ title, services }) {

  const { addItemToCart } = useCart();

  const handleBuy = (name, id, price) => {
    addItemToCart(id, name, price);
  }

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <ul className={styles['services-list']}>
        {services.map(s =>
          <li key={s.id} >
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <div className={styles['purchase-info']}>
              <p>{s.price} ILS</p>
              <button
                className={styles.btn}
                onClick={() => handleBuy(s.name, s.id, s.price)}>
                Buy
              </button>
            </div>
          </li>)}
      </ul>
    </div>
  );
}