import React, { useState, useEffect } from "react";
import ForumWidget from "../components/ForumWidget";
import CustomSelect from "../components/utilities/CustomSelect";
import { Link, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  IoSearch,
  IoAddCircleSharp,
} from "react-icons/io5";
import { BsFillInfoSquareFill, BsFillChatRightTextFill } from "react-icons/bs";
import ForumSubsection from "../components/ForumSubsection";
import ForumTopic from "../components/ForumTopic";
import Pagination from "../components/Pagination";
import fakeForumSubsections from "../dummyData/forumSubsections.json";
import fakeForumTopics from "../dummyData/forumTopics.json";
import fakeForumSections from "../dummyData/forumSections.json";

const initialPageLimit = 10;

export default function ForumSublevel() {
  const [initialData] = useState([
    ...fakeForumSubsections,
    ...fakeForumTopics,
  ]);
  const [forumSection, setForumSection] = useState({});
  const [forumItems, setForumItems] = useState([]);
  const [pageLimit, setPageLimit] = useState(initialPageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startingPage, setStartingPage] = useState(1)

  const params = useParams();
  //Make an API call in the future, fetching actual data from the server

  useEffect(() => {
    const result = fakeForumSections.find(
      (item) => item.id === parseInt(params.id)
    );
    setForumSection(result);
  }, [params.id]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * pageLimit;
    const endIdx = startIdx + pageLimit;
    const paginated = initialData.slice(startIdx, endIdx);

    setForumItems(paginated);
  }, [currentPage, pageLimit, initialData]);

  useEffect(() => {
    setCurrentPage(1);
    setStartingPage(1)
  }, [pageLimit]);

  const handleCustomSelect = (value) => {
    if (value === 1) setPageLimit(10);
    if (value === 2) setPageLimit(15);
    if (value === 3) setPageLimit(20);
  };

  return (
    <main className="bg-white py-4 py-sm-5">
      <section className="container" id="sec-11">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/forum">Разделы форума</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/forum-section">{forumSection.title}</Link>
            </li>
          </ol>
        </nav>

        <h1 className="text-start dark-blue">{forumSection.title}</h1>

        <div className="row flex-lg-row-reverse">
          <div className="col-lg-3">
            <div className="d-flex justify-content-end mb-3">
              <Link to="/my-topics" className="fs-12 d-flex align-items-center">
                <IconContext.Provider
                  value={{ className: "icon-10 blue", title: "Мои темы" }}
                >
                  <BsFillChatRightTextFill />
                </IconContext.Provider>
                <span className="ms-2 blue">Мои темы (2)</span>
              </Link>
            </div>

            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#new-topic"
              className="btn btn-2 w-100 mb-3 fs-12 px-3 py-2 d-flex"
            >
              <IconContext.Provider
                value={{ className: "icon-15 white", title: "Создать тему" }}
              >
                <IoAddCircleSharp />
              </IconContext.Provider>
              <span className="flex-1">Создать тему</span>
            </button>

            <form className="form-search mb-4">
              <input type="search" placeholder="Поиск по форуму" />
              <button>
                <IconContext.Provider
                  value={{ className: "icon-15 green", title: "Поиск" }}
                >
                  <IoSearch />
                </IconContext.Provider>
              </button>
            </form>
            <h5 className="d-none d-lg-block mb-1">Статистика портала</h5>
            <div className="stat d-none d-lg-block title-font p-3 mb-4">
              <div className="d-flex justify-content-between mb-2 mb-xl-3">
                <div className="gray-3 fw-4 me-4">Темы:</div>
                <div className="fw-5">213</div>
              </div>
              <div className="d-flex justify-content-between mb-2 mb-xl-3">
                <div className="gray-3 me-4">Сообщения:</div>
                <div className="fw-5">12 213</div>
              </div>
              <div className="d-flex justify-content-between mb-2 mb-xl-3">
                <div className="gray-3 me-4">Пользователи:</div>
                <div className="fw-5">813</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="gray-3 me-4">Новая тема:</div>
                <div className="fw-5 flex-1 text-truncate blue">
                  Название темы Название темы Название темы
                </div>
              </div>
            </div>
            <ForumWidget className="d-none d-lg-block" />
          </div>
          <div className="col-lg-9">
            <div className="d-flex justify-content-end mb-3">
              <Pagination
                pageLimit={pageLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesDisplayedLimit={3}
                itemsAmount={fakeForumSubsections.length}
                startingPage={startingPage}
                setStartingPage={setStartingPage}
              />
            </div>
            <div className="forum-header">
              <div className="icon"></div>
              <div className="text-topic">Тема</div>
              <div className="messages">Сообщений</div>
              <div className="latest">Последнее сообщение</div>
            </div>
            {forumItems.map((item) =>
              item.type === "subsection" ? (
                <ForumSubsection
                  key={item.id}
                  title={item.title}
                  subsections={item.subsections}
                  info={item.info}
                  messages={item.messages}
                  latest={item.latest}
                />
              ) : (
                <ForumTopic
                  key={item.id}
                  fixedTopic={item.fixedTopic}
                  title={item.title}
                  author={item.author}
                  messages={item.messages}
                  latest={item.latest}
                />
              )
            )}
            <div className="d-flex align-items-center justify-content-between mt-4">
              <Pagination
                pageLimit={pageLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesDisplayedLimit={3}
                itemsAmount={fakeForumSubsections.length}
                startingPage={startingPage}
                setStartingPage={setStartingPage}
              />
              <div className="d-flex align-items-center">
                <span className="d-none d-sm-block me-2">показать</span>
                <CustomSelect
                  className="inp"
                  name="items-count"
                  checkedOpt={1}
                  options={["10", "15", "20"]}
                  alignment="right"
                  onSelectChange={handleCustomSelect}
                />
                <span className="ms-2 d-none d-md-block">тем на странице</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <hr className="mt-5 mb-3" />
            <div className="d-flex align-items-center fs-11 mb-3">
              <IconContext.Provider
                value={{
                  className: "icon-10 blue",
                  title: "Правила публикации",
                }}
              >
                <BsFillInfoSquareFill />
              </IconContext.Provider>
              <span className="blue ms-2">Правила публикации</span>
            </div>
            <p className="gray-3">
              Администрация сайта не несет ответственности за информацию,
              публикуемую в форуме, и ее мнение может не совпадать с мнением
              авторов сообщений. Сообщения о незаконно размещенной информации на
              форуме присылайте на адрес:
              <a href="mailto:mail@gmail.com">mail@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
