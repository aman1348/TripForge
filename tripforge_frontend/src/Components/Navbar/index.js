import { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setTripCoordinates } from "../../redux/Slices/TripCoordinateSlice"
import { Link, useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "../../features/auth/authSlice";
// import { Navigate } from "react-router-dom";
const navigation = [
  { name: "Home", link: '/' },
  { name: "Start Planning", link: "/book-trip" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Navbar() {

  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const isUserLoggedin = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  let skip = false;


  const onLoad = (autoC) => (setAutocomplete(autoC));

  const onPlaceChange = () => {
    try {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      dispatch(setTripCoordinates({ lat: lat, lng: lng }));
      navigate("/book-trip");
    }
    catch (e) {
      console.warn("Place not properly selected");
    }

  }

  useEffect(() => {
    try {
      if (!skip) {
        const input = inputRef.current;
        const handleKeyDown = (e) => {
          if (e.key === "ArrowDown") {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            skip = true;
          }
          if (e.key === "Enter") {
            // simulate ArrowDown to select first suggestion
            const downArrow = new KeyboardEvent("keydown", {
              key: "ArrowDown",
              code: "ArrowDown",
              keyCode: 40,
              which: 40,
              bubbles: true,
            });
            input.dispatchEvent(downArrow);
          }
        };

        input.addEventListener("keydown", handleKeyDown);
        return () => input.removeEventListener("keydown", handleKeyDown);
      }

    }
    catch (e) {

    }
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  {/* Logo */}
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://i0.wp.com/tripforgeai.com/wp-content/uploads/2025/06/tripforgeai-logo-square.png?fit=300%2C300&ssl=1"
                      alt="Your Company"
                    />
                  </div>
                  {/* navigation list */}
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {
                    isUserLoggedin ? (<>

                      {/* <!-- search box --> */}
                      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
                        <div className="">
                          <div className="inline-flex flex-col justify-center relative text-gray-500">
                            <div className="relative">
                              <input
                                type="text"
                                ref={inputRef}
                                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                                placeholder="Search..."
                              />
                              <svg
                                className="w-4 h-4 absolute left-2.5 top-3.5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  // stroke-linecap
                                  strokeLinecap="round"
                                  // stroke-linejoin
                                  strokeLinejoin="round"
                                  // stroke-width
                                  strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Autocomplete>

                      {/* notification button */}
                      <button
                        type="button"
                        className="relative rounded-full ml-3 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2iT_RVKTKmXV6o_0BXyTN54g8bv7IPO6gg&s"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user-profile"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  onClick={(e) => {
                                    window.location.reload()
                                  }}
                                  to='/starter'
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                    ) : (<>

                      <Link
                        to="/login"
                        className="inline-block px-5 py-2 mx-1 text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-1 "
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="inline-block px-5 py-2 mx-1 text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-1 "
                      >
                        Sign up
                      </Link>
                    </>)
                  }


                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure >
    </>
  );
}
