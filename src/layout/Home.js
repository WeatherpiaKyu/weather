import { NavLink } from "react-router-dom";
import wplogo from "../pictures/weatherpialogo.png";
import { menuItem } from "../router";
import { useContext, useEffect, useState } from "react";
import { QueryContext } from "./RootLayout";
import ProjectGlobal from "../components/ProjectGlobal";
import { Trans, useTranslation } from "react-i18next";

export default function Home(props) {
  const { mousePos, setMousePos, shadowMouse, setShadowMouse, lang } =
    useContext(QueryContext);

  const { t } = useTranslation();

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /*
to={
            menuItem
              .find((item) => item.name === "프로젝트")
              .sub.find((item) => item.name === "Laos")
              .sub.find((item) => item.name === "Mitigation").path
          } 

{item.split(" ").map((x) => x)}

${i === 0 ? "border-l-[3px]" : i === projectDetail.length - 1 ? "border-r-[3px]" : ""}

<span
                style={{
                  top: Math.random() * 100 - 50,
                  left: Math.random() * 100 - 50,
                }}
                class="absolute hidden h-20 w-20 rounded-full bg-wpblue-300 opacity-75 group-hover:inline-flex group-hover:animate-ping"
              >
                qui suit la souris
              </span>


              <div
              style={{
                background:
                  "url(https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="flex h-48 items-center justify-center rounded-2xl transition duration-200 ease-out sm:w-full md:h-full md:w-full lg:aspect-square lg:w-[70%] lg:group-hover:scale-125"
            ></div>
          */

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start bg-wpblue-800">
      <span
        style={{ top: `${mousePos.y - 10}px`, left: `${mousePos.x - 10}px` }}
        className={`${shadowMouse ? "inline-flex" : "hidden"} pointer-events-none fixed z-50 h-5 w-5 animate-ping select-none rounded-full bg-wpblue-400 sm:hidden md:hidden`}
      ></span>
      <div className="flex h-96 w-full items-center justify-center bg-wpblue-200">
        <img src={wplogo} alt="Weatherpia logo" />
      </div>
      <div className="flex h-96 w-full items-center justify-end bg-wpblue-100 px-10">
        <NavLink
          to={
            menuItem
              .find((item) => item.name === "About us")
              .sub.find((item) => item.name === "회사 소개").path
          }
        >
          <p className="rounded-full bg-wpblue-300 p-10 text-2xl text-white transition duration-200 ease-out hover:-translate-y-2 hover:scale-110 hover:bg-wpblue-500 lg:text-6xl">
            {t("description.home.1")}
          </p>
        </NavLink>
      </div>
      <ProjectGlobal />
    </div>
  );
}
