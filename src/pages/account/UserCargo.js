import React, {useEffect, useState} from "react";
import {IconContext} from "react-icons";
import {IoAddCircleSharp} from "react-icons/io5";
import {Link} from "react-router-dom";
import usePagination from "../../hooks/pagination";
import {getArchivedCargo, getNotArchivedCargo} from '../../API/cargo';
import {useSelector} from 'react-redux';
import useAxiosPrivate from '../../hooks/axiosPrivate';
import CargoCard from '../../components/CargoCard';
import Loader from '../../components/Loader';

const initialPageLimit = 9;

export default function UserCargo() {
    const axiosPrivate = useAxiosPrivate()
    const [tab, setTab] = useState("active");
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const cargoPagination = usePagination(initialPageLimit)
    const archivedCargoPagination = usePagination(initialPageLimit)

    const [cargo, setCargo] = useState({
        isLoading: false,
        error: null,
        meta: null,
        data: []
    })
    const [archivedCargo, setArchivedCargo] = useState({
        isLoading: false,
        error: null,
        meta: null,
        data: []
    })

    const getCargoReqest = (page, limit) => {
        getNotArchivedCargo(axiosPrivate, userId, page, limit)
            .then(result => setCargo(prev => ({...prev, isLoading: true, meta: result?.meta, data: result?.data})))
            .catch(error => setCargo(prev => ({...prev, isLoading: true, error})))
    }

    const getArchivedCargoRequest = (page, limit) => {
        getArchivedCargo(axiosPrivate, userId, page, limit)
            .then(result => setArchivedCargo(prev => ({
                ...prev,
                isLoading: true,
                meta: result?.meta,
                data: result?.data
            })))
            .catch(error => setArchivedCargo(prev => ({...prev, isLoading: true, error})))
    }

    const getRoute = (data, isOnlyExtreme) => {
        const loadings = data.loadings && data.loadings.map(item => item?.town)
        const unloadings = data.unloadings && data.unloadings.map(item => item?.town)

        if (isOnlyExtreme) {
            return (loadings && unloadings) ? `${loadings[0]} - ${unloadings[unloadings.length - 1]}` : null
        }

        return (loadings && unloadings) ? loadings.concat(unloadings).join(' - ') : null
    }

    useEffect(() => {
        getCargoReqest(cargoPagination.currentPage, cargoPagination.pageLimit)
    }, [userId, cargoPagination.currentPage, cargoPagination.pageLimit])

    useEffect(() => {
        getArchivedCargoRequest(archivedCargoPagination.currentPage, archivedCargoPagination.pageLimit)
    }, [userId, archivedCargoPagination.currentPage, archivedCargoPagination.pageLimit])

    useEffect(() => {
        console.log('cargo ', cargo)
    }, [cargo])

    useEffect(() => {
        console.log('archived cargo ', archivedCargo)
    }, [archivedCargo])

    return (
        <div className="box px-0 p-sm-4 p-xl-5">
            <Link
                to="/personal-account"
                className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
            >
                <span className="green fs-15 me-2">⟵</span> Назад
            </Link>
            <h1 className="dark-blue text-center d-lg-none">Мои грузы</h1>
            <div className="d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5">
                <Link to="/add-cargo" className="btn btn-2 fs-12 px-4 mb-4 mb-md-0">
                    <IconContext.Provider
                        value={{className: "icon-15 white", title: "Добавить груз"}}
                    >
                        <IoAddCircleSharp/>
                    </IconContext.Provider>
                    <span className="ms-2">Добавить груз</span>
                </Link>
                <div className="d-flex align-items-center fs-12 fw-5 title-font">
                    <button
                        type="button"
                        className={tab === "active" ? "active tab-btn" : "tab-btn"}
                        onClick={() => setTab("active")}
                    >
                        {/* todo: DO THIS */}
                        {`Активные объявления (${1})`}
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
                        Архив (15)
                    </button>
                </div>
            </div>
            {tab === "active" ? (
                <>
                    <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
                        {
                            cargo.isLoading
                                ? cargo?.data?.length
                                    ? cargo?.data?.length && cargo.data.map(item => (
                                        <CargoCard
                                            key={item.id}
                                            id={item.id}
                                            route={getRoute(item)}
                                        />
                                    ))

                                    // cargo.items.map(item => (
                                    //     <CargoCard
                                    //
                                    //     />
                                    // ))
                                    : <h6 className="text-center w-100 p-5">У вас пока нет грузов</h6>
                                : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                        }

                        {/*{filteredCargo.map((item, idx) => {*/}
                        {/*    return (*/}
                        {/*        <div key={idx}>*/}
                        {/*            <CargoCard*/}
                        {/*                type={item.type}*/}
                        {/*                id={idx}*/}
                        {/*                className=""*/}
                        {/*                title={item.title}*/}
                        {/*                route={item.route}*/}
                        {/*                size={item.size}*/}
                        {/*                weight={item.weight}*/}
                        {/*                notes={item.notes}*/}
                        {/*                url="/cargo-page"*/}
                        {/*                profileView={item.profileView}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    );*/}
                        {/*})}*/}
                    </div>
                    {/*{userCargo.length > initialPageLimit && (*/}
                    {/*    <Pagination*/}
                    {/*        pageLimit={paginationData.pageLimit}*/}
                    {/*        currentPage={paginationData.currentPage}*/}
                    {/*        setCurrentPage={paginationData.setCurrentPage}*/}
                    {/*        pagesDisplayedLimit={3}*/}
                    {/*        itemsAmount={userCargo.length}*/}
                    {/*        startingPage={paginationData.startingPage}*/}
                    {/*        setStartingPage={paginationData.setStartingPage}*/}
                    {/*    />*/}
                    {/*)}*/}
                </>
            ) : (
                <div className="text-center fs-15">Архивных объявлений нет</div>
            )
                // : <div className='row row-cols-3 g-4'>
                //     <div>
                //         <Card
                //             type="cargo"
                //             className=""
                //             title="Трубы"
                //             route="Казань-Москва"
                //             size="30"
                //             weight="10 т"
                //             notes="dimensional"
                //             url="/cargo-page"
                //             profileView='archive'
                //         />
                //     </div>
                // </div>
            }
        </div>
    );
}
