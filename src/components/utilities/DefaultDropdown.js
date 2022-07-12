import React from 'react';
import Loader from '../Loader';

const DefaultDropdown = ({options, onSelectItem, closeDropdown, onScroll, isFetching}) => {

    const DropdownItem = ({item}) => (
        <label className="radio-line">
            <input
                type="radio"
                value={item.value}
                onClick={closeDropdown}
                onChange={() => onSelectItem(item.title, item.value)}
            />
            <div>{item.title}</div>
        </label>
    )

    return (
        <div className="dropdown-list__inner" onScroll={onScroll}>
            {
                options?.length
                    ? options.map(item => <DropdownItem key={item.value} item={item}/>)
                    : <div className='p-2'>Нет доступных значений</div>

            }
            {isFetching && <div className="m-auto p-2"><Loader color='#545454'/></div>}
        </div>
    )
}

export default DefaultDropdown;