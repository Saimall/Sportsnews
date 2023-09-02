/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { getarticles } from "../../context/articles/action";
import { useArticlesDispatch, useArticlesState } from "../../context/articles/context";
import ArticleListItem from "./ArticlesList";

const Article: React.FC = () => {

  
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    getarticles(dispatchArticles);
  }, [dispatchArticles]);
  const state: any = useArticlesState();

  const { articles, isLoading, isError, errorMessage } = state;

  return (
    <div className="mt-5">
       {articles.map((article: any) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </div>
  );
};
export default Article;