import React from 'react';
import {Link} from 'react-router-dom';
import EditProfileForm from "../../components/EditProfileForm";

export default function ProfileEdit() {

    return (
        <div className='box p-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span
                className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Редакция профиля</h1>
            <EditProfileForm/>
        </div>
    )
}