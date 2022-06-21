import React, { useEffect, useState } from "react";
import ArticleMini from "../components/ArticleMini";
import ForumWidget from "../components/ForumWidget";
import Pagination from "../components/Pagination";
import news from "./../dummyData/news.json";

const pageLimit = 12;

export default function AllNews() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //Make an API call later getting the first page of all the articles
    const items = news.slice(currentPage - 1, currentPage + (pageLimit - 1));
      setArticles(items);
    window.scrollTo(0, 0)
  }, [currentPage]);

  return (
    <main className="bg-white">
      <section className="container py-4 py-lg-5">
        <h1 className="dark-blue text-center text-uppercase">
          Новости ПОРТАЛА
        </h1>
        <div className="row">
          <div className="col-md-8 col-lg-9">
            {articles.length > 0 && (
              <div className="row row-cols-2 row-cols-lg-3 gx-2 gx-xl-3 gy-4 gy-lg-5">
                {articles.map((item, idx) => (
                    <div>
                      <ArticleMini
                        key={idx}
                        url={`/news/${item.slug}`}
                        title={item.title}
                        img={`${item.img}`}
                        text={item.body}
                        date={item.date}
                      />
                    </div>
                  ))}
              </div>
            )}
            <Pagination
              pageLimit={pageLimit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesDisplayedLimit={3}
              itemsAmount={news.length}
            />
          </div>
          <div className="d-none d-md-block col-4 col-lg-3">
            <ForumWidget />
          </div>
        </div>
      </section>
    </main>
  );
}
