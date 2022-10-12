import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CustomSelect from '../../components/utilities/CustomSelect';
import DocPreview from '../../components/DocPreview';
import {IconContext} from "react-icons";
import {IoAddCircleSharp, IoSearch} from 'react-icons/io5';
import PatternPreview from '../../components/PatternPreview';
import Pagination from '../../components/Pagination';
import fakeDocuments from '../../dummyData/documents.json'
import fakePatterns from '../../dummyData/patterns.json'
import usePagination from '../../hooks/pagination';
import useSearchInput from '../../hooks/searchInput';

export default function UserDocuments() {
    const initialPageLimit = 10;
    const [tab, setTab] = useState('docs')
    const [items, setItems] = useState(tab === 'docs' ? fakeDocuments : fakePatterns)
    const {searchValue, setSearchValue, foundItems} = useSearchInput(items, 'contractorName')

    const documentsPagination = usePagination(initialPageLimit)
    const [documentsAmount, setDocumentsAmount] = useState(fakeDocuments.length)
    const [documents, setDocuments] = useState(null)

    const patternsPagination = usePagination(initialPageLimit)
    const [patternsAmount, setPatternsAmount] = useState(fakeDocuments.length)
    const [patterns, setPatterns] = useState(null)

    useEffect(() => {
        (tab === 'docs') ? setItems(fakeDocuments) : setItems(fakePatterns)
    }, [tab])

    useEffect(() => {
        const startIdx = (documentsPagination.currentPage - 1) * documentsPagination.pageLimit;
        const endIdx = startIdx + documentsPagination.pageLimit;
        const paginated = foundItems.slice(startIdx, endIdx)
        setDocumentsAmount(foundItems.length)
        setDocuments(paginated)

    }, [documentsPagination.currentPage, documentsPagination.pageLimit, foundItems])

    useEffect(() => {
        const startIdx = (patternsPagination.currentPage - 1) * patternsPagination.pageLimit;
        const endIdx = startIdx + patternsPagination.pageLimit;
        const paginated = foundItems.slice(startIdx, endIdx)
        setPatternsAmount(foundItems.length)
        setPatterns(paginated)

    }, [patternsPagination.currentPage, patternsPagination.pageLimit, foundItems])

    return (
        <div className='box px-0 p-lg-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'>
                <span className='green fs-15 me-2'>⟵</span>
                Назад
            </Link>
            <h1 className='dark-blue text-center d-lg-none'>Документы</h1>
            <div className='d-md-flex justify-content-between align-items-center mb-4 mb-xl-5'>
                <div className='d-flex align-items-center fs-12 fw-5 title-font'>
                    <button
                        type='button'
                        className={(tab === 'docs') ? 'active tab-btn' : 'tab-btn'}
                    >
                        Документы
                    </button>
                </div>
            </div>

            <div>
                <div className='docs-header mt-3'>
                    <div className='title'>Документ</div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Доверенность</div>
                    <div className='contractor'><a href='/documents/doverennost.docx' download>Скачать</a></div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Доверенность ТМС</div>
                    <div className='contractor'><a href='/documents/doverennost_TMS.docx' download>Скачать</a></div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Товарно-транспортная накладная</div>
                    <div className='contractor'><a href='/documents/ttn.docx' download>Скачать</a></div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Договор</div>
                    <div className='contractor'><a href='/documents/dogovor.docx' download>Скачать</a></div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Договор-заявка</div>
                    <div className='contractor'><a href='/documents/dogovor-zayavka.docx' download>Скачать</a></div>
                </div>

                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Акт</div>
                    <div className='contractor'><a href='/documents/act.docx' download>Скачать</a></div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Счет</div>
                    <div className='contractor'><a href='/documents/schet.docx' download>Скачать</a></div>
                </div>
                <div
                    className='docs-preview mt-3 mb-3'
                >
                    <div className='title'>Путевой лист</div>
                    <div className='contractor'><a href='/documents/putevoi_list.xlsx' download>Скачать</a></div>
                </div>
            </div>
        </div>
    )
}