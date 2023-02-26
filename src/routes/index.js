import CreateMovie from "../admin/movieManager/CreateMovie";
import MovieManager from "../admin/movieManager/MovieManager";
import UploadMovie from "../admin/movieManager/UploadMovie";
import TypeManager from "../admin/type_manager/TypeManager";
import Login from "../authPage/Login";
import Register from "../authPage/Register";
import DefaultLayout from "../layout/DefaultLayout";
import AdminPage from "../layout/DefaultLayout/AdminPage";
import Home from "../pages/Home/Home";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import SearchPage from "../pages/searchPage/SearchPage";
import WatchAnime from "../pages/WatchAnime/WatchAnime";
import MarkAnime from "../userPage/MarkAnime";
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
    path: "/movie/watch/:slug",
    element: WatchAnime,
    layout: DefaultLayout,
  },
  {
    path: "/search/:slug",
    element: SearchPage,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
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
  {
    path: "/admin/upload/:slug",
    element: UploadMovie,
    layout: AdminPage,
  },
];

export const userRoutes = [
  {
    path: "/mark",
    element: MarkAnime,
    layout: DefaultLayout,
  },
];
