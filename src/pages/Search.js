import React, {useState} from 'react';

export default function Search() {
    const [search, setSearch] = useState('cargo');
   
    return (
        <main>
            <section id="sec-7" className="py-5 container">
                <div className="switch">
                    <button type="button" onClick={() => setSearch('cargo')} className={(search === 'cargo') && "active"}>Найти груз</button>
                    <button type="button" onClick={() => setSearch('car')} className={(search === 'car') && "active"}>Найти машину</button>
                </div>
                <form>
                    <div className="row row-cols-3 g-5">
                        <div>
                            <label className="title-font mb-3">Откуда</label>
                            <input type="text" placeholder="Город отправления"/>
                        </div>
                        <div>
                            <label className="title-font mb-3">Куда</label>
                            <input type="text" placeholder="Город назначения"/>
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
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}
