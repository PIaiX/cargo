import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ResponseCard from "../../components/ResponseCard";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import {
    completeResponse,
    getCompletedCargoResponses,
    getCompletedRouteResponses,
    getInProcessCargoResponses,
    getInProcessRouteResponses,
    rejectResponse
} from "../../API/response";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import {useSelector} from "react-redux";
import {Tab, Tabs} from "react-bootstrap";
import Loader from "../../components/Loader";

const initialPageLimit = 1;

export default function InWork() {

    const [tab, setTab] = useState("active");
    const axiosPrivate = useAxiosPrivate()
    const inWorkPag = usePagination(initialPageLimit)
    const currentUser = useSelector(state => state.currentUser.data.user)
    const [subTabs, setSubTabs] = useState('cargo')
    const [idDelete, setIdDelete] = useState(null)
    const [idComplete, setIdComplete] = useState(null)
    const [paginationItemsAmount, setPaginationItemsAmount] = useState(0)

    useEffect(() => {
        (currentUser?.roleId === 2) && setSubTabs('cargo');
        (currentUser?.roleId === 3) && setSubTabs('route');
        (currentUser?.roleId === 4) && setSubTabs('cargo');
    }, [currentUser?.roleId])

    const [forMeRoutesInProcess, setForMeRoutesInProcess] = useState({
        isLoading: false,
        data: [],
        meta: {},
    })
    const [forMeCargosInProcess, setForMeCargosInProcess] = useState({
        isLoading: false,
        data: [],
        meta: {},
    })

    const [forMeRoutesComplete, setForMeRoutesComplete] = useState({
        isLoading: false,
        data: [],
        meta: {},
    })

    const [forMeCargosComplete, setForMeCargosComplete] = useState({
        isLoading: false,
        data: [],
        meta: {},
    })

    useEffect(() => {
        (currentUser?.roleId !== 2) && getInProcessRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeRoutesInProcess({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch(error => console.log(error))
    }, [inWorkPag.pageLimit])

    useEffect(() => {
        (currentUser?.roleId !== 3) && getInProcessCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeCargosInProcess({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch(error => console.log(error))
    }, [inWorkPag.pageLimit])

    useEffect(() => {
        (currentUser?.roleId !== 2) && getCompletedRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeRoutesComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch()
    }, [inWorkPag.pageLimit])

    useEffect(() => {
        (currentUser?.roleId !== 3) && getCompletedCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeCargosComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch()
    }, [inWorkPag.pageLimit])

    useEffect(() => {
        (currentUser?.roleId !== 3 && subTabs === 'cargo' && tab === 'active' && forMeCargosInProcess.isLoading) && getInProcessCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeCargosInProcess({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch(error => console.log(error));
        (currentUser?.roleId !== 2 && subTabs === 'route' && tab === 'active' && forMeRoutesInProcess.isLoading) && getInProcessRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeRoutesInProcess({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch(error => console.log(error));
        (currentUser?.roleId !== 2 && subTabs === 'route' && tab === 'archive') && getCompletedRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeRoutesComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch();
        (currentUser?.roleId !== 3 && subTabs === 'cargo' && tab === 'archive') && getCompletedCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeCargosComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
            .catch()
    }, [inWorkPag.currentPage, inWorkPag.pageLimit])

    useEffect(() => {
        idComplete && completeResponse(axiosPrivate, idComplete)
            .then(() => {
                if (subTabs === 'cargo') {
                    setTimeout(() => {
                        (currentUser?.roleId !== 3) && getInProcessCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => {
                                setForMeCargosInProcess({
                                    isLoading: true,
                                    data: res?.body?.data,
                                    meta: res?.body?.meta,
                                })
                            })
                            .catch(error => console.log(error))
                    }, 150)
                } else {
                    setTimeout(() => {
                        (currentUser?.roleId !== 2) && getInProcessRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }))
                            .catch(error => console.log(error))
                    }, 150)
                }
            })
            .catch()
    }, [idComplete])

    useEffect(() => {
        idDelete && rejectResponse(axiosPrivate, idDelete)
            .then(() => {
                if (subTabs === 'cargo') {
                    setTimeout(() => {
                        (currentUser?.roleId !== 3) && getInProcessCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }))
                            .catch(error => console.log(error))
                    }, 150)
                } else {
                    setTimeout(() => {
                        (currentUser?.roleId !== 2) && getInProcessRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }))
                            .catch(error => console.log(error))
                    }, 150)
                }
            })
            .catch()
    }, [idDelete])

    useEffect(() => {
        if (subTabs === 'cargo' && tab === 'active') {
            setPaginationItemsAmount(forMeCargosInProcess.meta.total || 0)
            inWorkPag.setCurrentPage(1)
        }
        if (subTabs === 'route' && tab === 'active') {
            setPaginationItemsAmount(forMeRoutesInProcess.meta.total || 0)
            inWorkPag.setCurrentPage(1)
        }
        if (subTabs === 'cargo' && tab === 'archive') {
            setPaginationItemsAmount(forMeCargosComplete.meta.total || 0)
            inWorkPag.setCurrentPage(1)
        }
        if (subTabs === 'route' && tab === 'archive') {
            setPaginationItemsAmount(forMeRoutesComplete.meta.total || 0)
            inWorkPag.setCurrentPage(1)
        }
    }, [tab, subTabs, forMeCargosInProcess.meta.total, forMeRoutesInProcess.meta.total, forMeCargosComplete.meta.total, forMeRoutesComplete.meta.total])

    console.log(paginationItemsAmount)
    console.log(inWorkPag)
    return (
        <div className="box px-0 p-sm-4 p-xl-5">
            <Link
                to="/personal-account"
                className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
            >
                <span className="green fs-15 me-2">⟵</span> Назад
            </Link>
            <h1 className="dark-blue text-center d-lg-none">Отклики в работе</h1>
            <div className="d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5">
                <button
                    type="button"
                    className={tab === "active" ? "active tab-btn" : "tab-btn"}
                    onClick={() => setTab("active")}
                >
                    {currentUser.roleId === 2 ? `Текущие (${forMeCargosInProcess.meta.total ? forMeCargosInProcess.meta.total : '0'})` : ''}
                    {currentUser.roleId === 3 ? `Текущие (${forMeRoutesInProcess.meta.total ? forMeRoutesInProcess.meta.total : '0'})` : ''}
                    {currentUser.roleId === 4 ? `Текущие (${(forMeRoutesInProcess.meta.total && forMeCargosInProcess.meta.total)
                        ? forMeRoutesInProcess.meta.total + forMeCargosInProcess.meta.total
                        : (forMeRoutesInProcess.meta.total || forMeCargosInProcess.meta.total)})` : ''}
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
                    {currentUser.roleId === 2 ? `Выполнено (${forMeCargosComplete.meta.total ? forMeCargosComplete.meta.total : '0'})` : ''}
                    {currentUser.roleId === 3 ? `Выполнено (${forMeRoutesComplete.meta.total ? forMeRoutesComplete.meta.total : '0'})` : ''}
                    {currentUser.roleId === 4 ? `Выполнено (${(forMeRoutesComplete.meta.total && forMeCargosComplete.meta.total)
                        ? forMeRoutesComplete.meta.total + forMeCargosComplete.meta.total
                        : (forMeRoutesComplete.meta.total || forMeCargosComplete.meta.total)})` : ''}
                </button>
            </div>
            {
                tab === 'active' &&
                <Tabs
                    activeKey={subTabs}
                    className="mb-3"
                    onSelect={(eventKey) => setSubTabs(eventKey)}
                >
                    {
                        currentUser?.roleId !== 3 &&
                        <Tab eventKey="cargo"
                             title={`Грузы (${forMeCargosInProcess?.meta?.total ? forMeCargosInProcess?.meta?.total : '0'})`}>
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeCargosInProcess.isLoading
                                    ? forMeCargosInProcess.data.length
                                        ? forMeCargosInProcess?.data?.map((route, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={route.id}
                                                    type={route.status}
                                                    userId={route.user.id}
                                                    subject={route.user.subject}
                                                    name={route.user.fullName}
                                                    company={route.user.companyName}
                                                    img={route.user.avatar}
                                                    callbackComplete={id => setIdComplete(id)}
                                                    callbackDelete={id => setIdDelete(id)}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Текущих грузов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                }
                            </div>
                        </Tab>
                    }
                    {
                        currentUser?.roleId !== 2 &&
                        <Tab eventKey="route"
                             title={`Маршруты (${forMeRoutesInProcess?.meta?.total ? forMeRoutesInProcess?.meta?.total : '0'})`}>
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeRoutesInProcess.isLoading
                                    ? forMeRoutesInProcess.data.length
                                        ? forMeRoutesInProcess?.data?.map((cargo, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={cargo.id}
                                                    type={cargo.status}
                                                    name={cargo.user.fullName}
                                                    company={cargo.companyName}
                                                    img={cargo.user.avatar}
                                                    callbackComplete={id => setIdComplete(id)}
                                                    callbackDelete={id => setIdDelete(id)}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Текущих маршрутов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                }
                            </div>
                        </Tab>
                    }
                </Tabs>

            }
            {
                tab === 'archive' &&
                <Tabs
                    activeKey={subTabs}
                    className="mb-3"
                    onSelect={(eventKey) => setSubTabs(eventKey)}
                >
                    {
                        currentUser?.roleId !== 3 &&
                        <Tab eventKey="cargo" title={`Грузы ${forMeCargosComplete?.meta?.total}`}>
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeCargosComplete.isLoading
                                    ? forMeCargosComplete.data.length
                                        ? forMeCargosComplete?.data?.map((route, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={route.id}
                                                    type={route.status}
                                                    name={route.user.fullName}
                                                    company={route.companyName}
                                                    img={route.user.avatar}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Выполненных грузов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                }
                            </div>
                        </Tab>
                    }
                    {
                        currentUser?.roleId !== 2 &&
                        <Tab eventKey="route" title={`Маршруты (${forMeRoutesComplete?.meta?.total})`}>
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeRoutesComplete.isLoading
                                    ? forMeRoutesComplete.data.length
                                        ? forMeRoutesComplete?.data?.map((cargo, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={cargo.id}
                                                    type={cargo.status}
                                                    name={cargo.user.fullName}
                                                    company={cargo.companyName}
                                                    img={cargo.user.avatar}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Выполненных маршрутов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                }
                            </div>
                        </Tab>
                    }
                </Tabs>
            }
            <div className="mt-4">
                <Pagination
                    pageLimit={inWorkPag.pageLimit}
                    currentPage={inWorkPag.currentPage}
                    setCurrentPage={inWorkPag.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={paginationItemsAmount}
                    startingPage={inWorkPag.startingPage}
                    setStartingPage={inWorkPag.setStartingPage}
                />
            </div>
        </div>
    );
}
