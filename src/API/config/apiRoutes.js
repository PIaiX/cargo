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

    // routes
    COUNT: '/route/count',
    CREATE_ROUTE: '/route/',
    ROUTE_PAGE: '/route',
    SEARCH_ROUTE: '/route/search',
    USER_ROUTES: '/route/notArchive',
    UPDATE_ROUTE: '/route',
    USER_ARCHIVE_ROUTES: '/route/archive',
    DELETE_ROUTE: '/route',

    // templatesRouts
    SAVE_TEMPLATE: '/template/route',
    GET_TEMPLATES: '/template/route',
    DELETE_TEMPLATES: '/template',

}