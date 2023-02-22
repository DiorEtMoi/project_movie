import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function adminPage({ children }) {
  return (
    <div className="container">
      <Header />
      <div>
        <div>
          <div className="movie_manager">
            <div className="movie_manager_header">
              <div className="movie_admin_left">Manage</div>
              <div className="movie_admin_right">
                <Link to="/admin/movie_manager">
                  <button>Movie Manager</button>
                </Link>
                <Link to="/admin/type_manager">
                  <button>Movie Manager</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default adminPage;
