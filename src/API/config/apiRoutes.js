export default {
    // auth
    EMAIL_VERIFY: "/auth/register/emailVerify",
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD_VERIFY_EMAIL: "/auth/forgotPassword/emailVerify",
    FORGOT_PASSWORD_CODE_VERIFY: "/auth/forgotPassword/codeVerify",
    FORGOT_PASSWORD: "/auth/forgotPassword",
    REFRESH_TOKEN: "/auth/refreshToken",
    
    // user
    ACCOUNT_TYPES: "/user/accountTypes",
    
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
    ACCEPT_RESPONSE: '/response/accept',
    DELETE_RESPONSE: 'response',

    // reports
    REPORT_ROUTE: '/report/route',
    REPORT_CARGO: '/report/cargo',
    REPORT_USER: '/report/user'
}