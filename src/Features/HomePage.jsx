import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { useEffect } from "react";

function HomePage() {
  const dispatch = useDispatch(); //the dispatch function is used to dispatch actions to the store
  const { items, status, error, currentPage, totalPages } = useSelector(
    (state) => state.posts
  ); //the selector function is used to select data from the store

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({ pagenum: 0, pagesize: 3 })); //here the dispatch function is used to dispatch the fetchPosts action to the store
      console.log("Posts:", items);
      console.log("status :", status);
      console.log("error : ", error);
    }
  }, [status, dispatch]); // here we are passing status and dispatch as dependency to the useEffect hook so that it runs only when status changes

  const handlePageChange = (page) => {
    dispatch(fetchPosts({ pagenum: page, pagesize: 3 }));
  };

  return (
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-sm font-mono">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div className="flex flex-wrap gap-10 justify-center">
          {items.map((Posts) => (
            <div key={Posts.id} className="flex flex-col w-80">
              <div
                className="relative h-60 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-200"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?cs=srgb&dl=pexels-photospublic-33041.jpg&fm=jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                  <h2 className="text-lg font-bold text-white">
                    {Posts.title}
                  </h2>
                  <p className="text-gray-200 text-sm mt-2">
                    {Posts.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 text-sm rounded-md font-semibold transition duration-200 ${
                currentPage === page
                  ? "bg-gray-900 text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
