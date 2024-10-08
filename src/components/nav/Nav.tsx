import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { useEffect, useRef } from "react";
import { darkModeState } from "../../atoms";
import Search from "../search/Search";
import { cartCount } from "../../store/cart";
import CONSTANTS from "../../constants/constants";

const Nav = () => {
  const cartCountValue = useRecoilValue(cartCount);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  const menus = [
    { name: "fashion", title: "패션" },
    { name: "accessory", title: "액세서리" },
    { name: "digital", title: "디지털" },
  ];

  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
    if (localStorage.getItem("theme") === CONSTANTS.THEME.LIGHT) {
      setLight();
    } else {
      setDark();
    }
  }, []);

  const toggleDarkMode = () => {
    const htmlElement = document.querySelector("html");

    if (!htmlElement) {
      return;
    }
    if (darkMode.theme === "darkTheme") {
      htmlElement.classList.remove("dark");
      // $htmlRef.current?.setAttribute("data-theme", CONSTANTS.THEME.LIGHT);
      htmlElement.setAttribute("data-theme", CONSTANTS.THEME.LIGHT);
      setLight();
      setDarkMode({ theme: "lightTheme" });
    }
    if (darkMode.theme === "lightTheme") {
      htmlElement.classList.add("dark");
      htmlElement.setAttribute("data-theme", CONSTANTS.THEME.DARK);
      setDark();
      setDarkMode({ theme: "darkTheme" });
      return;
    }
  };

  // const $htmlRef = useRef<HTMLElement>(null);
  const htmlElement = document.querySelector("html");

  const setLight = () => {
    // $htmlRef.current?.classList.add(CONSTANTS.THEME.LIGHT);
    // $htmlRef?.current?.setAttribute("data-theme", CONSTANTS.THEME.LIGHT);
    htmlElement!.setAttribute("data-theme", CONSTANTS.THEME.LIGHT);
    localStorage.setItem("theme", CONSTANTS.THEME.LIGHT);
  };
  const setDark = () => {
    // $htmlRef.current?.classList.add(CONSTANTS.THEME.DARK);
    // $htmlRef?.current?.setAttribute("data-theme", CONSTANTS.THEME.DARK);
    htmlElement!.setAttribute("data-theme", CONSTANTS.THEME.DARK);
    localStorage.setItem("theme", CONSTANTS.THEME.DARK);
  };

  return (
    <div className="fixed z-10 w-full navbar shadow-lg bg-white dark:bg-neutral text-neutral-content">
      <div className="flex w-full xl:container xl:m-auto">
        <label htmlFor="side-menu" className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto">
          <svg
            className="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <h1 className="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
          <Link to={"/"} className="text-lg text-gray-700 dark:text-white font-bold whitespace-nowrap">
            React Shop
          </Link>
        </h1>
        <div className="flex-none hidden md:flex md:flex-1 ml-2">
          {menus.map((menu) => {
            {
              return (
                <Link
                  to={`/${menu.name}`}
                  key={menu.name}
                  className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
                >
                  {menu.title}
                </Link>
              );
            }
          })}
        </div>
        {/* darkMode, search Bar, cart */}
        <div className="flex items-center px-2">
          <label className="swap swap-rotate mr-2 sm:mr-4">
            <input type="checkbox" className="js-theme" onClick={toggleDarkMode} />
            <svg className="swap-off fill-white w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path>
            </svg>
            <svg className="swap-on fill-black w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
            </svg>
          </label>
          <Search />
          <Link className="btn btn-ghost w-10 sm:w-12 ml-1" to={"/cart"}>
            <span className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-gray-700 dark:stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              <span className="inline-flex items-center justify-center absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2">
                {cartCountValue}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
