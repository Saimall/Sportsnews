/* eslint-disable @typescript-eslint/no-explicit-any */
// Appbar.js
import { Dialog, Disclosure, Menu, Switch } from "@headlessui/react";
import Logo from "../assets/react.svg";
import logo1 from "../assets/logo1.jpeg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme";
import { useTeamsState } from "../context/teamdetails/context";
import { useSportsState } from "../context/favourites/context";
import { Sport } from "../context/favourites/interfaces";
import { Team } from "../context/teamdetails/interfaces";
import { useUserPreferences } from "./userPreference";
import LiveScorePage from "../components/livescores";
import Articles from "../components/Articles";
import Favouritesdisplay from "../components/Favourites";

const Appbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");

  const authToken = localStorage.getItem("authToken");
  const {
    favouriteSports,
    favouriteTeams,
    fetchUserPreferences,
    saveUserPreferences,
  } = useUserPreferences(authToken);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [tempFavouriteSports, setTempFavouriteSports] = useState<{
    [key: string]: boolean;
  }>({});
  const [tempFavouriteTeams, setTempFavouriteTeams] = useState<{
    [key: string]: boolean;
  }>({});

  const handleLinkClick = () => {
    setTempFavouriteSports(favouriteSports);
    setTempFavouriteTeams(favouriteTeams);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setTempFavouriteSports(favouriteSports);
    setTempFavouriteTeams(favouriteTeams);
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    saveUserPreferences(tempFavouriteSports, tempFavouriteTeams);
    setIsDialogOpen(false);
  };

  const handleSportCheckbox = (event: {
    target: { id: any; checked: any };
  }) => {
    const { id, checked } = event.target;
    setTempFavouriteSports((previousSports) => ({
      ...previousSports,
      [id]: checked,
    }));
  };

  const handleTeamCheckbox = (event: { target: { id: any; checked: any } }) => {
    const { id, checked } = event.target;
    setTempFavouriteTeams((previousTeams) => ({
      ...previousTeams,
      [id]: checked,
    }));
  };

  const sportsList = useSportsState();
  const sportsCheckedList = sportsList?.sports;

  const teamsList = useTeamsState();
  const teamsCheckedList = teamsList?.teams;

  useEffect(() => {
    if (authToken) {
      fetchUserPreferences();
    }
  }, [authToken, fetchUserPreferences]);

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {() => (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center">
              <img className="h-8 mr-2" src={Logo} alt="Logo" />
              <div>
                <span
                  className={`${
                    enabled ? "bg-slate-500" : "bg-slate-400"
                  } font-bold text-xl`}
                >
                  SPORTS NEWS
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              {authToken ? (
                <Menu>
                  <Menu.Button
                    onClick={() => handleLinkClick()}
                    className="h-12 w-12 rounded-full hover:bg-gray-800 flex items-center justify-center focus:outline-none"
                  >
                    <img className="h-6 w-6" src={logo1} alt="Logo" />
                  </Menu.Button>
                </Menu>
              ) : null}
              <Switch
                checked={enabled}
                onChange={toggleTheme}
                className={`${
                  enabled ? "bg-slate-400" : "bg-slate-700"
                } h-8 pb-2 relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    enabled ? "translate-x-9" : "translate-x-0"
                  } pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>

              <Menu
                as="div"
                className="relative inline-block text-left justify-center"
              >
                <Menu.Button
                  className={`${
                    enabled ? "bg-slate-500" : "bg-slate-400"
                  } h-8 w-8 rounded-full hover:bg-blue-600 flex items-center justify-center focus:outline-none`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Menu.Button>

                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {authToken ? (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/signout"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Sign out
                        </Link>
                      )}
                    </Menu.Item>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/signin"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Sign In
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/signup"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Sign Up
                          </Link>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </Menu>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                className="relative "
                style={{ color: theme === "dark" ? "white" : "black" }}
              >
                <div
                  className="fixed inset-0 flex items-center justify-center p-4"
                  style={{ color: theme === "dark" ? "white" : "black" }}
                >
                  <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-white">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsDialogOpen(false)}
                        className="bg-grey-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      style={{ color: theme === "dark" ? "white" : "black" }}
                    >
                      <Dialog.Title
                        className="bg-grey 777 font-bold text-2xl py-2"
                        style={{
                          background: theme === "dark" ? "#777" : "#F4F4F4",
                        }}
                      >
                        Preferences
                      </Dialog.Title>
                    </div>
                    <div
                      className="p-2"
                      style={{
                        background: theme === "dark" ? "#777" : "#F4F4F4",
                      }}
                    >
                      <h1
                        className="font-bold text-xl"
                        style={{ color: theme === "dark" ? "white" : "black" }}
                      >
                        Favourite Sports
                      </h1>
                      <div
                        className="py-2"
                        style={{
                          background: theme === "dark" ? "#777" : "#F4F4F4",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {sportsCheckedList?.map((sport: Sport) => (
                          <div
                            key={sport.id}
                            className="w-1/3 mb-4 px-2"
                            style={{
                              flexBasis: "33%",
                              boxSizing: "border-box",
                            }}
                          >
                            <input
                              type="checkbox"
                              className="w-6 h-4"
                              id={sport.name}
                              value={sport.name}
                              checked={tempFavouriteSports[sport.name] || false}
                              onChange={handleSportCheckbox}
                            />
                            <label
                              htmlFor={sport.name}
                              className="ml-2"
                              style={{
                                color: theme === "dark" ? "white" : "black",
                              }}
                            >
                              {sport.name}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div
                        className="py-2 flex flex-wrap bg-grey 777"
                        style={{ color: theme === "dark" ? "white" : "black" }}
                      >
                        <h1
                          className="font-bold text-xl"
                          style={{
                            color: theme === "dark" ? "white" : "black",
                          }}
                        >
                          Favourite Teams
                        </h1>
                      </div>
                      <div className="py-2 flex flex-wrap bg-grey 777">
                        {teamsCheckedList?.map((team: Team) => (
                          <div key={team.id} className="w-1/3 mb-4 px-2">
                            <input
                              type="checkbox"
                              className="w-6 h-4 bg-grey 777 bg-grey 777"
                              id={team.name}
                              value={team.name}
                              checked={tempFavouriteTeams[team.name] || false}
                              onChange={handleTeamCheckbox}
                            />
                            <label
                              htmlFor={team.name}
                              className="ml-2 bg-grey 777"
                            >
                              {team.name}
                            </label>
                          </div>
                        ))}
                      </div>
                      <button
                        className="bg-gray-800 px-2 py-2 text-white hover:bg-blue-800 text-xl bg-grey 777"
                        onClick={() => handleCancel()}
                      >
                        cancel
                      </button>
                      <button
                        onClick={() => handleSave()}
                        className="bg-gray-800 px-2 py-2 mx-2 text-white  hover:bg-blue-800 text-xl"
                      >
                        save
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </div>
          </div>
        )}
      </Disclosure>
      <div>
        <div className="bg-grey 777">
          <LiveScorePage />
          <h1 className="font-bold text-xl p-4">Trending News</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4 shadow-lg">
              <Articles />
            </div>
            <div className="lg:w-1/4 shadow-lg">
              <h1 className="font-bold text-xl p-4">Favourites</h1>
              <Favouritesdisplay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
