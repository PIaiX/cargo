import React from 'react';
import { useOutletContext } from "react-router-dom";
import Pagination from './Pagination';
import ForumSection from './ForumSection';
import {getDateUI} from '../helpers/formatingDate';
import Loader from './Loader';
import CustomSelect from './utilities/CustomSelect';

const ForumTopics = () => {
    const [topics, topicsPagination] = useOutletContext()

    return (
        <div className="col-lg-9">
            <div className="d-flex justify-content-end mb-3">
                <Pagination
                    pageLimit={topicsPagination.pageLimit}
                    currentPage={topicsPagination.currentPage}
                    setCurrentPage={topicsPagination.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={topics?.meta?.total || 0}
                    startingPage={topicsPagination.startingPage}
                    setStartingPage={topicsPagination.setStartingPage}
                />
            </div>
            <div className="forum-header">
                <div className="icon"/>
                <div className="text">Название темы</div>
                <div className="messages">Сообщений</div>
                <div className="latest">Последнее сообщение</div>
            </div>
            {topics.isLoading
                ? topics?.items?.length
                    ? topics.items.map(item => (
                        <ForumSection
                            key={item?.id}
                            id={item?.id}
                            title={item?.title}
                            info={item?.description}
                            topics={item?.topics}
                            messages={item?.messagesCount}
                            latest={item?.lastMessage ? getDateUI(item?.lastMessage?.updatedAt) : null}
                            userName={item?.user?.firstName}
                        />
                    ))
                    : <h6 className="text-center w-100 p-5">Пока нет ни одной темы</h6>
                : <div className="w-100 d-flex justify-content-center p-5"><Loader color="#545454"/></div>
            }
            <div className="d-flex align-items-center justify-content-between mt-4">
                <Pagination
                    pageLimit={topicsPagination.pageLimit}
                    currentPage={topicsPagination.currentPage}
                    setCurrentPage={topicsPagination.setCurrentPage}
                    pagesDisplayedLimit={3}
                    itemsAmount={topics?.meta?.total || 0}
                    startingPage={topicsPagination.startingPage}
                    setStartingPage={topicsPagination.setStartingPage}
                />
                <div className="d-flex align-items-center">
                    <span className="d-none d-sm-block me-2">показать</span>
                    <CustomSelect
                        className="inp"
                        name="items-count"
                        options={['10', '15', '20']}
                        checkedOptions={[topicsPagination.pageLimit]}
                        callback={({title}) => {
                            topicsPagination.setCurrentPage(1)
                            topicsPagination.setPageLimit(+title)
                        }}
                        align="right"
                    />
                    <span className="ms-2 d-none d-md-block">тем на странице</span>
                </div>
            </div>
        </div>
    );
};

export default ForumTopics;