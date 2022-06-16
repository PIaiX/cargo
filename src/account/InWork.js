import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ResponseCard from '../components/ResponseCard';

export default function InWork() {
    const [tab, setTab] = useState('active');

    return (
        <div className='box px-0 p-sm-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block mb-3 mb-sm-5'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Отклики в работе</h1>
            <div className='d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5'>
                <button type='button' className={(tab === 'active') ? 'active tab-btn' : 'tab-btn'} onClick={()=>setTab('active')}>Текущие (5)</button>
                <button type='button' className={(tab === 'archive') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'} onClick={()=>setTab('archive')}>Выполенные (5)</button>
            </div>
            {
                (tab === 'active')?
                <div className='row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4'>
                    <div>
                        <ResponseCard inWork={true} type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                </div>
                : <div className='row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4'>
                    <div>
                        <ResponseCard inWork={true} type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard inWork={true} type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                </div>
            }
        </div>
    )
}