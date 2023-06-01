import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./public/HomePage";
import Login from "./private/Login";
import Dashboard from "./private/Dashboard";
import ErrorPage from "./private/ErrorPage";
import Preloader from "./public/Preloader";
import { ToastContainer } from "./utils/Toats";
import { IndexBlog } from "./private/Blog/IndexBlog";
import { CreateBlog } from "./private/Blog/CreateBlog";
import { BlogPage } from "./public/BlogPage";
import { Blogs } from "./public/Blogs";
import { UsersTable } from "./private/Users/UsersTable";
import { CreateUser } from "./private/Users/CreateUser";
import { GalleryPage } from "./public/GalleryPage";
import { Index } from "./private/Gallery/Index";
import { CreateGallery } from "./private/Gallery/CreateGallery";
import { GalleryDetail } from "./public/GalleryDetail";
import { ContactPage } from "./public/ContactPage";
import { IndexGarbage } from "./private/Garbage/IndexGarbage";
import { IndexLocation } from "./private/Location/IndexLocation";
import { IndexRecoleccion } from "./private/Collections/RegistersGarbage";
import { DetailCollection } from "./private/Collections/DetailCollection";
import { CreateCollection } from "./private/Collections/CreateCollection";
import { IndexGraphics } from "./private/Graphics/IndexGraphics";

function App() {
  const { currentUser, checkUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //checkUser();
    try {
      setLoading(true);
      checkUser();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const publicRoutes = (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="verBlog" element={<BlogPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="galleryDetail" element={<GalleryDetail />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );

  const adminRoutes = (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path="garbage-collection">
          <Route index element={<IndexRecoleccion />} />
          <Route path="create" element={<CreateCollection />} />
          <Route path=":id" element={<DetailCollection />} />
          <Route path=":id/graficas" element={<IndexGraphics />} />
        </Route>
        <Route path="users">
          <Route index element={<UsersTable />} />
          <Route path="create" element={<CreateUser />} />
        </Route>
        <Route path="blog">
          <Route index element={<IndexBlog />} />
          <Route path="create" element={<CreateBlog />} />
        </Route>
        <Route path="galeria">
          <Route index element={<Index />} />
          <Route path="create" element={<CreateGallery />} />
        </Route>
        <Route path="residuos">
          <Route index element={<IndexGarbage />} />
        </Route>
        <Route path="ubicacion">
          <Route index element={<IndexLocation />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );

  const userRoutes = (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path="garbage-collection">
          <Route index element={<IndexRecoleccion />} />
          <Route path=":id" element={<DetailCollection />} />
          <Route path=":id/graficas" element={<IndexGraphics />} />
        </Route>

        <Route path="blog">
          <Route index element={<IndexBlog />} />
          <Route path="create" element={<CreateBlog />} />
        </Route>
        <Route path="galeria">
          <Route index element={<Index />} />
          <Route path="create" element={<CreateGallery />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );

  const getRoute = () => {
    if (loading) {
      //console.log("Cargadndo")
      return (
        <Routes>
          <Route path="/" element={<Preloader />} />
        </Routes>
      );
    }

    if (!currentUser) {
      //console.log("No hay usuario")
      return publicRoutes;
    } else {
      if (currentUser.rol.id === 1) {
        //console.log("Usuario Admi")
        return adminRoutes;
      }
      return userRoutes;
    }
  };
  return (
    <BrowserRouter>
      {getRoute()}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
