import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Pattern from '../components/Pattern';
import Pagination from "../components/Pagination";
import usePagination from "../hooks/pagination";

const cars = [
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Челны-Москва',
        note: 'Рефрижератор',
        route: 'Челны +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (333) 123 42 55 Мальвина',
    },
    {
        type: 'car',
        title: 'Москва-Донбасс',
        note: 'Трактор',
        route: 'Москва +50км — Донбасс +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (962) 458 65 79 Ання',
    },
    {
        type: 'car',
        title: 'Москва-Владивосток',
        note: 'Камаз',
        route: 'Москва +50км — Владивосток +50км',
        date: 'Ежедневно',
        aboute: 'Камаз, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (962) 458 65 79 Тоня',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
    {
        type: 'car',
        title: 'Казань-Челны',
        note: 'Трансмистер',
        route: 'Казань +50км — Челны +50км',
        date: 'Ежедневно',
        aboute: 'Трансмистер, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (999) 999 99 79 Эльвира',
    },
]

const cargos = [
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Казань-Челны',
        note: 'Рефрижератор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (962) 458 65 79 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Челны-Москва',
        note: 'Камаз',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Камаз, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (473) 473 11 75 Маша',
    },
    {
        type: 'cargo',
        title: 'Казань-Москва',
        note: 'Суперкар',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Суперкар, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (962) 458 65 79 Ання',
    },
    {
        type: 'cargo',
        title: 'Казань-Пермь',
        note: 'Догма',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Догма, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (962) 458 65 79 Арбуз',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
    {
        type: 'cargo',
        title: 'Пермь-Челны-Москва',
        note: 'Трактор',
        route: 'Казань +50км — Москва +50км',
        date: 'Ежедневно',
        aboute: 'Трактор, Грузовик, 20т, 15м3, 13,6/2,45/2,45',
        payment: 'Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%',
        contacts: '+ 7 (123) 542 22 11 Эльвира',
    },
]

const initialPageLimit = 4

export default function UserPatterns() {

    const [tab, setTab] = useState('cars');

    const carsPagination = usePagination(initialPageLimit)
    const cargoPagination = usePagination(initialPageLimit)
    const [filterCars, setFilterCars] = useState([])
    const [filterCargo, setFilterCargo] = useState([])
    
    useEffect(() => {
        const startIndex = (carsPagination.currentPage - 1) * carsPagination.pageLimit
        const endIndex = startIndex + carsPagination.pageLimit;
        const paginated = cars.slice(startIndex, endIndex)
        
        setFilterCars(paginated)
        window.scrollTo(0,0)
    }, [carsPagination.currentPage, carsPagination.pageLimit])

    useEffect(() => {
        const startIndex = (cargoPagination.currentPage - 1) * cargoPagination.pageLimit
        const endIndex = startIndex + cargoPagination.pageLimit;
        const paginated = cargos.slice(startIndex, endIndex)

        setFilterCargo(paginated)
        window.scrollTo(0,0)
    }, [cargoPagination.currentPage, cargoPagination.pageLimit])

    return (
        <div className='box px-0 p-lg-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span
                className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Шаблоны</h1>
            <div className='d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5'>
                <button
                    type='button'
                    className={(tab === 'cars') ? 'active tab-btn' : 'tab-btn'}
                    onClick={() => setTab('cars')}
                >
                    Машины ({cars.length})
                </button>
                <button
                    type='button'
                    className={(tab === 'cargo') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'}
                    onClick={() => setTab('cargo')}
                >
                    Грузы ({cargos.length})
                </button>
            </div>
            {
                (tab === 'cars') ?
                    filterCars.map((car, index) => (
                        <div key={index}>
                            <Pattern
                                className='mb-3 mb-sm-4'
                                type={car.type}
                                title={car.title}
                                note={car.note}
                                route={car.route}
                                date={car.date}
                                aboute={car.aboute}
                                payment={car.payment}
                                contacts={car.contacts}
                            />
                        </div>
                    ))
                    :
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
            {tab === 'cars'
                ?
                <Pagination
                    pageLimit={carsPagination.pageLimit}
                    currentPage={carsPagination.currentPage}
                    setCurrentPage={carsPagination.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={cars.length}
                    startingPage={carsPagination.startingPage}
                    setStartingPage={carsPagination.setStartingPage}
                />
                :
                <Pagination
                    pageLimit={cargoPagination.pageLimit}
                    currentPage={cargoPagination.currentPage}
                    setCurrentPage={cargoPagination.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={cargos.length}
                    startingPage={cargoPagination.startingPage}
                    setStartingPage={cargoPagination.setStartingPage}
                />
            }

        </div>
    )
}