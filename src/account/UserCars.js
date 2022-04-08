import React, {useState} from 'react';
import { IconContext  } from "react-icons";
import { IoAddCircleSharp } from 'react-icons/io5';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function UserCars() {
    const [tab, setTab] = useState('active');

    return (
        <div className='box px-0 p-sm-4 p-xl-5'>
            <h1 className='dark-blue text-center d-lg-none'>Мои машины</h1>
            <div className='d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5'>
                <Link to="/add-car" className='btn btn-2 fs-12 px-4 mb-4 mb-md-0'>
                    <IconContext.Provider value={{className: "icon-15 white", title: "Добавить машину" }}>
                        <IoAddCircleSharp />
                    </IconContext.Provider>
                    <span className='ms-2'>Добавить машину</span>
                </Link>
                <div className='d-flex align-items-center fs-12 fw-5 title-font'>
                    <button type='button' className={(tab === 'active') ? 'active tab-btn' : 'tab-btn'} onClick={()=>setTab('active')}>Активные объявления (4)</button>
                    <button type='button' className={(tab === 'archive') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'} onClick={()=>setTab('archive')}>Архив (15)</button>
                </div>
            </div>
            {
                (tab === 'active')?
                <div className='row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4'>
                    <div>
                        <Card 
                            type="car"
                            className=""
                            route="Казань-Москва"
                            carType="Фура"
                            verified={true}
                            date="Ежедневно"
                            carrying="20"
                            size="30"
                            dimensions="13/2,45/2,45"
                            url="/car-page"
                            profileView='active'
                        />
                    </div>
                    <div>
                        <Card 
                            type="car"
                            className=""
                            route="Казань-Москва"
                            carType="Фура"
                            verified={true}
                            date="Ежедневно"
                            carrying="20"
                            size="30"
                            dimensions="13/2,45/2,45"
                            url="/car-page"
                            profileView='active'
                        />
                    </div>
                    <div>
                        <Card 
                            type="car"
                            className=""
                            route="Казань-Москва"
                            carType="Фура"
                            verified={true}
                            date="Ежедневно"
                            carrying="20"
                            size="30"
                            dimensions="13/2,45/2,45"
                            url="/car-page"
                            profileView='active'
                        />
                    </div>
                    <div>
                        <Card 
                            type="car"
                            className=""
                            route="Казань-Москва"
                            carType="Фура"
                            verified={true}
                            date="Ежедневно"
                            carrying="20"
                            size="30"
                            dimensions="13/2,45/2,45"
                            url="/car-page"
                            profileView='active'
                        />
                    </div>
                </div>
                : <div className='text-center fs-15'>Архивных объявлений нет</div>
                // : <div className='row row-cols-3 g-4'>
                //     <div>
                //         <Card 
                //             type="car"
                //             className=""
                //             route="Казань-Москва"
                //             carType="Фура"
                //             verified={true}
                //             date="Ежедневно"
                //             carrying="20"
                //             size="30"
                //             dimensions="13/2,45/2,45"
                //             url="/car-page"
                //             profileView='archive'
                //         />
                //     </div>
                // </div>
            }
        </div>
    )
}