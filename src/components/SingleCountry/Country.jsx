import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import LineChart from "../LineChart/LineChart";

export default function Country() {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await api.get(`/alpha/${cca3}`);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [cca3]);

  if (loading) return <Spinner className="text-center py-10"></Spinner>;

  if (error)
    return (
      <div className="text-center text-2xl py-10 text-red-600 font-bold mx-auto">
        Error: {error.message}
      </div>
    );

  if (!country)
    return (
      <div className="text-center py-10 text-xl">No country data available</div>
    );

  const {
    name = {},
    flags = {},
    population,
    capital = "N/A",
    region = "N/A",
    subregion = "N/A",
    currencies = {},
    languages = {},
  } = country;

  return (
    <section className="flex grid-cols-3">
      <div className="flex flex-col grid-cols-1 justify-center items-center  px-4 md:px-8 py-6 max-w-screen-lg mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{name.common}</h1>
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto mb-6"
        />
        <div className="w-full max-w-lg">
          <p className="text-lg mb-2">
            <strong>Population:</strong> {population.toLocaleString()}
          </p>
          <p className="text-lg mb-2">
            <strong>Capital:</strong> {capital}
          </p>
          <p className="text-lg mb-2">
            <strong>Region:</strong> {region}
          </p>
          <p className="text-lg mb-2">
            <strong>Subregion:</strong> {subregion}
          </p>
          <div className="text-lg mb-2">
            <strong>Currencies:</strong>
            <ul className="list-disc pl-5 mt-2">
              {Object.entries(currencies).map(([key, { name, symbol }]) => (
                <li key={key}>
                  {name} ({symbol || "N/A"})
                </li>
              ))}
            </ul>
          </div>
          <p className="text-lg mb-2">
            <strong>Languages:</strong> {Object.values(languages).join(", ")}
          </p>

          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            <HiOutlineArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="grid-cols-2">
        <LineChart />
      </div>
    </section>
  );
}
