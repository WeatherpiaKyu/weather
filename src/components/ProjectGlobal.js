import { useContext, useEffect } from "react";
import KyrgyzProject from "./KyrgyzProject";
import LaosProject from "./LaosProject";
import { QueryContext } from "../layout/RootLayout";

export default function ProjectGlobal(props) {
  const { shadowMouse, setShadowMouse } = useContext(QueryContext);

  const projectDetail = [<LaosProject />, <KyrgyzProject />];

  return (
    <div className="flex h-fit min-h-[300px] w-full items-center justify-center whitespace-pre-line bg-wpblue-200 sm:h-fit sm:flex-col sm:px-2 md:h-fit md:flex-wrap lg:flex-wrap lg:px-10">
      {projectDetail.map((item, i) => (
        <>{item}</>
      ))}
    </div>
  );
}
