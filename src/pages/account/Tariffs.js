import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import CustomModal from '../../components/utilities/CustomModal';
import {getTariffs} from '../../API/tariffs';
import Loader from '../../components/Loader';
import {buyTariff} from '../../API/payments';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux/es/exports';
import {setAlert} from '../../store/actions/alert';

export default function Tariffs() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.currentUser?.data?.user)
    const [isShowModal, setIsShowModal] = useState(false)
    const [tariffs, setTariffs] = useState({
        isLoaded: false,
        error: null,
        items: []
    })
    const [tariffType, setTariffType] = useState(null)
    const [tariffExpiredAt, setTariffExpiredAt] = useState(null)
    const titles = ['14 дней', '1 месяц', '3 месяца', 'пол года', 'год']

    useEffect(() => {
        getTariffs()
            .then(res => setTariffs({isLoaded: true, items: res}))
            .catch(error => setTariffs({isLoaded: true, error}))
    }, [])

    useEffect(() => {
        !isShowModal && setTariffType(null)
    }, [isShowModal])

    useEffect(() => {
        if (user && user?.tariffExpiredAt) {
            const date = new Date(user?.tariffExpiredAt)
            const options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
            date && setTariffExpiredAt(date.toLocaleDateString('ru', options))
        }
    }, [user])

    const onBuyTariff = (userId, tariffType) => {
        buyTariff(userId, tariffType)
            .then(async (res) => {
                if (res) {
                    await window.open(res, '_blank')
                    setIsShowModal(false)
                } else {
                    dispatch(setAlert('danger', 'Что-то пошло не так, повторите попытку позже'))
                    setIsShowModal(false)
                }
            })
            .catch(error => {
                dispatch(setAlert('danger', 'Что-то пошло не так, повторите попытку позже'))
                setIsShowModal(false)
            })
    }

    return (
        <div className='box px-0 p-sm-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span
                className='green fs-15 me-2'>⟵</span> Назад</Link>

            <h1 className='dark-blue text-center d-lg-none'>Тарифы</h1>
            <div className='fs-12 fw-5 black mb-3'>После выбора тарифа Вы получаете:</div>
            <ul className='fw-5'>
                <li className='mb-1'>возможность публиковать грузы</li>
                <li className='mb-1'>возможность откликаться на объявления</li>
                <li>автоматическое формирование документов (договора, счёт, акт)</li>
            </ul>
            <h4 className='mt-5 black mb-4'>Получить доступ к платформе на:</h4>
            <div className='row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xxl-5 g-3 g-xl-4 tariffs'>
                {tariffs.isLoaded
                    ? tariffs?.items?.length
                        ? tariffs.items.map((item, index) => (
                            <div key={index}>
                                <div
                                    className='tariff'
                                    onClick={() => {
                                        setIsShowModal(true)
                                        setTariffType(index)
                                    }}
                                >
                                    <div
                                        className='title-font fw-7 mb-2'>{(index < titles?.length) ? titles[index] : null}</div>
                                    <div><span className='fw-5 title-font'>{item?.price}</span>&nbsp;₽</div>
                                </div>
                            </div>
                        ))
                        : null
                    : <div className="d-flex justify-content-center"><Loader color="#545454"/></div>
                }
            </div>
            <div className='fs-12 fw-5 black mt-5 tariff__date'>
                {tariffExpiredAt
                    ? (
                        <>
                            Доступ к сервису закончится:&nbsp;
                            <span>
                                {tariffExpiredAt}
                            </span>
                        </>
                    )
                    : 'Тариф не оплачен'
                }
            </div>
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
                        onClick={() => onBuyTariff(user?.id, tariffType)}
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