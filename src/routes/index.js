import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home/Home";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
export const publicRoutes = [
  {
    path: "/",
    element: Home,
    layout: DefaultLayout,
  },
  {
    path: "/movie/:slug",
    element: MovieDetail,
    layout: DefaultLayout,
  },
];
