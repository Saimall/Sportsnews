import { useContext } from "react";

import { ThemeContext } from "../../context/theme";


const Livescore = ()=>{
   
    const { theme } = useContext(ThemeContext)
const sportNames = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Baseball'];
  const Teams = [
    ['demo A', 'demo B'],
    ['demo C', 'demo D'],
    ['demo E', 'demo F'],
    ['demo G', 'demo H'],
    ['demo I', 'demo J']
  ];
  const values = [['1', '9'], ['8', '6'],  ['6-2', '4-6'], ['10', '10'], ['5', '3']];

  return (
    <div>
      <div className="font-bold text-2xl py-6 px-10">Live Games</div>

<div className="flex px-4 py-2 overflow-x-auto shadow-lg bg-grey">
  <div className="flex space-x-6">
    {sportNames.map((sportName, index) => (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 bg-grey-600" key={sportName}>
        <div className="flex justify-between items-center">
          <p className={`text-lg font-semibold bg-grey-600 ${theme ==="dark"?"text-light":"text-dark"}`}>{sportName}</p>
          <button className="hover:bg-grey-600 text-white py-2 px-2 rounded-full">
           {/* //fetched from heroicons */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="mt-4 space-y-2 bg-grey-600">
          {Teams[index].map((team, teamIndex) => (
            <div key={team} className="flex justify-between bg-grey-777">
              <span className="text-sm texts">{team}</span>
              <span className="text-sm font-semibold">{values[index][teamIndex]}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>

  );
}

export default Livescore



