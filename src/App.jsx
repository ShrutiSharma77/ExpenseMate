import React from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Groups from './pages/Groups'
import Friends from './pages/Friends'

export default function App() {
  const [route, setRoute] = useLocalStorage('em:route', { name: 'landing', params: {} })
  const [ui, setUi] = useLocalStorage('em:ui', { dark:false, sidebar:true, currency:'₹' })
  const [db, setDb] = useLocalStorage('em:db', {
    users:[
      {id:'u1',name:'You',avatar:'Y'},
      {id:'u2',name:'Riya',avatar:'R'},
      {id:'u3',name:'Mohit',avatar:'M'},
      {id:'u4',name:'Sneha',avatar:'S'}
    ],
    friends:[
      {id:'f1',name:'Riya',balance:-200},
      {id:'f2',name:'Mohit',balance:150},
      {id:'f3',name:'Sneha',balance:-50}
    ],
    groups:[
      {id:'g1',name:'Goa Trip',members:['u1','u2','u3'],expenses:[{id:'e1',desc:'Hotel',amount:4200,paidBy:'u2',category:'Travel',date:'2025-08-10'},{id:'e2',desc:'Dinner',amount:1800,paidBy:'u3',category:'Food',date:'2025-08-11'}]},
      {id:'g2',name:'Flat Rent',members:['u1','u2','u4'],expenses:[{id:'e3',desc:'Rent Oct',amount:12000,paidBy:'u1',category:'Rent',date:'2025-10-01'}]}
    ]
  })

  const [auth, setAuth] = useLocalStorage('em:auth', null)

  const go = (name, params={}) => setRoute({ name, params })
  const toggleTheme = () => {
    const next = !ui.dark
    setUi({...ui, dark: next})
    try { if(next) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark') } catch(e) {}
  }

  React.useEffect(()=>{ if(ui.dark) document.documentElement.classList.add('dark') }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar go={go} ui={ui} toggleTheme={toggleTheme} auth={auth} setAuth={setAuth} />

      <div className="flex flex-1">
        {route.name !== 'landing' && route.name !== 'login' && route.name !== 'signup' &&
          <Sidebar go={go} ui={ui} setUi={setUi} route={route} />}
        
        {/* Make main flex column so footer stays at bottom */}
        <main className={`flex-1 flex flex-col ${route.name==='landing' ? 'p-0' : 'p-6'}`}>
          <div className="flex-1">
            {route.name==='landing' && <Landing go={go} />}
            {route.name==='login' && <Login go={go} setAuth={setAuth} />}
            {route.name==='signup' && <Signup go={go} setAuth={setAuth} />}
            {route.name==='dashboard' && <Dashboard db={db} ui={ui} auth={auth} />}
            {route.name==='groups' && <Groups db={db} setDb={setDb} go={go} ui={ui} />}
            {route.name==='friends' && <Friends db={db} ui={ui} />}
          </div>

          {/* Footer will now always stick at bottom if content is short */}
          <Footer />
        </main>
      </div>
    </div>
  )
}
