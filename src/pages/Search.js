import React, {useState, useEffect} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import Card from '../components/Card';
import { IoChevronDownSharp, IoSwapHorizontalSharp, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { IconContext  } from "react-icons";


export default function Search() {
    const [search, setSearch] = useState('cargo');
    const [advSearch, setAdvSearch] = useState(true);

    useEffect(() => {
        function collapseForm() {
            if(window.matchMedia("(max-width: 767px)").matches){
                setAdvSearch(false);
            } else {
                setAdvSearch(true);
            }
        }
        window.addEventListener('resize', collapseForm);
        collapseForm();
        return () => window.removeEventListener('resize', collapseForm);
    }, []);
   
    return (
        <main>
            <section id="sec-7" className="py-4 py-sm-5 container">
                <div className="switch">
                    <button type="button" onClick={() => setSearch('cargo')} className={(search === 'cargo') && "active"}>Найти груз</button>
                    <button type="button" onClick={() => setSearch('car')} className={(search === 'car') && "active"}>Найти машину</button>
                </div>
                {
                    (search === 'cargo') ?
                    <form>
                        <div className="row g-3 g-sm-4 g-xl-5">
                            <div className="col-lg-8 d-sm-flex align-items-end">
                                <div className="flex-1 mb-3 mb-sm-0">
                                    <label className="title-font mb-2 mb-xl-3">Откуда</label>
                                    <input type="text" placeholder="Город отправления"/>
                                </div>
                                <IconContext.Provider value={{className: "green icon d-none d-sm-block mx-2 mx-md-3 mb-1 mb-md-2" }}>
                                    <IoSwapHorizontalSharp />
                                </IconContext.Provider>
                                <div className="flex-1">
                                    <label className="title-font mb-2 mb-xl-3">Куда</label>
                                    <input type="text" placeholder="Город назначения"/>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4">
                                <label className="title-font mb-2 mb-xl-3">Дата</label>
                                <input type="date" placeholder="С сегодняшнего дня"/>
                            </div>
                            {
                                (advSearch) &&
                                <>
                                    <div className="col-md-7 col-lg-5 col-xxl-4">
                                        <div className="row row-cols-sm-2">
                                            <div className="mb-3 mb-sm-0">
                                                <label className="title-font mb-2 mb-xl-3">Объем, м3</label>
                                                <div className="d-flex align-items-center">
                                                    <input type="number" placeholder="От" />
                                                    <span className="fs-15 mx-1 mx-xl-2">—</span>
                                                    <input type="number" placeholder="До" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="title-font mb-2 mb-xl-3">Вес, т</label>
                                                <div className="d-flex align-items-center">
                                                    <input type="number" placeholder="От" />
                                                    <span className="fs-15 mx-1 mx-xl-2">—</span>
                                                    <input type="number" placeholder="До" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-xxl-8">
                                        <label className="title-font mb-2 mb-xl-3">Максимальное значение габаритов груза, м</label>
                                        <div className="d-sm-flex align-items-center">
                                            <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                                                <label className="me-2">Длина:</label>
                                                <input type="number" placeholder="0"/>
                                            </div>
                                            <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                                                <label className="me-2">Ширина:</label>
                                                <input type="number" placeholder="0"/>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <label className="me-2">Высота:</label>
                                                <input type="number" placeholder="0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4">
                                        <label className="title-font mb-2 mb-xl-3">Тип груза</label>
                                        <CustomSelect name="type-cargo" className="w-100" btnClass="inp fs-15" checkedOpt="Не важно" options={['Не важно', 'Тип 1', 'Тип 2']}/>
                                    </div>
                                    <div className="col-sm-6 col-md-4">
                                        <label className="title-font mb-2 mb-xl-3">Особые пометки</label>
                                        <CustomSelect name="special-notes" className="w-100" btnClass="inp fs-15" checkedOpt="Нет" options={['Нет', 'Пометка 1', 'Пометка 2']}/>
                                    </div>
                                </>
                            }
                            <div className="col-md-4 d-md-flex align-items-end">
                                <button type="button" onClick={(advSearch) ? ()=>setAdvSearch(false) : ()=>setAdvSearch(true)} className="d-flex align-items-center d-md-none mx-auto mb-4">
                                    {
                                        (advSearch) ?
                                        <>
                                        <span className="blue me-2">Свернуть поиск</span>
                                        <IconContext.Provider value={{className: "blue rotate-180", size: "1.25em"}}>
                                            <IoChevronDownSharp/>
                                        </IconContext.Provider>
                                        </>
                                        : <>
                                        <span className="blue me-2">Расширенный поиск</span>
                                        <IconContext.Provider value={{className: "blue", size: "1.25em"}}>
                                            <IoChevronDownSharp/>
                                        </IconContext.Provider>
                                        </>
                                    }
                                    
                                </button>
                                <button type="button" className="btn btn-2 fs-15 w-100 px-3">Найти грузы</button>
                            </div>
                        </div>
                    </form>
                    :   
                    <form>
                        <div className="row g-3 g-sm-4 g-xl-5">
                            <div className="col-lg-8 d-sm-flex align-items-end">
                                <div className="w-50 mb-3 mb-sm-0">
                                    <label className="title-font mb-2 mb-xl-3">Откуда</label>
                                    <input type="text" placeholder="Город отправления"/>
                                </div>
                                <img src="/cargo/img/icons/arrows.svg" alt="путь" className="d-none d-sm-block icon mx-2 mx-md-3 mb-1 mb-md-2"/>
                                <div className="w-50">
                                    <label className="title-font mb-2 mb-xl-3">Куда</label>
                                    <input type="text" placeholder="Город назначения"/>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4">
                                <label className="title-font mb-2 mb-xl-3">Дата</label>
                                <input type="date" placeholder="С сегодняшнего дня"/>
                            </div>
                            <div className="col-md-7 col-lg-5 col-xxl-4">
                                <div className="row row-cols-sm-2">
                                    <div className="mb-3 mb-sm-0">
                                        <label className="title-font mb-2 mb-xl-3">Объем, м3</label>
                                        <div className="d-flex align-items-center">
                                            <input type="number" placeholder="От" />
                                            <span className="fs-15 mx-1 mx-xl-2">—</span>
                                            <input type="number" placeholder="До" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="title-font mb-2 mb-xl-3">Вес, т</label>
                                        <div className="d-flex align-items-center">
                                            <input type="number" placeholder="От" />
                                            <span className="fs-15 mx-1 mx-xl-2">—</span>
                                            <input type="number" placeholder="До" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-xxl-8">
                                <label className="title-font mb-2 mb-xl-3">Максимальное значение габаритов груза, м</label>
                                <div className="d-sm-flex align-items-center">
                                    <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                                        <label className="me-2">Длина:</label>
                                        <input type="number" placeholder="0"/>
                                    </div>
                                    <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                                        <label className="me-2">Ширина:</label>
                                        <input type="number" placeholder="0"/>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <label className="me-2">Высота:</label>
                                        <input type="number" placeholder="0" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <label className="title-font mb-2 mb-xl-3">Тип груза</label>
                                <CustomSelect name="type-cargo" className="w-100" btnClass="inp fs-15" checkedOpt="Не важно" options={['Не важно', 'Тип 1', 'Тип 2']}/>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <label className="title-font mb-2 mb-xl-3">Особые пометки</label>
                                <CustomSelect name="special-notes" className="w-100" btnClass="inp fs-15" checkedOpt="Нет" options={['Нет', 'Пометка 1', 'Пометка 2']}/>
                            </div>
                            <div className="col-md-4 d-flex align-items-end">
                                <button type="button" className="btn btn-2 fs-15 w-100 px-3">Найти МаШИНЫ</button>
                            </div>
                        </div>
                    </form>
                }
            </section>

            <section className="container pb-4 pb-sm-5 my-sm-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                    <div className="fs-15 fw-5 mb-2 mb-md-0">Найденно 421 грузов</div>
                    <div className="fs-12 ms-md-5 d-flex align-items-center">
                        <span className="me-2">Сортировать:</span>
                        <CustomSelect name="sort" className="w-100" alignment="right" checkedOpt="По времени добавления" options={['По времени добавления', 'По другому признаку']}/>
                    </div>
                </div>
                <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4 g-1 g-sm-2 g-lg-3">
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                    <div>
                        <Card 
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="Холод"
                        />
                    </div>
                </div>
                <button type="button" className="fs-11 dark-blue mx-auto mt-4 mt-sm-5 bb-1">Показать еще</button>
                <nav className="mt-4">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="/" aria-label="Previous">
                                <IoChevronBack />
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link active" href="/">1</a></li>
                        <li className="page-item"><a className="page-link" href="/">2</a></li>
                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                        <li className="page-item">...</li>
                        <li className="page-item"><a className="page-link" href="/">6</a></li>
                        <li className="page-item">
                            <a className="page-link" href="/" aria-label="Next">
                                <IoChevronForward />
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    )
}
