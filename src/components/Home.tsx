import Appbar from '../layouts/Appbar'
import Articles  from "./Articles";

function Home() {
  return (

    <div className='m-4'>

      <Appbar/>
      <div className='bg-grey 777'>
          <h1 className="font-bold text-xl p-4">Trending News</h1>
          <div className="flex flex-col lg:flex-row">


            <div className="lg:w-3/4 shadow-lg">
              <Articles />
            </div>
          </div>
      </div>

    </div>
  )
}

export default Home