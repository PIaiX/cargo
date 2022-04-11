import React, {useState} from 'react';
import { IconContext  } from "react-icons";
import { IoTrash, IoCaretDown, IoEllipsisVertical } from 'react-icons/io5';

export default function Pattern(props) {
    const [tab, setTab] = useState('cars');

    return (
        <details className={props.className}>
            <summary className='d-flex align-items-center justify-content-between'>
                <div>
                    <h5 className='gray-2 mb-1'>
                        <span className='me-2'>{props.title}</span>
                        <IconContext.Provider value={{className: "icon-10", title: "Раскрыть" }}>
                            <IoCaretDown />
                        </IconContext.Provider>
                    </h5>
                    {
                        (props.note)&&
                        <div className='fs-11'>{props.note}</div>
                    }
                </div>
                <div className="d-block d-md-none dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 gray-4", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li><button type='button'>Открыть</button></li>
                        <li><button type='button' data-bs-toggle="modal" data-bs-target="#rename-pattern">Переименовать</button></li>
                        <li><button type='button' data-bs-toggle="modal" data-bs-target="#delete-pattern">Удалить</button></li>
                    </ul>
                </div>
                <div className='d-none d-md-flex'>
                    <button type='button' className='btn btn-1 fs-09'>Открыть</button>
                    <button type='button' data-bs-toggle="modal" data-bs-target="#rename-pattern" className='btn btn-1 fs-09 ms-2 ms-xxl-3'>Переименовать</button>
                    <button type='button' data-bs-toggle="modal" data-bs-target="#delete-pattern" className='ms-3 ms-xxl-4'>
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
                            <td>{props.route}</td>
                        </tr>
                        <tr>
                            <th>Дата</th>
                            <td>{props.date}</td>
                        </tr>
                        <tr>
                            <th>О&nbsp;машине</th>
                            <td>{props.aboute}</td>
                        </tr>
                        <tr>
                            <th>Оплата</th>
                            <td>{props.payment}</td>
                        </tr>
                        <tr>
                            <th>Контакты</th>
                            <td>{props.contacts}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </details>
    )
}