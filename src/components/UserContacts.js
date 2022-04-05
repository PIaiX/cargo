import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function UserContacts(props) {
    const [visible, setVisibility] = useState(false);

    return (
        <div className={"row g-0 user-contacts " + props.className}>
            <div className="col-4 col-sm-5 col-md-12">
                {
                    (visible)?
                    <img src={props.img} alt={props.title} className="logo"/>
                    : <img src="/cargo/img/bg/cargo.png" alt="перевозка грузов" className="sample"/>
                }
            </div>
            <div className="col-8 col-sm-7 col-md-12 ps-3 ps-md-0">
                <h4 className="text-left text-md-center mt-md-4 mb-2 mb-sm-3">
                    <Link to="/personal-account/view-profile">
                        {props.title}
                    </Link>
                </h4>
                {
                    (visible) &&
                    <div className="d-flex flex-column align-items-left align-items-md-center">
                        {
                            props.contacts.map(item => {
                                return (
                                    <div key={item.phone.toString()} className="mb-2">
                                        <a href={"tel:"+item.phone}>{item.phone}</a>
                                        {
                                            (item.name)&&
                                            <span className="fw-5 ms-2">{item.name}</span>
                                        }
                                    </div>
                                )
                            })
                        }
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
