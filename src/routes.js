import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages";
import NotFound from "./pages/not-found";

const pages = require.context("./pages", true, /index\.jsx$/);

const homeRoute = {
  path: "/",
  element: <Route key="/" path="/" element={<Home />} />,
};

const routes = [
  homeRoute,
  ...pages.keys().map((page) => {
    const path = page
      .replace("./", "")
      .replace("/index.jsx", "")
      .replace(/\.\w+$/, "");
    const Component = pages(page).default;

    return {
      path,
      element: <Route key={path} path={path} element={<Component />} />,
    };
  }),
];

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => route.element)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
