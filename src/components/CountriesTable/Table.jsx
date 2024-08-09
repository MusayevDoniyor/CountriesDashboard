import React from "react";
import { Button, Pagination, Table } from "flowbite-react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const CountriesTable = ({
  countries,
  currentPage,
  handlePageChange,
  handleAddToWatchList,
  countriesInWatchList,
  setIsOpen,
  isOpen,
}) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

  const isCountryInWatchList = (cca3) => {
    return countriesInWatchList.some((country) => country.cca3 === cca3);
  };

  return (
    <section className="px-4 md:px-8 py-6 flex flex-col">
      <Table striped className="w-full text-sm md:text-base table-auto">
        <Table.Head className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <Table.HeadCell className="py-3 px-2 md:px-4 text-left text-xs md:text-sm lg:text-base font-semibold">
            Country Name
          </Table.HeadCell>

          <Table.HeadCell className="py-3 px-2 md:px-4 text-left text-xs md:text-sm lg:text-base font-semibold">
            Population
          </Table.HeadCell>

          <Table.HeadCell className="py-3 px-2 md:px-4 text-left text-xs md:text-sm lg:text-base font-semibold">
            Capital
          </Table.HeadCell>

          <Table.HeadCell className="py-3 px-2 md:px-4 text-left text-xs md:text-sm lg:text-base font-semibold">
            Flags
          </Table.HeadCell>

          <Table.HeadCell className="py-3 px-2 md:px-4 text-left text-xs md:text-sm lg:text-base font-semibold"></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
          {currentItems.map((country) => (
            <Table.Row
              key={country.cca3}
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <Table.Cell className="whitespace-nowrap py-3 px-2 md:px-4 text-gray-900 dark:text-white text-xs md:text-sm lg:text-base">
                <a href={`/${country.cca3}`}>{country.name.common}</a>
              </Table.Cell>

              <Table.Cell className="py-3 px-2 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm lg:text-base">
                {country.population.toLocaleString()}
              </Table.Cell>

              <Table.Cell className="py-3 px-2 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm lg:text-base">
                {country.capital}
              </Table.Cell>

              <Table.Cell className="py-3 px-2 md:px-4 text-xs md:text-sm lg:text-base">
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  className="w-8 h-auto object-contain md:w-10 lg:w-12"
                />
              </Table.Cell>

              <Table.Cell className="py-3 px-2 md:px-4 text-xs md:text-sm lg:text-base">
                <Button
                  color="light"
                  onClick={() => {
                    handleAddToWatchList(country);
                    setIsOpen(!isOpen);
                  }}
                  className="flex items-center space-x-2 text-xs md:text-sm lg:text-base"
                >
                  {isCountryInWatchList(country.cca3) ? (
                    <FaEyeSlash className="text-lg text-green-500 hover:text-red-500" />
                  ) : (
                    <FaRegEye className="text-lg text-red-500 hover:text-green-500" />
                  )}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center text-xs md:text-sm lg:text-base">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="flex-1"
        />
        <span className="text-gray-600 dark:text-gray-300 mt-4 md:mt-0">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </section>
  );
};

export default CountriesTable;
