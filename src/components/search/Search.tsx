import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { productsList, IProduct } from "../../store/products";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const productsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const products: IProduct[] = "hasValue" === productsLoadable.state ? productsLoadable.contents : [];
  const [filterItem, setFilterItem] = useState(products);
  const $search = useRef<HTMLInputElement>(null);
  const $searchedItem = ".js-searchedItem";

  const seacrhChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const goItemLink = (id: number) => {
    setSearch("");
    navigate(`/product/${id}`);
  };

  const searchList = (e: any) => {
    if (e.keyCode === 40) {
      e.preventDefault();
      let $next = e.target.nextElementSibling;
      if (!$next || !$next.querySelector($searchedItem)) {
        return;
      }
      $next.querySelector($searchedItem).focus();
    } else if (e.keyCode === 13) {
      e.preventDefault();
      let $next = e.target.nextElementSibling.querySelector("li a");
      !!$next && $next.click();
    }
  };
  const changeTarget = (e: any) => {
    if (e.keyCode === 38) {
      e.preventDefault();
      let $prev = e.target.parentElement.previousElementSibiling;
      if (!$prev) {
        $search.current?.focus();
        return;
      }
      $prev.querySelector($searchedItem).focus();
    } else if (e.keyCode === 40) {
      e.preventDefault();
      let $next = e.target.parentElement.nextElementSibiling;
      if (!$next) {
        return;
      }
      $next.querySelector($searchedItem).focus();
    }
  };

  const toggleSearch = () => {
    $search.current?.classList.toggle("-z-10");
    $search.current?.classList.toggle("translate-y-full");
    $search.current?.classList.toggle("!opacity-100");
    $search.current?.blur();
    setSearch("");
    setFilterItem([]);
  };

  useEffect(() => {
    if (products.length !== 0) {
      setFilterItem(
        products.filter(($ele) => {
          if (search === "") return;
          return $ele.title.toLowerCase().includes(search.toLowerCase());
        }),
      );
    }
  }, [search, products]);

  return (
    <div className="dropdown">
      <button
        type="button"
        onClick={toggleSearch}
        className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-gray-700 dark:stroke-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      <input
        type="text"
        placeholder="검색"
        ref={$search}
        onChange={seacrhChange}
        className="fixed left-0 top-4 opacity-0 -z-10 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput"
        value={search}
      ></input>
      <ul className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-600">
        {filterItem.map((product) => {
          return (
            <li key={product.id}>
              <Link
                to={`product/${product.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goItemLink(product.id);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  goItemLink(product.id);
                }}
                onKeyDown={changeTarget}
                className="text-left js-searchedItem"
              >
                <span className="text-gray-600 dark:text-white line-clamp-2">{product.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
