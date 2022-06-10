import React, {useState} from 'react';
import ResponseCard from '../components/ResponseCard';

export default function Responses() {
    const [tab, setTab] = useState('active');

    return (
        <div className='box px-0 p-sm-4 p-xl-5'>
            <h1 className='dark-blue text-center d-lg-none'>Мои отклики</h1>
            <div className='d-flex align-items-center fs-12 fw-5 title-font mb-4 mb-xl-5'>
                <button type='button' className={(tab === 'active') ? 'active tab-btn' : 'tab-btn'} onClick={()=>setTab('active')}>Мне откликнулись (5)</button>
                <button type='button' className={(tab === 'archive') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'} onClick={()=>setTab('archive')}>Вы откликнулись (4)</button>
            </div>
            {
                (tab === 'active')?
                <div className='row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4'>
                    <div>
                        <ResponseCard type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={1} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                </div>
                : <div className='row row-cols-sm-2 row-cols-xxl-3 g-3 g-md-4'>
                    <div>
                        <ResponseCard type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                    <div>
                        <ResponseCard type={2} name={'Мария Викторова'} company={'ООО «Название компании»'} img={'/cargo/img/users/photo.jpg'} text={'Несколько строчек про объявление, в которых написан'}/>
                    </div>
                </div>
            }
        </div>
    )
}