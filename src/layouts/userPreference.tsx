/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// userPreferences.js
import { SetStateAction, useState } from "react";
import { API_ENDPOINT } from "../config/constant";

export const useUserPreferences = (auth_token: any) => {
  const [favouriteSports, setFavouriteSports] = useState({});
  const [favouriteTeams, setFavouriteTeams] = useState({});
  
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth_token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
         console.log(data)
        if (data.preferences.sports && data.preferences.teams) {
          setFavouriteSports(data.preferences.sports);
          setFavouriteTeams(data.preferences.teams);
          localStorage.setItem(
            "favouriteSports",
            JSON.stringify(data.preferences.sports),
          );
          localStorage.setItem(
            "favouriteTeams",
            JSON.stringify(data.preferences.teams),
          );
        } else {
          setFavouriteSports({});
          setFavouriteTeams({});
        }
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveUserPreferences = async (tempFavouriteSports: SetStateAction<{}>, tempFavouriteTeams: SetStateAction<{}>) => {
    setFavouriteSports(tempFavouriteSports);
    setFavouriteTeams(tempFavouriteTeams);

    localStorage.setItem(
      "favouriteSports",
      JSON.stringify(tempFavouriteSports),
    );
    localStorage.setItem("favouriteTeams", JSON.stringify(tempFavouriteTeams));

    try {
      const preferences = {
        sports: tempFavouriteSports,
        teams: tempFavouriteTeams,
      };

      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    favouriteSports,
    favouriteTeams,
    fetchUserPreferences,
    saveUserPreferences,
  };
};
