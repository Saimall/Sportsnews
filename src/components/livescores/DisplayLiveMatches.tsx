/* eslint-disable @typescript-eslint/no-explicit-any */
import Livematch from "./LiveMatch";
import {
  useMatchesState,
} from "../../context/livescores/context";

export default function DisplayLiveMatches() {
    const state: any = useMatchesState();


    const favoriteSports = JSON.parse(
      localStorage.getItem("favouriteSports") || "{}",
    );
    const favoriteTeams = JSON.parse(
      localStorage.getItem("favouriteTeams") || "{}",
    );
    const authToken = localStorage.getItem("authToken");
  
    const { matches, isLoading, isError, errorMessage } = state;
    console.log("Number of matches: ", matches.length);
  
    if (matches.length === 0 && isLoading) {
      return <span>Loading...</span>
    }
    
    if (isError) {
      return <span>{errorMessage}</span>;
    }

  const alllive = matches.filter((match: any) => {
      
      const isFavoriteSport = favoriteSports[match.sportName] === true;
const hasFavoriteTeams = Object.values(favoriteTeams).some(value => value === true);

if (isFavoriteSport) {
  if (!hasFavoriteTeams || match.teams.some((team: { name: string | number; }) => favoriteTeams[team.name] === true)) {
    return true;
  }
}

return false;
});
console.log(alllive.length)
if (authToken && alllive.length == 0) {
  return (<div className="flex items-center justify-center animate__animated animate__fadeIn">
  <div className="text-center p-4">
    <h1 className="text-green-500 font-bold text-2xl dark:text-black mb-2">
      No Live Matches...
    </h1>
    <p className="text-gray-700 dark:text-white">Check back later for updates!</p>
  </div>
</div>);
}


  
   

  
    return (
      <>
        <div className="flex px-4">
        {authToken
          ? alllive?.map((match: any) => (
              <Livematch key={match.id} id={match.id} />
            ))
          : matches.map((match: any) => (
              <Livematch key={match.id} id={match.id} />
            ))}
        </div>
      </>
    );
  }
  