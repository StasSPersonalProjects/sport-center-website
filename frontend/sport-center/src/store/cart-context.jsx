import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => { },
  updateItemQuantity: () => { }
});

export const useCart = () => useContext(CartContext);

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      }

      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      const item = {
        id: action.payload.id,
        name: action.payload.name,
        quantity: 1,
        price: action.payload.price
      }
      updatedItems.push(item);
    }

    return {
      ...state,
      items: updatedItems
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      item => item.id === action.payload.id
    );
    const updatedItem = {
      ...updatedItems[updatedItemIndex]
    }
    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {

  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  function handleAddItemToCart(id, name, price) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id,
        name,
        price
      }
    });
  }

  function handleUpdateCartItemQuantity(id, amount) {
    cartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id,
        amount
      }
    })
  }

  const cartValues = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  };

  return (
    <CartContext.Provider value={cartValues} >
      {children}
    </CartContext.Provider>
  );
}