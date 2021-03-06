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
                <span className='green fs-15 me-2'>???</span>
                ??????????
            </Link>
            <h1 className='dark-blue text-center d-lg-none'>??????????????????</h1>
            <div className='d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5'>
                <button type='button' data-bs-toggle="modal" data-bs-target="#docs-patterns"
                        className='btn btn-2 fs-12 px-4 mb-4 mb-md-0'>
                    <IconContext.Provider value={{className: "icon-15 white", title: "?????????????? ????????????????"}}>
                        <IoAddCircleSharp/>
                    </IconContext.Provider>
                    <span className='ms-2'>?????????????? ????????????????</span>
                </button>
                <div className='d-flex align-items-center fs-12 fw-5 title-font'>
                    <button
                        type='button'
                        className={(tab === 'docs') ? 'active tab-btn' : 'tab-btn'}
                        onClick={() => setTab('docs')}
                    >
                        ?????? ??????????????????
                    </button>
                    <button
                        type='button'
                        className={(tab === 'patterns') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'}
                        onClick={() => setTab('patterns')}
                    >
                        ?????????????? ????????????????????
                    </button>
                </div>
            </div>

            <div className='d-md-flex align-items-center fs-11'>
                <form className='form-search'>
                    <input
                        type="search"
                        placeholder='?????????? ???? ??????????????????????'
                        value={searchValue}
                        onChange={e => {
                            setSearchValue(e.target.value)
                            if (searchValue.length && tab === 'docs') {
                                documentsPagination.setCurrentPage(1)
                                documentsPagination.setStartingPage(1)
                            } else {
                               patternsPagination.setCurrentPage(1)
                               patternsPagination.setStartingPage(1)
                            }
                        }}
                    />
                    <button>
                        <IconContext.Provider value={{className: "icon-15 green", title: "?????????????? ????????????????"}}>
                            <IoSearch/>
                        </IconContext.Provider>
                    </button>
                </form>
                <div
                    className='d-flex justify-content-between justify-content-md-start align-items-center mt-3 mt-md-0 ms-md-5'>
                    <div className='d-flex align-items-center'>
                        <span className='d-none d-sm-block me-1'>??????&nbsp;????????????????????:</span>
                        <CustomSelect
                            name="docs-type"
                            checkedOptions={[0]}
                            mode='values'
                            options={['??????', '?????? 1', '?????? 2']}
                            align="left"
                        />
                    </div>
                    <div className='d-flex align-items-center ms-md-5'>
                        <span className='d-none d-sm-block me-1'>????????:</span>
                        <CustomSelect
                            name="date-sort"
                            checkedOptions={[0]}
                            mode='values'
                            options={['?????????????? ??????????', '?????????????? ????????????']}
                            align="left"/>
                    </div>
                </div>
            </div>

            {
                (tab === 'docs')
                    ? <>
                        <div>
                            <div className='docs-header mt-3'>
                                <div className='title'>????????????????</div>
                                <div className='number'>??????????</div>
                                <div className='date'>???????? ????????????????</div>
                                <div className='contractor'>????????????????????</div>
                                <div className="dropdown">
                                    <button type='button'/>
                                </div>
                            </div>
                            {
                                documents && documents.map((document, index) => (
                                    <DocPreview
                                        key={index}
                                        type='doc'
                                        className='mt-3'
                                        docId={document.docId}
                                        title={document.title}
                                        number={document.number}
                                        date={document.date}
                                        contractor={{name: document.contractorName, url: document.contractorRoute}}
                                    />
                                ))
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <Pagination
                                pageLimit={documentsPagination.pageLimit}
                                currentPage={documentsPagination.currentPage}
                                setCurrentPage={documentsPagination.setCurrentPage}
                                pagesDisplayedLimit={3}
                                itemsAmount={documentsAmount}
                                startingPage={documentsPagination.startingPage}
                                setStartingPage={documentsPagination.setStartingPage}
                            />
                        </div>
                    </>
                    : <>
                        <div>
                            <div className='patterns-header mt-3'>
                                <div className='title'>???????????????? ??????????????</div>
                                <div className='doc-type'>?????? ??????????????????</div>
                                <div className='contractor'>????????????????????</div>
                                <div className="dropdown">
                                    <button type='button'/>
                                </div>
                            </div>
                            {
                                patterns && patterns.map((pattern, index) => (
                                    <PatternPreview
                                        key={index}
                                        type='pattern'
                                        className='mt-3'
                                        docId={pattern.docId}
                                        title={pattern.title}
                                        note={pattern.note}
                                        docType={pattern.docType}
                                        contractor={{name: pattern.contractorName, url: pattern.contractorRoute}}
                                    />
                                ))
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <Pagination
                                pageLimit={patternsPagination.pageLimit}
                                currentPage={patternsPagination.currentPage}
                                setCurrentPage={patternsPagination.setCurrentPage}
                                pagesDisplayedLimit={3}
                                itemsAmount={patternsAmount}
                                startingPage={patternsPagination.startingPage}
                                setStartingPage={patternsPagination.setStartingPage}
                            />
                        </div>
                    </>
            }
        </div>
    )
}