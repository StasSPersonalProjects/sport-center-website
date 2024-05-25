import { useState } from "react";
import Cart from "../components/Cart";
import PurchasedServices from "../components/PurchasedServices";

export default function PersonalRoomPage() {

  const [cartChanged, setCartChanged] = useState(false);

  return (
    <>
      <Cart cartChanged={cartChanged} cartChangeIndicator={setCartChanged}/>
      <PurchasedServices cartChanged={cartChanged}/>
    </>
  );
}