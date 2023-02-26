import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privatesRoutes, publicRoutes, userRoutes } from "./routes/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyle/style.scss";
import Loading from "./loading/Loading";
import { createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
export const roleContext = createContext();
function App() {
  const [store, setStore] = useState({ role: "admin" });
  const cacheRef = useRef({});
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth?.user) {
      const decoded = jwtDecode(auth?.user?.token);
      console.log(decoded);
      setStore({ role: decoded.roleName });
    }
  }, [auth.user?.token]);
  return (
    <roleContext.Provider value={{ cache: cacheRef, store }}>
      <div className="App">
        <Router>
          <Routes>
            {publicRoutes.map((item, index) => {
              const Page = item.element;

              return item.layout ? (
                <Route
                  path={item.path}
                  key={index}
                  element={
                    <item.layout>
                      <Page />
                    </item.layout>
                  }
                />
              ) : (
                <Route path={item.path} element={<Page />} key={index} />
              );
            })}
            {store.role === "role_Admin" &&
              privatesRoutes.map((item, index) => {
                const Page = item.element;
                return item.layout ? (
                  <Route
                    path={item.path}
                    key={index}
                    element={
                      <item.layout>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route path={item.path} element={<Page />} key={index} />
                );
              })}
            {(store.role === "role_User" || store.role === "role_Admin") &&
              userRoutes.map((item, index) => {
                const Page = item.element;
                return item.layout ? (
                  <Route
                    path={item.path}
                    key={index}
                    element={
                      <item.layout>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route path={item.path} element={<Page />} key={index} />
                );
              })}
          </Routes>
          {auth.loading && <Loading />}
        </Router>
        <ToastContainer />
      </div>
    </roleContext.Provider>
  );
}

export default App;
