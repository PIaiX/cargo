import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Pattern from '../../components/Pattern';
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import {deleteTemplate, getTemplates, updateTemplateRouteName} from "../../API/route";
import {useSelector} from "react-redux";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import Loader from "../../components/Loader";
import CustomModal from "../../components/utilities/CustomModal";
import {Alert} from "react-bootstrap";

const initialPageLimit = 4

export default function UserPatterns() {

    const [tab, setTab] = useState('routes');

    const routeTemplatesPag = usePagination(initialPageLimit)
    const cargoPagination = usePagination(initialPageLimit)
    const [filterCargo, setFilterCargo] = useState([])
    const currentUser = useSelector(state => state?.currentUser?.data?.user)
    const axiosPrivate = useAxiosPrivate()
    const [routesTemplates, setRoutesTemplates] = useState({
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
                    // for cargo
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
    }, [routesTemplates.data.length])

    useEffect(() => {
        if((currentUser?.roleId !== 2)) {
            setTab('routes')
        } else {
            setTab('cargo')
        }
    }, [currentUser?.roleId])

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
                    Грузы (12)
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
            {(tab === 'routes' && (currentUser?.roleId === 3 || currentUser?.roleId === 4)) &&
            routesTemplates?.isLoading
                ? routesTemplates?.data?.length
                    ? routesTemplates?.data?.map((i, index) => (
                        <div key={index}>
                            <Pattern
                                id={i.id}
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
            }
            {(tab === 'cargo') &&
                filterCargo.map((cargo, index) => (
                    <div key={index}>
                        <Pattern
                            className='mb-3 mb-sm-4'
                            type={cargo.type}
                            title={cargo.title}
                            note={cargo.note}
                            route={cargo.route}
                            date={cargo.date}
                            aboute={cargo.aboute}
                            payment={cargo.payment}
                            contacts={cargo.contacts}
                        />
                    </div>
                ))
            }
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
            {tab === 'cargo' && <Pagination
                pageLimit={cargoPagination.pageLimit}
                currentPage={cargoPagination.currentPage}
                setCurrentPage={cargoPagination.setCurrentPage}
                pagesDisplayedLimit={3}
                itemsAmount={5}
                startingPage={cargoPagination.startingPage}
                setStartingPage={cargoPagination.setStartingPage}
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