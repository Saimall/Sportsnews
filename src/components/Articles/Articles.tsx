import React, { useEffect } from "react";
import { getarticles } from "../../context/articles/action";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleList from "./ArticlesList";

const ArticlesItems: React.FC = () => {

  
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    getarticles(dispatchArticles);
  }, [dispatchArticles]);
  return (
    <div className="  mt-5">
      <ArticleList />
    </div>
  );
};
export default ArticlesItems;