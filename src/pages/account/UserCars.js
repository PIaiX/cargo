import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { IoAddCircleSharp } from "react-icons/io5";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import userCars from '../../dummyData/userCars.json'

const initialPageLimit = 6;

export default function UserCars() {
  const [tab, setTab] = useState("active");
  const paginationData = usePagination(initialPageLimit);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    //Make an API call later getting the first page of all the userCars
    const startIdx =
      (paginationData.currentPage - 1) * paginationData.pageLimit;
    const endIdx = startIdx + paginationData.pageLimit;
    const paginated = userCars.slice(startIdx, endIdx);

    setFilteredCars(paginated);
    window.scrollTo(0, 0);
  }, [paginationData.currentPage]);

  return (
    <div className="box px-0 p-sm-4 p-xl-5">
      <Link
        to="/personal-account"
        className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
      >
        <span className="green fs-15 me-2">⟵</span> Назад
      </Link>
      <h1 className="dark-blue text-center d-lg-none">Мои машины</h1>
      <div className="d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5">
        <Link to="/add-car" className="btn btn-2 fs-12 px-4 mb-4 mb-md-0">
          <IconContext.Provider
            value={{ className: "icon-15 white", title: "Добавить машину" }}
          >
            <IoAddCircleSharp />
          </IconContext.Provider>
          <span className="ms-2">Добавить машину</span>
        </Link>
        <div className="d-flex align-items-center fs-12 fw-5 title-font">
          <button
            type="button"
            className={tab === "active" ? "active tab-btn" : "tab-btn"}
            onClick={() => setTab("active")}
          >
            {`Активные объявления (${userCars.length})`}
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
            Архив (15)
          </button>
        </div>
      </div>
      {tab === "active" ? (
        <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
          {filteredCars.map((item, idx) => {
            return (
              <div key={idx}>
                <Card
                  type={item.type}
                  className=""
                  route={item.route}
                  carType={item.carType}
                  verified={item.verified}
                  date={item.date}
                  carrying={item.carrying}
                  size={item.size}
                  dimensions={item.dimensions}
                  url="/car-page"
                  profileView={item.profileView}
                />
              </div>
            );
          })}
          {userCars.length > initialPageLimit && (
            <Pagination
              pageLimit={paginationData.pageLimit}
              currentPage={paginationData.currentPage}
              setCurrentPage={paginationData.setCurrentPage}
              pagesDisplayedLimit={3}
              itemsAmount={userCars.length}
              startingPage={paginationData.startingPage}
              setStartingPage={paginationData.setStartingPage}
            />
          )}
        </div>
      ) : (
        <div className="text-center fs-15">Архивных объявлений нет</div>
      )}
    </div>
  );
}
