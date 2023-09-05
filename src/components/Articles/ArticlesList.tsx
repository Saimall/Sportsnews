/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { API_ENDPOINT } from '../../config/constant';
import { Article } from '../../context/articles/interfaces';

interface ArticleListItemsProps {
  article: Article;
}

const ArticleListItem = ({ article }: ArticleListItemsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [articleDetailsData, setArticleDetailsData] = useState<Article | null>(null);


  const Readhandleclick = async (articleId: number) => {
    setSelectedArticleId(articleId);
    setIsDialogOpen(true);
    await fetchArticleDetails(articleId);
  };

  const fetchArticleDetails = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const articleData: Article = await response.json();
      console.log("Article details", articleData);
      setArticleDetailsData(articleData);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  return (
    <div>
    <div className="m-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
        <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
        src={article.thumbnail}
        className="w-full h-48 object-cover"
      />
          <div className="p-4">
            <div>
            <h3  className="text-gray-800 text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.summary}</p>
            <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">{article.sport.name}</div>
          <div className="text-sm text-gray-400">{article.date}</div>
          <button onClick={() => Readhandleclick(article.id)} className="text-black underline">
                Read More...
              </button>
      </div>
    </div>
  </div>
</div>

<Dialog
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  className="fixed inset-0 z-50 overflow-y-auto"
>
  {/* Semi-transparent background overlay */}
  <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

  <div className="flex items-center justify-center min-h-screen">
    <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-hidden">
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setIsDialogOpen(false)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring focus:ring-opacity-50 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full transition-transform transform hover:scale-105 active:scale-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {articleDetailsData && (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {articleDetailsData.title}
          </h2>
          <div className="relative h-60 mb-4">
            <img
              src={articleDetailsData.thumbnail}
              alt={articleDetailsData.title}
              className="w-full h-full object-cover rounded-md transition-transform transform hover:scale-105"
            />
          </div>
          <div className="text-gray-800 leading-7">
            {articleDetailsData.content}
          </div>
        </div>
      )}
    </Dialog.Panel>
  </div>
</Dialog>



      </div>

      </div>
  );
};

export default ArticleListItem;



