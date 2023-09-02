import React, { useState, useEffect } from 'react';

import { API_ENDPOINT } from '../../config/constant'

interface Props {
  id: number;
}

interface State {
  isRunning: boolean;
  sportName: string;
  id: number;
  location: string;
  teams: {
    name: string;
  }[];
  score: {
    [key: string]: number;
  };
}

const LiveMatch = (props: Props) => {
  const [liveMatch, setLiveMatch] = useState<State>({
    isRunning: false,
    sportName: '',
    id: 0,
    location: '',
    teams: [{ name: '' }, { name: '' }],
    score: {},
  });
  
 

  const fetchMatchDetails = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch match details');
      }

      const data = await response.json();
      setLiveMatch(data);
    } catch (error) {
      console.error('Data fetching failed:', error);
    }
  };

  useEffect(() => {
    fetchMatchDetails(props.id);
  }, [props.id]);

  return liveMatch.isRunning ? (
    <div className="flex justify-center p-4">
      <div className="max-w-xl w-full bg-gray-200 rounded-lg shadow-lg">
        <div className="p-4 bg-gray-800 text-white">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">{liveMatch.sportName}</p>
            <button
              className="hover:bg-gray-700 text-white py-2 px-3 rounded-full"
              onClick={() => fetchMatchDetails(liveMatch.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm">{liveMatch.location}</p>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700">{liveMatch.teams[0].name}</span>
            <span className="font-semibold">{liveMatch.score[liveMatch.teams[0].name]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">{liveMatch.teams[1].name}</span>
            <span className="font-semibold">{liveMatch.score[liveMatch.teams[1].name]}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LiveMatch;
