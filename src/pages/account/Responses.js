import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ResponseCard from "../../components/ResponseCard";
import {Tab, Tabs} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import useAxiosPrivate from '../../hooks/axiosPrivate';
import usePagination from '../../hooks/pagination';
import {
    acceptResponse,
    completeResponse,
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
    const [idComplete, setIdComplete] = useState(null)
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
        sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit)
        sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit)
        sendOutgoingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit)
        sendOutgoingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit)
    }, [])
    
    useEffect(() => {
        (subTab === 'cargo' && tab === 'active' && incomingsCargoResponses.isLoading) &&
            sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (subTab === 'route' && tab === 'active' && incomingsCargoResponses.isLoading) &&
            sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (subTab === 'cargo' && tab === 'archive') &&
            sendOutgoingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
        (subTab === 'route' && tab === 'archive') &&
            sendOutgoingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
    }, [responsesPagination.currentPage, responsesPagination.pageLimit])

    useEffect(() => setSubTab(() => ((roleId === 3) && 'route') || 'cargo'), [roleId])

    useEffect(() => {
        responsesPagination.setCurrentPage(1)
        responsesPagination.setStartingPage(1)
        if ((tab === 'active') && (subTab === 'cargo')) setPaginationItemsAmount(incomingsCargoResponses?.meta?.total || 0)
        if ((tab === 'active') && (subTab === 'route')) setPaginationItemsAmount(incomingsRouteResponses?.meta?.total || 0)
        if ((tab === 'archive') && (subTab === 'cargo')) setPaginationItemsAmount(outgoingsCargoResponses?.meta?.total || 0)
        if ((tab === 'archive') && (subTab === 'route')) setPaginationItemsAmount(outgoingsRouteResponses?.meta?.total || 0)
    }, [tab, subTab, incomingsCargoResponses?.meta?.total, incomingsRouteResponses?.meta?.total, outgoingsCargoResponses?.meta?.total, outgoingsRouteResponses?.meta?.total])

    useEffect(() => {
        idComplete && acceptResponse(axiosPrivate, idComplete)
            .then(() => {
                setTimeout(() => {
                    sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                }, 300)
                setTimeout(() => {
                    sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                }, 300)
            })
            .catch()
    }, [idComplete])

    useEffect(() => {
        idDelete && rejectResponse(axiosPrivate, idDelete)
            .then(() => {
                setTimeout(() => {
                    (subTab === 'cargo' && tab === 'active') && sendIncomingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                }, 300)
                setTimeout(() => {
                    (subTab === 'route' && tab === 'active') && sendIncomingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                }, 300)
            })
            .catch()
    }, [idDelete])

    useEffect(() => {
        idDelete && rejectResponse(axiosPrivate, idDelete)
            .then(() => {
                setTimeout(() => {
                    (subTab === 'cargo' && tab === 'archive') && sendOutgoingsCargoRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                }, 300)
                setTimeout(() => {
                    (subTab === 'route' && tab === 'archive') && sendOutgoingsRouteRequest(responsesPagination.currentPage, responsesPagination.pageLimit);
                }, 300)
            })
            .catch()
    }, [idDelete])

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
                    {roleId === 2 ? `Мне откликнулись (${incomingsCargoResponses?.meta?.total ? incomingsCargoResponses?.meta?.total : '0'})` : ''}
                    {roleId === 3 ? `Мне откликнулись (${incomingsRouteResponses?.meta?.total ? incomingsRouteResponses?.meta?.total : '0'})` : ''}
                    {roleId === 4 ? `Мне откликнулись (${(incomingsRouteResponses?.meta?.total && incomingsCargoResponses?.meta?.total)
                        ? incomingsRouteResponses?.meta?.total + incomingsCargoResponses?.meta?.total
                        : (incomingsRouteResponses?.meta?.total || incomingsCargoResponses?.meta?.total)})` : ''}
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
                    {roleId === 2 ? `Вы откликнулись (${outgoingsCargoResponses?.meta?.total ? outgoingsCargoResponses?.meta?.total : '0'})` : ''}
                    {roleId === 3 ? `Вы откликнулись (${outgoingsRouteResponses?.meta?.total ? outgoingsRouteResponses?.meta?.total : '0'})` : ''}
                    {roleId === 4 ? `Вы откликнулись (${(outgoingsRouteResponses?.meta?.total && outgoingsCargoResponses?.meta?.total)
                        ? outgoingsRouteResponses?.meta?.total + outgoingsCargoResponses?.meta?.total
                        : (outgoingsRouteResponses?.meta?.total || outgoingsCargoResponses?.meta?.total)})` : ''}
                </button>
            </div>
            <Tabs
                activeKey={subTab}
                className="responses-tabs mb-3"
                onSelect={eventKey => setSubTab(eventKey)}
            >
                {!(roleId === 3) && (
                    <Tab eventKey="cargo"
                         title={`Грузы (${tab === 'active' ? incomingsCargoResponses?.meta?.total : outgoingsCargoResponses?.meta?.total})`}>
                        <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                            {(tab === 'active')
                                ? incomingsCargoResponses.isLoading
                                    ? incomingsCargoResponses?.items?.length
                                        ? incomingsCargoResponses.items.map(item => (
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
                                                    callbackComplete={id => setIdComplete(id)}
                                                    callbackDelete={id => setIdDelete(id)}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Откликов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                : outgoingsCargoResponses.isLoading
                                    ? outgoingsCargoResponses?.items?.length
                                        ? outgoingsCargoResponses.items.map(item => (
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
                    <Tab eventKey="route"
                         title={`Маршруты (${tab === 'active' ? incomingsRouteResponses?.meta?.total : outgoingsRouteResponses?.meta?.total})`}>
                        <div className="row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4">
                            {(tab === 'active')
                                ? incomingsRouteResponses.isLoading
                                    ? incomingsRouteResponses?.items?.length
                                        ? incomingsRouteResponses.items.map(item => (
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
                                                    callbackComplete={id => setIdComplete(id)}
                                                    callbackDelete={id => setIdDelete(id)}
                                                />
                                            </div>
                                        ))
                                        : <h6 className="text-center w-100 p-5">Откликов нет</h6>
                                    :
                                    <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                                : outgoingsRouteResponses.isLoading
                                    ? outgoingsRouteResponses?.items?.length
                                        ? outgoingsRouteResponses.items.map(item => (
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
