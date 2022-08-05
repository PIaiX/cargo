import React, {useEffect, useState} from "react";
import {IconContext} from "react-icons";
import {IoAddCircleSharp} from "react-icons/io5";
import {Link} from "react-router-dom";
import usePagination from "../../hooks/pagination";
import {deleteCargo, getArchivedCargo, getNotArchivedCargo, unArchiveCargo} from '../../API/cargo';
import {useSelector} from 'react-redux';
import useAxiosPrivate from '../../hooks/axiosPrivate';
import CargoCard from '../../components/CargoCard';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import {getRoute} from '../../helpers/cargo';
import CustomModal from '../../components/utilities/CustomModal';

const initialPageLimit = 9;

export default function UserCargo() {
    const axiosPrivate = useAxiosPrivate()
    const [tab, setTab] = useState("active");
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const cargoPagination = usePagination(initialPageLimit)
    const archivedCargoPagination = usePagination(initialPageLimit)
    const [isShowCardModal, setIsShowCardModal] = useState(false)
    const [cargoAction, setCargoAction] = useState(null)

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

    const onDelete = async () => {
        await deleteCargo(axiosPrivate, cargoAction?.id)

        if (tab === 'active') {
            getCargoReqest(1, initialPageLimit)
            cargoPagination.setCurrentPage(1)
        } else {
            getArchivedCargoRequest(1, initialPageLimit)
            archivedCargoPagination.setCurrentPage(1)
        }

        setCargoAction(null)
    }

    const onRevovery = async () => {
        await unArchiveCargo(axiosPrivate, cargoAction?.id)

        getCargoReqest(1, initialPageLimit)
        cargoPagination.setCurrentPage(1)
        getArchivedCargoRequest(1, initialPageLimit)
        archivedCargoPagination.setCurrentPage(1)

        setCargoAction(null)
    }

    useEffect(() => {
        getCargoReqest(cargoPagination.currentPage, cargoPagination.pageLimit)
    }, [userId, cargoPagination.currentPage, cargoPagination.pageLimit])

    useEffect(() => {
        getArchivedCargoRequest(archivedCargoPagination.currentPage, archivedCargoPagination.pageLimit)
    }, [userId, archivedCargoPagination.currentPage, archivedCargoPagination.pageLimit])

    useEffect(() => !isShowCardModal && setCargoAction(null), [isShowCardModal])

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
                        Активные объявления ({cargo?.data?.length || '0'})
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
                        Архив ({archivedCargo?.data?.length || '0'})
                    </button>
                </div>
            </div>
            {tab === "active" ? (
                <>
                    <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
                        {
                            cargo.isLoading
                                ? cargo?.data?.length
                                    ? cargo?.data?.length && cargo.data.map(item => {
                                    const notesType = item?.items?.map(i => i.noteType)
                                    const generalCapacity = item?.items?.reduce((acc, currentValue) => acc + currentValue?.capacity, 0)
                                    const generalWeight = item?.items?.reduce((acc, currentValue) => acc + currentValue?.weight, 0)

                                    return <CargoCard
                                        key={item.id}
                                        id={item.id}
                                        title={item?.type?.name}
                                        route={getRoute(item)}
                                        notesType={notesType}
                                        capacity={generalCapacity}
                                        weight={generalWeight}
                                        callback={({id, type}) => {
                                            setCargoAction({id, type})
                                            setIsShowCardModal(true)
                                        }}
                                        hasActions
                                    />
                                })
                                    : <h6 className="text-center w-100 p-5">У вас пока нет грузов</h6>
                                : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                        }
                    </div>
                    {(cargo?.data?.length > 0) && (
                        <div className="mt-4">
                            <Pagination
                                pageLimit={cargoPagination.pageLimit}
                                currentPage={cargoPagination.currentPage}
                                setCurrentPage={cargoPagination.setCurrentPage}
                                pagesDisplayedLimit={3}
                                itemsAmount={cargo?.meta?.total || 0}
                                startingPage={cargoPagination.startingPage}
                                setStartingPage={cargoPagination.setStartingPage}
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
                        {
                            archivedCargo.isLoading
                                ? archivedCargo?.data?.length
                                    ? archivedCargo?.data?.length && archivedCargo.data.map(item => {
                                    const notesType = item?.items?.map(i => i.noteType)
                                    const generalCapacity = item?.items?.reduce((acc, currentValue) => acc + currentValue?.capacity, 0)
                                    const generalWeight = item?.items?.reduce((acc, currentValue) => acc + currentValue?.weight, 0)

                                    return <CargoCard
                                        key={item.id}
                                        id={item.id}
                                        title={item?.type?.name}
                                        route={getRoute(item)}
                                        notesType={notesType}
                                        capacity={generalCapacity}
                                        weight={generalWeight}
                                        callback={({id, type}) => {
                                            setCargoAction({id, type})
                                            setIsShowCardModal(true)
                                        }}
                                        archived
                                        hasActions
                                    />
                                })
                                    : <h6 className="text-center w-100 p-5">У вас пока нет грузов</h6>
                                : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                        }
                    </div>
                    {(archivedCargo?.data?.length > 0) && (
                        <div className="mt-4">
                            <Pagination
                                pageLimit={archivedCargoPagination.pageLimit}
                                currentPage={archivedCargoPagination.currentPage}
                                setCurrentPage={archivedCargoPagination.setCurrentPage}
                                pagesDisplayedLimit={3}
                                itemsAmount={archivedCargo?.meta?.total || 0}
                                startingPage={archivedCargoPagination.startingPage}
                                setStartingPage={archivedCargoPagination.setStartingPage}
                            />
                        </div>
                    )}
                </>
            )}

            <CustomModal
                isShow={isShowCardModal}
                setIsShow={setIsShowCardModal}
                closeButton={true}
                centered={true}
                size={'lg'}
            >
                <div className="dark-blue fs-12 fw-7 title-font text-center">
                    Вы действительно хотите {cargoAction?.type === 'delete' ? 'удалить' : 'восстановить'} объявление?
                </div>
                <div className="row row-cols-sm-2 gx-2 gx-lg-4 mt-4 fs-12">
                    <div>
                        {(cargoAction?.type === 'delete')
                            ? <button
                                type="button"
                                className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                                onClick={() => {
                                    onDelete()
                                    setIsShowCardModal(false)
                                }}
                            >
                                Удалить
                            </button>
                            : <button
                                type="button"
                                className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                                onClick={() => {
                                    onRevovery()
                                    setIsShowCardModal(false)
                                }}
                            >
                                Восстановить
                            </button>
                        }
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-2 w-100 px-4 point"
                            onClick={() => setIsShowCardModal(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
}
