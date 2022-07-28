import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResponseCard from "../../components/ResponseCard";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import userResponses from "../../dummyData/userResponses.json";

const initialPageLimit = 6;

export default function Responses() {
  const [tab, setTab] = useState("active");

  const paginationData = usePagination(initialPageLimit);
  const [filteredResponses, setFilteredResponses] = useState([]);

  useEffect(() => {
    //Make an API call later getting the first page of all the userCars
    const startIdx =
      (paginationData.currentPage - 1) * paginationData.pageLimit;
    const endIdx = startIdx + paginationData.pageLimit;
    const paginated = userResponses.slice(startIdx, endIdx);

    setFilteredResponses(paginated);
    window.scrollTo(0, 0);
  }, [paginationData.currentPage, paginationData.pageLimit]);

  return (
    <div className="box px-0 p-sm-4 p-xl-5">
      <Link
        to="/personal-account"
        className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
      >
        <span className="green fs-15 me-2">⟵</span> Назад
      </Link>
      <h1 className="dark-blue text-center d-lg-none">Мои отклики</h1>
      <div className="d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5">
        <button
          type="button"
          className={tab === "active" ? "active tab-btn" : "tab-btn"}
          onClick={() => setTab("active")}
        >
          {`Мне откликнулись (${userResponses.length})`}
        </button>
        <button
          type="button"
          className={
            tab === "archive"
              ? "active tab-btn ms-3 ms-sm-4 ms-xl-5"
              : "tab-btn ms-3 ms-sm-4 ms-xl-5"
          }
          onClick={() => setTab("archive")}
        >
          Вы откликнулись (4)
        </button>
      </div>
      {tab === "active" ? (
        <>
        <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
          {filteredResponses.map((item, idx) => {
            return (
              <div key={idx}>
                <ResponseCard
                  inWork={item.inWork}
                  type={item.type}
                  name={item.name}
                  company={item.company}
                  img={item.img}
                  text={item.text}
                />
              </div>
            );
          })}
        </div>
        {userResponses.length > initialPageLimit && (
            <Pagination
              pageLimit={paginationData.pageLimit}
              currentPage={paginationData.currentPage}
              setCurrentPage={paginationData.setCurrentPage}
              pagesDisplayedLimit={3}
              itemsAmount={userResponses.length}
              startingPage={paginationData.startingPage}
              setStartingPage={paginationData.setStartingPage}
            />
          )}
        </>
      ) : (
        <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
          <div>
            <ResponseCard
              inWork={false}
              type={2}
              name={"Мария Викторова"}
              company={"ООО «Название компании»"}
              img={"/img/users/photo.jpg"}
              text={"Несколько строчек про объявление, в которых написан"}
            />
          </div>
          <div>
            <ResponseCard
              inWork={false}
              type={2}
              name={"Мария Викторова"}
              company={"ООО «Название компании»"}
              img={"/img/users/photo.jpg"}
              text={"Несколько строчек про объявление, в которых написан"}
            />
          </div>
          <div>
            <ResponseCard
              inWork={false}
              type={2}
              name={"Мария Викторова"}
              company={"ООО «Название компании»"}
              img={"/img/users/photo.jpg"}
              text={"Несколько строчек про объявление, в которых написан"}
            />
          </div>
          <div>
            <ResponseCard
              inWork={false}
              type={2}
              name={"Мария Викторова"}
              company={"ООО «Название компании»"}
              img={"/img/users/photo.jpg"}
              text={"Несколько строчек про объявление, в которых написан"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
