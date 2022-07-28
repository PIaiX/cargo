import React from "react";
import { IoCloseOutline, IoDocumentText } from "react-icons/io5";
import { MdPerson, MdCopyright } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import SaveTemplateModal from "./footerComponents/SaveTemplateModal";
import ChooseTemplateModal from "./footerComponents/ChooseTemplateModal";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="container py-4 py-sm-5">
          <div className="row mb-4 mb-md-5">
            <div className="d-none d-sm-block col-sm-3 col-md-4">
              <img src="/img/logo.png" alt="Грузоперевозки" className="logo" />
            </div>
            <div className="col-sm-9 col-md-8">
              <div className="fs-12 fw-7 mb-4 mb-md-5">КАРТА САЙТА</div>
              <hr />
              <ul className="list-unstyled row row-cols-sm-2 g-3 g-md-4 mt-1 mt-sm-3">
                <li><Link to="/">ГЛАВНАЯ</Link></li>
                <li><Link to="/">ИНФОРМАЦИЯ</Link></li>
                <li><Link to="/search">ПОИСК</Link></li>
                <li><Link to="/">ЗАДАТЬ ВОПРОС</Link></li>
                <li><Link to="/forum">ФОРУМ</Link></li>
                <li><Link to="/">ЛИЧНЫЙ КАБИНЕТ</Link></li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="payment-methods mt-3 mt-md-4">
            <img src="/img/payment/visa.png" alt="visa"/>
            <img src="/img/payment/mastercard.png" alt="mastercard"/>
            <img src="/img/payment/tinkoff.png" alt="tinkoff"/>
            <img src="/img/payment/mir.png" alt="mir"/>
            <img src="/img/payment/sbp.png" alt="sbp"/>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3 fs-09 fw-7"><MdCopyright/> <span className="ms-2">ВСЕ ПРАВА ЗАЩИЩЕНЫ · ГРУЗОПЕРЕВОЗКИ&nbsp;·&nbsp;2022</span></div>
        </div>
        {/* <div className="container d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-center h-100">
          <div className="info d-lg-flex align-items-center">
            <img
              src="/img/logo-light.png"
              alt="Название сайта"
              className="logo me-4 me-xl-5"
            />
            <div className="mt-2 mt-md-3 mt-lg-0">
              <div>@ 2022 Грузоперевозки</div>
              <div className="mt-2 green">
                <a href="#">Политика конфиденциальности</a>
              </div>
              <div className="mt-2 green">
                <a href="#">Публичная оферта</a>
              </div>
            </div>
          </div>
          <div className="menu d-flex d-md-block d-lg-flex">
            <ul className="list-unstyled text-uppercase fw-5 me-4 me-xl-5">
              <li>Поиск</li>
              <li className="mt-2 mt-lg-3">Форум</li>
            </ul>
            <ul className="list-unstyled text-uppercase fw-5">
              <li className="mt-md-2 mt-lg-0">Информация</li>
              <li className="mt-2 mt-lg-3">Новости</li>
            </ul>
          </div>
          <div className="contacts fw-5">
            <div>
              <a href="tel:+79000000000">+7 900 000 00 00</a>
            </div>
            <div className="mt-2 mt-md-3">
              <a href="mailto:mail@mail.ru">mail@mail.ru</a>
            </div>
          </div>
          <div className="social">
            <div className="text-end">Наши социальные сети:</div>
            <div className="d-flex justify-content-end mt-3">
              <Link to="https://vk.com/">
                <IconContext.Provider value={{ className: "green icon-25" }}>
                  <ImVk />
                </IconContext.Provider>
              </Link>
              <Link to="https://vk.com/" className="ms-3 ms-sm-4">
                <IconContext.Provider value={{ className: "green icon-25" }}>
                  <ImWhatsapp />
                </IconContext.Provider>
              </Link>
              <Link to="https://vk.com/" className="ms-3 ms-sm-4">
                <IconContext.Provider value={{ className: "green icon-25" }}>
                  <ImTelegram />
                </IconContext.Provider>
              </Link>
            </div>
          </div>
        </div> */}
      </footer>
      {/* Modal */}
      <div className="modal fade" id="report" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <IoCloseOutline />
              </button>
              <form>
                <textarea
                  placeholder="Опишите вашу жалобу"
                  rows="3"
                  className="mb-4"
                ></textarea>
                <div className="row row-cols-2">
                  <div>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-1 w-100"
                    >
                      Отменить
                    </button>
                  </div>
                  <div>
                    <button type="button" className="btn btn-2 w-100">
                      Подать жалобу
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="delete-ad"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <IoCloseOutline />
              </button>
              <div className="p-lg-5">
                <div className="dark-blue fs-12 fw-7 title-font text-center">
                  Вы действительно хотите удалить объявление?
                </div>
                <div className="row row-cols-sm-2 gx-2 gx-lg-4 mt-4 fs-12">
                  <div>
                    <button
                      type="button"
                      className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                    >
                      Удалить совсем
                    </button>
                  </div>
                  <div>
                    <button type="button" className="btn btn-2 w-100 px-4">
                      Перенести в архив
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="docs-patterns"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <IoCloseOutline />
              </button>
              <h3>Выберите шаблон</h3>
              <div className="fs-12 mb-4">
                Все шаблоны составлены профессиональными юристами. Вы можете
                быстро заполнить документы скачать или использовать, как
                печатные.{" "}
                <a href="/" className="blue text-decoration-underline">
                  Как выбрать шаблон
                </a>
              </div>
              <ul
                data-bs-dismiss="modal"
                className="docs-list fs-12 fw-7 title-font"
              >
                <li>
                  <Link to="/document">
                    <IconContext.Provider
                      value={{ className: "icon-15 gray-3", title: "Заявка" }}
                    >
                      <IoDocumentText />
                    </IconContext.Provider>
                    <span>Заявка</span>
                  </Link>
                </li>
                <li>
                  <Link to="/document">
                    <IconContext.Provider
                      value={{
                        className: "icon-15 gray-3",
                        title: "Доверенность на водителя",
                      }}
                    >
                      <IoDocumentText />
                    </IconContext.Provider>
                    <span>Доверенность на водителя</span>
                  </Link>
                </li>
                <li>
                  <Link to="/document">
                    <IconContext.Provider
                      value={{ className: "icon-15 gray-3", title: "Договор" }}
                    >
                      <IoDocumentText />
                    </IconContext.Provider>
                    <span>Договор</span>
                  </Link>
                </li>
                <li>
                  <Link to="/document">
                    <IconContext.Provider
                      value={{
                        className: "icon-15 gray-3",
                        title: "Счет на оплату",
                      }}
                    >
                      <IoDocumentText />
                    </IconContext.Provider>
                    <span>Счет на оплату</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="account-exit"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <IoCloseOutline />
              </button>
              <h3>Выход</h3>
              <div className="fs-12 title-font text-center mb-4 mb-sm-5">
                Вы действительно хотите выйти из личного кабинета?
              </div>
              <div className="row row-cols-sm-2 fs-12">
                <div className="mb-3 mb-sm-0">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-1 w-100"
                  >
                    Отмена
                  </button>
                </div>
                <div>
                  <button type="button" className="btn btn-2 w-100">
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="save-doc"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <IoCloseOutline />
              </button>
              <h3>Сохранить изменения?</h3>
              <div className="row row-cols-sm-2 fs-12">
                <div className="mb-3 mb-sm-0">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-1 w-100"
                  >
                    Не сохранять
                  </button>
                </div>
                <div>
                  <button type="button" className="btn btn-2 w-100">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="save-as-pattern"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <IoCloseOutline />
              </button>
              <h3>Сохранить шаблон</h3>
              <form className="fs-12">
                <label className="mb-2">Название шаблона</label>
                <input type="text" className="mb-3" placeholder="Название" />
                <label className="mb-2">Примечание</label>
                <input type="text" className="mb-3" placeholder="Примечание" />
                <div className="row row-cols-sm-2 mt-4">
                  <div className="mb-3 mb-sm-0">
                    <button type="button" className="btn btn-1 w-100">
                      Отмена
                    </button>
                  </div>
                  <div>
                    <button type="button" className="btn btn-2 w-100">
                      Сохранить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*<div*/}
      {/*  className="modal fade"*/}
      {/*  id="new-topic"*/}
      {/*  tabIndex="-1"*/}
      {/*  aria-hidden="true"*/}
      {/*>*/}
      {/*  <div className="modal-dialog modal-lg">*/}
      {/*    <div className="modal-content">*/}
      {/*      <div className="modal-body">*/}
      {/*        <button*/}
      {/*          type="button"*/}
      {/*          className="btn-close"*/}
      {/*          data-bs-dismiss="modal"*/}
      {/*        >*/}
      {/*          <IoCloseOutline />*/}
      {/*        </button>*/}
      {/*        <h3>Новая тема</h3>*/}
      {/*        <form className="fs-12">*/}
      {/*          <label className="mb-2">Название темы</label>*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            className="mb-4"*/}
      {/*            placeholder="Придумайте название темы"*/}
      {/*          />*/}
      {/*          <label className="mb-2">Текст темы</label>*/}
      {/*          <textarea*/}
      {/*            rows="5"*/}
      {/*            placeholder="Ваша история или вопрос"*/}
      {/*          ></textarea>*/}
      {/*          <div className="row flex-sm-row-reverse mt-4">*/}
      {/*            <div className="col-sm-5">*/}
      {/*              <button type="submit" className="btn btn-2 w-100">*/}
      {/*                Сохранить*/}
      {/*              </button>*/}
      {/*            </div>*/}
      {/*            <div className="col-sm-7 mt-2 mt-sm-0">*/}
      {/*              <div className="fs-09 text-center">*/}
      {/*                Нажимая на кнопку “Создать тему”, вы соглашаетесь с{" "}*/}
      {/*                <a className="blue" href="/">*/}
      {/*                  правилами публикации*/}
      {/*                </a>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </form>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <ChooseTemplateModal type="Cargo" />
      <ChooseTemplateModal type="Car" />
      <SaveTemplateModal type="Cargo"/>
      <SaveTemplateModal type="Car"/>

      {/* Offcanvas */}
      <div className="offcanvas offcanvas-top" tabIndex="-1" id="warning">
        <div className="d-flex align-items-center justify-content-center">
          <IconContext.Provider value={{ className: "icon-20" }}>
            <MdPerson />
          </IconContext.Provider>
          <div className="fs-12 fw-7 title-font ms-4">
            Пожалуйста,{" "}
            <a href="/" className="bb-1">
              войдите
            </a>{" "}
            в аккаунт или{" "}
            <a href="/" className="bb-1">
              зарегистрируйтесь
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
