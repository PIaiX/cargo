import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ResponseCard from "../../components/ResponseCard";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import {
    completeResponse,
    getCompletedCargoResponses,
    getCompletedRouteResponses,
    getInProcessCargoResponsesExecutor,
    getInProcessCargoResponsesOwner,
    getInProcessRouteResponsesExecutor,
    getInProcessRouteResponsesOwner,
    rejectResponse
} from "../../API/response";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import {useSelector} from "react-redux";
import {Tab, Tabs} from "react-bootstrap";
import Loader from "../../components/Loader";
import Select from "react-select";

const initialPageLimit = 6;

const options = [{label: 'Отклики по моим объявлениям', value: 'owner'}, {label: 'Мои отклики', value: 'executor'}]

export default function InWork() {

    const [selectedType, setSelectedType] = useState({
        value: 'owner',
        label: 'Отклики по моим объявлениям'
    })

    const [tab, setTab] = useState("active");
    const axiosPrivate = useAxiosPrivate()
    const inWorkPag = usePagination(initialPageLimit)
    const currentUser = useSelector(state => state.currentUser.data.user)
    const [subTabs, setSubTabs] = useState('cargo')
    const [idDelete, setIdDelete] = useState(null)
    const [idComplete, setIdComplete] = useState(null)
    const [paginationItemsAmount, setPaginationItemsAmount] = useState(0)
    const [couterCompleted, setCouterCompleted] = useState({
        totalRoute: null,
        totalCargo: null
    })

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
        if ((currentUser?.roleId !== 2) && (selectedType.value === 'owner')) {
            getInProcessRouteResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeRoutesInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }))
        } else if ((currentUser?.roleId !== 2) && (selectedType.value === 'executor')) {
            getInProcessRouteResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeRoutesInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }))
        }
    }, [inWorkPag.pageLimit, selectedType.value, currentUser?.roleId])

    useEffect(() => {
        if ((currentUser?.roleId !== 3) && (selectedType.value === 'owner')) {
            getInProcessCargoResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeCargosInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }))
        } else if ((currentUser?.roleId !== 3) && (selectedType.value === 'executor')) {
            getInProcessCargoResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeCargosInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }))
        }
    }, [inWorkPag.pageLimit, selectedType.value, currentUser?.roleId])

    useEffect(() => {
        (currentUser?.roleId !== 2) && getCompletedRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeRoutesComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
    }, [inWorkPag.pageLimit])

    useEffect(() => {
        (currentUser?.roleId !== 3) && getCompletedCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeCargosComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }))
    }, [inWorkPag.pageLimit])

    useEffect(() => {
        if ((currentUser?.roleId !== 3) && (tab === 'active') &&
            (forMeCargosInProcess.isLoading) && (selectedType.value === 'owner') &&
            (subTabs === 'cargo')
        ) {
            getInProcessCargoResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeCargosInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }));
        }
        if ((currentUser?.roleId !== 3) && (tab === 'active') &&
            (forMeRoutesInProcess.isLoading) && (selectedType.value === 'owner') &&
            (subTabs === 'route')
        ) {
            getInProcessRouteResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeRoutesInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }));
        }
        if ((currentUser?.roleId !== 2) && (subTabs === 'cargo') &&
            (tab === 'active') && (forMeCargosInProcess.isLoading) &&
            selectedType.value === 'executor'
        ) {
            getInProcessCargoResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeCargosInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }));
        }
        if ((currentUser?.roleId !== 2) && (subTabs === 'route') &&
            (tab === 'active') && (forMeRoutesInProcess.isLoading) &&
            selectedType.value === 'executor'
        ) {
            getInProcessRouteResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                .then(res => setForMeRoutesInProcess({
                    isLoading: true,
                    data: res?.body?.data,
                    meta: res?.body?.meta,
                }));
        }
        ((currentUser?.roleId !== 2) && (subTabs === 'route') && (tab === 'archive')) &&
        getCompletedRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeRoutesComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }));
        (currentUser?.roleId !== 3 && subTabs === 'cargo' && tab === 'archive') &&
        getCompletedCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
            .then(res => setForMeCargosComplete({
                isLoading: true,
                data: res?.body?.data,
                meta: res?.body?.meta,
            }));
    }, [currentUser?.roleId, inWorkPag.currentPage, inWorkPag.pageLimit, selectedType.value])

    useEffect(() => {
        idComplete && completeResponse(axiosPrivate, idComplete)
            .then(() => {
                if (selectedType.value === 'owner' && subTabs === 'cargo') {
                    setTimeout(() => {
                        getInProcessCargoResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                        getCompletedCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosComplete({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                } else if (selectedType.value === 'owner' && subTabs === 'route') {
                    setTimeout(() => {
                        getInProcessRouteResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                        getCompletedRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesComplete({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                } else if (selectedType.value === 'executor' && subTabs === 'cargo') {
                    setTimeout(() => {
                        getInProcessCargoResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                        getCompletedCargoResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosComplete({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                } else {
                    setTimeout(() => {
                        getInProcessRouteResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                        getCompletedRouteResponses(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesComplete({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                }
            })
    }, [idComplete])

    useEffect(() => {
        idDelete && rejectResponse(axiosPrivate, idDelete)
            .then(() => {
                if (selectedType.value === 'owner' && subTabs === 'cargo') {
                    setTimeout(() => {
                        getInProcessCargoResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                } else if (selectedType.value === 'owner' && subTabs === 'route') {
                    setTimeout(() => {
                        getInProcessRouteResponsesOwner(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                } else if (selectedType.value === 'executor' && subTabs === 'cargo') {
                    setTimeout(() => {
                        getInProcessCargoResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeCargosInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                } else {
                    setTimeout(() => {
                        getInProcessRouteResponsesExecutor(axiosPrivate, currentUser?.id, inWorkPag.currentPage, inWorkPag.pageLimit)
                            .then(res => setForMeRoutesInProcess({
                                isLoading: true,
                                data: res?.body?.data,
                                meta: res?.body?.meta,
                            }));
                    }, 500)
                }
            })
    }, [idDelete])

    useEffect(() => {
        if ((subTabs === 'cargo') && (tab === 'active')) setPaginationItemsAmount(forMeCargosInProcess?.meta?.total || 0)
        if ((subTabs === 'route') && (tab === 'active')) setPaginationItemsAmount(forMeRoutesInProcess?.meta?.total || 0)
        if ((subTabs === 'cargo') && (tab === 'archive')) setPaginationItemsAmount(forMeCargosComplete?.meta?.total || 0)
        if ((subTabs === 'route') && (tab === 'archive')) setPaginationItemsAmount(forMeRoutesComplete?.meta?.total || 0)
    }, [tab, subTabs, forMeCargosInProcess?.meta?.total, forMeRoutesInProcess?.meta?.total, forMeRoutesComplete?.meta?.total, forMeCargosComplete?.meta?.total])

    useEffect(() => {
        if ((subTabs === 'cargo') && (tab === 'active')) {
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
        if ((subTabs === 'route') && (tab === 'active')) {
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
        if ((subTabs === 'cargo') && (tab === 'archive')) {
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
        if ((subTabs === 'route') && (tab === 'archive')) {
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
    }, [subTabs, tab])

    useEffect(() => {
        if((subTabs === 'cargo') && (tab === 'active') && (forMeCargosInProcess?.data?.length === 0) && (selectedType?.value === "owner")){
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
        if((subTabs === 'route') && (tab === 'active') && (forMeRoutesInProcess?.data?.length === 0) && (selectedType?.value === "owner")){
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
        if((subTabs === 'cargo') && (tab === 'active') && (forMeCargosInProcess?.data?.length === 0) && (selectedType?.value === "executor")){
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
        if((subTabs === 'route') && (tab === 'active') && (forMeRoutesInProcess?.data?.length === 0) && (selectedType?.value === "executor")){
            inWorkPag.setCurrentPage(1)
            inWorkPag.setStartingPage(1)
        }
    }, [forMeCargosInProcess?.data?.length, forMeRoutesInProcess?.data?.length, subTabs, tab])

    const returnerTotalsInProcess = () => {
        if (forMeRoutesInProcess?.isLoading && forMeCargosInProcess?.isLoading) {
            return (forMeRoutesInProcess?.meta?.total + forMeCargosInProcess?.meta?.total)
        } else if (forMeCargosInProcess?.isLoading) {
            return forMeCargosInProcess?.meta?.total
        } else if (forMeRoutesInProcess?.isLoading) {
            return forMeRoutesInProcess?.meta?.total
        } else {
            return 0
        }
    }

    const returnerTotalsComplete = () => {
        if (forMeRoutesComplete?.isLoading && forMeCargosComplete?.isLoading) {
            return (forMeRoutesComplete?.meta?.total + forMeCargosComplete?.meta?.total)
        } else if (forMeCargosComplete?.isLoading) {
            return forMeCargosComplete?.meta?.total
        } else if (forMeRoutesComplete?.isLoading) {
            return forMeRoutesComplete?.meta?.total
        } else {
            return 0
        }
    }

    return (
        <div className="box px-0 p-sm-4 p-xl-5">
            <Link
                to="/personal-account"
                className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
            >
                <span className="green fs-15 me-2">⟵</span> Назад
            </Link>
            <h1 className="dark-blue text-center d-lg-none">Отклики в работе</h1>
            <div className="d-flex justify-content-between fs-12 fw-5 title-font mb-4 mb-xl-5">
                <div className='d-flex'>
                    <button
                        type="button"
                        className={tab === "active" ? "active tab-btn" : "tab-btn"}
                        onClick={() => setTab("active")}
                    >
                        Текущие ({returnerTotalsInProcess()})
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
                        Выполнено ({returnerTotalsComplete()})
                    </button>
                </div>
                <div>
                    <Select
                        isSearchable={false}
                        classNamePrefix="react-select"
                        options={options}
                        defaultValue={options[0]}
                        onChange={(val) => {
                            setSelectedType({value: val.value, label: val.label})
                        }}
                    />
                </div>
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
                        <Tab
                            eventKey="cargo"
                            title={`Грузы (${forMeCargosInProcess?.isLoading ? forMeCargosInProcess?.meta?.total : '0'})`}

                        >
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeCargosInProcess?.isLoading
                                    ? forMeCargosInProcess?.data?.length
                                        ? forMeCargosInProcess?.data?.map((cargo, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={cargo.id}
                                                    type={cargo.status}
                                                    userId={cargo.user.id}
                                                    subject={cargo.user.subject}
                                                    name={cargo.user.fullName}
                                                    company={cargo.user.companyName}
                                                    img={cargo.user.avatar}
                                                    callbackComplete={id => setIdComplete(id)}
                                                    callbackDelete={id => setIdDelete(id)}
                                                    idCargo={cargo.cargoId}
                                                    cargo={cargo.cargo}
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
                        <Tab
                            eventKey="route"
                            title={`Маршруты (${forMeRoutesInProcess?.meta?.total ? forMeRoutesInProcess?.meta?.total : '0'})`}
                            onClick={() => inWorkPag.setCurrentPage(1)}
                        >
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeRoutesInProcess?.isLoading
                                    ? forMeRoutesInProcess?.data?.length
                                        ? forMeRoutesInProcess?.data?.map((route, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={route.id}
                                                    userId={route.user.id}
                                                    type={route.status}
                                                    name={route.user.fullName}
                                                    company={route.companyName}
                                                    img={route.user.avatar}
                                                    callbackComplete={id => setIdComplete(id)}
                                                    callbackDelete={id => setIdDelete(id)}
                                                    idRoute={route.routeId}
                                                    route={route.route}
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
                        <Tab eventKey="cargo"
                             title={`Грузы (${forMeCargosComplete?.meta?.total ? forMeCargosComplete.meta.total : '0'})`}>
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeCargosComplete?.isLoading
                                    ? forMeCargosComplete?.data?.length
                                        ? forMeCargosComplete?.data?.map((cargo, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={cargo.id}
                                                    userId={cargo.user.id}
                                                    type={cargo.status}
                                                    name={cargo.user.fullName}
                                                    company={cargo.companyName}
                                                    img={cargo.user.avatar}
                                                    idCargo={cargo.cargoId}
                                                    cargo={cargo.cargo}
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
                        <Tab eventKey="route"
                             title={`Маршруты (${forMeRoutesComplete?.meta?.total ? forMeRoutesComplete.meta.total : '0'})`}>
                            <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                                {forMeRoutesComplete?.isLoading
                                    ? forMeRoutesComplete?.data?.length
                                        ? forMeRoutesComplete?.data?.map((route, index) => (
                                            <div key={index}>
                                                <ResponseCard
                                                    inWork={true}
                                                    id={route.id}
                                                    userId={route.user.id}
                                                    type={route.status}
                                                    name={route.user.fullName}
                                                    company={route.companyName}
                                                    img={route.user.avatar}
                                                    idRoute={route.routeId}
                                                    route={route.route}
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
