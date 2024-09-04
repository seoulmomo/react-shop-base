import BreadCrumb from "../common/Breadcrumb";
import { Link } from "react-router-dom";
import { productsList, IProduct } from "../../store/products";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useParams } from "react-router";
import ProductViewLoad from "./ProductViewLoad";
import Rating from "../common/Rating";
import { ICartState, cartState, addToCart, cartList, ICartItems } from "../../store/cart";

function ProductView() {
  const params = useParams();
  const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const cartListLoadable = useRecoilValueLoadable<ICartItems[]>(cartList);
  // const cartItems: ICartItems[] = cartListLoadable.state === "hasValue" ? cartListLoadable.contents : [];
  let products: IProduct[] = "hasValue" === ProductsLoadable.state ? ProductsLoadable.contents : [];
  const product = products.filter((item) => item.id == Number(params.id));

  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const addToCartHandler = (id: number) => {
    setCart(addToCart(cart, id));
  };

  // skelton ui
  if (ProductsLoadable.state === "loading") return <ProductViewLoad />;

  return (
    <div>
      <BreadCrumb category={product[0].category} crumb={product[0].title} />
      <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
        <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
          <img src={product[0].image} alt={product[0].title} className="object-container w-full h-72" />
        </figure>
        <div className="card-body px-1 lg:px-12">
          <h2 className="card-title">
            {product[0].title}
            <span className="badge badge-accent ml-2">NEW</span>
          </h2>
          <p>{product[0].description}</p>
          <Rating rate={product[0].rating.rate} count={product[0].rating.count} />
          <p className="mt-2 mb-4 text-3xl">{toCurrencyFormat(product[0].price)}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => addToCartHandler(product[0].id)}>
              장바구니에 담기
            </button>
            <Link className="btn btn-outline ml-1" to="/cart">
              장바구니로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
