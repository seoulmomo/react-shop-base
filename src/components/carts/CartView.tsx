import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import { toCurrencyFormat } from "../../helpers/helpers";
import { cartTotal, cartList, ICartItems } from "../../store/cart";
import { useRecoilValueLoadable } from "recoil";
import CartList from "./CartList";
import ProductViewLoad from "../products/ProductViewLoad";

const CartView = (): JSX.Element => {
  const totalPrice = useRecoilValueLoadable(cartTotal).contents || 0;
  const cartListLoadable = useRecoilValueLoadable<ICartItems[]>(cartList);
  // const cartItems = useRecoilValueLoadable(cartList).contents;
  const cartItems: ICartItems[] = cartListLoadable.state === "hasValue" ? cartListLoadable.contents : [];

  if (useRecoilValueLoadable(cartList).state === "loading") return <ProductViewLoad />;
  return (
    <>
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {/* 물품이 없다면? */}
        {cartItems.length <= 0 && (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        )}

        <div className="lg:flex justify-between mb-20">
          <div>
            {cartItems.length > 0
              ? cartItems.map((cart: ICartItems) => {
                  return <CartList key={cart.id} data={cart} />;
                })
              : ""}
          </div>
          {/* 구매하기 버튼 등 화면을 구성 해보세요. */}
          <div className="self-start shrink-0 flex items-center mt-10 mb-20">
            <span className="text-xl md:text-2xl">총 : {toCurrencyFormat(totalPrice)}</span>
            <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
              구매하기
            </label>
          </div>
        </div>
      </div>
      <Confirm />
    </>
  );
};

export default CartView;
