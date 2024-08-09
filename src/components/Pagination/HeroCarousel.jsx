import React from "react";
import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";

const HeroCarousel = () => {
  const countriesInWatchList = useSelector(
    (state) => state.watchList.countriesInWatchList
  );

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedCountries = chunkArray(countriesInWatchList, 4);

  return (
    <section className="h-64 sm:h-72 xl:h-80 2xl:h-96 px-4 md:px-8 my-10">
      <h1 className="text-center font-extrabold text-4xl leading-10">
        List of Countries in watch List
      </h1>

      <Carousel>
        {chunkedCountries.map((chunk, index) => (
          <div key={index} className="flex gap-3">
            {chunk.map((country) => (
              <div key={country.cca3} className="w-1/4">
                <img
                  src={country.flags.svg}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                />

                <p className="font-bold text-xl pt-2">{country.name.common}</p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
