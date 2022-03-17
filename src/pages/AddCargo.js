import React from 'react';
import CustomSelect from '../components/utilities/CustomSelect';

import { IoAddCircle } from 'react-icons/io5';
import { IconContext } from "react-icons";

export default function AddCargo() {
    return (
        <main className="bg-gray">
            <section id="sec-9" className="container py-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Груза</h1>
                <div className="row">
                    <div className="col-8">
                        <h4 className="mb-3">Загрузка</h4>
                        <fieldset className="box py-4 px-5">
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Дата*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="box p-3">
                                                <label className="mb-3">
                                                    <input type="radio" name="frequency" value="Единожды"/>
                                                    <span className="title-font fs-12 fw-5 ms-3">Единожды</span>
                                                </label>
                                                <div className="d-flex align-items-center">
                                                    <input type="date" />
                                                    <span className="mx-3">+</span>
                                                    <CustomSelect className="inp w-100" name="days" checkedOpt="0 дн." options={['0 дн.', '1 дн.']}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="box p-3">
                                                <label className="mb-3">
                                                    <input type="radio" name="frequency" value="Постоянно"/>
                                                    <span className="title-font fs-12 fw-5 ms-3">Постоянно</span>
                                                </label>
                                                <CustomSelect className="inp w-100" name="periodicity" checkedOpt="По рабочим дням" options={['По рабочим дням', 'По выходным']}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Время загрузки</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex align-items-center">
                                        <input type="time" />
                                        <span className="mx-3">—</span>
                                        <input type="time" />
                                    </div>
                                    <label className="mt-2">
                                        <input type="checkbox" name="frequency" value="Круглосуточно"/>
                                        <span className="ms-2">Круглосуточно</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-5">
                                            <input type="text" placeholder="Населеный пункт"/>
                                        </div>
                                        <div className="col-7">
                                            <input type="text" placeholder="Адрес"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                            <IconContext.Provider value={{className: "green icon-15"}}>
                                <IoAddCircle />
                            </IconContext.Provider>
                            <span className="ms-2">Добавить точку загрузки</span>
                        </button>

                        <h4 className="mt-5 mb-3">Разгрузка</h4>
                        <fieldset className="box py-4 px-5">
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Дата</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex align-items-center">
                                        <input type="date"/>
                                        <span className="fs-12 mx-3">—</span>
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Время загрузки</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex align-items-center">
                                        <input type="time" />
                                        <span className="mx-3">—</span>
                                        <input type="time" />
                                    </div>
                                    <label className="mt-2">
                                        <input type="checkbox" name="frequency" value="Круглосуточно"/>
                                        <span className="ms-2">Круглосуточно</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-5">
                                            <input type="text" placeholder="Населеный пункт"/>
                                        </div>
                                        <div className="col-7">
                                            <input type="text" placeholder="Адрес"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                            <IconContext.Provider value={{className: "green icon-15"}}>
                                <IoAddCircle />
                            </IconContext.Provider>
                            <span className="ms-2">Добавить точку разгрузки</span>
                        </button>

                        <h4 className="mt-5 mb-3">Груз</h4>
                        <fieldset className="box py-4 px-5">
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Тип груза</div>
                                </div>
                                <div className="col-9">
                                    <CustomSelect className="inp w-100" name="cargo-type"  options={['тип 1', 'тип 2']}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Вес*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-4">
                                            <input type="number" className="weight w-100"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Объем*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-4">
                                            <input type="number" className="size w-100"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-4 pt-5">
                        <fieldset className="box py-4 px-5">
                            <nav>
                                <ol>
                                    <li>
                                        <a>Загрузка</a>
                                    </li>
                                    <li>
                                        <a>Разгрузка</a>
                                    </li>
                                    <li>
                                        <a>Груз</a>
                                    </li>
                                    <li>
                                        <a>Требования к машине</a>
                                    </li>
                                    <li>
                                        <a>Оплата</a>
                                    </li>
                                    <li>
                                        <a>Контакты</a>
                                    </li>
                                </ol>
                            </nav>
                        </fieldset>
                    </div>
                </div>
            </section>
        </main>
    )
}
