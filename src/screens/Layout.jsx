import { Outlet } from "react-router-dom";
import Header from "../ui/Header.jsx";

export default function Layout(){
  return (
    <div className="container">
      <Header />
      <main><Outlet /></main>
      <footer className="muted">© {new Date().getFullYear()} QuickBites</footer>
    </div>
  );
}
