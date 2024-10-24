import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import Login from "../Login";
import Pagination from "./../Pagination/index";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
//   const [perPageSize, setPerPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(10);
  const perPageSize = 12;

  const getBlogList = async () => {
    const apiUrl = "https://dummyapi.online/api/blogposts";
    const response = await fetch(apiUrl);
    const dataList = await response.json();
    setBlogList(dataList.slice((pageNo-1)*12, pageNo*12));
    setIsLoading(false);
    setTotalItems(dataList.length);
    // console.log(dataList);
  };


  useEffect(() => {
    setIsLoading(true);
    getBlogList();
  }, [pageNo, blogList]);

//   const onChangePerPageSize = () => {
//     setPerPageSize(20);
//   }

  
  const onPageChange = (pageNoValue) => {
    setPageNo(pageNoValue);
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken === undefined) {
    return <Login />;
  }

  return (
    <div className="min-h-[calc(100vh-45px)] bg-blue-100 px-10 py-10">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[80vh]">
          <BeatLoader color="blue" size={12} />
        </div>
      )}
      {!isLoading && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogList.map((eachBlog) => (
            <li
              key={eachBlog.id}
              className="border border-slate-500 rounded-md px-5 py-3 flex flex-col justify-between items-center"
            >
              <h1 className="font-medium text-slate-700 font-[roboto] p-5">
                {eachBlog.title}
              </h1>
              <span className="text-sm pb-2 font-[roboto]">
                {eachBlog.content}
              </span>
              <div className="mt-5 flex justify-between items-center w-full">
                <span className="font-[roboto] text-blue-700 text-sm">
                  {eachBlog.date_published}
                </span>
                <span className="font-[roboto] text-green-600 text-sm">
                  by {eachBlog.author}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {blogList.length > 1 && (
        <div>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={perPageSize}
            currentPage={pageNo}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
