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

const getRoute = (data, isOnlyExtreme) => {
    const loadings = data?.loadings && data.loadings.map(item => item?.town)
    const unloadings = data?.unloadings && data.unloadings.map(item => item?.town)

    if (isOnlyExtreme) {
        return (loadings && unloadings) ? `${loadings[0]} - ${unloadings[unloadings.length - 1]}` : null
    }

    return (loadings && unloadings) ? loadings.concat(unloadings).join(' - ') : null
}

const getGeneralCapacity = (items) => items && items.reduce((acc, currentValue) => acc + currentValue?.capacity, 0)

const getGeneralWeight = (items) => items && items.reduce((acc, currentValue) => acc + currentValue?.weight, 0)

const getNotesType = (items) => {
    const makeUniq = (arr) => [...new Set(arr)]

    const notesType = items && items.map(i => i.noteType).filter(i => i != null)
    const uniqNotesType = makeUniq(notesType)

    return uniqNotesType
}

export {icons, getRoute, getGeneralCapacity, getGeneralWeight, getNotesType}