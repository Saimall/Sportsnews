/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getarticles } from "../../context/articles/action";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../../context/articles/context";
import ArticleListItem from "./ArticlesList";

const Article: React.FC = () => {
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    getarticles(dispatchArticles);
  }, [dispatchArticles]);
  const state: any = useArticlesState();
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("date");
  const [filterValue, setFilterValue] = useState("");

  const { articles, isLoading, isError, errorMessage } = state;

  const favoriteSports = JSON.parse(
    localStorage.getItem("favouriteSports") || "{}",
  );

  const favoriteTeams = JSON.parse(
    localStorage.getItem("favouriteTeams") || "{}",
  );
  const authToken = localStorage.getItem("authToken");

  const applyFilter = (article: any) => {
    const isSportMatch = !selectedSport || article.sport.name === selectedSport;

    if (isSportMatch) {
      const filterValueLowerCase = filterValue.toLowerCase();

      switch (selectedFilter) {
        case "sportname":
          return article.sport.name
            .toLowerCase()
            .includes(filterValueLowerCase);
        case "date":
          return article.date.toLowerCase().includes(filterValueLowerCase);
        case "title":
          return article.title.toLowerCase().includes(filterValueLowerCase);
        default:
          return true;
      }
    }
    return false;
  };
  const filterByFavorites = (article: any) => {
    if (authToken) {
      const isSportFavorite = favoriteSports[article.sport.name] === true;
      const isAnyTeamFavorite = article.teams.some(
        (team: any) => favoriteTeams[team.name] === true,
      );

      return (
        isSportFavorite && (article.teams.length === 0 || isAnyTeamFavorite)
      );
    } else {
      return true;
    }
  };

  const renderSportButtons = () => {
    const sportNames = [
      ...new Set(
        articles.map((article: { sport: { name: any } }) => article.sport.name),
      ),
    ];

    function handleSportButtonClick(sportName: any): void {
      setSelectedSport(sportName);
    }

    return sportNames.map((sportName: any) => (
      <button
        key={sportName}
        onClick={() => handleSportButtonClick(sportName)}
        className={`px-4 py-2 mr-2 text-sm font-medium rounded ${
          selectedSport === sportName
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white"
        }`}
      >
        {sportName}
      </button>
    ));
  };

  const compareSportNames = (
    articleA: { sport: { name: string } },
    articleB: { sport: { name: any } },
  ) => {
    return articleA.sport.name.localeCompare(articleB.sport.name);
  };

  const compareDates = (
    articleA: { date: string },
    articleB: { date: any },
  ) => {
    return articleA.date.localeCompare(articleB.date);
  };

  const compareTitles = (
    articleA: { title: string },
    articleB: { title: any },
  ) => {
    return articleA.title.localeCompare(articleB.title);
  };

  const articlessort = (articleA: any, articleB: any) => {
    switch (selectedFilter) {
      case "sportname":
        return compareSportNames(articleA, articleB);
      case "date":
        return compareDates(articleA, articleB);
      case "title":
        return compareTitles(articleA, articleB);
      default:
        return 0;
    }
  };

  const preferencesSelected =
    authToken &&
    (Object.keys(favoriteSports).length > 0 ||
      Object.keys(favoriteTeams).length > 0);
  console.log(preferencesSelected);
  return (
    <>
      <div>
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 mb-4">
            <h2 className="text-xl font-semibold">Sports Filter 🎾</h2>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 text-sm rounded font-bold bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-white"
            >
              <option value="sportname">SportName</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">{renderSportButtons()}</div>
        </div>
      </div>
      <div className="m-4">
        {articles
          .filter(applyFilter)
          .filter(preferencesSelected ? filterByFavorites : () => true) // Filter by favorites
          .sort(articlessort)
          .map((article: any) => (
            <ArticleListItem
              key={article.id}
              article={article}
              favoriteSports={favoriteSports}
              favoriteTeams={favoriteTeams}
            />
          ))}
      </div>
    </>
  );
};
export default Article;
