import React, { useEffect, useState } from "react";
import UserContacts from "../components/UserContacts";
import { RiChat4Fill, RiMapPinFill, RiCalendarEventFill } from "react-icons/ri";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoRepeat,
  IoWarning,
  IoEllipsisVertical,
  IoCloseOutline,
} from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { IconContext } from "react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { acceptResponse, getRoutePage, reportRoute } from "../API/route";
import useAxiosPrivate from "../hooks/axiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import RouteCard from "../components/RouteCard";
import { searchRoute } from "../API/route";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import CustomModal from "../components/utilities/CustomModal";
import AlertCustom from "../components/utilities/AlertCustom";
import { createResponse } from "../API/response";

SwiperCore.use([Navigation, Pagination]);

export default function RoutePage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    route: null,
    car: {},
    contacts: [],
    user: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const currentUser = useSelector((state) => state?.currentUser?.data?.user);
  const currentToken = useSelector(state => state?.currentUser?.data?.token)
  const [searchRoutes, setSearchRoutes] = useState([]);
  const { id } = useParams();
  const [cities, setCities] = useState({});

  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getRoutePage(id, axiosPrivate)
      .then((res) => {
        setIsLoading(false);
        setData((prevState) => ({
          ...prevState,
          route: res.data.body,
          car: res.data.body.car,
          contacts: res.data.body.contacts,
          user: res.data.body.user,
        }));
      })
      .catch((error) => {
        setIsLoading(false)
        return setTimeout(() => {
          navigate("/");
        }, 2500);
      });
  }, [id]);

  useEffect(() => {
    if (!isLoading && data.route?.isArchive) {
      if (currentUser.id && currentUser.id === data.route?.userId) return;
      return setTimeout(() => {
        navigate("/");
      }, 2500);
    }

    setCities({
      toRoute: data?.route?.toRoute,
      fromRoute: data?.route?.fromRoute,
    });
  }, [data]);

  useEffect(() => {
    cities?.toRoute?.length > 2 &&
      cities?.fromRoute?.length > 2 &&
      searchRoute(1, 6, { onlyVerified: false, ...cities })
        .then((res) => setSearchRoutes(res?.data))
        .catch((error) => console.log(error));
  }, [cities]);

  const [alertResponse, setAlertResponse] = useState({
    alertShow: false,
    complete: null,
  });

  const [alertReport, setAlertReport] = useState({
    alertShow: false,
    complete: null,
  });

  const response = () => {
    currentUser &&
      createResponse(axiosPrivate, {
        routeId: data?.route?.id,
        userId: currentUser?.id,
      })
        .then(() => {
          setAlertStatus("success");
          setAlertMessage("Отклик успешно отправлен");
          setShowAlert(true);
        })
        .catch(() => {
          setAlertStatus("error");
          setAlertMessage("Не удалось отправить отклик");
          setShowAlert(true);
        });
  };

  useEffect(() => {
    alertResponse.alertShow &&
      setTimeout(
        () =>
          setAlertResponse((prevState) => ({
            ...prevState,
            alertShow: false,
          })),
        1300
      );
  }, [alertResponse.alertShow]);

  const [showModalReport, setShowModalReport] = useState(false);

  useEffect(() => {
    alertReport.alertShow &&
      setTimeout(
        () =>
          setAlertReport((prevState) => ({
            ...prevState,
            alertShow: false,
          })),
        1500
      );
  }, [alertReport.alertShow]);

  const [dataReport, setDataReport] = useState({
    fromId: currentUser?.id,
    routeId: data?.route?.id,
  });

  useEffect(() => {
    currentUser &&
      data?.route &&
      setDataReport((prevState) => ({
        ...prevState,
        fromId: currentUser?.id,
        routeId: data?.route?.id,
      }));
  }, [currentUser, data?.route?.id]);

  if (data?.route?.isArchive && currentUser.id !== data?.route?.userId) {
    return (
      <div>
        <AlertCustom open={true} variant={"error"} closeButton={false}>
          Данная страница была перенесена в архив
        </AlertCustom>
      </div>
    );
  }

  if (!isLoading && data?.route) {
    return (
      <main className="bg-white">
        <AlertCustom
          open={showAlert}
          variant={alertStatus}
          onClick={() => setShowAlert(false)}
        >
          {alertMessage}
        </AlertCustom>
        <section id="sec-8" className="container py-4 py-sm-5">
          <div className="d-flex align-items-center justify-content-between mb-4 mb-sm-5">
            <h1 className="mb-0">
              Маршрут № {data?.route?.id} {data?.route?.fromRoute} —{" "}
              {data?.route?.toRoute}
            </h1>
            {(currentUser && currentToken) &&
                <div className="dropdown d-block d-md-none">
              <button
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <IconContext.Provider value={{ className: "green icon-20" }}>
                  <IoEllipsisVertical />
                </IconContext.Provider>
              </button>
                  <div className="dropdown-menu">
                      <button
                        type="button"
                        className="gray-3 d-flex align-items-center"
                        onClick={() => setShowModalReport(true)}
                    >
                      <IconContext.Provider value={{className: "gray-4 icon"}}>
                        <IoWarning/>
                      </IconContext.Provider>
                      <span className="ms-2">Подать жалобу</span>
                    </button>
              </div>
            </div>}
          </div>
          <div className="row flex-md-row-reverse">
            <div className="col-md-5 col-xl-4 col-xxl-3 d-flex flex-column">
              <div className="order-2 mb-4 mb-lg-5">
                <h5 className="mb-2 mb-lg-3">Оплата</h5>
                <div className="box p-3">
                  <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                    <div>{data?.route?.vatPrice} ₽ с НДС</div>
                  </div>
                  <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                    <div>{data?.route?.noVatPrice} ₽ без НДС</div>
                  </div>
                  <div className="d-flex justify-content-between fs-13 fw-5">
                    <div>
                      {data?.route?.bargainType ? (
                        <span>Без торга</span>
                      ) : (
                        <span>Возможен торг</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <UserContacts
                className="order-1 order-md-3 mb-4 mb-md-0"
                img={data?.user?.avatar}
                title={data?.user?.fullName}
                company={data?.user?.companyName}
                subject={data?.user?.subject}
                contacts={[{ phone: data?.user?.phone }]}
                id={data?.user?.id}
              />
              {(currentUser && currentToken) &&
                  <button
                  type="button"
                  className="d-none d-md-block order-4 gray-3 mx-auto mt-3 fs-11 d-flex align-items-center"
                  onClick={() => setShowModalReport(true)}
              >
                <IconContext.Provider value={{className: "gray-4 icon"}}>
                  <IoWarning/>
                </IconContext.Provider>
                <span className="ms-2">Подать жалобу</span>
              </button>
              }
            </div>
            <div className="col-md-7 col-xl-8 col-xxl-9">
              <div className="d-flex mb-2 mb-lg-3">
                <IconContext.Provider
                  value={{ className: "green icon me-2 me-sm-3" }}
                >
                  <RiMapPinFill />
                </IconContext.Provider>
                <h5 className="mb-0">Маршрут</h5>
              </div>
              <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                <div>
                  {data?.route?.fromRoute} — {data?.route?.toRoute}
                </div>
              </div>

              <div className="d-flex mb-2 mb-lg-3">
                <IconContext.Provider
                  value={{ className: "green icon me-2 me-sm-3" }}
                >
                  <RiCalendarEventFill />
                </IconContext.Provider>
                <h5 className="mb-0">Дата</h5>
              </div>
              <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                <div>
                  {data?.route?.dateType ? (
                    <span className="fw-5">Постоянно</span>
                  ) : (
                    <span className="fw-5">Единожды</span>
                  )}
                  :
                  {data?.route?.dateType ? (
                    <span> {data?.route?.datePeriodTypeForUser}</span>
                  ) : (
                    <>
                      <span> {data?.route?.date}</span>
                      <span> + {data?.route?.dateDays} дней</span>
                    </>
                  )}
                </div>
              </div>

              <div className="d-flex mb-2 mb-lg-3">
                <IconContext.Provider
                  value={{ className: "green icon me-2 me-sm-3" }}
                >
                  <MdLocalShipping />
                </IconContext.Provider>
                <h5 className="mb-0">Информация о машине</h5>
              </div>
              <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                <div className="mb-3">
                  <span className="fw-5">Тип кузова:</span>
                  {data?.car?.bodyType?.name}, {data?.car?.name}
                </div>
                <div className="mb-3">
                  <span className="fw-5">Объем:</span> {data?.car?.capacity} м
                  <sup>3</sup>
                </div>
                <div className="mb-3">
                  <span className="fw-5">Грузоподъемнсть:</span>{" "}
                  {data?.car?.carrying} т
                </div>
                <div>
                  <span className="fw-5">Габариты кузова:</span>{" "}
                  {data?.car?.length}/{data?.car?.width}/{data?.car?.height} м
                </div>
              </div>

              <div className="d-flex mb-2 mb-lg-3">
                <IconContext.Provider
                  value={{ className: "green icon me-2 me-sm-3" }}
                >
                  <RiChat4Fill />
                </IconContext.Provider>
                <h5 className="mb-0">Примечание от владельца</h5>
              </div>
              <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                <div>{data?.route?.note}</div>
              </div>

              <div className="d-flex flex-column flex-xl-row align-items-center align-items-md-stretch justify-content-end">
                {(currentUser && currentToken) &&
                    <div className="d-flex align-items-center">
                      <button
                      type="button"
                      className="btn btn-1 fs-12"
                      onClick={() => {
                        response();
                      }}
                      >
                        ОТКЛИКНУТЬСЯ
                      </button>
                    </div>
                }
                <button
                  to='/search'
                  className="btn btn-3 fs-12 px-1 px-sm-3 px-lg-4 mt-3 mt-xl-0 ms-xl-3"
                  onClick={() => navigate("/search", {
                    state: {
                      searchType: "car",
                      fromRoute: cities.toRoute,
                      toRoute: cities.fromRoute,
                    },
                  })}
                >
                  <IconContext.Provider
                    value={{ className: "icon me-1 me-lg-3" }}
                  >
                    <IoRepeat />
                  </IconContext.Provider>
                  <span>Поиск маршрутов в обратном направлении</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="sec-3 container mt-5 mb-6">
          <h2>Похожие объявления</h2>
          <div className="position-relative mb-4">
            <Swiper
              className="swiper-4"
              spaceBetween={4}
              slidesPerView={2}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 8,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            >
              {searchRoutes?.map((i) => (
                <SwiperSlide key={i.id}>
                  <RouteCard
                    className=""
                    title={`${i.fromRoute} - ${i.toRoute}`}
                    route={`${i.fromRoute} - ${i.toRoute}`}
                    size={i.car?.capacity}
                    carrying={i.car?.carrying}
                    carType={i.carBodyType?.name}
                    dimensions={`${i.car?.height}/${i.car?.width}/${i.car?.length}`}
                    date={i.dateType === false ? "постоянно" : "единожды"}
                    id={i.id}
                    inProfile={false}
                  />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev">
                <IoChevronBackSharp />
              </div>
              <div className="swiper-button-next">
                <IoChevronForwardSharp />
              </div>
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
          <button
            type="button"
            className="btn btn-2 fs-12 text-uppercase mx-auto"
            onClick={() => navigate("/search")}
          >
            Найти груз
          </button>
        </section>
        <CustomModal
          className="modal__routeErrorValid"
          isShow={showModalReport}
          setIsShow={setShowModalReport}
          closeButton={true}
          centered={false}
          size={"lg"}
        >
          <div>
            {alertReport?.complete && (
              <Alert
                show={alertReport?.alertShow}
                variant="success"
                className="end-0 mb-2 p-2"
              >
                <div>
                  <span>Жалоба отправлена</span>
                </div>
              </Alert>
            )}
            {alertReport?.complete === false && (
              <Alert
                show={alertReport?.alertShow}
                variant="danger"
                className="end-0 m-0 p-2"
              >
                <div>
                  <span>Что-то пошло не так...</span>
                </div>
              </Alert>
            )}
            <form>
              <textarea
                placeholder="Опишите вашу жалобу"
                rows="3"
                className="mb-4"
                onChange={(e) =>
                  setDataReport((prevState) => ({
                    ...prevState,
                    report: e.target.value,
                  }))
                }
              />
              <div className="row row-cols-2">
                <div>
                  <button
                    type="button"
                    className="btn btn-1 w-100"
                    onClick={() => setShowModalReport(false)}
                  >
                    Отменить
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-2 w-100"
                    onClick={() => {
                      reportRoute(axiosPrivate, dataReport)
                        .then(() =>
                          setAlertReport({ alertShow: true, complete: true })
                        )
                        .catch(() =>
                          setAlertReport({ alertShow: true, complete: false })
                        );
                    }}
                  >
                    Подать жалобу
                  </button>
                </div>
              </div>
            </form>
          </div>
        </CustomModal>
      </main>
    );
  }

  if (!isLoading && !data?.route) {
    return (
      <div>
        <AlertCustom open={true} variant={"error"} closeButton={false}>
          Данная страница не найдена
        </AlertCustom>
      </div>
    );
  }

  return (
    <div className="w-100 d-flex justify-content-center p-5">
      <Loader color="#545454" />
    </div>
  );
}
