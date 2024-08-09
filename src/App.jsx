import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import api from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
} from "./store/countriesSlice";
import {
  addCountryToWatchList,
  removeCountryFromWatchList,
} from "./store/watchList";
import Header from "./components/Header/Header";
import HeroCarousel from "./components/Pagination/HeroCarousel";
import CountriesTable from "./components/CountriesTable/Table";
import { DrawerComponent } from "./components/Drawer/Drawer";
import Country from "./components/SingleCountry/Country";
import { Spinner } from "flowbite-react";

function App() {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);
  const { countriesInWatchList } = useSelector((state) => state.watchList);

  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCountriesStart());

      try {
        const response = await api.get("/all");
        dispatch(fetchCountriesSuccess(response.data));
      } catch (error) {
        console.error(error.message);
        dispatch(fetchCountriesFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const savedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];
    savedWatchList.forEach((country) =>
      dispatch(addCountryToWatchList(country))
    );
  }, [dispatch]);

  const handleAddToWatchList = (country) => {
    const isCountryInWatchList = countriesInWatchList.some(
      (c) => c.cca3 === country.cca3
    );

    if (isCountryInWatchList) {
      dispatch(removeCountryFromWatchList(country));
      const updatedWatchList = countriesInWatchList.filter(
        (c) => c.cca3 !== country.cca3
      );
      localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    } else {
      dispatch(addCountryToWatchList(country));
      const updatedWatchList = [...countriesInWatchList, country];
      localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (status === "loading")
    return (
      <section className="flex items-center justify-center min-h-screen">
        <Spinner aria-label="Extra large spinner" size="xl" />
      </section>
    );

  if (status === "failed")
    return (
      <section className="text-center text-2xl py-10 text-red-600 font-bold mx-auto">
        Error: {error}
      </section>
    );

  return (
    <Router>
      <div className="bg-cyan-50">
        <Header setIsOpen={setIsOpen} />
        <main className="mt-20">
          <HeroCarousel />
          <DrawerComponent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            countriesInWatchList={countriesInWatchList}
            handleAddToWatchList={handleAddToWatchList}
          />
          <Routes>
            <Route
              path="/"
              element={
                <CountriesTable
                  countries={countries}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  handleAddToWatchList={handleAddToWatchList}
                  countriesInWatchList={countriesInWatchList}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                />
              }
            />
            <Route path="/:cca3" element={<Country />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
