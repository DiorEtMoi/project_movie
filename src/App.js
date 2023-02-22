import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privatesRoutes, publicRoutes } from "./routes/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyle/style.scss";
import Loading from "./loading/Loading";
import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export const roleContext = createContext();
function App() {
  const [store, setStore] = useState({ role: "admin" });
  const cacheRef = useRef({});
  const auth = useSelector((state) => state.auth);
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
            {store.role === "admin" &&
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
          </Routes>
          {auth.loading && <Loading />}
        </Router>
        <ToastContainer />
      </div>
    </roleContext.Provider>
  );
}

export default App;
