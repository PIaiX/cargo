import React, {useState, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import ForumWidget from "../components/ForumWidget";
import ForumSection from "../components/ForumSection";
import CustomSelect from "../components/utilities/CustomSelect";
import {IconContext} from "react-icons";
import {
    IoSearch,
    IoAddCircleSharp,
} from "react-icons/io5";
import {BsFillInfoSquareFill, BsFillChatRightTextFill} from "react-icons/bs";
import fakeForumSections from "../dummyData/forumSections.json";
import Pagination from "../components/Pagination";
import CustomModal from '../components/utilities/CustomModal';
import useDebounce from '../hooks/useDebounce';

const initialPageLimit = 10;

export default function Forum() {
    // pagination data
    const [pageLimit, setPageLimit] = useState(initialPageLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const [startingPage, setStartingPage] = useState(1);
    const [itemsAmount, setItemsAmount] = useState(fakeForumSections.length || 0)

    const [foundForumSections, setFoundForumSections] = useState(fakeForumSections || []);
    const [forumSections, setForumSections] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, 300)
    const [isShowCreateTheme, setIsShowCreateTheme] = useState(false);

    //Make API call in the future, fetching actual forum data

    useEffect(() => {

        const startIdx = (currentPage - 1) * pageLimit;
        const endIdx = startIdx + pageLimit;
        const paginated = foundForumSections.slice(startIdx, endIdx);

        setForumSections(paginated);
        setItemsAmount(foundForumSections.length)

    }, [currentPage, pageLimit, foundForumSections]);

    useEffect(() => {
        const value = debouncedSearchValue.toLowerCase().trim()

        if (fakeForumSections.length && debouncedSearchValue) {
            setFoundForumSections(fakeForumSections.filter(section => section.title.toLowerCase().startsWith(value)))
        } else {
            setFoundForumSections(fakeForumSections)
        }
    }, [debouncedSearchValue])

    useEffect(() => {
        setCurrentPage(1)
        setStartingPage(1)
    }, [pageLimit])

    const handleCustomSelect = (value) => {
        if (value === 1) setPageLimit(10);
        if (value === 2) setPageLimit(15);
        if (value === 3) setPageLimit(20);
    };

    const callback = (am) => {
        !(am.includes(currentPage)) && setCurrentPage(startingPage)
    }

    return (
        <main className="bg-white py-4 py-sm-5">
            <section className="container" id="sec-11">
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/forum">Разделы форума</Link>
                        </li>
                    </ol>
                </nav>

                <h1 className="dark-blue text-uppercase">Форум ПОРТАЛА</h1>

                <div className="row flex-lg-row-reverse">
                    <div className="col-lg-3">
                        <NavLink to="/my-topics" className="d-flex justify-content-end align-items-center mb-3 fs-12">
                            <IconContext.Provider
                                value={{className: "icon-10 blue", title: "Мои темы"}}
                            >
                                <BsFillChatRightTextFill/>
                            </IconContext.Provider>
                            <span className="ms-2 blue">Мои темы (2)</span>
                        </NavLink>

                        <button
                            type="button"
                            className="btn btn-2 w-100 mb-3 fs-12 px-3 py-2 d-flex"
                            onClick={() => setIsShowCreateTheme(prevState => !prevState)}
                        >
                            <IconContext.Provider
                                value={{className: "icon-15 white", title: "Создать тему"}}
                            >
                                <IoAddCircleSharp/>
                            </IconContext.Provider>
                            <span className="flex-1">Создать тему</span>
                        </button>

                        <form className="form-search mb-4">
                            <input
                                type="search"
                                placeholder="Поиск по форуму"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                            />
                            <button>
                                <IconContext.Provider
                                    value={{className: "icon-15 green", title: "Поиск"}}
                                >
                                    <IoSearch/>
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
                        <ForumWidget className="d-none d-lg-block"/>
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex justify-content-end mb-3">
                            <Pagination
                                callback={callback}
                                // Количество тем на странице
                                pageLimit={pageLimit}
                                // Текущая страница
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                // Лимит отображаемых страниц при 3 будет 123...6 при 6 будет 123456
                                pagesDisplayedLimit={3}
                                // Длинна массива тем
                                itemsAmount={itemsAmount}
                                // Стартовая страница
                                startingPage={startingPage}
                                setStartingPage={setStartingPage}
                            />
                        </div>
                        <div className="forum-header">
                            <div className="icon"/>
                            <div className="text">Название темы</div>
                            <div className="messages">Сообщений</div>
                            <div className="latest">Последнее сообщение</div>
                        </div>
                        {
                            forumSections.map((section) => (
                                <ForumSection
                                    key={section.id}
                                    id={section.id}
                                    title={section.title}
                                    info={section.info}
                                    topics={section.topics}
                                    messages={section.messages}
                                    latest={section.latest}
                                />
                            ))
                        }
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <Pagination
                                callback={callback}
                                pageLimit={pageLimit}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                pagesDisplayedLimit={3}
                                itemsAmount={itemsAmount}
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
                        <hr className="mt-5 mb-3"/>
                        <div className="d-flex align-items-center fs-11 mb-3">
                            <IconContext.Provider
                                value={{
                                    className: "icon-10 blue",
                                    title: "Правила публикации",
                                }}
                            >
                                <BsFillInfoSquareFill/>
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

            <CustomModal
                isShow={isShowCreateTheme}
                setIsShow={setIsShowCreateTheme}
                size='lg'
            >
                <h3>Новая тема</h3>
                <form className="fs-12">
                    <label className="mb-2">Название темы</label>
                    <input
                        type="text"
                        className="mb-4"
                        placeholder="Придумайте название темы"
                    />
                    <label className="mb-2">Текст темы</label>
                    <textarea rows="5" placeholder="Ваша история или вопрос"/>
                    <div className="row flex-sm-row-reverse mt-4">
                        <div className="col-sm-5">
                            <button type="submit" className="btn btn-2 w-100">
                                Сохранить
                            </button>
                        </div>
                        <div className="col-sm-7 mt-2 mt-sm-0">
                            <div className="fs-09 text-center">
                                Нажимая на кнопку “Создать тему”, вы соглашаетесь с{" "}
                                <a className="blue" href="/">
                                    правилами публикации
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        </main>
    );
}
