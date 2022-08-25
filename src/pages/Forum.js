import React, {useEffect, useState} from "react";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import ForumWidget from "../components/ForumWidget";
import {IconContext} from "react-icons";
import {IoAddCircleSharp, IoSearch,} from "react-icons/io5";
import {BsFillChatRightTextFill, BsFillInfoSquareFill} from "react-icons/bs";
import CustomModal from '../components/utilities/CustomModal';
import usePagination from '../hooks/pagination';
import {createTopic, getStatistics, paginateUserTopics, searchTopics} from '../API/topic';
import Loader from '../components/Loader';
import useDebounce from '../hooks/debounce';
import useAxiosPrivate from '../hooks/axiosPrivate';
import {useSelector} from 'react-redux';
import CreateTopicForm from '../components/CreateTopicForm';
import Alert from 'react-bootstrap/Alert';

const initialPageLimit = 10;

export default function Forum() {
    const axiosPrivate = useAxiosPrivate()
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const {pathname} = useLocation()

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 300)

    const topicsPagination = usePagination(initialPageLimit)
    const userTopicsPagination = usePagination(initialPageLimit)
    const [shownPagination, setShownPagination] = useState({})

    const [topics, setTopics] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })
    const [userTopics, setUserTopics] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })
    const [shownItems, setShownItems] = useState([])

    const [isShowCreateTopic, setIsShowCreateTopic] = useState(false);
    const [statistic, setStatistic] = useState({
        isLoading: false,
        error: null,
        item: null
    })
    const [createTopicPayloads, setCreateTopicPayloads] = useState({})

    const initialSubmitAlert = {
        variant: 'success',
        isShow: false
    }
    const [submitAlert, setSubmitAlert] = useState(initialSubmitAlert)

    const submitHandler = (data) => {
        setCreateTopicPayloads(prev => ({...prev, ...data}))
        setIsShowCreateTopic(false)
    }

    useEffect(() => {
        const value = debouncedSearch && debouncedSearch.trim()

        if (pathname === '/forum') {
            setShownItems(topics)
            setShownPagination(topicsPagination)
        }
        if (value && (pathname === '/forum/my-topics')) {
            setShownItems(topics)
            setShownPagination(topicsPagination)
        }
        if (!value && (pathname === '/forum/my-topics')) {
            setShownItems(userTopics)
            setShownPagination(userTopicsPagination)
        }
    }, [pathname, topics, userTopics, debouncedSearch])

    useEffect(() => {
        topicsPagination.setCurrentPage(1)
        userTopicsPagination.setCurrentPage(1)
    }, [pathname, debouncedSearch])

    useEffect(() => {
        getStatistics()
            .then(result => setStatistic(prev => ({...prev, isLoading: true, item: result})))
            .catch(error => setStatistic(prev => ({...prev, isLoading: true, error})))
    }, [])

    useEffect(() => {
        searchTopics(topicsPagination.currentPage, topicsPagination.pageLimit, debouncedSearch)
            .then(result => setTopics(prev => ({...prev, isLoading: true, meta: result?.meta, items: result?.data})))
            .catch(error => setTopics(prev => ({...prev, isLoading: true, error})))
    }, [topicsPagination.currentPage, topicsPagination.pageLimit, debouncedSearch])

    useEffect(() => {
        userId && paginateUserTopics(axiosPrivate, userId, topicsPagination.currentPage, topicsPagination.pageLimit)
            .then(result => setUserTopics(prev => ({...prev, isLoading: true, meta: result?.meta, items: result?.data})))
            .catch(error => setUserTopics(prev => ({...prev, isLoading: true, error})))
    }, [userTopicsPagination.currentPage, userTopicsPagination.pageLimit, userId])

    useEffect(() => {
        Object.keys(createTopicPayloads).length && createTopic(axiosPrivate, userId, createTopicPayloads)
            .then(() => setSubmitAlert(prev => ({...prev, variant: 'success', isShow: true})))
            .catch(() => setSubmitAlert(prev => ({...prev, variant: 'danger', isShow: true})))
    }, [createTopicPayloads, userId])

    useEffect(() => {
        if (submitAlert.isShow) setTimeout(() => setSubmitAlert(initialSubmitAlert), 4000)
    }, [submitAlert])

    return (
        <main className="bg-white py-4 py-sm-5">
            <Alert className='submit-alert' variant={submitAlert.variant} show={submitAlert.isShow}>
                {(submitAlert.variant === 'success') ? 'Тема была успешно создана' : 'Возникла ошибка при создании темы'}
            </Alert>
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
                        <NavLink to="my-topics" className="d-flex justify-content-end align-items-center mb-3 fs-12">
                            <IconContext.Provider
                                value={{className: "icon-10 blue", title: "Мои темы"}}
                            >
                                <BsFillChatRightTextFill/>
                            </IconContext.Provider>
                            <span className="ms-2 blue">Мои темы ({userTopics?.items?.length || 0})</span>
                        </NavLink>

                        <button
                            type="button"
                            className="btn btn-2 w-100 mb-3 fs-12 px-3 py-2 d-flex"
                            onClick={() => setIsShowCreateTopic(prevState => !prevState)}
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
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <button>
                                <IconContext.Provider
                                    value={{className: "icon-15 green", title: "Поиск"}}
                                >
                                    <IoSearch/>
                                </IconContext.Provider>
                            </button>
                        </form>
                        {statistic.isLoading
                            ? statistic.item
                                ? <>
                                    <h5 className="d-none d-lg-block mb-1">Статистика портала</h5>
                                    <div className="stat d-none d-lg-block title-font p-3 mb-4">
                                        {statistic?.item?.topicCount && (
                                            <div className="d-flex justify-content-between mb-2 mb-xl-3">
                                                <div className="gray-3 fw-4 me-4">Темы:</div>
                                                <div className="fw-5">{statistic.item.topicCount}</div>
                                            </div>
                                        )}
                                        {statistic?.item?.messagesCount && (
                                            <div className="d-flex justify-content-between mb-2 mb-xl-3">
                                                <div className="gray-3 me-4">Сообщения:</div>
                                                <div className="fw-5">{statistic.item.messagesCount}</div>
                                            </div>
                                        )}
                                        {statistic?.item?.usersWithTopics && (
                                            <div className="d-flex justify-content-between mb-2 mb-xl-3">
                                                <div className="gray-3 me-4">Пользователи:</div>
                                                <div className="fw-5">{statistic.item.usersWithTopics}</div>
                                            </div>
                                        )}
                                        {statistic?.item?.lastTopicTitle && (
                                            <div className="d-flex justify-content-between">
                                                <div className="gray-3 me-4">Новая тема:</div>
                                                <div className="fw-5 flex-1 text-truncate blue">
                                                    {statistic.item.lastTopicTitle}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                                : <div className="p-5"></div>
                            : <div className="w-100 d-flex justify-content-center p-5"><Loader color="#545454"/></div>
                        }
                        <ForumWidget className="d-none d-lg-block"/>
                    </div>
                    {/* ForumTopics */}
                    <Outlet context={[shownItems, shownPagination]}/>
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
                isShow={isShowCreateTopic}
                setIsShow={setIsShowCreateTopic}
                closeButton={true}
                centered={true}
                size={'lg'}
            >
                <CreateTopicForm submitHandler={submitHandler}/>
            </CustomModal>
        </main>
    );
}
