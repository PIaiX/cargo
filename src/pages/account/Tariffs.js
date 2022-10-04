import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import CustomModal from '../../components/utilities/CustomModal';

export default function Tariffs() {
    const navigate = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)

    return (
        <div className='box px-0 p-sm-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span className='green fs-15 me-2'>⟵</span> Назад</Link>

            <h1 className='dark-blue text-center d-lg-none'>Тарифы</h1>
            <div className='fs-12 fw-5 black mb-3'>После выбора тарифа Вы получаете:</div>
            <ul className='fw-5'>
                <li className='mb-1'>возможность публиковать грузы</li>
                <li className='mb-1'>возможность откликаться на объявления</li>
                <li>автоматическое формирование документов (договора, счёт, акт)</li>
            </ul>
            <h4 className='mt-5 black mb-4'>Получить доступуп к платформе на:</h4>
            <div className='row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xxl-5 g-3 g-xl-4 tariffs'>
                <div>
                    <div
                        className='tariff'
                        onClick={() => setIsShowModal(true)}
                    >
                        <div className='title-font fw-7 mb-2'>14&nbsp;дней</div>
                        <div><span className='fw-5 title-font'>500</span>&nbsp;₽</div>
                    </div>
                </div>
                <div>
                    <div
                        className='tariff'
                        onClick={() => setIsShowModal(true)}
                    >
                        <div className='title-font fw-7 mb-2'>1&nbsp;месяц</div>
                        <div><span className='fw-5 title-font'>2&nbsp;000</span>&nbsp;₽</div>
                    </div>
                </div>
                <div>
                    <div
                        className='tariff'
                        onClick={() => setIsShowModal(true)}
                    >
                        <div className='title-font fw-7 mb-2'>3&nbsp;месяца</div>
                        <div><span className='fw-5 title-font'>5&nbsp;500</span>&nbsp;₽</div>
                    </div>
                </div>
                <div>
                    <div
                        className='tariff'
                        onClick={() => setIsShowModal(true)}
                    >
                        <div className='title-font fw-7 mb-2'>6&nbsp;месяцев</div>
                        <div><span className='fw-5 title-font'>10&nbsp;000</span>&nbsp;₽</div>
                    </div>
                </div>
                <div>
                    <div
                        className='tariff'
                        onClick={() => setIsShowModal(true)}
                    >
                        <div className='title-font fw-7 mb-2'>12&nbsp;месяцев</div>
                        <div><span className='fw-5 title-font'>20&nbsp;000</span>&nbsp;₽</div>
                    </div>
                </div>
            </div>
            <div className='fs-12 fw-5 black mt-5'>Доступ к серqqqвису закончиться через: <span>0</span></div>

            <CustomModal
                isShow={isShowModal}
                setIsShow={setIsShowModal}
                titleHead="Перейти к оплате?"
                titleBody="Если у вас уже оплачен доступ, он увеличиться на выбранный вами срок."
                classNameHeader="tariff-modal-header"
                closeButton
                size="lg"
            >
                <div className="tariff-modal-body">
                    <button
                        className="btn btn-1"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Да
                    </button>
                    <button
                        className="btn btn-2"
                        type="button"
                        onClick={() => setIsShowModal(false)}
                    >
                        Нет
                    </button>
                </div>
            </CustomModal>
        </div>
    )
}