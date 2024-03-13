import {
  Route,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./layout/Home";
import TestElement from "./components/TestElement";
import ErrorFile from "./components/ErrorFile";
import Terms from "./components/annexes/Terms";
import PersonalData from "./components/annexes/PersonalData";
import Particles from "./components/Particles";
import Contact from "./components/Contact";
import LaosProject from "./components/LaosProject";
import KyrgyzProject from "./components/KyrgyzProject";
import ProjectGlobal from "./components/ProjectGlobal";

export const menuItem = [
  { name: "Home", path: "/", element: () => <Home />, indexed: true },
  {
    name: "About us",
    indexed: true,
    sub: [
      {
        name: "회사 소개",
        path: "/about-us/presentation",
        element: () => <TestElement />,
        indexed: true,
      },
      {
        name: "인사말",
        path: "/about-us/word",
        element: () => <TestElement />,
        indexed: true,
      },
      {
        name: "미세먼지",
        path: "/about-us/Particles",
        element: () => <Particles />,
        indexed: true,
      },
      {
        name: "Contact us",
        path: "/about-us/contact",
        element: () => <Contact />,
        indexed: true,
      },
    ],
  },
  {
    name: "프로젝트",
    path: "/project",
    element: () => <ProjectGlobal />,
    indexed: true,
    sub: [
      {
        name: "Laos",
        path: "/project/laos",
        element: () => <LaosProject />,
        indexed: true,
        sub: [
          {
            name: "Mitigation",
            path: "/project/laos/mitigation",
            element: () => <TestElement />,
            indexed: true,
          },
          {
            name: "Adaptation",
            path: "/project/laos/adaptation",
            element: () => <TestElement />,
            indexed: true,
          },
        ],
      },
      {
        name: "Kyrgyzstan",
        path: "/project/kyrgyzstan",
        element: () => <KyrgyzProject />,
        indexed: true,
        sub: [
          {
            name: "Mitigation",
            path: "/project/kyrgyzstan/mitigation",
            element: () => <TestElement />,
            indexed: true,
          },
          {
            name: "Adaptation",
            path: "/project/kyrgyzstan/adaptation",
            element: () => <TestElement />,
            indexed: true,
          },
        ],
      },
    ],
  },
  {
    name: "이용약관",
    path: "/terms",
    element: () => <Terms />,
    indexed: false,
  },
  {
    name: "개인정보처리방침",
    path: "/personal-data",
    element: () => <PersonalData />,
    indexed: false,
  },
];

const createRoute = (items) => {
  return items.map((item, i) => {
    const routes = [];
    if (item.path) {
      routes.push(
        <Route index={i === 0} path={item.path} element={item.element()} />,
      );
    }
    if (item.sub) {
      const subRoutes = createRoute(item.sub);
      // Optionally, you can nest the subRoutes within another route to keep the hierarchy
      // This step depends on how you want your routing structure to look
      // For a flat structure, just push subRoutes to routes as is
      routes.push(subRoutes);
    }
    return routes;
  });
};

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorFile />}>
      {createRoute(menuItem)}
    </Route>,
  ),
);
