import { NavLink } from "react-router-dom";
import { menuItem } from "../router";

export default function ErrorFile(props) {
  const createLinks = (items, pad, title, temporary) => {
    return items.map((item, i) => {
      if (item.path) {
        return (
          <>
            {title && i === 0 && (
              <p className="pt-2 text-xl">{temporary.name}</p>
            )}
            <NavLink
              className={`ml-${pad} ${pad == 0 ? "text-xl" : ""} m-2 rounded-full bg-wpblue-600 p-2 text-lg text-white`}
              to={item.path}
            >
              {item.name}
            </NavLink>
          </>
        );
      }
      if (item.sub) {
        return createLinks(item.sub, 5, true, item);
      }
    });
  };

  return (
    <div className="z-50 flex h-fit w-screen flex-col items-center justify-center bg-white">
      <p className="pt-10 text-3xl">An error occured</p>
      <p className="pb-10 text-3xl">Accessible links:</p>
      <div className="flex flex-col flex-wrap items-start justify-center bg-wpblue-100 p-10">
        {createLinks(menuItem, 0)}
      </div>
    </div>
  );
}
