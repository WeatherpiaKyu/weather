import { useContext, useEffect, useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { QueryContext } from "./layout/RootLayout";
import { NavLink, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ThemeSwitch from "./components/ThemeSwitch";
import wplogo from "./pictures/weatherpialogo.png";
import {
  useSpring,
  useSpringRef,
  animated,
  useSpringValue,
} from "@react-spring/web";

export default function Navigator(props) {
  const {
    menuItem,
    menuOn,
    setMenuOn,
    currentRoute,
    setCurrentRoute,
    toggleTheme,
    isDarkTheme,
  } = useContext(QueryContext);
  const [subMenuOn, setSubMenuOn] = useState(false);
  const [subMenuElem, setSubMenuElem] = useState([]);
  const [subSubMenuOn, setSubSubMenuOn] = useState(false);
  const [subSubMenuElem, setSubSubMenuElem] = useState([]);
  const [activeItem, setActiveItem] = useState([null, null, null]);
  const [showNav, setShowNav] = useState(true);

  let location = useLocation();

  const springRefBorderLeft = useSpringRef();
  const springRefBorderRight = useSpringRef();
  const springRefBorderMiddle = useSpringRef();

  const springBorderLeft = useSpring({
    ref: springRefBorderLeft,
  });
  const springBMValue = useSpringValue(0, {
    config: {
      mass: 2,
      friction: 20,
      tension: 100,
    },
  });
  const springBRValue = useSpringValue(0, {
    config: {
      mass: 2,
      friction: 20,
      tension: 100,
    },
  });

  const controlNavbar = () => {
    if (window.scrollY > 30) {
      setShowNav(false);
      setMenuOn(false);
    } else {
      setShowNav(true);
    }
  };

  const handleToggleMenu = () => {
    setMenuOn(!menuOn);
    if (menuOn) {
      setSubMenuOn(!menuOn);
      setSubSubMenuOn(!menuOn);
      setSubMenuElem([]);
      setSubSubMenuElem([]);
    }
  };

  const handleMenuExtend = (level, itemName) => {
    // Helper function to find item by name within a given array
    const findItemByName = (items, name) =>
      items.find((item) => item.name === name);

    // Resets the appropriate submenu based on the level and updates the active item state
    if (level === "first") {
      setSubMenuElem([]);
      setSubMenuOn(false);
      setTimeout(() => {
        setSubMenuOn(true);
      }, 200);
      const item = findItemByName(menuItem, itemName);
      // Resetting active item for all levels and setting the first level
      setActiveItem({ 0: itemName, 1: null, 2: null });

      // Reset submenu elements and set new ones if available
      setSubMenuElem(item.sub || []);
      setSubSubMenuElem([]);
      // Always reset sub-submenu when selecting a new first-level item
    } else if (level === "second") {
      setSubSubMenuOn(false);
      setTimeout(() => {
        setSubSubMenuOn(true);
      }, 200);
      const parentItem = findItemByName(menuItem, activeItem[0]);
      const subItem = findItemByName(parentItem.sub, itemName);
      // Updating active item for second level
      setActiveItem((prev) => ({ ...prev, 1: itemName, 2: null }));
      // Reset and set sub-submenu elements if available
      setSubSubMenuElem(subItem.sub || []);
    } else if (level === "third") {
      // Simply update the active item for the third level, assuming no further nesting
      setActiveItem((prev) => ({ ...prev, 2: itemName }));
    }
  };

  useEffect(() => {
    setCurrentRoute(location.pathname.slice(1).split("/"));
    console.log(location);
    setSubMenuElem([]);
    setSubSubMenuElem([]);
    setMenuOn(false);
    setSubMenuOn(false);
    setSubSubMenuOn(false);
  }, [location]);

  useEffect(() => {
    if (!menuOn) return;
    springRefBorderLeft.start({
      from: { height: "0" },
      to: { height: "100%" },
      //delay: 500,
      config: {
        duration: 1000,
        easing: (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
      },
    });
  }, [menuOn]);

  useEffect(() => {
    const startSpring = (num) => springBMValue.start(num);
    if (!subMenuOn) {
      startSpring(0);
    } else {
      startSpring(250);
    }
  }, [subMenuOn]);

  useEffect(() => {
    const startSpring = (num) => springBRValue.start(num);
    if (!subSubMenuOn) {
      startSpring(0);
    } else {
      startSpring(250);
    }
  }, [subSubMenuOn]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <div
      className={`${isDarkTheme ? "bg-black" : "bg-white"} ${menuOn ? "h-0" : "h-fit"} fixed left-0 top-0 z-40 w-full select-none border-b-[1px] border-solid shadow-b transition-hcol`}
    >
      <div className="relative z-20 flex h-fit w-full flex-col">
        <div
          className={`${isDarkTheme ? "bg-black" : "bg-white"} ${showNav ? "p-2 " : "p-0"} relative z-20 flex h-fit w-full items-center justify-between transition-all`}
        >
          <div
            className={`${showNav ? "lg:w-[270px] lg:flex-wrap" : "lg:flex-nowrap"} flex w-fit flex-row flex-wrap items-center transition-all`}
          >
            <div className={`inline-flex w-fit items-center pl-2`}>
              <button type="button" onClick={handleToggleMenu}>
                <TiThMenuOutline
                  className={`${isDarkTheme ? "text-light" : "text-dark"} ${showNav ? "ml-0" : "ml-2"} z-50 h-8 w-8 rounded-xl p-1 transition-all duration-150 lg:hover:animate-pulse lg:hover:bg-slate-300`}
                />
              </button>
              <NavLink to={menuItem[0].path}>
                <img
                  src={wplogo}
                  className={`${showNav ? "scale-100" : "scale-90"} aspect-auto w-52 transition-all`}
                />
              </NavLink>
            </div>
            <div
              className={` ${isDarkTheme ? "text-wpblue-300" : "text-wpblue-700"} ${showNav ? "ml-10" : "ml-5"} inline-flex whitespace-nowrap transition-all sm:hidden`}
            >
              {currentRoute[0] === " " ? (
                <p>{currentRoute}</p>
              ) : (
                currentRoute.map((x, i) => (
                  <>
                    <span>{x ? `/` : ""}</span>
                    <NavLink
                      to={currentRoute.slice(0, i + 1).join("/")}
                      className="transition-[underline] hover:underline hover:underline-offset-2"
                    >
                      {x ? `${x}` : ""}
                    </NavLink>
                  </>
                ))
              )}
            </div>
          </div>

          <ThemeSwitch heightcalc={`${showNav ? "100%" : "80%"}`} />
        </div>

        <div
          id="nav-sub"
          className={`${isDarkTheme ? "bg-black" : "bg-white"} relative z-10 flex w-full flex-row flex-wrap items-start justify-start transition-transform duration-500 ease-out lg:pl-20 ${
            menuOn
              ? `shadow-dim sm:h-full md:h-full lg:h-[400px]`
              : `sm:h-0 sm:-translate-y-96 md:h-0 md:-translate-y-96 lg:h-0 lg:-translate-y-96`
          }`}
        >
          <div
            className={`relative mx-2 flex h-[90%] w-40 flex-col flex-wrap items-start px-2 transition-all will-change-auto lg:w-[350px]`}
          >
            <animated.div
              style={{ ...springBorderLeft }}
              className="absolute left-1 h-0 w-[2px] bg-wpblue-900"
            ></animated.div>
            {menuItem.map((item, i) =>
              !item.indexed ? (
                ""
              ) : item.sub ? (
                <div
                  key={item.name}
                  onClick={() => handleMenuExtend("first", item.name)}
                  onTouchStart={() => handleMenuExtend("first", item.name)}
                  style={{
                    transitionDelay: menuOn ? `${i * 50 + 350}ms` : "0ms",
                  }}
                  className={`${menuOn ? "opacity-1 duration-200" : "opacity-0 duration-0"} ${activeItem[0] === item.name ? "bg-wpblue-500 text-white" : "bg-white"} relative my-2 inline-flex w-full cursor-pointer items-end justify-between rounded-sm border-b border-solid border-gray-800 p-3 text-dark transition-opacity ease-in lg:my-0 lg:hover:brightness-110`}
                >
                  <p>{item.name}</p>
                  <MdKeyboardDoubleArrowRight className="h-4 w-4" />
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={`${i === 0 ? "/" : item.path}`}
                  onClick={() => handleMenuExtend("first", item.name)}
                  onTouchStart={() => handleMenuExtend("first", item.name)}
                  style={{
                    transitionDelay: menuOn ? `${i * 50 + 350}ms` : "0ms",
                  }}
                  className={`${menuOn ? "opacity-1 duration-200" : "opacity-0 duration-0"} ${activeItem[0] === item.name ? "bg-wpblue-500 text-white" : "bg-white"} relative my-2 inline-flex w-full items-end justify-between rounded-sm border-b border-solid border-gray-800 p-3 text-dark transition-opacity ease-in lg:my-0 lg:hover:brightness-110`}
                >
                  <p>{item.name}</p>
                </NavLink>
              ),
            )}
          </div>
          <div
            className={`${subMenuElem.length === 0 ? "" : ""} relative mx-2 flex h-[90%] w-40 flex-col flex-wrap items-start overflow-hidden px-2 transition-all will-change-auto lg:w-[350px]`}
          >
            <animated.div
              style={{ height: springBMValue }}
              className="absolute left-1 h-0 w-[2px] bg-wpblue-700"
            ></animated.div>
            {subMenuElem.map((item, i) =>
              item.sub ? (
                <div
                  key={item.name}
                  onClick={() => handleMenuExtend("second", item.name)}
                  onTouchStart={() => handleMenuExtend("second", item.name)}
                  style={{
                    transitionDelay: subMenuOn ? `${i * 50}ms` : "0ms",
                  }}
                  className={`${subMenuOn ? "opacity-1 duration-200" : "opacity-0 duration-0"} ${activeItem[1] === item.name ? "bg-wpblue-500 text-white" : "bg-white"} relative my-2 inline-flex w-full cursor-pointer items-end justify-between rounded-sm border-b border-solid border-gray-800 p-3 text-dark transition-opacity ease-in lg:my-0 lg:hover:brightness-110`}
                >
                  <p>{item.name}</p>
                  <MdKeyboardDoubleArrowRight className="h-4 w-4" />
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => handleMenuExtend("second", item.name)}
                  onTouchStart={() => handleMenuExtend("second", item.name)}
                  style={{
                    transitionDelay: subMenuOn ? `${i * 50}ms` : "0ms",
                  }}
                  className={`${subMenuOn ? "opacity-1 duration-200" : "opacity-0 duration-0"} ${activeItem[1] === item.name ? "bg-wpblue-500 text-white" : "bg-white"} relative my-2 inline-flex w-full items-end justify-between rounded-sm border-b border-solid border-gray-800 p-3 text-dark transition-opacity ease-in lg:my-0 lg:hover:brightness-110`}
                >
                  <p>{item.name}</p>
                </NavLink>
              ),
            )}
          </div>

          <div
            className={`${subSubMenuElem.length === 0 ? "" : ""} relative mx-2 flex h-[90%] w-40 flex-col flex-wrap items-start overflow-hidden  px-2 transition-all will-change-auto lg:w-[350px]`}
          >
            <animated.div
              style={{ height: springBRValue }}
              className="absolute left-1 h-0 w-[2px] bg-wpblue-500"
            ></animated.div>
            {subSubMenuElem.map((item, i) => (
              <NavLink
                to={item.path}
                onClick={() => handleMenuExtend("third", item.name)}
                onTouchStart={() => handleMenuExtend("third", item.name)}
                style={{
                  transitionDelay: subSubMenuOn ? `${i * 50}ms` : "0ms",
                }}
                className={`${subSubMenuOn ? "opacity-1 duration-200" : "opacity-0 duration-0"} ${activeItem[2] === item.name ? "bg-wpblue-500 text-white" : "bg-white"} relative my-2 inline-flex w-full items-end justify-between rounded-sm border-b border-solid border-gray-800 p-3 text-dark transition-opacity ease-in lg:my-0 lg:hover:brightness-110`}
              >
                {!item.sub && <p>{item.name}</p>}
                {item.sub && (
                  <>
                    <p>{item.name}</p>
                    <MdKeyboardDoubleArrowRight className="h-4 w-4" />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
