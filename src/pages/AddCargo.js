import React from 'react'

export default function AddCargo() {
    return (
        <main className="bg-gray">
            <section id="sec-9" className="container py-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Груза</h1>
                <div className="row">
                    <div className="col-8">
                        <h4 className="mb-3">Загрузка</h4>
                        <fieldset className="box py-4 px-5">
                            <div className="row">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Дата*</div>
                                </div>
                                <div className="col-9 d-flex">
                                    <div className="box w-50 p-3">
                                        <label className="mb-3">
                                            <input type="radio" name="frequency" value="Единожды"/>
                                            <span className="title-font fs-12 fw-5 ms-3">Единожды</span>
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <input type="date" />
                                            <span className="mx-3">+</span>
                                            <input type="date" />
                                        </div>
                                    </div>
                                    <div className="box w-50 p-3">
                                        <label className="mb-3">
                                            <input type="radio" name="frequency" value="Постоянно"/>
                                            <span className="title-font fs-12 fw-5 ms-3">Постоянно</span>
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <input type="date" />
                                            <span className="mx-3">+</span>
                                            <input type="date" />
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
