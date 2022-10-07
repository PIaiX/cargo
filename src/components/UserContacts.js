import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import redirectFromPA from "../helpers/redirectFromPA";
import {useSelector} from "react-redux";
import {checkPhotoPath} from '../helpers/photo';

export default function UserContacts(props) {

    const [visible, setVisibility] = useState(false);
    const currentUser = useSelector(state => state?.currentUser?.data?.user)

    return (
        <div className={"row g-0 user-contacts " + props.className}>
            <div className="col-4 col-sm-5 col-md-12">
                {
                    (visible) &&
                    <img src={checkPhotoPath(props?.image)} alt={props.title} className="logo"/>
                }
            </div>
            <div className="col-8 col-sm-7 col-md-12 ps-3 ps-md-0">
                <h4 className="text-left text-md-center mt-md-4 mb-2 mb-sm-3">
                    <NavLink to={redirectFromPA(currentUser?.id, props?.id)}>
                        {props?.subject ? props?.company : props.title}
                    </NavLink>
                </h4>
                {
                    (visible) &&
                    <div className="text-center">
                        {props?.phone ? props.phone : 'Тариф не оплачен'}
                    </div>
                }
                {
                    (!visible) &&
                    <button type="button" onClick={()=>setVisibility(true)} className="btn btn-2 fs-11 mt-4 mx-md-auto px-3">Показать контакты</button>
                }
            </div>
        </div>
    )
}
