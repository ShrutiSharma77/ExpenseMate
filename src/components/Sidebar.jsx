import React from 'react'
import { LayoutDashboard, Users, UserSquare2, PlusCircle, ChevronLeft } from 'lucide-react'
export default function Sidebar({ go, ui, setUi, route }){
  const collapsed = !ui.sidebar
  const items = [
    { key:'dashboard', label:'Dashboard', icon:<LayoutDashboard size={18}/> },
    { key:'groups', label:'Groups', icon:<Users size={18}/> },
    { key:'friends', label:'Friends', icon:<UserSquare2 size={18}/> },
    { key:'add', label:'Add Expense', icon:<PlusCircle size={18}/> }
  ]
  return (
    <aside className={`hidden md:flex flex-col ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-80px)] sticky top-20`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <div className="text-sm font-semibold text-slate-500">Navigation</div>}
        <button className="btn btn-ghost p-2" onClick={()=>setUi({...ui, sidebar: !ui.sidebar})}><ChevronLeft className={`${collapsed ? 'rotate-180' : ''} transition`} size={18}/></button>
      </div>
      <nav className="px-2 flex-1">
        {items.map(it=> (
          <button key={it.key} onClick={()=> it.key==='add' ? go('groups') : go(it.key)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 mb-1 ${route.name===it.key ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
            <span className="opacity-90">{it.icon}</span>
            {!collapsed && <span>{it.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-4 text-xs text-slate-400">© {new Date().getFullYear()} ExpenseMate</div>
    </aside>
  )
}
