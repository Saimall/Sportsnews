import Appbar from '../layouts/Appbar'
import Articles  from "./Articles";
import Favouritesdisplay from './Favourites';
import LiveScorePage from './livescores';

function Home() {
  return (

    <div className='m-4 bg-grey-777'>

      <Appbar/>
      <div className='bg-grey 777'>
        <LiveScorePage/>
          <h1 className="font-bold text-xl p-4">Trending News</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4 shadow-lg">
              <Articles />
            </div>
            <div className="lg:w-1/4 shadow-lg">
            <h1 className="font-bold text-xl p-4">Favourites</h1>
              <Favouritesdisplay />
            </div>
          </div>
      </div>

    </div>
  )
}

export default Home