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
    <div className="w-full px-6 py-6 bg-gray-100 block rounded-lg shadow-lg">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div className="flex flex-wrap gap-10">
          {items.map((Posts) => (
            <div key={Posts.id} className="flex flex-col w-80">
              <div
                className="relative h-69.5 rounded-xl overflow-hidden shadow-lg hover:shadow-5xl hover:scale-115 transition duration-300 ease-in-out"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?cs=srgb&dl=pexels-photospublic-33041.jpg&fm=jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-y--1 bg-opacity-30 flex flex-col justify-end p-6">
                  <h2 className="text-2xl font-bold text-black">
                    {Posts.title}
                  </h2>
                  <p className="text-gray-100 mt-2">{Posts.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalPages }, (_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md font-semibold ${
                currentPage === page
                  ? "bg-blue-600 text-red shadow-md"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              } transition`}
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
