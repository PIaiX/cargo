import React, {useEffect, useState} from 'react';
import { IconContext  } from "react-icons";
import { IoTrash, IoCaretDown, IoEllipsisVertical } from 'react-icons/io5';
import CustomModal from "./utilities/CustomModal";

const Pattern = (props) => {

    const [isShowRenameModal, setIsShowRenameModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [rename, setRename] = useState({
        patternName: '',
        note: '',
    })

    const onSubmitForRename = () => {

        const formData = new FormData()
        const req = {...rename}

        for (const key in req){
            formData.append(key, req[key])
        }

        try {
            ///
        } catch (error) {
            console.log(error)
        }
    }

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
                {/*mobile*/}
                <div className="d-block d-md-none dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 gray-4", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li>
                            <button
                                type='button'
                            >
                                Открыть
                            </button>
                        </li>
                        <li>
                            <button
                            type='button'
                            onClick={() => setIsShowRenameModal(true)}
                            >
                                Переименовать
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                onClick={() => setIsShowDeleteModal(true)}
                            >
                                Удалить
                            </button>
                        </li>
                    </ul>
                </div>
                {/*des*/}
                <div className='d-none d-md-flex'>
                    <button
                        type='button'
                        className='btn btn-1 fs-09'
                    >
                        Открыть
                    </button>
                    <button
                        type='button'
                        className='btn btn-1 fs-09 ms-2 ms-xxl-3'
                        onClick={() => setIsShowRenameModal(true)}
                    >
                        Переименовать
                    </button>
                    <button
                        type='button'
                        onClick={() => setIsShowDeleteModal(true)}
                        className='ms-3 ms-xxl-4'
                    >
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
            <CustomModal
                closeButton={true}
                isShow={isShowRenameModal}
                setIsShow={setIsShowRenameModal}
                title={true}
                titleHead={'Переименовать шаблон'}
                className="modal__rename-template"
            >
                <form className="fs-12">
                    <label className="mb-2">Название шаблона</label>
                    <input
                        type="text"
                        className="mb-3"
                        placeholder="Название"
                        value={rename.patternName}
                        onChange={(e) => {
                            setRename(prevState => {
                                return {...prevState, 'patternName': e.target.value}
                            })
                        }}
                    />
                    <label className="mb-2">Примечание</label>
                    <input
                        type="text"
                        className="mb-3"
                        placeholder="Примечание"
                        value={rename.note}
                        onChange={(e) => {
                            setRename(prevState => {
                                return {...prevState, 'note': e.target.value}
                            })
                        }}
                    />
                    <div className="row row-cols-sm-2 mt-4">
                        <div className="mb-3 mb-sm-0">
                            <button
                                type="button"
                                onClick={() => setIsShowRenameModal(false)}
                                className="btn btn-1 w-100"
                            >
                                Отмена
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-2 w-100">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </CustomModal>
            <CustomModal
                isShow={isShowDeleteModal}
                setIsShow={setIsShowDeleteModal}
                closeButton={true}
                title={true}
                titleHead={'Вы действительно хотите удалить шаблон?'}
                className="modal__delete-template"
            >
                <div className="row row-cols-sm-2 fs-12">
                    <div className="mb-3 mb-sm-0">
                        <button
                            type="button"
                            onClick={() => setIsShowDeleteModal(false)}
                            className="btn btn-1 w-100"
                        >
                            Отмена
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-2 w-100">
                            Удалить
                        </button>
                    </div>
                </div>
            </CustomModal>
        </details>
    )
}

export default Pattern