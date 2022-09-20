import {IoSnow, IoWine} from 'react-icons/io5';
import {MdLocalShipping} from 'react-icons/md';

const icons = [
    {
        id: 0,
        text: "Холод",
        element: <IoSnow/>,
    },
    {
        id: 1,
        text: "Хрупкое",
        element: <IoWine/>,
    },
    {
        id: 2,
        text: "Негабаритные",
        element: <MdLocalShipping/>,
    },
];

const getRoute = (data, isFullRoute = false) => {
    const loadings = data?.loadings && data.loadings.map(item => item?.town)
    const unloadings = data?.unloadings && data.unloadings.map(item => item?.town)
    if(!loadings || !unloadings) return

    if(loadings?.length === 1 && unloadings?.length === 1) return `${loadings[0]} - ${unloadings[unloadings.length - 1]}`

    return isFullRoute ? `${loadings[0]} ... ${unloadings[unloadings?.length - 1]}` : `${loadings[0]} - ${unloadings[unloadings?.length - 1]}`
}

const getFullRoute = (data) => {
    const loadings = data?.loadings && data.loadings.map(item => item?.town)
    const unloadings = data?.unloadings && data.unloadings.map(item => item?.town)
    if(!loadings || !unloadings) return

    const fullRoute = [...loadings, ...unloadings]
    if(!fullRoute || fullRoute?.length < 1) return ""

    return fullRoute.join(" - ")
}

const getGeneralCapacity = (items) => items && items.reduce((acc, currentValue) => acc + currentValue?.capacity, 0)

const getGeneralWeight = (items) => items && items.reduce((acc, currentValue) => acc + currentValue?.weight, 0)

const getNotesType = (items) => {
    const makeUniq = (arr) => [...new Set(arr)]

    const notesType = items && items.map(i => i.noteType).filter(i => i != null)
    const uniqNotesType = makeUniq(notesType)

    return uniqNotesType
}

export {icons, getRoute, getFullRoute, getGeneralCapacity, getGeneralWeight, getNotesType}