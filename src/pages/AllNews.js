import React, { useEffect, useState } from "react";
import ArticleMini from "../components/ArticleMini";
import ForumWidget from "../components/ForumWidget";
import Pagination from "../components/Pagination";
import usePagination from '../hooks/pagination';
import {getAllNews} from '../API/news';
import Loader from '../components/Loader';

const pageLimit = 12;

export default function AllNews() {
  const [news, setNews] = useState({
    isLoading: false,
    error: null,
    meta: null,
    items: []
  })
  const newsPagination = usePagination(pageLimit)

  useEffect(() => {
    getAllNews(newsPagination.currentPage, pageLimit)
        .then(result => setNews(prev => ({...prev, isLoading: true, meta: result.meta, items: result.data})))
        .catch(error => setNews(prev => ({...prev, isLoading: true, error})))
  }, [newsPagination.currentPage])

  return (
    <main className="bg-white">
      <section className="container py-4 py-lg-5">
        <h1 className="dark-blue text-center text-uppercase">
          Новости ПОРТАЛА
        </h1>
        <div className="row">
          <div className="col-md-8 col-lg-9">
            {
              news.isLoading
                  ? news?.items?.length
                      ? <div className="row row-cols-2 row-cols-lg-3 gx-2 gx-xl-3 gy-4 gy-lg-5">
                        {
                          news.items.map(item => (
                              <div key={item.id}>
                                <ArticleMini
                                    url={`/news/${item.slug}`}
                                    title={item.title}
                                    img={`${item.image}`}
                                    text={item.description}
                                    date={item.createdAt}
                                />
                              </div>
                          ))
                        }
                      </div>
                      : null
                  : <div className="d-flex justify-content-center"><Loader color="#545454"/></div>
            }
            <div className="mt-4">
              {(news?.items?.length) &&
                  <Pagination
                      pageLimit={newsPagination.pageLimit}
                      currentPage={newsPagination.currentPage}
                      setCurrentPage={newsPagination.setCurrentPage}
                      pagesDisplayedLimit={3}
                      itemsAmount={news?.meta?.total || 0}
                      startingPage={newsPagination.startingPage}
                      setStartingPage={newsPagination.setStartingPage}
                  />
              }
            </div>
          </div>
          <div className="d-none d-md-block col-4 col-lg-3">
            <ForumWidget />
          </div>
        </div>
      </section>
    </main>
  );
}
