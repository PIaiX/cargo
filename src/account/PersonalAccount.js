import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import AccountMenu from './AccountMenu';
import UserProfile from './UserProfile';
import ViewAccount from './ViewAccount';
import ProfileEdit from './ProfileEdit';
import UserCars from './UserCars';
import UserCargo from './UserCargo';
import UserPatterns from './UserPatterns';
import UserDocuments from './UserDocuments';
import Responses from './Responses';
import InWork from './InWork';
import Tariffs from './Tariffs';
import PersonalAccountRouter from '../routes/PersonalAccountRouter';

export default function PersonalAccount() {
    const [mob, setMob] = useState(false);

    useEffect(() => {
        function updateView() {
            if (window.matchMedia("(max-width: 991px)").matches) {
                setMob(true);
            } else {
                setMob(false);
            }
        }

        window.addEventListener('resize', updateView);
        updateView();
        return () => window.removeEventListener('resize', updateView);
    }, []);

    return (
        <main className="account bg-gray py-sm-3 py-md-4 py-lg-5">
            <section id="sec-12" className="container">
                <Link to="/" className='fs-12 fw-5 d-none d-lg-block d-lg-none mb-5'><span
                    className='green fs-15 me-2'>⟵</span> На главную</Link>
                {mob
                    ? <PersonalAccountRouter isMobile={mob}/>
                    : <div className="row gx-4 gx-xl-5">
                        <div className="col-md-4 col-lg-3">
                            <AccountMenu/>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <PersonalAccountRouter isMobile={mob}/>
                        </div>
                    </div>
                }
            </section>
        </main>
    )
}