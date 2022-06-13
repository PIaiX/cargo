import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Pattern from '../components/Pattern';

export default function UserPatterns() {
    const [tab, setTab] = useState('cars');

    return (
        <div className='box px-0 p-lg-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block mb-3 mb-sm-5'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Шаблоны</h1>
            <div className='d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5'>
                <button type='button' className={(tab === 'cars') ? 'active tab-btn' : 'tab-btn'} onClick={()=>setTab('cars')}>Машины (3)</button>
                <button type='button' className={(tab === 'cargo') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'} onClick={()=>setTab('cargo')}>Грузы (3)</button>
            </div>
            {
                (tab === 'cars')?
                <div>
                    <Pattern className='mb-3 mb-sm-4' type='car' title='Казань-Челны-Москва' note='Рефрижератор' route='Казань +50км — Москва +50км' date='Ежедневно' aboute='Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45' payment='Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%' contacts='+ 7 (962) 458 65 79 Эльвира'/>

                    <Pattern className='mb-3 mb-sm-4' type='car' title='Название 1' note='Примечание' route='Казань +50км — Москва +50км' date='Ежедневно' aboute='Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45' payment='Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%' contacts='+ 7 (962) 458 65 79 Эльвира'/>

                    <Pattern className='mb-3 mb-sm-4' type='car' title='Название 2' note route='Казань +50км — Москва +50км' date='Ежедневно' aboute='Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45' payment='Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%' contacts='+ 7 (962) 458 65 79 Эльвира'/>
                </div>
                : <div>
                    <Pattern className='mb-3 mb-sm-4' type='cargo' title='Казань-Челны-Москва' note='Рефрижератор' route='Казань +50км — Москва +50км' date='Ежедневно' aboute='Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45' payment='Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%' contacts='+ 7 (962) 458 65 79 Эльвира'/>

                    <Pattern className='mb-3 mb-sm-4' type='cargo' title='Название 1' note='Примечание' route='Казань +50км — Москва +50км' date='Ежедневно' aboute='Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45' payment='Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%' contacts='+ 7 (962) 458 65 79 Эльвира'/>

                    <Pattern className='mb-3 mb-sm-4' type='cargo' title='Название 2' note route='Казань +50км — Москва +50км' date='Ежедневно' aboute='Рефрижератор, Грузовик, 20т, 15м3, 13,6/2,45/2,45' payment='Возможен торг. С НДС 80 ₽/км, без НДС 76 ₽/км, Предоплата 50%' contacts='+ 7 (962) 458 65 79 Эльвира'/>
                </div>
            }
        </div>
    )
}