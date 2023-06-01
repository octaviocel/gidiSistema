import React from "react";

export const Header = () => {
  return (
    <header>
      <div className="site-navigation2 main_menu " id="mainmenu-area">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
              <img
                src="ulsaoaxaca.png"
                alt="Ulsa"
                className="img-fluid"
                width={"35%"}
                //height={'30%'}
              />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMenu"
              aria-controls="navbarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    
                  >
                    Home
                  </a>
                  
                </li>

                <li className="nav-item ">
                  <a href="/gallery" className="nav-link js-scroll-trigger">
                    Galeria
                  </a>
                </li>

                {/* <li className="nav-item ">
                  <a href="service.html" className="nav-link js-scroll-trigger">
                    Services
                  </a>
                </li> */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/blogs"
                    id="navbar3"
                    //role="button"
                    //data-toggle="dropdown"
                    //aria-haspopup="true"
                    //aria-expanded="false"
                  >
                    Blogs
                  </a>
                  
                </li>
                <li className="nav-item ">
                  <a href="/contact" className="nav-link">
                    Contacto
                  </a>
                </li>
              </ul>

              <div className="header-contact">
                <a href="login" className="btn btn-main2">
                  Ingresar
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
