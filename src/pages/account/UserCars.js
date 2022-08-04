import React, {useEffect, useState} from "react";
import {IconContext} from "react-icons";
import {IoAddCircleSharp} from "react-icons/io5";
import {Link} from "react-router-dom";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import userCars from '../../dummyData/userCars.json'
import {deleteCar, getCars} from '../../API/car';
import {useSelector} from 'react-redux';
import useAxiosPrivate from '../../hooks/axiosPrivate';
import Loader from '../../components/Loader';
import CarCard from '../../components/CarCard';
import CustomModal from '../../components/utilities/CustomModal';

const initialPageLimit = 9;

export default function UserCars() {
    const axiosPrivate = useAxiosPrivate()
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const carsPagination = usePagination(initialPageLimit);
    const [cars, setCars] = useState({
        isLoading: false,
        error: null,
        meta: null,
        items: []
    })
    const [isShowCardModal, setIsShowCardModal] = useState(false)
    const [carId, setCarId] = useState(null)

    const getCarsRequest = (page, limit) => {
        getCars(axiosPrivate, userId, page, limit)
            .then(result => setCars(prev => ({...prev, isLoading: true, meta: result.meta, items: result.data})))
            .catch(error => setCars(prev => ({...prev, isLoading: true, error})))
    }

    const onDelete = async () => {
        await deleteCar(axiosPrivate, carId)
        getCarsRequest()
    }

    useEffect(() => {
        getCarsRequest(carsPagination.currentPage, carsPagination.pageLimit)
    }, [carsPagination.currentPage, carsPagination.pageLimit])

    useEffect(() => !isShowCardModal && setCarId(null), [isShowCardModal])

    return (
        <div className="box px-0 p-sm-4 p-xl-5">
            <Link
                to="/personal-account"
                className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
            >
                <span className="green fs-15 me-2">⟵</span> Назад
            </Link>
            <h1 className="dark-blue text-center d-lg-none">Мои машины</h1>
            <div className="d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5">
                <Link to="/add-car" className="btn btn-2 fs-12 px-4 mb-4 mb-md-0">
                    <IconContext.Provider
                        value={{className: "icon-15 white", title: "Добавить машину"}}
                    >
                        <IoAddCircleSharp/>
                    </IconContext.Provider>
                    <span className="ms-2">Добавить машину</span>
                </Link>
                <div className="d-flex align-items-center fs-12 fw-5 title-font">
                    <button
                        type="button"
                        className="active tab-btn"
                    >
                        {`Мои машины (${userCars.length})`}
                    </button>
                </div>
            </div>
            <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
                {
                    cars.isLoading
                        ? cars?.items?.length
                            ? cars.items.map(item => (
                                <div key={item.id}>
                                    <CarCard
                                        id={item.id}
                                        name={item.name}
                                        carTypeForUser={item?.bodyType?.name}
                                        profileView={true}
                                        callback={id => {
                                            setIsShowCardModal(true)
                                            setCarId(id)
                                        }}
                                    />
                                </div>
                            ))
                            : <h6 className="text-center w-100 p-5">У вас пока не машин</h6>
                        : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                }
            </div>
            <div className="mt-4">
                {(cars?.items?.length > 0) &&
                    <Pagination
                        pageLimit={carsPagination.pageLimit}
                        currentPage={carsPagination.currentPage}
                        setCurrentPage={carsPagination.setCurrentPage}
                        pagesDisplayedLimit={3}
                        itemsAmount={cars?.meta?.total || 0}
                        startingPage={carsPagination.startingPage}
                        setStartingPage={carsPagination.setStartingPage}
                    />
                }
            </div>

            <CustomModal
                isShow={isShowCardModal}
                setIsShow={setIsShowCardModal}
                closeButton={true}
                centered={true}
                size={'lg'}
            >
                <div className="dark-blue fs-12 fw-7 title-font text-center">
                    Вы действительно хотите удалить объявление?
                </div>
                <div className="row row-cols-sm-2 gx-2 gx-lg-4 mt-4 fs-12">
                    <div>
                        <button
                            type="button"
                            className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                            onClick={() => {
                                onDelete()
                                setIsShowCardModal(false)
                            }}
                        >
                            Удалить
                        </button>
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
