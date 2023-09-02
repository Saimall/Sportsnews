/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {
  useArticlesState
} from "../../context/articles/context";

export default function ArticleList() {
  const state: any = useArticlesState();


  const { articles, isLoading, isError, errorMessage } = state;
  //console.log(articles);

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const handleLinkClick = () => {
  };




  return (
    <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {articles.map((article: { id: Key | null | undefined; thumbnail: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; summary: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; sport: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
    <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={article.thumbnail}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-gray-800 text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">{article.sport.name}</div>
          <div className="text-sm text-gray-400">{article.date}</div>
        </div>
        <button
          onClick={() => handleLinkClick()}
          className="mt-2 text-blue-500 hover:underline"
        >
          Read More...
        </button>
      </div>
    </div>
  ))}
</div>
  )
}