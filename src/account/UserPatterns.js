import React, {useState} from 'react';
import { IconContext  } from "react-icons";
import { IoTrash, IoCaretDown } from 'react-icons/io5';
import Card from '../components/Card';
import { Link } from 'react-router-dom';


export default function UserPatterns() {
    const [tab, setTab] = useState('cars');

    return (
        <div className='box px-0 p-sm-4 p-xl-5'>
            <div className='d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5'>
                <button type='button' className='tab-btn active' onClick={()=>setTab('cars')}>Машины (3)</button>
                <button type='button' className='tab-btn ms-3 ms-sm-4 ms-xl-5' onClick={()=>setTab('cargo')}>Грузы (15)</button>
            </div>

            <details className='mb-4'>
                <summary className='d-flex align-items-center justify-content-between'>
                    <div>
                        <h5 className='gray-2 mb-1'>
                            <span className='me-2'>Казань-Челны-Москва</span>
                            <IconContext.Provider value={{className: "icon-10", title: "Раскрыть" }}>
                                <IoCaretDown />
                            </IconContext.Provider>
                        </h5>
                        <div className='fs-11'>Рефрижератор</div>
                    </div>
                    <div className='d-flex'>
                        <button type='button' className='btn btn-1 fs-09'>Открыть</button>
                        <button type='button' className='btn btn-1 fs-09 ms-3'>Переименовать</button>
                        <button type='button' className='ms-4'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Удалить" }}>
                                <IoTrash />
                            </IconContext.Provider>
                        </button>
                    </div>
                </summary>
                <div className='mt-3'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Маршрут</th>
                                <td>Казань +50км — Москва +50км</td>
                            </tr>
                            <tr>
                                <th>Дата</th>
                                <td>Ежедневно</td>
                            </tr>
                            <tr>
                                <th>О машине</th>
                                <td>Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45</td>
                            </tr>
                            <tr>
                                <th>Оплата</th>
                                <td>Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%</td>
                            </tr>
                            <tr>
                                <th>Контакты</th>
                                <td>+ 7 (962) 458 65 79 Эльвира</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>

            <details className='mb-4'>
                <summary className='d-flex align-items-center justify-content-between'>
                    <div>
                        <h5 className='gray-2 d-flex align-items-center mb-1'>
                            <span className='me-2'>Название 1</span>
                            <IconContext.Provider value={{className: "icon-10", title: "Раскрыть" }}>
                                <IoCaretDown />
                            </IconContext.Provider>
                        </h5>
                        <div className='fs-11'>Примечание</div>
                    </div>
                    <div className='d-flex'>
                        <button type='button' className='btn btn-1 fs-09'>Открыть</button>
                        <button type='button' className='btn btn-1 fs-09 ms-3'>Переименовать</button>
                        <button type='button' className='ms-4'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Удалить" }}>
                                <IoTrash />
                            </IconContext.Provider>
                        </button>
                    </div>
                </summary>
                <div className='mt-3'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Маршрут</th>
                                <td>Казань +50км — Москва +50км</td>
                            </tr>
                            <tr>
                                <th>Дата</th>
                                <td>Ежедневно</td>
                            </tr>
                            <tr>
                                <th>О машине</th>
                                <td>Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45</td>
                            </tr>
                            <tr>
                                <th>Оплата</th>
                                <td>Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%</td>
                            </tr>
                            <tr>
                                <th>Контакты</th>
                                <td>+ 7 (962) 458 65 79 Эльвира</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>

            <details className='mb-4'>
                <summary className='d-flex align-items-center justify-content-between'>
                    <div>
                        <h5 className='gray-2 d-flex align-items-center mb-1'>
                            <span className='me-2'>Название 2</span>
                            <IconContext.Provider value={{className: "icon-10", title: "Раскрыть" }}>
                                <IoCaretDown />
                            </IconContext.Provider>
                        </h5>
                    </div>
                    <div className='d-flex'>
                        <button type='button' className='btn btn-1 fs-09'>Открыть</button>
                        <button type='button' className='btn btn-1 fs-09 ms-3'>Переименовать</button>
                        <button type='button' className='ms-4'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Удалить" }}>
                                <IoTrash />
                            </IconContext.Provider>
                        </button>
                    </div>
                </summary>
                <div className='mt-3'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Маршрут</th>
                                <td>Казань +50км — Москва +50км</td>
                            </tr>
                            <tr>
                                <th>Дата</th>
                                <td>Ежедневно</td>
                            </tr>
                            <tr>
                                <th>О машине</th>
                                <td>Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45</td>
                            </tr>
                            <tr>
                                <th>Оплата</th>
                                <td>Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%</td>
                            </tr>
                            <tr>
                                <th>Контакты</th>
                                <td>+ 7 (962) 458 65 79 Эльвира</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>
        </div>
    )
}