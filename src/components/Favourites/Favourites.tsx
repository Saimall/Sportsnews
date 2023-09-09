/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSportsState } from "../../context/favourites/context";
import { useTeamsState } from "../../context/teamdetails/context";
import { fetchTeams as fetchTeamsData } from "../../context/teamdetails/action";
import { getSports as getSportsData } from "../../context/favourites/action";
import { useSportsDispatch } from "../../context/favourites/context";
import { useTeamsDispatch } from "../../context/teamdetails/context";
import FavouriteItems from "./Favouriteslist";

const Favourites: React.FC = () => {
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();

  const teamsState = useTeamsState();
  const teamsDispatch = useTeamsDispatch();

  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  useEffect(() => {
    loadSportsData();
    loadTeamsData();
  }, [sportsDispatch, teamsDispatch]);

  const loadSportsData = async () => {
    try {
      await getSportsData(sportsDispatch);
    } catch (error) {
      console.error("Error fetching sports data:", error);
    }
  };

  const loadTeamsData = async () => {
    try {
      await fetchTeamsData(teamsDispatch);
    } catch (error) {
      console.error("Error fetching teams data:", error);
    }
  };
  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportName = event.target.value;
    setSelectedSport(selectedSportName);
    setSelectedTeam("");
  };

  const getFavoriteSports = JSON.parse(
    localStorage.getItem("favouriteSports") || "{}",
  );
  const getFavoriteSportsList = sportsState?.sports.filter(
    (sport) => getFavoriteSports[sport.name] === true,
  );

  const getFavoriteTeams = JSON.parse(
    localStorage.getItem("favouriteTeams") || "{}",
  );
  const getFavoriteTeamsList = teamsState?.teams.filter(
    (team) => getFavoriteTeams[team.name] === true,
  );

  const authToken = localStorage.getItem("authToken");

  return (
    <div className="container">
      <div className="dropdown-container p-4">
        <select
          className="dropdown p-2 border rounded-md bg-gray-800 text-white"
          value={selectedSport}
          onChange={handleSportChange}
        >
          <option value="">Select Sport</option>
          {authToken
            ? getFavoriteSportsList?.map((sport: any) => (
                <option
                  key={sport.id}
                  value={sport.name}
                  className="dark:bg-gray-600"
                >
                  {sport.name}
                </option>
              ))
            : sportsState?.sports.map((sport: any) => (
                <option
                  key={sport.id}
                  value={sport.name}
                  className="dark:bg-gray-600"
                >
                  {sport.name}
                </option>
              ))}
        </select>
      </div>

      {selectedSport && (
        <div className="dropdown-container p-4">
          <select
            className="dropdown p-2 border rounded-md bg-gray-800 text-white"
            value={selectedTeam}
            onChange={handleTeamChange}
          >
            <option value="">Select Team</option>
            {authToken
              ? getFavoriteTeamsList
                  ?.filter((team: any) => team.plays === selectedSport)
                  .map((team: any) => (
                    <option
                      key={team.id}
                      value={team.name}
                      className="dark:bg-gray-600"
                    >
                      {team.name}
                    </option>
                  ))
              : teamsState?.teams
                  .filter((team: any) => team.plays === selectedSport)
                  .map((team: any) => (
                    <option
                      key={team.id}
                      value={team.name}
                      className="dark:bg-gray-600"
                    >
                      {team.name}
                    </option>
                  ))}
          </select>
        </div>
      )}

      <FavouriteItems
        selectedSport={selectedSport}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

export default Favourites;
