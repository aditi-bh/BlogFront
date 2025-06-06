import { Link } from "react-router-dom";
import HomePage from "./HomePage";

function MainPage() {
  return (
    <section className="bg-gray-100 w-full h-screen flex">
      <h1 className="text-lg font-bold tracking-tight">BLOG APPLICATION</h1>
      <header>
        <nav className="sticky top-0 bg-gray z-50 px-6 py-4 flex items-center border-b border-gray-200 font-mono">
          <div className="ml-auto flex gap-100 text-sm">
            <Link
              to="/SignUp"
              className="text-black-700 hover:underline transition"
            >
              Signup
            </Link>
            <Link
              to="/LogIn"
              className="text-black-700 hover:underline transition"
            >
              Login
            </Link>
            <Link
              to="/Dashboard"
              className="text-black-700 hover:underline transition"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <HomePage />
    </section>
  );
}

export default MainPage;
