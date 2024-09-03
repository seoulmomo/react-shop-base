import { atom, selector, useRecoilValue } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productsList } from "./products";
import { useEffect } from "react";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */
export const cartCount = selector<number>({
  key: "cartCount",
  get: ({ get }) => {
    const cartItems = get(cartState);
    return Object.keys(cartItems).reduce((acc: number, i: string) => {
      return acc + cartItems[i].count || 0;
    }, 0);
  },
});

export const cartTotal = selector<number>({
  key: "cartTotal",
  get: ({ get }) => {
    const products = get(productsList);
    const cartItem = get(cartState);
    return Object.keys(cartItem).reduce((acc: number, index: string) => {
      return acc + cartItem[index].count * products[parseInt(index) - 1].price || 0;
    }, 0);
  },
});

export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: ({ get }) => {
    const products = get(productsList);
    const cartItem = get(cartState);
    return Object.keys(cartItem).map((i) => {
      const item = cartItem[i];
      return {
        id: item.id,
        title: products[item.id - 1].title,
        image: products[item.id - 1].image,
        count: item.count,
        price: products[item.id - 1].price,
      };
    });
  },
});

// addToCart는 구현 해보세요.
export const addToCart = (cart: ICartState, id: number) => {
  if (!cartState[id]) {
    cartState[id] = {
      id,
      count: 1,
    };
    return {
      ...cart,
      [id]: {
        id,
        count: 1,
      },
    };
  }
  cartState[id].count++;
  return { ...cart, [id]: { id, count: cartState[id].count } };
};
// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: number) => {
  const tempCart = { ...cart };
  if (tempCart[id].count === 1) {
    delete tempCart[id];
    return tempCart;
  } else {
    return { ...tempCart, [id]: { id: id, count: cart[id].count - 1 } };
  }
  // useCartLoad();
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
export const useCartLoad = () => {
  const cartValue = useRecoilValue(cartState);
  const setCartData = () => {
    localStorage.setItem(CART_ITEM, JSON.stringify(cartValue));
  };
  useEffect(() => {
    setCartData();
  }, [cartValue]);
};
