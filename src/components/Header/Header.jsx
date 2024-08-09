import React from "react";
import { Button } from "flowbite-react";

const Header = ({ setIsOpen }) => {
  return (
    <header className="max-w-4xl flex justify-between px-4 md:px-10 items-center mx-auto shadow-md py-5 rounded-md font-bold bg-white">
      <div className="text-2xl md:text-3xl leading-7">
        <a href="/">Countries</a>
      </div>

      <nav>
        <Button outline gradientDuoTone="cyanToBlue">
          <span
            className="font-medium text-lg"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            WatchList
          </span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
