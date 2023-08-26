import { Link } from "react-router-dom";


const Favourites=()=>{
   
   
    const items = [
        {
          id: 1,
          title: 'Item 1',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          title: 'Item 2',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        
      ];  

    return (
        <div className="m-4 bg-gray-200">
        <div className="m-2">
          {items.map((item) => (
            <div key={item.id} className="my-4 p-4 bg-white rounded-md shadow-md">
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.details}</p>
      
                <div className="flex justify-end">
                  <Link to="/" className="text-blue-500 hover:underline font-bold">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
)}

export default Favourites;