export default {
    // auth
    EMAIL_VERIFY: "/auth/register/emailVerify",
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD_VERIFY_EMAIL: "/auth/forgotPassword/emailVerify",
    FORGOT_PASSWORD_CODE_VERIFY: "/auth/forgotPassword/codeVerify",
    FORGOT_PASSWORD: "/auth/forgotPassword",
    REFRESH_TOKEN: "/auth/refreshToken",
    LOGOUT: "/auth/logout",

    // user
    ACCOUNT_TYPES: "/user/accountTypes",
    ACTIONS_USER: "/user",
    DELETE_AVATAR: "/user/deleteAvatar",
    
    // news
    NEWS: "/news",
    RANDOM_NEWS: "/news/random",

    // car
    CAR: "/car",
    CAR_TYPES: "/car/bodyTypes",
    CARS: "/car/user",

    // cargo
    CARGO_ITEM_TYPES: "/cargo/itemTypes",
    CARGO_PACKAGE_TYPES: "/cargo/packageTypes",
    CARGO_COUNT: "/cargo/count",
    CARGO_SEARCH: "/cargo/search",
    CARGO_PAGINATE: "/cargo/paginate",
    CARGO_NOT_ARCHIVE: "/cargo/notArchive",
    CARGO_ARCHIVE: "/cargo/archive",
    CARGO_UNARCHIVE: "/cargo/unArchive",
    CARGO_ACTIONS: "/cargo",

    // route
    ROUTE_COUNT: '/route/count',
    ROUTE_SEARCH: '/route/search',
    ROUTE_PAGINATE: '/route/paginate',
    ROUTE_NOT_ARCHIVE: '/route/notArchive',
    ROUTE_ARCHIVE: '/route/archive',
    ROUTE_UNARCHIVE: '/route/unArchive',
    ROUTE_ACTIONS: "/route",

    // templatesRouts
    SAVE_TEMPLATE: '/template/route',
    GET_TEMPLATES: '/template/route',
    DELETE_TEMPLATES: '/template',
    UPDATE_NAME_TEMP: '/template',

    // response
    RESPONSE_INCOMINGS_ROUTE: '/response/incumings/route',
    RESPONSE_INCOMINGS_CARGO: '/response/incumings/cargo',
    RESPONSE_OUTGOINGS_ROUTE: '/response/outgoings/route',
    RESPONSE_OUTGOINGS_CARGO: '/response/outgoings/cargo',
    RESPONSE_INPROCESS_ROUTE: '/response/inProcess/route',
    RESPONSE_INPROCESS_CARGO: '/response/inProcess/cargo',
    RESPONSE_COMPLETED_ROUTE: '/response/completed/route',
    RESPONSE_COMPLETED_CARGO: '/response/completed/cargo',
    RESPONSE_ACTIONS: '/response',
    RESPONSE_ACCEPT: '/response/accept',
    RESPONSE_COMPLETE: '/response/complete',

    // reports
    REPORT_ROUTE: '/report/route',
    REPORT_CARGO: '/report/cargo',
    REPORT_USER: '/report/user',
    REPORT_TOPIC: '/report/topic',
    REPORT_TOPIC_MESSAGE: '/report/topicMessage',

    //question
    QUESTION_ASK: '/question',

    // topic
    TOPIC_PAGINATE: '/topic/paginate',
    TOPIC_SEARCH: '/topic/search',
    TOPIC_STATISTICS: '/topic/statistics',
    TOPIC_USER_PAGINATE: '/topic/user',
    TOPIC_LIKE: '/topic/like',
    TOPIC_MESSAGE_ACTIONS: '/topic/message',
    TOPIC_MESSAGE_CREATE: '/topic/message/create',
    TOPIC_MESSAGE_LIKE: '/topic/message/like',
    TOPIC_MESSAGE_PAGINATE: '/topic/message/paginateLastMessages',
    TOPIC_ACTIONS: '/topic',
}