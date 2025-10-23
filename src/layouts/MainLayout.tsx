import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* 👈 Render các page con ở đây */}
      </main>
    </div>
  );
};

export default MainLayout;
