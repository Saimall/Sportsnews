import Appbar from '../layouts/Appbar'
import Articles  from "./Articles";
import Favourites from './Favourites';
import Livescore from './Livescore';

function Home() {
  return (

    <div className='m-4 bg-grey-777'>

      <Appbar/>
      <div className='bg-grey 777'>
        <Livescore/>
          <h1 className="font-bold text-xl p-4">Trending News</h1>
          <div className="flex flex-col lg:flex-row">


            <div className="lg:w-3/4 shadow-lg">
              <Articles />
            </div>
            <div className="lg:w-1/4 shadow-lg">
            <h1 className="font-bold text-xl p-4">Favourites</h1>
              <Favourites />
            </div>
          </div>
      </div>

    </div>
  )
}

export default Home