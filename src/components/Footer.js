import wplogo from "../pictures/weatherpialogowhite.png";
import instalogo from "../pictures/instagramlogo.png";
import { NavLink } from "react-router-dom";
import { menuItem } from "../router";

export default function Footer(props) {
  return (
    <footer className="flex h-fit w-full flex-col bg-wpblue-700 text-white lg:h-[250px]">
      <div className="flex h-10 w-full items-center justify-between">
        <div className="flex h-full items-center">
          <NavLink to={menuItem.find((item) => item.name === "이용약관").path}>
            <button className="px-3 py-2 text-gray-300">이용약관</button>
          </NavLink>
          <NavLink
            to={menuItem.find((item) => item.name === "개인정보처리방침").path}
          >
            <button className="flex h-1 items-center border-l-[1px] border-solid border-gray-500 px-3 py-2 text-gray-300">
              개인정보처리방침
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink
            to={
              menuItem
                .find((item) => item.name === "About us")
                .sub.find((item) => item.name === "Contact us").path
            }
          >
            <button className="px-3 py-2 text-gray-300">Contact</button>
          </NavLink>
        </div>
      </div>
      <div className="flex h-fit w-full flex-1 flex-row items-center justify-between">
        <div className=" m-4 flex h-fit w-fit flex-col items-center">
          <NavLink to={menuItem[0].path}>
            <img
              className="mb-2 flex aspect-auto max-h-16 w-auto flex-1 gap-2"
              src={wplogo}
            />
          </NavLink>
          <p
            style={{ fontSize: "clamp(0.6rem, 1.5vw, 1rem)" }}
            className="text-gray-400"
          >
            COPYRIGHT ⓒ WEATHERPIA, All RIGHTS RESERVED
          </p>
        </div>
        <div
          style={{ fontSize: "clamp(0.95rem, 1.7vw, 1.1rem)" }}
          className="m-4 flex flex-col items-end gap-2 self-end break-keep text-white lg:mr-8"
        >
          <p className="text-lg font-bold text-gray-100">주식회사 웨더피아</p>
          <div className="flex justify-end text-right">
            <span className="w-full text-gray-100">
              서울특별시 영등포구 의사당대로1길 34, 9층 901호 (여의도동,
              인영빌딩)
            </span>
          </div>
          <div className="flex justify-end gap-1 text-right">
            <span className="whitespace-nowrap font-semibold">대표이사</span>
            <span className="text-gray-100">임상욱</span>
          </div>
          <div className="mt-4">
            <a
              href="https://www.instagram.com/weatherpia_official/"
              target="_blank"
            >
              <img className="h-8 w-8" src={instalogo} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
