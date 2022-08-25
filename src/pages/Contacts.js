import React from 'react';

const Contacts = () => {
    return (
        <div className='box px-0 p-sm-4 p-xl-5'>

            <h1 className='dark-blue text-center d-lg-none'>Контакты</h1>

            <div className='contacts'>
                <div className='contacts__first'>
                    <ul>
                        <li><strong>Контакты</strong></li>
                        <li>Электронная почта: <a href='mailto:erigold@mail.ru'>erigold@mail.ru</a></li>
                        <li>Телефоны: <a href='tel:+79639025009'>+7 963 902-50-09</a> и <a href='tel:+79279330770'>+7 927 933-07-70</a></li>
                    </ul>
                </div>
                <div className='contacts__second'>
                <ul>
                    <li><strong>Реквизиты</strong></li>
                    <li>ИП Иртуганов И.И. (ТЭИК Кристалл ЭРИ)</li>
                    <li>ИНН 027363360429</li>
                    <li>ОГРН 318028000198342 от 16.12.2018г</li>
                    <li>Юр/адрес: 452880, РБ,Аскинский район, с.Аскино ул.Кольцевая,12</li>
                    <li>p/с 40802810500002958802 АО &quot;ТИНЬКОФФ БАНК&quot;</li>
                    <li>к/с 30101810145250000974; БИК 044525974</li>
                    <li>Индивидуальный предприниматель</li>
                </ul>
                </div>
            </div>
        </div>
    );
};

export default Contacts;