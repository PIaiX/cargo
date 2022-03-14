import React, {useState} from 'react'

export default function UserContacts(props) {
    const [visible, setVisibility] = useState(false);

    return (
        <div className="user-contacts">
            {
                (visible)?
                <img src={props.img} alt={props.company} className="logo"/>
                : <img src="/cargo/img/bg/cargo.png" alt="перевозка грузов" className="sample"/>
            }
            <h4 className="text-center mt-4 mb-3">
                {props.company}
            </h4>
            {
                (visible) &&
                <div>
                    <div className="mb-2">
                        <a href="tel:+7952658961">+7 (952) 65 89 61</a>
                        <span className="fw-5 ms-2">Анастасия</span>
                    </div>
                    <div className="">
                        <a href="tel:+7952658962">+7 (952) 65 89 62</a>
                        <span className="fw-5 ms-2">Иван</span>
                    </div>
                </div>
            }
            {
                (!visible) &&
                <button type="button" onClick={()=>setVisibility(true)} className="btn btn-2 fs-11 mt-4 mx-auto">Показать контакты</button>
            }
        </div>
    )
}
