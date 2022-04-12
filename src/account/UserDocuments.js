import React, {useState} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import DocPreview from '../components/DocPreview';
import { IconContext  } from "react-icons";
import { IoAddCircleSharp, IoSearch } from 'react-icons/io5';

export default function UserDocuments() {
    const [tab, setTab] = useState('docs');

    return (
        <div className='box px-0 p-lg-4 p-xl-5'>
            <h1 className='dark-blue text-center d-lg-none'>Документы</h1>
            <div className='d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5'>
                <button type='button' data-bs-toggle="modal" data-bs-target="#docs-patterns" className='btn btn-2 fs-12 px-4 mb-4 mb-md-0'>
                    <IconContext.Provider value={{className: "icon-15 white", title: "Создать документ" }}>
                        <IoAddCircleSharp />
                    </IconContext.Provider>
                    <span className='ms-2'>Создать документ</span>
                </button>
                <div className='d-flex align-items-center fs-12 fw-5 title-font'>
                    <button type='button' className={(tab === 'docs') ? 'active tab-btn' : 'tab-btn'} onClick={()=>setTab('docs')}>Мои документы</button>
                    <button type='button' className={(tab === 'patterns') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'} onClick={()=>setTab('patterns')}>Шаблоны документов </button>
                </div>
            </div>

            <div className='d-flex align-items-center fs-11'>
                <form className='form-search'>
                    <input type="search" placeholder='Поиск по контрагенту'/>
                    <button>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Создать документ" }}>
                            <IoSearch />
                        </IconContext.Provider>
                    </button>
                </form>
                <div className='d-flex align-items-center ms-5'>
                    <span className='me-1'>Тип&nbsp;документов:</span>
                    <CustomSelect name="docs-type" checkedOpt={1} options={['Все', 'тип 1', 'тип 2']} alignment="left"/>
                </div>
                <div className='d-flex align-items-center ms-5'>
                    <span className='me-1'>Дата:</span>
                    <CustomSelect name="date-sort" options={['сначала новые', 'сначала старые']} alignment="left"/>
                </div>
            </div>

            {
                (tab === 'docs')?
                <div>
                    <div className='docs-header mt-3'>
                        <label>
                            <input type='checkbox' name='all'/>
                        </label>
                        <div className='title'>Документ</div>
                        <div className='number'>Номер</div>
                        <div className='date'>Дата создания</div>
                        <div className='contractor'>Контрагент</div>
                        <div className="dropdown">
                        <button type='button'></button>
                        </div>
                    </div>
                   <DocPreview type='doc' className='mt-3' docId='id111' title='Заявка' number='689065980-67' date='13.12.2021' contractor={{name:'ООО НТК', url: '/personal-account/view-profile'}} />
                   <DocPreview type='doc' className='mt-3' docId='id111' title='Заявка' number='689065980-67' date='13.12.2021' contractor={{name:'ООО НТК', url: '/personal-account/view-profile'}} />
                   <DocPreview type='doc' className='mt-3' docId='id111' title='Заявка' number='689065980-67' date='13.12.2021' contractor={{name:'ООО НТК', url: '/personal-account/view-profile'}} />
                </div>
                : <div>
                    <div className='docs-header mt-3'>
                        <label>
                            <input type='checkbox' name='all'/>
                        </label>
                        <div className='title'>Название шаблона</div>
                        <div className='doc-type'>Тип документа</div>
                        <div className='contractor'>Контрагент</div>
                        <div className="dropdown">
                        <button type='button'></button>
                        </div>
                    </div>
                   <DocPreview type='pattern' className='mt-3' docId='id111' title='Заявка с НТК' note='Казань-Москва' docType='Счет на оплату' contractor={{name:'ООО НТК', url: '/personal-account/view-profile'}} />
                   <DocPreview type='pattern' className='mt-3' docId='id111' title='Заявка с НТК' note='Казань-Москва' docType='Счет на оплату' contractor={{name:'ООО НТК', url: '/personal-account/view-profile'}} />
                   <DocPreview type='pattern' className='mt-3' docId='id111' title='Заявка с НТК' note='Казань-Москва' docType='Счет на оплату' contractor={{name:'ООО НТК', url: '/personal-account/view-profile'}} />
                </div>
            }
        </div>
    )
}