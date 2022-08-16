const checkPhotoPath = (path = '') => path?.length
    ? path.includes('http')
        ? path
        : `https://api.eritrans.ru/uploads/${path}`
    : '/img/users/no-photo.png'

export {checkPhotoPath}