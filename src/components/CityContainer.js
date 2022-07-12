import React, {useEffect, useState} from 'react';
import CustomSelect from './utilities/CustomSelect';
import {getCities} from '../API/cities';
import SearchDropdown from './utilities/SearchDropdown';
import CityPopup from './CityPopup';
import useSelectedCity from '../hooks/selectedCity';
import Loader from './Loader';

const CityContainer = () => {
    const [isShowCities, setIsShowCities] = useState(false)
    const [cities, setCities] = useState([])
    const {city, setCity, isDefinedCity} = useSelectedCity()

    useEffect(() => {
        getCities().then(res => {
            if (res.status === 200) {
                setCities(res.body)
            }
        })
    }, [])

    const changeCity = (title) => {
        const localStorageUserCity = localStorage.getItem('userCity')

        if (title !== localStorageUserCity) {
            localStorage.setItem('userCity', title)
            setCity(title)
        } else {
            setCity(localStorageUserCity)
        }

        setIsShowCities(false)
    }

    return (
        <div className="city-container right-alignment select order-1 order-lg-2 ms-lg-5">
            <CustomSelect
                btnClass="color-2 text-uppercase"
                modificator="city"
                isShow={isShowCities}
                checkedOptions={[city]}
                options={cities}
                callback={({title}) => changeCity(title)}
                child={SearchDropdown}
                placeholder='Введите свой город'
                align='right'
                initialCount='100'
            />
            <CityPopup
                city={city}
                isDefinedCity={isDefinedCity}
                setIsShowCities={setIsShowCities}
            />
        </div>
    );
};

export default CityContainer;