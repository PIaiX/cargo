import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Pattern from '../../components/Pattern';
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import {deleteTemplate, getTemplates, getCargoTemplates, updateTemplateRouteName} from "../../API/route";
import {useSelector} from "react-redux";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import Loader from "../../components/Loader";
import CustomModal from "../../components/utilities/CustomModal";
import {Alert} from "react-bootstrap";

const initialPageLimit = 4

export default function UserPatterns() {

    const [tab, setTab] = useState('routes');

    const routeTemplatesPag = usePagination(initialPageLimit)
    const cargoTemplatesPag = usePagination(initialPageLimit)
    const currentUser = useSelector(state => state?.currentUser?.data?.user)
    const axiosPrivate = useAxiosPrivate()
    const [routesTemplates, setRoutesTemplates] = useState({
        error: null,
        data: [],
        meta: [],
        isLoading: false
    })
    const [cargoTemplates, setCargoTemplates] = useState({
        error: null,
        data: [],
        meta: [],
        isLoading: false
    })
    const [isShowModalRenameRoute, setIsShowModalRenameRoute] = useState(false)
    const [isShowModalDeleteTemplateRoute, setIsShowModalDeleteTemplateRoute] = useState(false)
    const [idTempRoute, setIdTempRoute] = useState(null)
    const [renameRouteTemp, setRenameRouteTemp] = useState({})
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [complete, setComplete] = useState(null)

    useEffect(() => {
        ((currentUser?.roleId === 3) || (currentUser?.roleId === 4)) && getTemplates(axiosPrivate, currentUser?.id, routeTemplatesPag.currentPage, routeTemplatesPag.pageLimit)
            .then(r => setRoutesTemplates(prevState => ({
                ...prevState,
                data: r?.data?.body?.data,
                meta: r?.data?.body?.meta,
                isLoading: true
            })))
            .catch(error => setRoutesTemplates(prev => ({...prev, isLoading: true, error})))
    }, [currentUser, routeTemplatesPag.pageLimit, routeTemplatesPag.currentPage])

    useEffect(() => {
        ((currentUser?.roleId === 2) || (currentUser?.roleId === 4)) && getCargoTemplates(axiosPrivate, currentUser?.id, cargoTemplatesPag.currentPage, cargoTemplatesPag.pageLimit)
            .then(r => setCargoTemplates(prevState => ({
                ...prevState,
                data: r?.data?.body?.data,
                meta: r?.data?.body?.meta,
                isLoading: true
            })))
            .catch(error => setCargoTemplates(prev => ({...prev, isLoading: true, error})))
    }, [currentUser, cargoTemplatesPag.pageLimit, cargoTemplatesPag.currentPage])


    const updateTemplateName = () => {
        updateTemplateRouteName(axiosPrivate, idTempRoute, currentUser?.id, renameRouteTemp)
            .then(() => {
                if (tab === 'routes') {
                    getTemplates(axiosPrivate, currentUser?.id, routeTemplatesPag.currentPage, routeTemplatesPag.pageLimit)
                        .then(r => {
                            setRoutesTemplates(prevState => ({
                                ...prevState,
                                data: r?.data?.body?.data,
                                meta: r?.data?.body?.meta,
                                isLoading: true
                            }))
                        })
                } else {
                    //Check if that works
                    getCargoTemplates(axiosPrivate, currentUser?.id, cargoTemplatesPag.currentPage, cargoTemplatesPag.pageLimit)
                        .then(r => {
                            setCargoTemplates(prevState => ({
                                ...prevState,
                                data: r?.data?.body?.data,
                                meta: r?.data?.body?.meta,
                                isLoading: true
                            }))
                        })
                }
                    setIsShowAlert(true)
                setComplete(true)
                setRenameRouteTemp({})
            }
            ).catch(() => {
            setIsShowAlert(true)
            setComplete(false)
        })
    }
    const deleteRouteTemplate = () => {
        deleteTemplate(idTempRoute, axiosPrivate).then(() => {
            if (tab === 'routes') {
                getTemplates(axiosPrivate, currentUser?.id, routeTemplatesPag.currentPage, routeTemplatesPag.pageLimit)
                    .then(r => {
                        setRoutesTemplates(prevState => ({
                            ...prevState,
                            data: r?.data?.body?.data,
                            meta: r?.data?.body?.meta,
                            isLoading: true
                        }))
                    })
            }
            //Check if that works
            if (tab === 'cargo') {
                getCargoTemplates(axiosPrivate, currentUser?.id, cargoTemplatesPag.currentPage, cargoTemplatesPag.pageLimit)
                    .then(r => {
                        setCargoTemplates(prevState => ({
                            ...prevState,
                            data: r?.data?.body?.data,
                            meta: r?.data?.body?.meta,
                            isLoading: true
                        }))
                    })
            }
                setIsShowAlert(true)
                setComplete(true)
        }

        ).catch(() => {
            setIsShowAlert(true)
            setComplete(false)
        })
    }

    useEffect(() => {
        if (isShowAlert) {
            setTimeout(() => setIsShowAlert(false), 1500)
        }
    }, [isShowAlert])

    useEffect(() => {
        if(routesTemplates.data.length === 0) {
            routeTemplatesPag.setCurrentPage(1)
            routeTemplatesPag.setStartingPage(1)
        }

        if(cargoTemplates.data.length === 0) {
            cargoTemplatesPag.setCurrentPage(1)
            cargoTemplatesPag.setStartingPage(1)
        }
    }, [routesTemplates.data.length, cargoTemplates.data.length])

    useEffect(() => {
        if((currentUser?.roleId !== 2)) {
            setTab('routes')
        } else {
            setTab('cargo')
        }
    }, [currentUser?.roleId])

    const getFirstRouteForCargo = (templateId) => {
        if(cargoTemplates?.data?.length <= 0) return ""
        
        const template = cargoTemplates?.data.find((item) => item.id === templateId)
        if(!template) return

        const town = template?.cargo.loadings[0]?.town
        return town
    }

    const getLastRouteForCargo = (templateId) => {
        if(cargoTemplates?.data?.length <= 0) return ""
        
        const template = cargoTemplates?.data.find((item) => item.id === templateId)
        if(!template) return

        const templateUnloadings = template?.cargo.unloadings
        const lastUnloadingIndex = templateUnloadings.length - 1
        const town = templateUnloadings[lastUnloadingIndex].town
        return town   
    }

    const getCargoInfo = (templateId) => {
        if(cargoTemplates?.data?.length <= 0) return ""
        
        const template = cargoTemplates?.data.find((item) => item.id === templateId)
        if(!template) return 
        const cargoCount = template?.cargo.items.length
        const cargoWeight = template?.cargo.items.reduce((prevValue, currentItem) => {
            return prevValue + currentItem.weight
        }, 0)
        return `Кол-во грузов: ${cargoCount}, Общий вес: ${cargoWeight}`
    }

    return (
        <div className='box px-0 p-lg-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span
                className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Шаблоны</h1>
            <div className='d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5 position-relative'>
                <button
                    type='button'
                    className={(tab === 'routes') ? 'active tab-btn' : 'tab-btn'}
                    onClick={() => setTab('routes')}
                >
                    {(currentUser?.roleId === 3 || currentUser?.roleId === 4) && `Маршруты (${routesTemplates?.meta?.total || 0})`}
                </button>
                <button
                    type='button'
                    className={(tab === 'cargo') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'}
                    onClick={() => setTab('cargo')}
                >
                    {(currentUser?.roleId === 2 || currentUser?.roleId === 4) && `Грузы (${cargoTemplates?.meta?.total || 0})`}
                </button>
                {complete && <Alert
                    show={isShowAlert}
                    className='position-absolute end-0 m-0 p-2'
                    variant='success'
                >
                    <span>Изменения применены</span>
                </Alert>}
                {complete === false &&
                    <Alert
                        show={isShowAlert}
                        className='position-absolute end-0 m-0 p-2'
                        variant='danger'
                    >
                        <span>Ошибка</span>
                    </Alert>
                }
            </div>
            {tab === "routes" && ((currentUser?.roleId === 3 || currentUser?.roleId === 4) &&
            routesTemplates?.isLoading
                ? routesTemplates?.data?.length
                    ? routesTemplates?.data?.map((i, index) => (
                        <div key={index}>
                            <Pattern
                                id={i.id}
                                type="route"
                                className='mb-3 mb-sm-4'
                                title={i.name}
                                note={i.note}
                                toRoute={i.route.toRoute}
                                date={i.route.date}
                                fromRoute={i.route.fromRoute}
                                car={i.route.car}
                                bargainType={i.route.bargainType}
                                calculateType={i.route.calculateType}
                                vatPrice={i.route.vatPrice}
                                notVatPrice={i.route.noVatPrice}
                                prepayment={i.route.prepayment}
                                contacts={i.route.contacts}
                                callbackForRename={(id) => {
                                    setIsShowModalRenameRoute(true)
                                    setIdTempRoute(id)
                                }}
                                callbackForDelete={(id) => {
                                    setIsShowModalDeleteTemplateRoute(true)
                                    setIdTempRoute(id)
                                }}
                            />
                        </div>
                    ))
                    : <h6 className='text-center w-100 p-5'>У вас пока нет маршрутов</h6>
                : <div className='d-flex justify-content-center'><Loader color='#545454'/></div>
            )}
            {tab === "cargo" && ((currentUser?.roleId === 2 || currentUser?.roleId === 4) &&
            cargoTemplates?.isLoading
                ? cargoTemplates?.data?.length
                    ? cargoTemplates?.data?.map((i, index) => (
                        <div key={index}>
                            <Pattern
                                id={i.id}
                                type="cargo"
                                className='mb-3 mb-sm-4'
                                title={i.name}
                                note={i.note}
                                fromRoute={getFirstRouteForCargo(i.id)}
                                date={i.cargo.loadings[0].date}
                                toRoute={getLastRouteForCargo(i.id)}
                                cargoInfo={getCargoInfo(i.id)}
                                bargainType={i.cargo.bargainType}
                                calculateType={i.cargo.calculateType}
                                vatPrice={i.cargo.vatPrice}
                                notVatPrice={i.cargo.noVatPrice}
                                prepayment={i.cargo.prepayment}
                                contacts={i.cargo.contacts}
                                url={`/add-cargo`}
                                callbackForRename={(id) => {
                                    setIsShowModalRenameRoute(true)
                                    setIdTempRoute(id)
                                }}
                                callbackForDelete={(id) => {
                                    setIsShowModalDeleteTemplateRoute(true)
                                    setIdTempRoute(id)
                                }}
                            />
                        </div>
                    ))
                    : <h6 className='text-center w-100 p-5'>У вас пока нет грузов</h6>
                : <div className='d-flex justify-content-center'><Loader color='#545454'/></div>
            )}
            {tab === 'routes' &&
                (routesTemplates?.data?.length > 0) &&
                <Pagination
                    pageLimit={routeTemplatesPag.pageLimit}
                    currentPage={routeTemplatesPag.currentPage}
                    setCurrentPage={routeTemplatesPag.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={routesTemplates?.meta?.total || 0}
                    startingPage={routeTemplatesPag.startingPage}
                    setStartingPage={routeTemplatesPag.setStartingPage}
                />
            }
            {tab === 'cargo' &&
                (cargoTemplates?.data?.length > 0) &&
                <Pagination
                    pageLimit={cargoTemplatesPag.pageLimit}
                    currentPage={cargoTemplatesPag.currentPage}
                    setCurrentPage={cargoTemplatesPag.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={cargoTemplates?.meta?.total || 0}
                    startingPage={cargoTemplatesPag.startingPage}
                    setStartingPage={cargoTemplatesPag.setStartingPage}
                />
            }
            <CustomModal
                isShow={isShowModalRenameRoute}
                setIsShow={setIsShowModalRenameRoute}
                closeButton={true}
                title={true}
                titleHead={'Переименовать шаблон'}
                className="modal__rename-template"
            >
                <form className="fs-12">
                    <label className="mb-2">Название шаблона</label>
                    <input
                        type="text"
                        className="mb-3"
                        placeholder="Название"
                        onChange={e => setRenameRouteTemp(prevState => ({...prevState, name: e.target.value}))}
                    />
                    <label className="mb-2">Примечание</label>
                    <input
                        type="text"
                        className="mb-3"
                        placeholder="Примечание"
                        onChange={e => setRenameRouteTemp(prevState => ({...prevState, note: e.target.value}))}
                    />
                    <div className="row row-cols-sm-2 mt-4">
                        <div className="mb-3 mb-sm-0">
                            <button
                                type="button"
                                onClick={() => setIsShowModalRenameRoute(false)}
                                className="btn btn-1 w-100"
                            >
                                Отмена
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-2 w-100"
                                onClick={() => {
                                    updateTemplateName()
                                    setIsShowModalRenameRoute(false)
                                }}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </CustomModal>
            <CustomModal
                isShow={isShowModalDeleteTemplateRoute}
                setIsShow={setIsShowModalDeleteTemplateRoute}
                closeButton={true}
                title={true}
                titleHead={'Вы действительно хотите удалить шаблон?'}
                className="modal__delete-template"
            >
                <div className="row row-cols-sm-2 fs-12">
                    <div className="mb-3 mb-sm-0">
                        <button
                            type="button"
                            onClick={() => setIsShowModalDeleteTemplateRoute(false)}
                            className="btn btn-1 w-100"
                        >
                            Отмена
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-2 w-100"
                            onClick={() => {
                                deleteRouteTemplate()
                                setIsShowModalDeleteTemplateRoute(false)
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}
