import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/pagination";
import SearchForm from '../components/SearchForm';
import {searchCargo} from '../API/cargo';
import {searchRoute} from '../API/route';
import CargoCard from '../components/CargoCard';
import {getNotesType, getRoute} from '../helpers/cargo';
import Loader from '../components/Loader';
import RouteCard from '../components/RouteCard';
import Select from 'react-select'
import {useLocation, useNavigate} from "react-router-dom";

const initialPageLimit = 12

export default function Search() {

    const location = useLocation()
    const initialFilters = {
        orderBy: 'desc',
        ...location.state
    }
    const initialSorting = [
        {value: 'desc', label: 'По убыванию'},
        {value: 'asc', label: 'По возрастанию'}
    ]
    const [searchType, setSearchType] = useState("cargo") // cargo || car
    const [filters, setFilters] = useState(initialFilters)

    const [cargo, setCargo] = useState({
        isLoading: false,
        error: null,
        meta: null,
        data: []
    })
    const [cars, setCars] = useState({
        isLoading: false,
        error: null,
        meta: null,
        data: []
    })
    const cargoPagination = usePagination(initialPageLimit)
    const carsPagination = usePagination(initialPageLimit)

    const submitHandler = (formData) => formData ? setFilters({...initialFilters, ...formData}) : setFilters(initialFilters)

    useEffect(() => setFilters(initialFilters), [searchType])
    
    useEffect(() => {
        (searchType === 'cargo') && searchCargo(cargoPagination.currentPage, cargoPagination.pageLimit, filters)
            .then(res => setCargo(prev => ({...prev, isLoading: true, data: res?.data, meta: res?.meta})))
            .catch(error => setCargo(prev => ({...prev, isLoading: true, error})))
    }, [cargoPagination.currentPage, cargoPagination.pageLimit, filters])

    useEffect(() => {
        (searchType === 'car') && searchRoute(carsPagination.currentPage, carsPagination.pageLimit, {...filters, onlyVerified: false})
            .then(res => setCars(prev => ({...prev, isLoading: true, data: res?.data, meta: res?.meta})))
            .catch(error => setCars(prev => ({...prev, isLoading: true, error})))
    }, [carsPagination.currentPage, carsPagination.pageLimit, filters])
    
    useEffect(() => {
        if (location?.state?.searchType) {
            setSearchType(location?.state?.searchType)
        }
    }, [location?.state?.searchType])

    return (
        <main>
            <section id="sec-7" className="py-4 py-sm-5 container">
                <div className="switch">
                    <button
                        type="button"
                        onClick={() => setSearchType("cargo")}
                        className={searchType === "cargo" ? "active" : ""}
                    >
                        <img src="/img/bg/cargo.png" alt="грузы"/>
                        <span>Найти груз</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchType("car")}
                        className={searchType === "car" ? "active" : ""}
                    >
                        <img src="/img/bg/car.png" alt="машина"/>
                        <span>Найти машину</span>
                    </button>
                </div>
                <SearchForm
                    searchType={searchType}
                    fromMainPage={location.state}
                    type={searchType}
                    submitHandler={submitHandler}
                />
            </section>

            <section className="container pb-4 pb-sm-5 my-sm-4">
                <div
                    className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                    <div className="fs-15 fw-5 mb-2 mb-md-0">
                        {searchType === "cargo"
                            ? `Найдено ${cargo?.data?.length || 0} грузов`
                            : `Найдено ${cars?.data?.length || 0} машин`}
                    </div>
                    <div className="fs-12 ms-md-5 d-flex align-items-center">
                        <span className="me-2">Сортировать:</span>
                        <Select
                            name="sort"
                            className="w-100"
                            classNamePrefix="react-select"
                            options={initialSorting}
                            value={initialSorting.length && initialSorting.filter(item => item.value === filters.orderBy)}
                            onChange={val => setFilters(prev => ({...prev, orderBy: val.value}))}
                        />
                    </div>
                </div>
                {(searchType === 'cargo') && <>
                    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4 g-1 g-sm-2 g-lg-3">
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
                                        notesType={getNotesType(item.items)}
                                        capacity={generalCapacity}
                                        weight={generalWeight}
                                    />
                                })
                                    : <h6 className="text-center w-100 p-5">Не найдено ни одного груза</h6>
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
                </>}
                {(searchType === 'car') && <>
                    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4 g-1 g-sm-2 g-lg-3">
                        {
                            cars.isLoading
                                ? cars?.data?.length
                                    ? cars?.data?.length && cars.data.map(item => (
                                    <div key={item.id}>
                                        <RouteCard
                                            id={item.id}
                                            route={`${item.fromRoute} - ${item.toRoute}`}
                                            isVerified={item?.car?.isVerified}
                                            size={item.car?.capacity}
                                            carrying={item.car?.carrying}
                                            carType={item.carBodyType?.name}
                                            dimensions={`${item.car?.length}/${item.car?.width}/${item.car?.height}`}
                                            date={item.dateType ? 'единожды' : 'постоянно'}
                                        />
                                    </div>
                                ))
                                    : <h6 className="text-center w-100 p-5">Не найдено ни одной машины</h6>
                                : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>
                        }
                    </div>
                    {(cars?.data?.length > 0) && (
                        <div className="mt-4">
                            <Pagination
                                pageLimit={carsPagination.pageLimit}
                                currentPage={carsPagination.currentPage}
                                setCurrentPage={carsPagination.setCurrentPage}
                                pagesDisplayedLimit={3}
                                itemsAmount={cars?.meta?.total || 0}
                                startingPage={carsPagination.startingPage}
                                setStartingPage={carsPagination.setStartingPage}
                            />
                        </div>
                    )}
                </>}
            </section>
        </main>
    );
}
