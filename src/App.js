import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyle/style.scss";
function App() {
  return (
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
