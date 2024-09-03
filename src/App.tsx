import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/nav/Nav";
import { useRef } from "react";
import { useCartLoad } from "./store/cart";

const App = (): JSX.Element => {
  const $hamburger = useRef<HTMLInputElement>(null);
  const closeOverlay = () => {
    $hamburger.current?.click();
  };
  useCartLoad();
  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" ref={$hamburger} />
      <section className="drawer-content">
        {/* Nav를 렌더링 하세요 */}
        <Nav />
        <section className="main pt-16">
          <Router />
        </section>
        {/* Footer를 렌더링 하세요 */}
      </section>
      <Drawer closeOverlay={closeOverlay} />
    </BrowserRouter>
  );
};

export default App;
