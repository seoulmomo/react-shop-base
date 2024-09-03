import React, { Suspense } from "react";
import { IProduct, productsList } from "../../store/products";
import { useRecoilValueLoadable } from "recoil";
import ProductsLoad from "./ProductsLoad";

interface Items {
  title?: string;
  limit?: number;
  data?: Array<IProduct>;
  scroll?: boolean;
}

// defaultProps(초기값)이 지원 종료되어 파라미터형식으로 변경
const ItemList = ({ title = "", limit = 4, scroll = false }: Items): JSX.Element => {
  const ProductsList = React.lazy(() => import("./ProductList"));
  const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  let products: IProduct[] = "hasValue" === ProductsLoadable.state ? ProductsLoadable.contents : [];

  switch (title) {
    case "패션":
      products = products.filter((item) => item.category === "men's clothing" || item.category === "women's clothing");
      break;
    case "액세서리":
      products = products.filter((item) => item.category === "jewelery");
      break;
    case "디지털":
      products = products.filter((item) => item.category === "electronics");
      break;
    default:
      break;
  }

  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll={scroll}>
        <Suspense fallback={<ProductsLoad limit={limit} />}>
          <ProductsList products={products} limit={limit} />
        </Suspense>
      </div>
    </>
  );
};

export default ItemList;
