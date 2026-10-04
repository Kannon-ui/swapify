import logo from '../assets/Logo.avif'

function Navbar({className ='', isLoggedIn, onLogout, onLoginClick}){
    return (
        <nav className = {'bg-blue-600 text-white p-4' }>
        <div className='max-w-6xl mx-auto flex justify-between item-center'>
            <div className='flex-items-center'>
                <img src={logo} alt='Swapify Logo' className='h-15 mr-2'/>
                <h1 className='text-2xl font-bold'>Swapify</h1>
            </div>
            
            {isLoggedIn ?
            (<button className='bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'>
                Logout
            </button>):
            (<button className='bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100'>
                Owner Login
            </button>)}
            

            

        </div>
    </nav>

    )

}

export default Navbar