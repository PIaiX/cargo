import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import CustomSelect from '../components/utilities/CustomSelect';
import ForumComment from '../components/ForumComment';
import {IconContext} from "react-icons";
import {MdFormatQuote} from "react-icons/md";
import {BsFillInfoSquareFill} from "react-icons/bs";
import usePagination from '../hooks/pagination';
import {createTopicMessage, getTopic, paginateTopicMessages, reportTopic, reportTopicMessage} from '../API/topic';
import {useSelector} from 'react-redux';
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'
import Loader from '../components/Loader';
import {getDateUI, getTimeUI} from '../helpers/formatingDate';
import Pagination from '../components/Pagination';
import {checkPhotoPath} from '../helpers/photo'
import {useForm} from 'react-hook-form';
import ValidateWrapper from '../components/utilities/ValidateWrapper';
import useAxiosPrivate from '../hooks/axiosPrivate';
import CustomModal from '../components/utilities/CustomModal';
import Alert from 'react-bootstrap/Alert';

export default function ForumTopicChat() {
    TimeAgo.addLocale(ru)
    const axiosPrivate = useAxiosPrivate()
    const {id} = useParams()
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const initialPageLimit = 10
    const chatPagination = usePagination(initialPageLimit)

    const [isShowReplyModal, setIsShowReplyModal] = useState(false)
    const [isShowReplyForm, setIsShowReplyForm] = useState(false)
    const [isShowReportModal, setIsShowReportModal] = useState(false)

    const [topic, setTopic] = useState({
        isLoading: false, error: null, item: null
    })
    const [messages, setMessages] = useState({
        isLoading: false, error: null, meta: null, items: []
    })

    const {
        register: replyRegister,
        formState: {errors: replyErrors},
        handleSubmit: replyHandleSubmit,
        reset: replyReset
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })

    const {
        register: reportRegister,
        formState: {errors: reportErrors},
        handleSubmit: reportHandleSubmit,
        reset: reportReset
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })

    const [replyData, setReplyData] = useState({})
    const [reportData, setReportData] = useState({})

    const initialSubmitAlert = {
        variant: 'success',
        message: '',
        isShow: false
    }
    const [submitAlert, setSubmitAlert] = useState(initialSubmitAlert)

    const onSubmitReply = (data) => setReplyData(prev => ({...prev, ...data}))

    const onSubmitReport = (data) => {
        if (topic?.item && reportData?.topicId && userId) {
            const payloads = {
                fromId: userId,
                topicId: reportData.topicId
            }

            if (data.report) {
                payloads.content = data.report
            }

            reportTopic(axiosPrivate, payloads)
                .then(() => {
                    reportReset({report: ''})
                    setReportData({})
                    setSubmitAlert(prev => ({
                        ...prev,
                        variant: 'success',
                        message: 'Жалоба успешно отправлена',
                        isShow: true
                    }))
                })
                .catch(() => setSubmitAlert(prev => ({
                    ...prev,
                    variant: 'danger',
                    message: 'Не удалось отправить жалобу',
                    isShow: true
                })))
        }

        if (messages?.items?.length && reportData?.topicMessageId && userId) {
            const payloads = {
                fromId: userId,
                topicMessageId: reportData.topicMessageId
            }

            if (data.report) {
                payloads.content = data.report
            }

            reportTopicMessage(axiosPrivate, payloads)
                .then(() => {
                    reportReset({report: ''})
                    setReportData({})
                    setSubmitAlert(prev => ({
                        ...prev,
                        variant: 'success',
                        message: 'Жалоба успешно отправлена',
                        isShow: true
                    }))
                })
                .catch(() => setSubmitAlert(prev => ({
                    ...prev,
                    variant: 'danger',
                    message: 'Не удалось отправить жалобу',
                    isShow: true
                })))
        }
    }

    const paginateTopicMessagesRequest = (page) => {
        (topic.item) && paginateTopicMessages(topic?.item?.id, userId, page, chatPagination.pageLimit)
            .then(result => setMessages(prev => ({...prev, isLoading: true, meta: result?.meta, items: result?.data})))
            .catch(error => setMessages(prev => ({...prev, isLoading: true, error})))
    }

    const onReplyTopic = (topicId, name, description) => {
        setReplyData(prev => ({...prev, topicId, name, description}))
        setIsShowReplyModal(true)
    }
    const onReplyTopicMessage = (topicMessageId, name, description) => {
        setReplyData(prev => ({...prev, topicMessageId, name, description}))
        setIsShowReplyModal(true)
    }

    const onReportTopic = (topicId) => {
        setReportData(prev => ({...prev, topicId}))
        setIsShowReportModal(true)
    }

    const onReportTopicMessage = (topicMessageId) => {
        setReportData(prev => ({...prev, topicMessageId}))
        setIsShowReportModal(true)
    }

    useEffect(() => {
        (id && userId) && getTopic(id, userId)
            .then(result => setTopic(prev => ({...prev, isLoading: true, item: result})))
            .catch(error => setTopic(prev => ({...prev, isLoading: true, error})))
    }, [id, userId])

    useEffect(() => paginateTopicMessagesRequest(chatPagination.currentPage), [topic, userId, chatPagination.currentPage, chatPagination.pageLimit])

    useEffect(() => {
        if (topic.item && messages?.items?.length && replyData?.answer && userId) {
            const payloads = {
                description: replyData?.answer,
                topicId: topic?.item?.id,
                userId
            }

            if (replyData.topicId) {
                payloads.topicId = replyData.topicId
            }

            if (replyData.topicMessageId) {
                payloads.topicMessageId = replyData.topicMessageId
            }

            createTopicMessage(axiosPrivate, payloads)
                .then(() => {
                    replyReset({answer: ''})
                    setReplyData({})
                    if (chatPagination.currentPage === 1) {
                        paginateTopicMessagesRequest(1)
                    } else {
                        chatPagination.setCurrentPage(1)
                        chatPagination.setStartingPage(1)
                    }
                    setSubmitAlert(prev => ({
                        ...prev,
                        variant: 'success',
                        message: 'Тема успешно создана',
                        isShow: true
                    }))
                })
                .catch(() => setSubmitAlert(prev => ({
                    ...prev,
                    variant: 'danger',
                    message: 'Не удалось создать тему',
                    isShow: true
                })))
        }
    }, [replyData, userId, topic, messages])

    useEffect(() => {
        if (!isShowReplyModal) {
            setReplyData({})
            replyReset({answer: ''})
        }
    }, [isShowReplyModal])

    useEffect(() => {
        if (!isShowReportModal) {
            setReportData({})
            reportReset({report: ''})
        }
    }, [isShowReportModal])

    useEffect(() => {
        if (submitAlert.isShow) setTimeout(() => setSubmitAlert(initialSubmitAlert), 4000)
    }, [submitAlert])

    return (<>
        <main className='bg-white py-4 py-sm-5'>
            <Alert className='submit-alert' variant={submitAlert.variant} show={submitAlert.isShow}>
                {submitAlert.message}
            </Alert>
            <section className='container' id="sec-11">
                <nav aria-label="breadcrumb" className='mb-3'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/forum">Разделы форума</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/forum-section">Недобросовестные партнеры</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/forum-topic">{topic?.item?.title || 'Без темы'}</Link>
                        </li>
                    </ol>
                </nav>
                <div className='d-md-flex justify-content-between align-items-center mb-4'>
                    <h1 className='text-start dark-blue mb-md-0'>{topic?.item?.title || 'Без темы'}</h1>
                    <div className='title-font fs-12 text-md-end'>
                        {topic?.item?.messagesCount || 0} ответов.&nbsp;
                        {topic?.item?.lastMessage?.createdAt && (<>
                            Последний&nbsp;
                            <ReactTimeAgo
                                className="time-ago__counter"
                                date={Date.parse(topic?.item?.lastMessage?.createdAt)}
                                locale="ru-RU"
                            />
                        </>)}
                    </div>
                </div>

                <div className='fixed-comment'>
                    {topic.isLoading
                        ? topic?.item
                            ? <ForumComment
                                id={topic?.item?.id}
                                idName='topicId'
                                userId={userId}
                                author={{
                                    name: topic?.item?.user?.firstName || 'Имя не указано',
                                    imgURL: checkPhotoPath(topic?.item?.user?.avatar),
                                    pageURL: `/view-profile/${topic?.item?.user?.id}`,
                                    post: topic?.item?.user?.roleForUser
                                }}
                                date={getDateUI(topic?.item?.createdAt)}
                                time={getTimeUI(topic?.item?.createdAt, true)}
                                comment={topic?.item?.description}
                                likeStatus={topic?.item?.likeStatus}
                                likes={topic?.item?.likesCount}
                                dislikes={topic?.item?.dislikesCount}
                                onReply={onReplyTopic}
                                onReport={onReportTopic}
                            />
                            : <h6 className="text-center w-100 p-5">Тема не найдена</h6>
                        : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>}
                    <div className='answer-to-comment'>
                        {isShowReplyForm
                            ? <form
                                onSubmit={replyHandleSubmit(data => {
                                    onSubmitReply(data)
                                    setIsShowReplyForm(false)
                                })}
                                noValidate
                            >
                                <label htmlFor="answer-1" className='title-font fs-12 fw-5 mb-2'>Ваш ответ</label>
                                <ValidateWrapper error={replyErrors?.answer}>
                                <textarea
                                    rows="6"
                                    placeholder='Текст'
                                    id="answer-1"
                                    {...replyRegister('answer', {
                                        required: 'Невозможно отправить пустой ответ'
                                    })}
                                />
                                </ValidateWrapper>
                                <div className='d-sm-flex align-items-center justify-content-end mt-2 mt-sm-3'>
                                    <div className='text-end fs-09 me-sm-4 mb-2 mb-sm-0'>Нажимая на кнопку
                                        “Ответить”, вы<br/> соглашаетесь с <a href="/" className='blue'>правилами
                                            публикации</a></div>
                                    <button
                                        type='submit'
                                        className='btn btn-2 fs-12 ms-auto ms-sm-0'
                                    >
                                        Ответить
                                    </button>
                                </div>
                            </form>
                            : <button
                                type='button'
                                onClick={() => setIsShowReplyForm(true)}
                                className='btn btn-2 fs-12 ms-auto'
                            >
                                Ответить на публикацию
                            </button>}
                    </div>
                </div>

                <div className='d-flex justify-content-end my-4'>
                    <Pagination
                        pageLimit={chatPagination.pageLimit}
                        currentPage={chatPagination.currentPage}
                        setCurrentPage={chatPagination.setCurrentPage}
                        pagesDisplayedLimit={3}
                        itemsAmount={messages?.meta?.total || 0}
                        startingPage={chatPagination.startingPage}
                        setStartingPage={chatPagination.setStartingPage}
                    />
                </div>

                <div className='answers-box'>
                    {messages.isLoading
                        ? messages?.items?.length
                            ? messages?.items?.map(item => (
                                <ForumComment
                                    id={item?.id}
                                    idName='topicMessageId'
                                    userId={userId}
                                    key={item?.id}
                                    author={{
                                        name: item?.user?.firstName || 'Имя не указано',
                                        imgURL: checkPhotoPath(item?.user?.avatar),
                                        pageURL: `/view-profile/${item?.user?.id}`,
                                        post: item?.user?.roleForUser
                                    }}
                                    date={getDateUI(item?.createdAt)}
                                    time={getTimeUI(item?.createdAt, true)}
                                    citation={item?.reply
                                        ? {
                                            name: item?.reply?.user?.firstName,
                                            text: item?.reply?.description
                                        }
                                        : null
                                    }
                                    comment={item?.description}
                                    likeStatus={item?.likeStatus}
                                    likes={item?.likesCount}
                                    dislikes={item?.dislikesCount}
                                    onReply={onReplyTopicMessage}
                                    onReport={onReportTopicMessage}
                                />))
                            : null
                        : <div className="w-100 d-flex justify-content-center"><Loader color="#545454"/></div>}
                </div>

                <div className='d-flex align-items-center justify-content-between mt-4'>
                    <Pagination
                        pageLimit={chatPagination.pageLimit}
                        currentPage={chatPagination.currentPage}
                        setCurrentPage={chatPagination.setCurrentPage}
                        pagesDisplayedLimit={3}
                        itemsAmount={messages?.meta?.total || 0}
                        startingPage={chatPagination.startingPage}
                        setStartingPage={chatPagination.setStartingPage}
                    />

                    <div className='d-flex align-items-center'>
                        <span className='d-none d-sm-block me-2'>показать</span>
                        <CustomSelect
                            className="inp"
                            name="items-count"
                            options={['10', '15', '20']}
                            checkedOptions={[chatPagination.pageLimit]}
                            callback={({title}) => chatPagination.setPageLimit(+title)}
                            align="right"
                        />
                        <span className='ms-2 d-none d-md-block'>тем на странице</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-9'>
                        <hr className='mt-5 mb-3'/>
                        <div className='d-flex align-items-center fs-11 mb-3'>
                            <IconContext.Provider value={{className: "icon-10 blue", title: "Правила публикации"}}>
                                <BsFillInfoSquareFill/>
                            </IconContext.Provider>
                            <span className='blue ms-2'>Правила публикации</span>
                        </div>
                        <p className='gray-3'>Администрация сайта не несет ответственности за информацию,
                            публикуемую в форуме, и ее мнение может не совпадать с мнением авторов сообщений.
                            Сообщения о незаконно размещенной информации на форуме присылайте на адрес:<a
                                href='mailto:mail@gmail.com'>mail@gmail.com</a></p>
                    </div>
                </div>
            </section>
        </main>

        <CustomModal
            isShow={isShowReplyModal}
            setIsShow={setIsShowReplyModal}
            size='lg'
            closeButton
        >
            <h3>Добавить ответ</h3>
            <form
                className='fs-12'
                onSubmit={replyHandleSubmit(data => {
                    onSubmitReply(data)
                    setIsShowReplyModal(false)
                })}
                noValidate
            >
                {(replyData?.name && replyData?.description) && (<blockquote className='mb-4'>
                    <IconContext.Provider value={{className: "icon-20 green me-2", title: "Кавычка"}}>
                        <MdFormatQuote/>
                    </IconContext.Provider>
                    <div className='text'>
                        <div className='author blue text-decoration-underline me-2'>
                            {replyData.name}
                        </div>
                        <p>
                            {replyData.description}
                        </p>
                    </div>
                </blockquote>)}

                <label htmlFor="answer-2" className='mb-2'>Ваш ответ</label>
                <ValidateWrapper error={replyErrors?.answer}>
                    <textarea
                        id="answer-2"
                        rows="6"
                        placeholder='Текст'
                        {...replyRegister('answer', {
                            required: 'Невозможно отправить пустой ответ'
                        })}
                    />
                </ValidateWrapper>
                <div className='row flex-sm-row-reverse mt-4'>
                    <div className='col-sm-5'>
                        <button
                            type='submit'
                            className='btn btn-2 w-100'
                        >
                            Ответить
                        </button>
                    </div>
                    <div className='col-sm-7 mt-2 mt-sm-0'>
                        <div className='fs-09 text-end'>
                            Нажимая на кнопку “Ответить”, вы соглашаетесь с
                            <a className='blue' href="/">
                                правилами публикации
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </CustomModal>

        <CustomModal
            isShow={isShowReportModal}
            setIsShow={setIsShowReportModal}
            size='lg'
            closeButton
        >
            <h3>Добавить ответ</h3>
            <form
                className='fs-12'
                onSubmit={reportHandleSubmit(data => {
                    onSubmitReport(data)
                    setIsShowReportModal(false)
                })}
                noValidate
            >
                <label htmlFor="report" className='mb-2'>Опишите вашу жалобу</label>
                <ValidateWrapper error={reportErrors?.report}>
                    <textarea
                        id="report"
                        rows="3"
                        placeholder='Текст'
                        {...reportRegister('report')}
                    />
                </ValidateWrapper>
                <button
                    type='submit'
                    className='btn btn-2 w-100 mt-4'
                >
                    Отправить
                </button>
            </form>
        </CustomModal>
    </>)
}