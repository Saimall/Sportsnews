
import { Disclosure  , Menu, Switch  } from "@headlessui/react";
import Logo from "../assets/react.svg";
import logo1 from "../assets/logo1.jpeg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";


import { useContext } from 'react'

import { ThemeContext } from "../context/theme";


const Appbar = () => {


  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === 'dark');

  const authToken = localStorage.getItem("authToken");

  const toggleTheme = () => {
    let newTheme = ''
    if (theme === 'light') {
      newTheme = 'dark'
    } else {
      newTheme = 'light'
    }
    setEnabled(!enabled)
    setTheme(newTheme)
  }
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  function handleLinkClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      
    {() => (
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img className="h-8 mr-2" src={Logo} alt="Logo" />
          <div>
            <span className={`${enabled ? 'bg-slate-500' : 'bg-slate-400'} font-bold text-xl`}>SPORTS NEWS</span>
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
            className={`${enabled ? 'bg-slate-400' : 'bg-slate-700'} h-8 pb-2 relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
  
          <Menu as="div" className="relative inline-block text-left justify-center">
          
            <Menu.Button className={`${enabled ? 'bg-slate-500' : 'bg-slate-400'} h-8 w-8 rounded-full hover:bg-blue-600 flex items-center justify-center focus:outline-none`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Menu.Button>
  
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {authToken ? (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/signout"
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
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
                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign In
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/signup"
                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign Up
                      </Link>
                    )}
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
  
           
          </Menu>
        </div>
      </div>
    )}
  </Disclosure>
  
  );
};

export default Appbar;






