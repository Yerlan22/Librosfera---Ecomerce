import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./layout.css";

function Layout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;