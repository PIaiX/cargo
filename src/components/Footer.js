import React from "react";
import { IoCloseOutline, IoDocumentText } from "react-icons/io5";
import { MdPerson, MdCopyright } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { logout } from "../API/auth";
import {ReactComponent as VkIcon} from '../styles/icons/vk.svg';
import {ReactComponent as TelegramIcon} from '../styles/icons/telegram.svg';
import {ReactComponent as WhatsappIcon} from '../styles/icons/whatsapp.svg';

export const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              <ul className="list-unstyled row row-cols-sm-3 g-3 g-md-4 mt-1 mt-sm-3">
                <li>
                  <Link to="/">ГЛАВНАЯ</Link>
                </li>
                <li>
                  <Link to="/information-pay">ОПЛАТА</Link>
                </li>
                <li>
                  <Link to="/search">ПОИСК</Link>
                </li>
                <li>
                  <Link to="/contacts">КОНТАКТЫ</Link>
                </li>
                <li>
                  <Link to="/forum">ФОРУМ</Link>
                </li>
                <li>
                  <Link to="/personal-account">ЛИЧНЫЙ КАБИНЕТ</Link>
                </li>
                <li>
                  <Link to="/" className="socials-link">
                    {/*<span>вк</span>*/}
                    <VkIcon className="socials-icon"/>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="socials-link">
                    {/*<span>телеграм</span>*/}
                    <TelegramIcon className="socials-icon" />
                  </Link>
                </li>
                <li>
                  <Link to="/" className="socials-link">
                    {/*<span>what's app</span>*/}
                    <WhatsappIcon  className="socials-icon"/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="payment-methods mt-3 mt-md-4">
            <img src="/img/payment/visa.png" alt="visa" />
            <img src="/img/payment/mastercard.png" alt="mastercard" />
            <img src="/img/payment/tinkoff.png" alt="tinkoff" />
            <img src="/img/payment/mir.png" alt="mir" />
            <img src="/img/payment/sbp.png" alt="sbp" />
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3 fs-09 fw-7">
            <MdCopyright />{" "}
            <span className="ms-2">
              ВСЕ ПРАВА ЗАЩИЩЕНЫ · ГРУЗОПЕРЕВОЗКИ&nbsp;·&nbsp;2022
            </span>
          </div>
        </div>
      </footer>

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
                  <button
                    type="button"
                    className="btn btn-2 w-100"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      logout(dispatch);
                      navigate("/");
                    }}
                  >
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
