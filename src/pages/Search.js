import React, { useState, useEffect } from "react";
import CustomSelect from "../components/utilities/CustomSelect";
import { IoChevronDownSharp, IoSwapHorizontalSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/pagination";
import cargo from "./../dummyData/cargo.json";
import cars from "./../dummyData/car.json";
import {getCities} from "../API/cities";
import SearchInput from "../components/utilities/SearchInput";

const initialPageLimit = 12

export default function Search() {
  const [search, setSearch] = useState("cargo"); // cargo & car

  const cargoPagination = usePagination(initialPageLimit)
  const carsPagination = usePagination(initialPageLimit);
  
  const [data, setData] = useState([])

  useEffect(() => {
    getCities().then(res => {
      if (res.status === 200) {
        setData(res.body)
      }
    })
  }, [])

  return (
    <main>
      <section id="sec-7" className="py-4 py-sm-5 container">
        <div className="switch">
          <button
            type="button"
            onClick={() => setSearch("cargo")}
            className={search === "cargo" ? "active" : ""}
          >
            <img src="/img/bg/cargo.png" alt="грузы" />
            <span>Найти груз</span>
          </button>
          <button
            type="button"
            onClick={() => setSearch("car")}
            className={search === "car" ? "active" : ""}
          >
            <img src="/img/bg/car.png" alt="машина" />
            <span>Найти машину</span>
          </button>
        </div>
        {search === "cargo" ? (
          <form>
            <div className="row g-3 g-sm-4 g-xl-5">
              <div className="col-lg-8 d-sm-flex align-items-end">
                <div className="flex-1 mb-3 mb-sm-0">
                  <label className="title-font mb-2 mb-xl-3">Откуда</label>
                  <SearchInput
                      data={data}
                      placeHolder={'Город отправления'}
                      callback={(inputValue) => setFormValues(prevState => {
                        return {
                          ...prevState, 'from': inputValue
                        }
                      })}
                  />
                </div>
                <IconContext.Provider
                  value={{
                    className:
                      "green icon d-none d-sm-block mx-2 mx-md-3 mb-1 mb-md-2",
                  }}
                >
                  <IoSwapHorizontalSharp />
                </IconContext.Provider>
                <div className="flex-1">
                  <label className="title-font mb-2 mb-xl-3">Куда</label>
                  <SearchInput
                      data={data}
                      placeHolder={'Город назначения'}
                      callback={(inputValue) => setFormValues(prevState => {
                        return {
                          ...prevState, 'to': inputValue
                        }
                      })}
                  />
                </div>
              </div>
              <div className="col-md-5 col-lg-4">
                <label className="title-font mb-2 mb-xl-3">Дата</label>
                <input
                  type="date"
                  placeholder="С сегодняшнего дня"
                  value={formValues.date}
                  name="date"
                  onChange={handleFormChange}
                />
              </div>
              {advSearch && (
                <>
                  <div className="col-md-7 col-lg-5 col-xxl-4">
                    <div className="row row-cols-sm-2">
                      <div className="mb-3 mb-sm-0">
                        <label className="title-font mb-2 mb-xl-3">
                          Объем, м3
                        </label>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            placeholder="От"
                            name="minVolume"
                            value={formValues.minVolume}
                            onChange={handleFormChange}
                          />
                          <span className="fs-15 mx-1 mx-xl-2">—</span>
                          <input
                            type="number"
                            placeholder="До"
                            name="maxVolume"
                            value={formValues.maxVolume}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="title-font mb-2 mb-xl-3">
                          Вес, т
                        </label>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            placeholder="От"
                            name="minWeight"
                            value={formValues.minWeight}
                            onChange={handleFormChange}
                          />
                          <span className="fs-15 mx-1 mx-xl-2">—</span>
                          <input
                            type="number"
                            placeholder="До"
                            name="maxWeight"
                            value={formValues.maxWeight}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-xxl-8">
                    <label className="title-font mb-2 mb-xl-3">
                      Максимальное значение габаритов груза, м
                    </label>
                    <div className="d-sm-flex align-items-center">
                      <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                        <label className="me-2">Длина:</label>
                        <input
                          type="number"
                          placeholder="0"
                          name="length"
                          value={formValues.length}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                        <label className="me-2">Ширина:</label>
                        <input
                          type="number"
                          placeholder="0"
                          name="width"
                          value={formValues.width}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <label className="me-2">Высота:</label>
                        <input
                          type="number"
                          placeholder="0"
                          name="height"
                          value={formValues.height}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <label className="title-font mb-2 mb-xl-3">Тип груза</label>
                    <CustomSelect
                      name="cargoType"
                      className="w-100"
                      btnClass="inp fs-15"
                      checkedOptions={[formValues.cargoType]}
                      mode="values"
                      options={["Не важно", "Тип 1", "Тип 2"]}
                      callback={({ value }) =>
                        handleSelectChange(value, "cargoType")
                      }
                    />
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <label className="title-font mb-2 mb-xl-3">
                      Особые пометки
                    </label>
                    <CustomSelect
                      name="specialNotes"
                      className="w-100"
                      btnClass="inp fs-15"
                      checkedOptions={[formValues.specialNotes]}
                      mode="values"
                      options={["Не важно", "Тип 1", "Тип 2"]}
                      callback={({ value }) =>
                        handleSelectChange(value, "specialNotes")
                      }
                    />
                  </div>
                </>
              )}
              <div className="col-md-4 d-md-flex align-items-end">
                <button
                  type="button"
                  onClick={
                    advSearch
                      ? () => setAdvSearch(false)
                      : () => setAdvSearch(true)
                  }
                  className="d-flex align-items-center d-md-none mx-auto mb-4"
                >
                  {advSearch ? (
                    <>
                      <span className="blue me-2">Свернуть поиск</span>
                      <IconContext.Provider
                        value={{ className: "blue rotate-180", size: "1.25em" }}
                      >
                        <IoChevronDownSharp />
                      </IconContext.Provider>
                    </>
                  ) : (
                    <>
                      <span className="blue me-2">Расширенный поиск</span>
                      <IconContext.Provider
                        value={{ className: "blue", size: "1.25em" }}
                      >
                        <IoChevronDownSharp />
                      </IconContext.Provider>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-2 fs-15 w-100 px-3"
                  onClick={handleFormSubmit}
                >
                  Найти грузы
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form>
            <div className="row g-3 g-sm-4 g-xl-5">
              <div className="col-lg-8 d-sm-flex align-items-end">
                <div className="flex-1 mb-3 mb-sm-0">
                  <label className="title-font mb-2 mb-xl-3">Откуда</label>
                  <input type="text" placeholder="Город отправления" />
                </div>
                <IconContext.Provider
                  value={{
                    className:
                      "green icon d-none d-sm-block mx-2 mx-md-3 mb-1 mb-md-2",
                  }}
                >
                  <IoSwapHorizontalSharp />
                </IconContext.Provider>
                <div className="flex-1">
                  <label className="title-font mb-2 mb-xl-3">Куда</label>
                  <input type="text" placeholder="Город назначения" />
                </div>
              </div>
              <div className="col-md-5 col-lg-4">
                <label className="title-font mb-2 mb-xl-3">Дата</label>
                <input type="date" placeholder="С сегодняшнего дня" />
              </div>
              {advSearch && (
                <>
                  <div className="col-md-7 col-lg-5 col-xxl-4">
                    <div className="row row-cols-sm-2">
                      <div className="mb-3 mb-sm-0">
                        <label className="title-font mb-2 mb-xl-3">
                          Объем, м3
                        </label>
                        <div className="d-flex align-items-center">
                          <input type="number" placeholder="От" />
                          <span className="fs-15 mx-1 mx-xl-2">—</span>
                          <input type="number" placeholder="До" />
                        </div>
                      </div>
                      <div>
                        <label className="title-font mb-2 mb-xl-3">
                          Вес, т
                        </label>
                        <div className="d-flex align-items-center">
                          <input type="number" placeholder="От" />
                          <span className="fs-15 mx-1 mx-xl-2">—</span>
                          <input type="number" placeholder="До" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-xxl-8">
                    <label className="title-font mb-2 mb-xl-3">
                      Максимальное значение габаритов груза, м
                    </label>
                    <div className="d-sm-flex align-items-center">
                      <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                        <label className="me-2">Длина:</label>
                        <input type="number" placeholder="0" />
                      </div>
                      <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                        <label className="me-2">Ширина:</label>
                        <input type="number" placeholder="0" />
                      </div>
                      <div className="d-flex align-items-center">
                        <label className="me-2">Высота:</label>
                        <input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <label className="title-font mb-2 mb-xl-3">Тип груза</label>
                    <CustomSelect
                      name="cargoType"
                      className="w-100"
                      btnClass="inp fs-15"
                      checkedOptions={[formValues.cargoType]}
                      mode="values"
                      options={["Не важно", "Тип 1", "Тип 2"]}
                      callback={({ value }) =>
                        handleSelectChange(value, "cargoType")
                      }
                    />
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <label className="title-font mb-2 mb-xl-3">
                      Особые пометки
                    </label>
                    <CustomSelect
                      name="specialNotes"
                      className="w-100"
                      btnClass="inp fs-15"
                      checkedOptions={[formValues.specialNotes]}
                      mode="values"
                      options={["Нет", "Пометка 1", "Пометка 2"]}
                      callback={({ value }) =>
                        handleSelectChange(value, "specialNotes")
                      }
                    />
                  </div>
                </>
              )}
              <div className="col-md-4 d-md-flex align-items-end">
                <button
                  type="button"
                  onClick={
                    advSearch
                      ? () => setAdvSearch(false)
                      : () => setAdvSearch(true)
                  }
                  className="d-flex align-items-center d-md-none mx-auto mb-4"
                >
                  {advSearch ? (
                    <>
                      <span className="blue me-2">Свернуть поиск</span>
                      <IconContext.Provider
                        value={{ className: "blue rotate-180", size: "1.25em" }}
                      >
                        <IoChevronDownSharp />
                      </IconContext.Provider>
                    </>
                  ) : (
                    <>
                      <span className="blue me-2">Расширенный поиск</span>
                      <IconContext.Provider
                        value={{ className: "blue", size: "1.25em" }}
                      >
                        <IoChevronDownSharp />
                      </IconContext.Provider>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-2 fs-15 w-100 px-3"
                  onClick={handleFormSubmit}
                >
                  Найти машины
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      <section className="container pb-4 pb-sm-5 my-sm-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="fs-15 fw-5 mb-2 mb-md-0">
            {search === "cargo"
              ? `Найдено ${cargo.length} грузов`
              : `Найдено ${cars.length} машин`}
          </div>
          <div className="fs-12 ms-md-5 d-flex align-items-center">
            <span className="me-2">Сортировать:</span>
            <CustomSelect
              name="sort"
              className="w-100"
              align="right"
              checkedOptions={[formValues.sort]}
              mode="values"
              options={["По времени добавления", "По другому признаку"]}
              callback={({ value }) => handleSelectChange(value, "sort")}
            />
          </div>
        </div>
        {/*{search === "cargo" ? (*/}
        {/*  <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4 g-1 g-sm-2 g-lg-3">*/}
        {/*    {filteredCargo.map((item, idx) => (*/}
        {/*      <div key={idx}>*/}
        {/*        <Card*/}
        {/*          type={item.type}*/}
        {/*          className=""*/}
        {/*          title={item.title}*/}
        {/*          route={item.route}*/}
        {/*          size={item.size}*/}
        {/*          weight={item.weight}*/}
        {/*          notes={item.notes}*/}
        {/*          url="/cargo-page"*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4 g-1 g-sm-2 g-lg-3">*/}
        {/*    {filteredCars.map((item, idx) => (*/}
        {/*      <div key={idx}>*/}
        {/*        <Card*/}
        {/*          type={item.type}*/}
        {/*          className=""*/}
        {/*          route={item.route}*/}
        {/*          carType={item.carType}*/}
        {/*          verified={item.verified}*/}
        {/*          date={item.date}*/}
        {/*          carrying={item.carrying}*/}
        {/*          size={item.size}*/}
        {/*          dimensions={item.dimensions}*/}
        {/*          url="/car-page"*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*)}*/}
        <div hidden={search !== "cargo"} className="mt-4">
          <Pagination
            pageLimit={cargoPagination.pageLimit}
            currentPage={cargoPagination.currentPage}
            setCurrentPage={cargoPagination.setCurrentPage}
            pagesDisplayedLimit={3}
            itemsAmount={cargo.length}
            startingPage={cargoPagination.startingPage}
            setStartingPage={cargoPagination.setStartingPage}
          />
        </div>
        <div hidden={search === "cargo"} className="mt-4">
          <Pagination
            pageLimit={carsPagination.pageLimit}
            currentPage={carsPagination.currentPage}
            setCurrentPage={carsPagination.setCurrentPage}
            pagesDisplayedLimit={3}
            itemsAmount={cars.length}
            startingPage={carsPagination.startingPage}
            setStartingPage={carsPagination.setStartingPage}
          />
        </div>
      </section>
    </main>
  );
}
