//Loading Spinner from : https://contactmentor.com/how-to-add-loading-spinner-react-js/
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {

    return(
        <nav className='w-screen bg-orange-200 text-orange-900'>
        <div className='container mx-auto flex items-center justify-between p-4'>
          <div className='flex items-center justify-start'>
            <Link className='text-xl font-bold uppercase tracking-widest' to="/login">SOLVIO</Link>
 
          </div>

          <div className='flex justify-end items-center relative'>
    
            <div className='block'>
              <div className='inline relative'>
                <button
                  type='button'
                  className='px-4 py-2 inline-flex items-center relative px-2 border border-orange-900 rounded-full hover:shadow-lg'
                >Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )


};

export default Navbar;