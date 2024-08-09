import { Button, Drawer } from "flowbite-react";
import { FaEyeSlash } from "react-icons/fa";

export function DrawerComponent({
  isOpen,
  setIsOpen,
  countriesInWatchList,
  handleAddToWatchList,
}) {
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onClose={handleClose} position="right">
      <Drawer.Header title="Watch List" />

      <Drawer.Items className="p-4 bg-gray-100">
        <ul className="space-y-4">
          {countriesInWatchList.length > 0 ? (
            countriesInWatchList.map((country) => (
              <li
                key={country.cca3}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-12 h-auto object-contain rounded"
                  />
                  <span className="text-gray-800 font-medium text-base">
                    {country.name.common}
                  </span>
                </div>

                <Button
                  color="light"
                  onClick={() => handleAddToWatchList(country)}
                  className="flex items-center space-x-2 text-base"
                >
                  <FaEyeSlash className="text-xl text-green-500 hover:text-red-500" />
                </Button>
              </li>
            ))
          ) : (
            <p className="text-gray-600">
              There are no countries in your Watch List
            </p>
          )}
        </ul>
      </Drawer.Items>
    </Drawer>
  );
}
