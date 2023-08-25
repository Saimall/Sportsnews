

const Favourites=()=>{
   
   
   const list1=['demo1','demo2','demo3'];

    return (
        <div className='m-3 bg-gray-200'>
        <div className="flex flex-col md:flex-row h-screen">
          <div className="flex-1 ">
            <div className="shadow-md shadow-border-md my-4 p-4 bg-grey-600 rounded-md flex container">
              {list1.map((item, index) => (
                <div key={index} className="bg-light-200 shadow-md shadow-border-md my-4 p-4 bg-grey-600 rounded-md flex">
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
)}

export default Favourites;