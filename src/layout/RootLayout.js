import React, { useState } from "react";
import { useTheme } from "../hook/useTheme";
import {
  BrowserRouter as Router,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Navigator from "../Navigator";

import { menuItem } from "../router";
import Footer from "../components/Footer";

export const QueryContext = React.createContext();

export const findPathByName = (menuItems, names) => {
  let currentItems = menuItems;
  for (const name of names) {
    const item = currentItems.find((item) => item.name === name);
    if (!item) return undefined; // or throw an error if you prefer
    if (item.sub) {
      currentItems = item.sub;
    } else {
      return item.path; // return the path when the last name is matched
    }
  }
  return undefined; // return undefined if the path is not found (optional)
};

export default function RootLayout() {
  const { toggleTheme, isDarkTheme } = useTheme();
  const [menuOn, setMenuOn] = useState(false);
  const [currentRoute, setCurrentRoute] = useState([]);
  const [shadowMouse, setShadowMouse] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const lang = {
    kr: { nativeName: "한국어" },
    en: { nativeName: "English" },
  };

  return (
    <QueryContext.Provider
      value={{
        menuOn,
        setMenuOn,
        currentRoute,
        setCurrentRoute,
        toggleTheme,
        isDarkTheme,
        menuItem,
        mousePos,
        setMousePos,
        shadowMouse,
        setShadowMouse,
        lang
      }}
    >
      <div
        className={`flex h-fit min-h-screen w-full flex-col items-start justify-start`}
      >
        <Navigator />
        <div
          className="mt-10 flex w-full flex-col bg-white py-10 sm:px-0 lg:mt-20 lg:h-full"
          onClick={() => (menuOn ? setMenuOn(false) : null)}
        >
          <ScrollRestoration />
          <Outlet />
        </div>
        <Footer />
      </div>
    </QueryContext.Provider>
  );
}
