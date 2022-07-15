import {useEffect, useState} from 'react';
import useDebounce from './debounce';

const useSearchInput = (items = [], searchedField = '') => {
    const [searchValue, setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, 300)
    const [foundItems, setFoundItems] = useState(items)

    useEffect(() => {
        const value = debouncedSearchValue.toLowerCase().trim()

        items.length && debouncedSearchValue
            ? setFoundItems(items.filter(section => section[searchedField].toLowerCase().startsWith(value)))
            : setFoundItems(items)

    }, [debouncedSearchValue, items])

    return {searchValue, setSearchValue, foundItems, setFoundItems}
}

export default useSearchInput