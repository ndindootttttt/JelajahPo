import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Wisata from "./pages/Wisata";
import Kategori from "./pages/Kategori";
import Tentang from "./pages/Tentang";
import AddWisata from "./pages/AddWisata";
import EditWisata from "./pages/EditWisata";
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" 
        element={
           <ProtectedRoute>
             <Layout />
           </ProtectedRoute>
       }
       >
          <Route index element={<Home />} />
          <Route path="wisata" element={<Wisata />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="wisata/tambah" element={<AddWisata />} />
          <Route path="wisata/edit/:id" element={<EditWisata />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}