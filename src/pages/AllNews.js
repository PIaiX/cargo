import React from 'react'
import ArticleMini from '../components/ArticleMini'
import ForumWidget from '../components/ForumWidget'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

export default function AllNews() {
    return (
        <main className="bg-white">
            <section className='container py-4 py-lg-5'>
                <h1 className="dark-blue text-center text-uppercase">Новости ПОРТАЛА</h1>
                <div className='row'>
                    <div className='col-md-8 col-lg-9'>
                        <div className='row row-cols-2 row-cols-lg-3 gx-2 gx-xl-3 gy-4 gy-lg-5'>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img3.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img4.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img2.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img5.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img6.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img2.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img3.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img4.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img2.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img5.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img6.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                            <div>
                                <ArticleMini url="/news" title="Название новости" img="/cargo/img/img2.png" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."/>
                            </div>
                        </div>
                        <nav className="mt-4">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="/" aria-label="Previous">
                                        <IoChevronBack />
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link active" href="/">1</a></li>
                                <li className="page-item"><a className="page-link" href="/">2</a></li>
                                <li className="page-item"><a className="page-link" href="/">3</a></li>
                                <li className="page-item">...</li>
                                <li className="page-item"><a className="page-link" href="/">6</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="/" aria-label="Next">
                                        <IoChevronForward />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='d-none d-md-block col-4 col-lg-3'>
                        <ForumWidget />
                    </div>
                </div>
            </section>
        </main>
    )
}