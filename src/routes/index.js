import CreateMovie from "../admin/movieManager/CreateMovie";
import MovieManager from "../admin/movieManager/MovieManager";
import TypeManager from "../admin/type_manager/TypeManager";
import DefaultLayout from "../layout/DefaultLayout";
import AdminPage from "../layout/DefaultLayout/AdminPage";
import Home from "../pages/Home/Home";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import WatchAnime from "../pages/WatchAnime/WatchAnime";
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
  {
    path: "movie/watch/:slug",
    element: WatchAnime,
    layout: DefaultLayout,
  },
];
export const privatesRoutes = [
  {
    path: "/admin/movie_manager",
    element: MovieManager,
    layout: AdminPage,
  },
  {
    path: "/admin/type_manager",
    element: TypeManager,
    layout: AdminPage,
  },
  {
    path: "/admin/create_movie",
    element: CreateMovie,
    layout: AdminPage,
  },
];
