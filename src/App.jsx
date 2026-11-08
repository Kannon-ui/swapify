import { BrowserRouter  as Router , Routes, Route , useNavigate, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from './components/Card';
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import img4 from './assets/img4.png'
import img5 from './assets/img5.png'
import Admin from './components/Admin';
import Home from './components/Home'
import LoginModal from './components/LoginModal';
import {supabase} from './supabase'


function AppContent(){
    const navigate = useNavigate();

    const [openItems, setOpenItems] = useState([])
    const [closedTrades, setClosedTrades] = useState([])
    const ownerUid = '2b79a19c-ebd5-4073-8ca8-2aea836f7c8f'

    useEffect(() => {
        const openChannel = supabase.channel('open-items')
        .on('postgres_changes', {event: '*', schema: 'pubblic', table:'items', filter: `owner_uid=eq.${ownerUid}, status=eq.open` },
        payload => {
            fetchItems()
        })
        .subscribe()

        const closedChannel = supabase.channel('closed-items')
        .on('postgres_changes', {event: '*', schema: 'pubblic', table:'items', filter: `owner_uid=eq.${ownerUid}, status=eq.closed` },
             payload => {
            fetchItems()
        })
        .subscribe()
        

        const offersChannel = supabase.channel('offers')
        .on('postgres_changes', {event: '*', schema: 'public', table: 'offers'}, payload =>
        {
            fetchOffers();
        }
        )
        fetchItems()
        fetchOffers()

        return() => {
            supabase.removeChannel(openChannel)
            supabase.removeChannel(closedChannel)
            supabase.removeChannel(offersChannel)
        };
    },[]);
    
    const fetchItems = async() => {
        try {
            const {data: open, error: errOpen} = await supabase
            .from('items')
            .select('*')
            .eq('owner_uid', ownerUid)
            .eq('status', 'open')
            .order('created_at', {ascending:false})

            const {data: close, error: errClosed} = await supabase
            .from('items')
            .select('*')
            .eq('owner_uid', ownerUid)
            .eq('status', 'closed')
            .order('created_at', {ascending:false})

            if (errOpen) console.error('Error fetching open items:', errOpen)
            if (errClosed) console.error('Error fetching closed items:', errClosed)

                setOpenItems(open || [])
                setClosedTrades(close || [])

        }

        catch (error) {
            console.error('Fetch items failed: ', error)
        }
    }

    const fetchOffers = async() => {
        try{
            const{ data, error } = await supabase
            .from('offers')
            .select('*')
            .order('created_at', {ascending:false})

            if (error){
                console.error('Error fetching offers: ', error)
                return
            }
            
            const grouped = {}
            ;(data || []).forEach(offer => {
                if(!grouped[offer.item_id]) grouped[offer.item_id] = []
                grouped[offer.item_id].push(offer)
            })
            setOffers(grouped)
        }

        catch(error) {
            console.error('Fetch offers failed: ', error)
        }
    }

    const [isLoggedIn ,setIsLoggedIn] = useState(false)
    const [showLogin ,setShowLogin] = useState(false)
    const [offers, setOffers] = useState({})


    const handleLogin = (pin) =>{
        if (pin = '1234'){
            setIsLoggedIn(true)
            setShowLogin(false)
            navigate('/admin')
        } else {
            alert('Wrong Pin')
        }

    }

    const handleLogout = () => {
        navigate('/')
        setIsLoggedIn(false)
    }


 
    return(
        <div className="mid-h-screen bg-950-100 flex flex-col">
            <Navbar 
            className="fixed top-0 left-0 right-0 z-50"
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onLoginClick={() => setShowLogin(true)}
            />
            
            
            <main className="flex-grow p-4 pt-20">
                <div className='max-w-6x1 mx-auto'>
                    <Routes>
                        <Route path ="/" element = { <Home openItems={openItems} closedTrades={closedTrades} offers = {offers} /> } />
                        <Route  path = "/admin" 
                            element = {isLoggedIn ? 
                            <Admin openItems={openItems} 
                            offers = {offers}
                            />: 
                            <Navigate to="/"/> } />
                    </Routes>
                </div>                
            </main>
            <Footer/>
        </div>
    )
}

function App(){
    return(
        <Router>
            <AppContent/>
        </Router>
    )
}

export default App