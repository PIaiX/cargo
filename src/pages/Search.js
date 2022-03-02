import React, {useState} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import Card from '../components/Card';

export default function Search() {
    const [search, setSearch] = useState('cargo');
   
    return (
        <main>
            <section id="sec-7" className="py-5 container">
                <div className="switch">
                    <button type="button" onClick={() => setSearch('cargo')} className={(search === 'cargo') && "active"}>Найти груз</button>
                    <button type="button" onClick={() => setSearch('car')} className={(search === 'car') && "active"}>Найти машину</button>
                </div>
                {
                    (search === 'cargo') ?
                    <form>
                        <div className="row row-cols-3 g-5">
                            <div className="col-8 d-flex align-items-end">
                                <div className="w-50">
                                    <label className="title-font mb-3">Откуда</label>
                                    <input type="text" placeholder="Город отправления"/>
                                </div>
                                <img src="/cargo/img/icons/arrows.svg" alt="путь" className="mx-3 mb-2"/>
                                <div className="w-50">
                                    <label className="title-font mb-3">Куда</label>
                                    <input type="text" placeholder="Город назначения"/>
                                </div>
                            </div>
                            <div>
                                <label className="title-font mb-3">Дата</label>
                                <input type="date" placeholder="С сегодняшнего дня"/>
                            </div>
                            <div className="col-2">
                                <label className="title-font mb-3">Объем, м3</label>
                                <div className="d-flex align-items-center">
                                    <input type="number" placeholder="От" />
                                    <span className="fs-15 mx-2">—</span>
                                    <input type="number" placeholder="До" />
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="title-font mb-3">Вес, т</label>
                                <div className="d-flex align-items-center">
                                    <input type="number" placeholder="От" />
                                    <span className="fs-15 mx-2">—</span>
                                    <input type="number" placeholder="До" />
                                </div>
                            </div>
                            <div className="col-8">
                                <label className="title-font mb-3">Максимальное значение габаритов груза, м</label>
                                <div className="d-flex align-items-center">
                                    <label className="me-2">Длина:</label>
                                    <input type="number" placeholder="0" className="me-5"/>
                                    <label className="me-2">Ширина:</label>
                                    <input type="number" placeholder="0" className="me-5"/>
                                    <label className="me-2">Высота:</label>
                                    <input type="number" placeholder="0" />
                                </div>
                            </div>
                            <div>
                                <label className="title-font mb-3">Тип груза</label>
                                <CustomSelect name="type-cargo" className="w-100" btnClass="inp fs-15" checkedOpt="Не важно" options={['Не важно', 'Тип 1', 'Тип 2']}/>
                            </div>
                            <div>
                                <label className="title-font mb-3">Особые пометки</label>
                                <CustomSelect name="special-notes" className="w-100" btnClass="inp fs-15" checkedOpt="Нет" options={['Нет', 'Пометка 1', 'Пометка 2']}/>
                            </div>
                            <div className="d-flex align-items-end">
                                <button type="button" className="btn btn-2 fs-15 w-100">Найти грузы</button>
                            </div>
                        </div>
                    </form>
                    :   
                    <form>
                        <div className="row row-cols-3 g-5">
                            <div className="col-8 d-flex align-items-end">
                                <div className="w-50">
                                    <label className="title-font mb-3">Откуда</label>
                                    <input type="text" placeholder="Город отправления"/>
                                </div>
                                <img src="/cargo/img/icons/arrows.svg" alt="путь" className="mx-3 mb-2"/>
                                <div className="w-50">
                                    <label className="title-font mb-3">Куда</label>
                                    <input type="text" placeholder="Город назначения"/>
                                </div>
                            </div>
                            <div>
                                <label className="title-font mb-3">Дата</label>
                                <input type="date" placeholder="С сегодняшнего дня"/>
                            </div>
                            <div className="col-2">
                                <label className="title-font mb-3">Объем, м3</label>
                                <div className="d-flex align-items-center">
                                    <input type="number" placeholder="От" />
                                    <span className="fs-15 mx-2">—</span>
                                    <input type="number" placeholder="До" />
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="title-font mb-3">Вес, т</label>
                                <div className="d-flex align-items-center">
                                    <input type="number" placeholder="От" />
                                    <span className="fs-15 mx-2">—</span>
                                    <input type="number" placeholder="До" />
                                </div>
                            </div>
                            <div className="col-8">
                                <label className="title-font mb-3">Максимальное значение габаритов груза, м</label>
                                <div className="d-flex align-items-center">
                                    <label className="me-2">Длина:</label>
                                    <input type="number" placeholder="0" className="me-5"/>
                                    <label className="me-2">Ширина:</label>
                                    <input type="number" placeholder="0" className="me-5"/>
                                    <label className="me-2">Высота:</label>
                                    <input type="number" placeholder="0" />
                                </div>
                            </div>
                            <div>
                                <label className="title-font mb-3">Тип груза</label>
                                <CustomSelect name="type-cargo" className="w-100" btnClass="inp fs-15" checkedOpt="Не важно" options={['Не важно', 'Тип 1', 'Тип 2']}/>
                            </div>
                            <div>
                                <label className="title-font mb-3">Особые пометки</label>
                                <CustomSelect name="type-cargo" className="w-100" btnClass="inp fs-15" checkedOpt="Нет" options={['Нет', 'Пометка 1', 'Пометка 2']}/>
                            </div>
                            <div className="d-flex align-items-end">
                                <button type="submit" className="btn btn-2 fs-15 w-100">Найти МаШИНЫ</button>
                            </div>
                        </div>
                    </form>
                }
            </section>

            <section className="container pb-5 my-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <div className="fs-15 fw-5">Найденно 421 грузов</div>
                        <div className="fs-12 ms-5 d-flex align-items-center">
                            <span className="me-2">Сортировать:</span>
                            <CustomSelect name="sort" className="w-100" checkedOpt="По времени добавления" options={['По времени добавления', 'По другому признаку']}/>
                        </div>
                    </div>
                    <button type="button" className="btn-view">
                        <span className="me-2">Показать списком</span>
                        <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="28" height="6" rx="1"></rect>
                            <rect y="8" width="28" height="6" rx="1"></rect>
                            <rect y="16" width="28" height="6" rx="1"></rect>
                        </svg>
                    </button>
                </div>
                <div className="row row-cols-4 g-3">
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
                <button type="button" className="fs-11 dark-blue mx-auto mt-5 bb-1">Показать еще</button>
                <nav className="mt-4">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="/" aria-label="Previous">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6"/>
                                </svg>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link active" href="/">1</a></li>
                        <li className="page-item"><a className="page-link" href="/">2</a></li>
                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                        <li className="page-item">...</li>
                        <li className="page-item"><a className="page-link" href="/">6</a></li>
                        <li className="page-item">
                            <a className="page-link" href="/" aria-label="Next">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    )
}
