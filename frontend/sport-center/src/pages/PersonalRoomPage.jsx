import { useCart } from "../store/cart-context";

export default function PersonalRoomPage() {

  const { items, updateItemQuantity } = useCart();

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map(
          i =>
            <li key={i.id}>
              {i.name}
              {i.quantity}
              {i.price}
            <button onClick={() => updateItemQuantity(i.id, 1)}>+</button>
            <button onClick={() => updateItemQuantity(i.id, -1)}>-</button>
            </li>
        )}
        {items.length > 0 ? `${'Total Price: ' + totalPrice}` : `Nothing here yet`}
        
      </ul>
    </div>
  );
}