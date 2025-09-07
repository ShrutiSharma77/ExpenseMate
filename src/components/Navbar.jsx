import React from 'react'
import { Moon, Sun, LogOut } from 'lucide-react'

export default function Navbar({ go, ui, toggleTheme, auth, setAuth }) {
  const logout = () => {
    setAuth(null)
    localStorage.removeItem('em:auth')
    go('landing')
  }

  return (
    <header className="h-20 sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-black/60 backdrop-blur">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => go('landing')} className="flex items-center gap-3 cursor-pointer">
          <div className="logo-mark">EM</div>
          <div className="text-2xl logo-text">ExpenseMate</div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-2">
            <button className="btn btn-ghost" onClick={() => go('landing')}>Home</button>
            <button className="btn btn-ghost" onClick={() => go('dashboard')}>Dashboard</button>
            <button className="btn btn-ghost" onClick={() => go('groups')}>Groups</button>
            <button className="btn btn-ghost" onClick={() => go('friends')}>Friends</button>
          </nav>

          {/* Theme toggle + Logout */}
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost" onClick={toggleTheme}>
              {ui && ui.dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {auth && (
              <div className="flex items-center gap-2">
                <div className="text-sm">{auth.name}</div>
                <button title="Logout" className="btn btn-ghost p-2" onClick={logout}>
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
