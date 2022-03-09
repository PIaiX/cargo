import React from 'react';
import { RiFlag2Fill, RiChat4Fill } from "react-icons/ri";


export default function CargoPage() {
    return (
        <main>
            <section id="sec-8" className="container py-4 py-sm-5">
                <h1>Груз № 356790 Гомзово — Набережные Челны</h1>
                <div className="row flex-md-row-reverse">
                    <div className="col-3">
                        <div className="order-1 mb-4">
                            <h5>Маршрут</h5>
                            <div className="border p-3">
                                <div className="mb-2"><span className="green fw-5">452 км</span> Казань — Набережные Челны — Москва</div>
                                <div><span className="red fw-5">584 км</span> Альметьевск — Казань — Набережные Челны — Москва</div>
                            </div>
                        </div>
                        <div className="order-2 mb-5">
                            <h5>Оплата</h5>
                            <div className="border p-3">
                                <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                                    <div>58 000 ₽ с НДС</div>
                                    <div>(80 ₽/км)</div>
                                </div>
                                <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                                    <div>50 000 ₽ без НДС</div>
                                    <div>(78 ₽/км)</div>
                                </div>
                                <div className="d-flex justify-content-between fs-13 fw-5">
                                    <div>Без торга</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-3">Карточка</div>
                    </div>
                    <div className="col-9">
                        <div className="d-flex">
                            <RiFlag2Fill/>
                            <h5>Загрузка</h5>
                        </div>
                        <div className="border p-3 mb-4">
                            <div>
                                <span>Дата: </span>
                                <span>11.11.2021</span>
                            </div>
                        </div>
                        <div className="grid-3">Разгрузка</div>
                        <div className="grid-3">Груз</div>
                        <div className="grid-3">
                            <RiChat4Fill />
                            Примечание</div>
                    </div>
                </div>
            </section>
        </main>
    )
}
