
import { useState } from "react";
import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);
  const closeCartHanler = () => {
    setCartIsShow(false);
  }
  const showCartHandler = () => {
    setCartIsShow(true)
  }

  return (
    <CartProvider>
      {cartIsShow && <Cart onCloseCart={closeCartHanler} cartIsShow={cartIsShow} />}
      <Header onShowCart={showCartHandler} />
      <main>

        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
