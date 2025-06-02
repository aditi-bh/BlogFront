import { Link } from "react-router-dom";
import HomePage from "./HomePage";

function MainPage() {
  return (
    <section>
      <header>
        <nav className=" sticky mx-3 top-0 bg-white shadow z-50  p-3">
          <h1 className="text-left">Blogs</h1>
          <p>
            <Link to="/SignUp" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
          <p>
            {" "}
            <Link to="/LogIn" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </nav>
      </header>
      <HomePage />
    </section>
  );
}

export default MainPage;
