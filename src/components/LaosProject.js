import { NavLink } from "react-router-dom";
import { menuItem } from "../router";
import { QueryContext, findPathByName } from "../layout/RootLayout";
import { useContext } from "react";

export default function LaosProject(props) {
  const { shadowMouse, setShadowMouse } = useContext(QueryContext);
  const projectDetail = [
    {
      name: "Laos Mitigation",
      path: findPathByName(menuItem, ["프로젝트", "Laos", "Mitigation"]),
    },
    {
      name: "Laos Adaptation",
      path: findPathByName(menuItem, ["프로젝트", "Laos", "Adaptation"]),
    },
  ];

  return (
    <>
      {projectDetail.map((item, i) => (
        <div
          className={`group relative m-2 flex items-center justify-center overflow-hidden rounded-2xl duration-200 ease-out sm:w-[90%] md:h-auto md:min-w-[350px] md:max-w-[450px] md:flex-1 lg:h-[200px] lg:min-w-[300px] lg:max-w-[400px] lg:flex-1`}
          onMouseEnter={() => setShadowMouse(true)}
          onMouseLeave={() => setShadowMouse(false)}
        >
          <img
            className=" transition duration-200 ease-out sm:aspect-auto sm:w-full md:h-full md:w-full lg:aspect-auto lg:w-full lg:group-hover:scale-125"
            src="https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
            alt={item.name}
          />
          <NavLink
            className="absolute flex h-full w-full items-center justify-center bg-black/0 p-10 transition-colors sm:justify-start lg:group-hover:bg-black/25"
            to={item.path}
          >
            <p className="flex w-20 items-center justify-center text-center text-lg text-white lg:text-2xl">
              {item.name}
            </p>
          </NavLink>
        </div>
      ))}
    </>
  );
}
