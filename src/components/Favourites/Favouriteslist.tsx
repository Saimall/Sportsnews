/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  useArticlesState,
  useArticlesDispatch,
} from "../../context/articles/context";
import { getarticles } from "../../context/articles/action";
import { Article } from "../../context/articles/interfaces";
import { API_ENDPOINT } from "../../config/constant";
import { Dialog } from "@headlessui/react";

import { FavouriteItemsProps } from "../../context/favourites/interfaces";

type ArticleContent = Article & {
  content: string;
};

const FavouriteItems = ({
  selectedSport,
  selectedTeam,
}: FavouriteItemsProps) => {
  const articlesState: any = useArticlesState();
  const articlesDispatch = useArticlesDispatch();

  useEffect(() => {
    loadArticlesData();
  }, [articlesDispatch]);

  const loadArticlesData = async () => {
    try {
      await getarticles(articlesDispatch);
    } catch (error) {
      console.error("Error fetching articles data:", error);
    }
  };

  const [articleData, setArticleData] = useState<ArticleContent>();
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { articles, isLoading, isError, errorMessage } = articlesState;

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const getArtcilesData = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch article data");
      }
      const data: ArticleContent = await response.json();
      setArticleData(data);
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  };
  const handleclicklink = async (articleId: number) => {
    setSelectedArticleId(articleId);
    setIsDialogOpen(true);
    await getArtcilesData(articleId);
  };

  const handlefilter = articles.filter((item: any) => {
    if (selectedSport && selectedTeam) {
      return (
        item.sport.name === selectedSport &&
        item.teams.some((team: any) => team.name === selectedTeam)
      );
    } else if (selectedSport) {
      return item.sport.name === selectedSport;
    } else if (selectedTeam) {
      return item.teams.some((team: any) => team.name === selectedTeam);
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
        {handlefilter.map((item: any) => (
          <div
            key={item.id}
            className={`p-4 rounded-md shadow-md ${
              articlesState.isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.details}</p>
              </div>
              <div className="mt-auto flex justify-center">
                <button
                  onClick={() => handleclicklink(item.id)}
                  className={`py-2 px-4 rounded-full ${
                    articlesState.isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-400 hover:bg-gray-300 text-dark-600"
                  }`}
                >
                  Read More
                </button>
              </div>
            </div>

            <Dialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="w-full max-h-screen overflow-y-auto p-4 max-w-3xl mx-auto rounded-lg shadow-lg bg-white">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {articleData && (
                  <div>
                    <Dialog.Title className="text-xl font-semibold text-gray-800 py-2">
                      {articleData.title}
                    </Dialog.Title>
                    <div className="mx-auto">
                      <img
                        src={articleData.thumbnail}
                        alt={articleData.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <div className="text-gray-700 mt-4">
                      {articleData.content}
                    </div>
                  </div>
                )}
              </div>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteItems;
