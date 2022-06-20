import React, { useEffect, useState, useCallback } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import * as _ from "lodash";

export default function Pagination({
  pageLimit,
  currentPage,
  pagesDisplayedLimit,
  itemsAmount,
  setCurrentPage,
}) {
  const [startingPage, setStartingPage] = useState(1);
  const [pagesArrayDisplayed, setPagesArrayDisplayed] = useState([]);

  const pagesAmount = Math.ceil(itemsAmount / pageLimit);

  const getPages = useCallback(() => {
    const pages =
      (pagesAmount === 5) 
        ? [1, 2, 3, 4, 5]
        : _.range(startingPage, startingPage + pagesDisplayedLimit);
    return pages.filter((page) => page <= pagesAmount);
  }, [pagesAmount, startingPage]);

  useEffect(() => {
    setPagesArrayDisplayed(getPages());
  }, [currentPage, getPages]);

  const handlePageSelect = (pageNum) => {
    //Make API call for a new page in the parent component
    setCurrentPage(pageNum);
  };

  const handleSelectPrevPage = () => {
    if (currentPage === 1) return;
    //Make API call for a new page in the parent component
    setCurrentPage(currentPage - 1);
    if (currentPage === pagesArrayDisplayed[0]) {
      const newStartingPage = startingPage - pagesDisplayedLimit;
      if (newStartingPage < 1) {
        setStartingPage(1);
      } else {
        setStartingPage(newStartingPage);
      }
    }
  };

  const handleSelectNextPage = () => {
    if (currentPage === pagesAmount) return;
    //Make API call for a new page in the parent component
    setCurrentPage(currentPage + 1);
    if (currentPage === pagesArrayDisplayed[pagesArrayDisplayed.length - 1]) {
      setStartingPage((prev) => prev + pagesDisplayedLimit);
    }
  };

  const handleSelectLastPage = () => {
    //Make API call for a new page in the parent component
    setCurrentPage(pagesAmount);
    setStartingPage(pagesAmount - (pagesDisplayedLimit - 1));
  };

  const handleSelectFirstPage = () => {
    //Make API call for a new page in the parent component
    setCurrentPage(1);
    setStartingPage(1);
  };
  console.log(startingPage)
  return (
    <nav className="mt-4">
      <ul className="pagination">
        <li className="page-item" onClick={handleSelectPrevPage}>
          <div
            className="page-link"
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            aria-label="Previous"
          >
            <IoChevronBack />
          </div>
        </li>
        {startingPage > 2 && (
          <>
            <li className="page-item" onClick={() => handleSelectFirstPage()}>
              <div style={{ cursor: "pointer" }} className="page-link">
                {1}
              </div>
            </li>
            <li className="page-item">...</li>
          </>
        )}
        {pagesArrayDisplayed.map((pageNumber, idx) => {
          return (
            <li
              className="page-item"
              onClick={() => handlePageSelect(pageNumber)}
              key={pageNumber}
            >
              <div
                style={{ cursor: "pointer" }}
                className={`page-link ${
                  pageNumber === currentPage && "active"
                }`}
              >
                {pageNumber}
              </div>
            </li>
          );
        })}
        {pagesArrayDisplayed[pagesArrayDisplayed.length - 1] !==
          pagesAmount && (
          <>
            <li className="page-item">...</li>
            <li className="page-item" onClick={() => handleSelectLastPage()}>
              <div style={{ cursor: "pointer" }} className="page-link">
                {pagesAmount}
              </div>
            </li>
          </>
        )}
        <li className="page-item" onClick={handleSelectNextPage}>
          <div
            className="page-link"
            style={{
              cursor: currentPage === pagesAmount ? "not-allowed" : "pointer",
            }}
            href="/"
            aria-label="Next"
          >
            <IoChevronForward />
          </div>
        </li>
      </ul>
    </nav>
  );
}
