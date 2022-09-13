import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ResponseCard from "../../components/ResponseCard";
import {Tab, Tabs} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import useAxiosPrivate from '../../hooks/axiosPrivate';
import usePagination from '../../hooks/pagination';
import {
    acceptResponse,
    getIncomingsCargoResponses,
    getIncomingsRouteResponses,
    getOutgoingsCargoResponses,
    getOutgoingsRouteResponses, rejectResponse
} from '../../API/response';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const initialPageLimit = 6;

export default function Responses() {
    const axiosPrivate = useAxiosPrivate()
    const roleId = useSelector(state => state?.currentUser?.data?.user?.roleId)
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const [tab, setTab] = useState("active");
    const [subTab, setSubTab] = useState('cargo')
    const responsesPagination = usePagination(initialPageLimit)
    const [paginationItemsAmount, setPaginationItemsAmount] = useState(0)
    const [idComplete, setIdComplete] = useState({
        idResponse: null,
        routeId: null,
        cargoId: null
    })
    const [idDelete, setIdDelete] = useState(null)
    const [incomingsCargoResponses, setIncomingsCargoResponses] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })
    const [incomingsRouteResponses, setIncomingsRouteResponses] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })
    const [outgoingsCargoResponses, setOutgoingsCargoResponses] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })
    const [outgoingsRouteResponses, setOutgoingsRouteResponses] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })

    const sendIncomingsCargoRequest = (page, limit) => {
        getIncomingsCargoResponses(axiosPrivate, userId, page, limit)
            .then(result => setIncomingsCargoResponses(prev => ({
                ...prev,
                isLoading: true,
                meta: result?.body?.meta,
                items: result?.body?.data
            })))
            .catch(error => setIncomingsCargoResponses(prev => ({...prev, isLoading: true, error})))
    }
    const sendIncomingsRouteRequest = (page, limit) => {
        getIncomingsRouteResponses(axiosPrivate, userId, page, limit)
            .then(result => setIncomingsRouteResponses(prev => ({
                ...prev,
                isLoading: true,
                meta: result?.body?.meta,
                items: result?.body?.data
            })))
            .catch(error => setIncomingsRouteResponses(prev => ({...prev, isLoading: true, error})))
    }

    const sendOutgoingsCargoRequest = (page, limit) => {
        getOutgoingsCargoResponses(axiosPrivate, userId, page, limit)
            .then(result => setOutgoingsCargoResponses(prev => ({
                ...prev,
                isLoading: true,
                meta: result?.body?.meta,
                items: result?.body?.data
            })))
            .catch(error => setOutgoingsCargoResponses(prev => ({...prev, isLoading: true, error})))
    }

    const sendOutgoingsRouteRequest = (page, limit) => {
        getOutgoingsRouteResponses(axiosPrivate, userId, page, limit)
            .then(result => setOutgoingsRouteResponses(prev => ({
                ...prev,
                isLoading: true,
                meta: result?.body?.meta,
                items: result?.body?.data
            })))
            .catch(error => setOutgoingsRouteResponses(prev => ({...prev, isLoading: true, error})))
    }

    useEffect(() => {
        (roleId !== 3) && sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (roleId !== 2) && sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (roleId !== 3) && sendOutgoingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (roleId !== 2) && sendOutgoingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
    }, [roleId])
    
    useEffect(() => {
        (subTab === 'cargo' && tab === 'active' && incomingsCargoResponses?.isLoading) &&
            sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (subTab === 'route' && tab === 'active' && incomingsCargoResponses?.isLoading) &&
            sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (subTab === 'cargo' && tab === 'archive') &&
            sendOutgoingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (subTab === 'route' && tab === 'archive') &&
            sendOutgoingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
    }, [responsesPagination.currentPage, responsesPagination.pageLimit])

    useEffect(() => setSubTab(() => ((roleId === 3) && 'route') || 'cargo'), [roleId])

    useEffect(() => {
        if ((subTab === 'cargo') && (tab === 'active')) setPaginationItemsAmount(incomingsCargoResponses?.meta?.total || 0)
        if ((subTab === 'route') && (tab === 'active')) setPaginationItemsAmount(incomingsRouteResponses?.meta?.total || 0)
        if ((subTab === 'cargo') && (tab === 'archive')) setPaginationItemsAmount(outgoingsCargoResponses?.meta?.total || 0)
        if ((subTab === 'route') && (tab === 'archive')) setPaginationItemsAmount(outgoingsRouteResponses?.meta?.total || 0)
    }, [incomingsCargoResponses?.meta?.total, incomingsRouteResponses?.meta?.total, outgoingsCargoResponses?.meta?.total, outgoingsRouteResponses?.meta?.total, subTab, tab])

    useEffect(() => {
        if((incomingsRouteResponses?.items?.length === 0) && (subTab === 'route') && (tab === 'active')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
        if ((incomingsCargoResponses?.items?.length === 0) && (subTab === 'cargo') && (tab === 'active')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
        if ((outgoingsCargoResponses?.items?.length === 0) && (subTab === 'cargo') && (tab === 'archive')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
        if ((outgoingsRouteResponses?.items?.length === 0) && (subTab === 'route') && (tab === 'archive')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
    }, [tab, subTab, incomingsCargoResponses?.items?.length, incomingsRouteResponses?.items?.length, outgoingsCargoResponses?.items?.length, outgoingsRouteResponses?.items?.length])

    useEffect(() => {
        if ((subTab === 'cargo') && (tab === 'active')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
        if ((subTab === 'route') && (tab === 'active')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
        if ((subTab === 'cargo') && (tab === 'archive')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
        if ((subTab === 'route') && (tab === 'archive')) {
            responsesPagination.setCurrentPage(1)
            responsesPagination.setStartingPage(1)
        }
    }, [subTab, tab])

    useEffect(() => {
        idComplete?.idResponse
        && acceptResponse(axiosPrivate, idComplete?.idResponse, {routeId: idComplete?.routeId, cargoId: idComplete?.cargoId, userId})
            .then(() => {
                if (subTab === 'cargo') {
                    setTimeout(() => {
                        sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                    }, 300)
                } else {
                    setTimeout(() => {
                        sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                    }, 300)
                }
                setIdComplete({idResponse: null, routeId: null, cargoId: null})
            })
            .catch()
    }, [idComplete?.routeId, idComplete?.cargoId, idComplete?.idResponse, subTab])

    useEffect(() => {
        idDelete && rejectResponse(axiosPrivate, idDelete)
            .then(() => {
                if(tab === 'archive'){
                    if (subTab === 'cargo'){
                        sendOutgoingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                    } else {
                        sendOutgoingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                    }
                }
                if (tab === 'active') {
                    if (subTab === 'cargo') {
                        sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                    } else {
                        sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                    }
                }
                setIdDelete(null)
            })
    }, [idDelete])

    const returnerTotalsInComing = () => {
        if (incomingsRouteResponses?.isLoading && incomingsCargoResponses?.isLoading) {
            return (incomingsRouteResponses?.meta?.total + incomingsCargoResponses?.meta?.total)
        } else if (incomingsCargoResponses?.isLoading) {
            return incomingsCargoResponses?.meta?.total
        } else if (incomingsRouteResponses?.isLoading) {
            return incomingsRouteResponses?.meta?.total
        }  else {
            return 0
        }
    }

    const returnerTotalsOutGoing = () => {
        if (outgoingsRouteResponses?.isLoading && outgoingsCargoResponses?.isLoading) {
            return (outgoingsRouteResponses?.meta?.total + outgoingsCargoResponses?.meta?.total)
        } else if (outgoingsCargoResponses?.isLoading) {
            return outgoingsCargoResponses?.meta?.total
        } else if (outgoingsRouteResponses?.isLoading) {
            return outgoingsRouteResponses?.meta?.total
        } else {
            return 0
        }
    }

    const forCargoInCom = () => {
        if (tab === 'active' && incomingsCargoResponses?.isLoading) {
            return incomingsCargoResponses?.meta?.total
        } else {
            return 0
        }
    }

    const forCargoOut = () => {
        if (tab === 'archive' &&  outgoingsCargoResponses?.isLoading) {
            return outgoingsCargoResponses?.meta?.total
        } else {
            return 0
        }
    }

    const forRouteInCom = () => {
        if (tab === 'active' && incomingsRouteResponses?.isLoading) {
            return incomingsRouteResponses?.meta?.total
        } else {
            return 0
        }
    }

    const forRouteOut = () => {
        if (tab === 'archive' && outgoingsRouteResponses?.isLoading) {
            return outgoingsRouteResponses?.meta?.total
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
            <h1 className="dark-blue text-center d-lg-none">Мои отклики</h1>
            <div className="d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5">
                <button
                    type="button"
                    className={tab === "active" ? "active tab-btn" : "tab-btn"}
                    onClick={() => setTab("active")}
                >
                    Мне откликнулись ({returnerTotalsInComing()})
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
                    Вы откликнулись ({returnerTotalsOutGoing()})
                </button>
            </div>
            <Tabs
                activeKey={subTab}
                className="responses-tabs mb-3"
                onSelect={eventKey => setSubTab(eventKey)}
            >
                {!(roleId === 3) && (
                    <Tab
                        eventKey="cargo"
                        title={`Грузы (${(tab === 'active' ? forCargoInCom() : forCargoOut())})`}
                    >
                        <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                            {(tab === 'active')
                                ? incomingsCargoResponses?.isLoading
                                    ? incomingsCargoResponses?.items?.length
                                        ? incomingsCargoResponses?.items?.map(item => (
                                            <div key={item.id}  className='d-flex'>
                                                <ResponseCard
                                                    inWork={false}
                                                    id={item.id}
                                                    type={item.status}
                                                    userId={item.user.id}
                                                    subject={item.user.subject}
                                                    name={item.user.fullName}
                                                    company={item.user.companyName}
                                                    img={item.user.avatar}
                                                    callbackComplete={(idResponse, idCargo) => setIdComplete({idResponse, cargoId: idCargo})}
                                                    callbackDelete={id => setIdDelete(id)}
                                                    idCargo={item.cargoId}
                                                    cargo={item.cargo}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Откликов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                : outgoingsCargoResponses?.isLoading
                                    ? outgoingsCargoResponses?.items?.length
                                        ? outgoingsCargoResponses?.items?.map(item => (
                                            <div key={item.id} className='d-flex'>
                                                <ResponseCard
                                                    inWork={false}
                                                    id={item.id}
                                                    type={2}
                                                    userId={item.user.id}
                                                    subject={item.user.subject}
                                                    name={item.user.fullName}
                                                    company={item.user.companyName}
                                                    img={item.user.avatar}
                                                    callbackDelete={id => setIdDelete(id)}
                                                    idCargo={item.cargoId}
                                                    cargo={item.cargo}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Откликов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                            }
                        </div>
                    </Tab>
                )}
                {!(roleId === 2) && (
                    <Tab
                        eventKey="route"
                        title={`Маршруты (${tab === 'active' ? forRouteInCom() : forRouteOut()})`}
                    >
                        <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                            {(tab === 'active')
                                ? incomingsRouteResponses?.isLoading
                                    ? incomingsRouteResponses?.items?.length
                                        ? incomingsRouteResponses?.items?.map(item => (
                                            <div key={item.id}>
                                                <ResponseCard
                                                    inWork={false}
                                                    id={item.id}
                                                    type={item.status}
                                                    userId={item.user.id}
                                                    subject={item.user.subject}
                                                    name={item.user.fullName}
                                                    company={item.user.companyName}
                                                    img={item.user.avatar}
                                                    callbackComplete={(idResponse, idRoute) => setIdComplete({idResponse, routeId: idRoute})}
                                                    callbackDelete={id => setIdDelete(id)}
                                                    idRoute={item.routeId}
                                                    route={item.route}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Откликов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                : outgoingsRouteResponses?.isLoading
                                    ? outgoingsRouteResponses?.items?.length
                                        ? outgoingsRouteResponses?.items?.map(item => (
                                            <div key={item.id}>
                                                <ResponseCard
                                                    inWork={false}
                                                    id={item.id}
                                                    type={2}
                                                    userId={item.user.id}
                                                    subject={item.user.subject}
                                                    name={item.user.fullName}
                                                    company={item.user.companyName}
                                                    img={item.user.avatar}
                                                    callbackDelete={id => setIdDelete(id)}
                                                    idRoute={item.routeId}
                                                    route={item.route}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Откликов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                            }
                        </div>
                    </Tab>
                )}
            </Tabs>
            <div className="mt-4">
                <Pagination
                    pageLimit={responsesPagination.pageLimit}
                    currentPage={responsesPagination.currentPage}
                    setCurrentPage={responsesPagination.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={paginationItemsAmount}
                    startingPage={responsesPagination.startingPage}
                    setStartingPage={responsesPagination.setStartingPage}
                />
            </div>
        </div>
    );
}
