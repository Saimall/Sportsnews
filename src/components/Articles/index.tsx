import { Link } from "react-router-dom";



const Articles=()=> {
   
    const items = [
        {
          id: 1,
          sport:"volley",
          title: 'Title 1',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date:"Dec 27,2034",
          image:"person.png" ,
        },
        {
          id: 2,
          sport:"cricket",
          title: 'Title 2',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date:"Dec 28,2034",
          image: 'person.png',
        },
        
      ];
    
  return (
          <div className='m-4 bg-grey-600'>
            {items.map((item) => (
              <div key={item.id} className="bg-grey shadow-md shadow-border-md my-4 p-4 bg-grey-600 rounded-md flex">
                <div className="flex-1">
                    <div>
                      <h3 className="text-sm  mb-2 bg-grey-777">{item.sport}</h3>
                      <h3 className="text-xl font-bold mb-2 bg-grey-777">{item.title}</h3>
                      <p className="text-black-600 mb-2 bg-grey-777">{item.details}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs  bg-grey-777">{item.date}</h3>
                      <Link to="/" className=" text-black-600 mb-2  bg-grey-777">
                        Read More...
                      </Link>
                    </div>
                </div>
                  <div className="ml-4 bg-grey-777">
                    <img src={item.image} alt={item.title} className="w-40 h-40 object-cover rounded bg-grey-777" />
                  </div>
              </div>
            ))}
          </div>
        );
}

export default Articles