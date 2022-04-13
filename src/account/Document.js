import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdFileDownload, MdDriveFileMove, MdLocalPrintshop } from "react-icons/md";

export default function Document() {
    return (
        <main className='bg-gary py-4 py-md-5'>
            <section className='container'>
                <div className='d-lg-flex justify-content-between align-items-center mb-3'>
                    <Link to="/personal-account/user-documents" className='d-block mb-3 mb-lg-0 fs-12 fw-5 title-font'><span className='green fs-15 me-2'>⟵</span> Назад к документам</Link>
                    <div className='d-flex align-items-center fs-11'>
                        <button type='button' data-bs-toggle="modal" data-bs-target="#save-as-pattern" className='d-flex align-items-center'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Сохранить как шаблон" }}>
                                <MdDriveFileMove />
                            </IconContext.Provider>
                            <span className='d-none d-md-block ms-2'>Сохранить как шаблон</span>
                        </button>
                        <button type='button' className='d-flex align-items-center ms-3'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Скачать" }}>
                                <MdFileDownload />
                            </IconContext.Provider>
                            <span className='d-none d-md-blockms-1'>Скачать</span>
                        </button>
                        <button type='button' className='d-flex align-items-center ms-3'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Печать" }}>
                                <MdLocalPrintshop />
                            </IconContext.Provider>
                            <span className='d-none d-md-blockms-2'>Печать</span>
                        </button>
                        <button type='button' data-bs-toggle="modal" data-bs-target="#save-doc" className='btn btn-1 text-uppercase ms-4 px-3 px-sm-4'>СОХРАНИТЬ в архив</button>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-xxl-10'>
                        <div className='box p-xl-5'>
                            <p className='text-center title-font fw-7 fs-15 mb-4'>Договор на перевозку грузов автомобильным транспортом №</p>
                            <p className='text-center mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p className='text-center mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}