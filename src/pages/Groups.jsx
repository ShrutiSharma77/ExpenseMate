import React, { useMemo, useState } from 'react'
import { uid } from '../utils/id'
import OCRUpload from '../components/OCRUpload'
export default function Groups({ db, setDb, go, ui }){
  const [active, setActive] = useState(db.groups[0]?.id || null)
  const group = db.groups.find(g=>g.id===active)
  const createGroup = ()=>{ const name = prompt('Group name?') || 'New Group'; const g = { id: uid('g'), name, members: db.users.map(u=>u.id), expenses: [] }; setDb({...db, groups:[...db.groups, g]}); setActive(g.id) }
  const addExpense = ()=>{ if(!group) return alert('Select group'); const desc = prompt('Desc')||'Expense'; const amt = Number(prompt('Amount')||0); if(!amt) return alert('Invalid amount'); const e={id:uid('e'), desc, amount:amt, paidBy:group.members[0], category:'Misc', date:new Date().toISOString().slice(0,10)}; setDb({...db, groups: db.groups.map(g=> g.id===group.id ? {...g, expenses:[...g.expenses, e]} : g) }) }
  const balances = useMemo(()=>{ if(!group) return {}; const net={}; group.members.forEach(m=>net[m]=0); group.expenses.forEach(e=>{ const per = e.amount / group.members.length; net[e.paidBy]+= e.amount - per; group.members.forEach(m=>{ if(m!==e.paidBy) net[m]-= per }) }); return net }, [group])
  const onParsed = items => { if(!group) return; const mapped = items.map(it=> ({ id: uid('ocr'), desc: it.description, amount: it.amount, paidBy: group.members[0], category:'Food', date: new Date().toISOString().slice(0,10) })); setDb({...db, groups: db.groups.map(g=> g.id===group.id ? {...g, expenses:[...g.expenses, ...mapped]} : g) }) }
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-3">
        <div className="card p-4 flex items-center justify-between"><div className="font-semibold">Groups</div><button className="btn btn-primary" onClick={createGroup}>+ New</button></div>
        {db.groups.map(g=>(<button key={g.id} onClick={()=>setActive(g.id)} className={`card p-4 w-full text-left ${g.id===active ? 'ring-2 ring-[var(--accent)]' : ''}`}><div className="font-semibold">{g.name}</div><div className="text-xs text-[var(--muted)] mt-1">{g.members.length} members • {g.expenses.length} expenses</div></button>))}
      </div>
      <div className="lg:col-span-2 space-y-4">
        {!group ? <div className="card p-6">Select a group</div> : (<>
          <div className="card p-5"><div className="flex items-center justify-between"><div><div className="text-xl font-bold">{group.name}</div><div className="text-sm text-[var(--muted)]">{group.members.length} members</div></div><div className="flex gap-2"><button className="btn btn-primary" onClick={addExpense}>+ Add Expense</button></div></div><div className="mt-4">{group.members.map(m=>{ const u = db.users.find(x=>x.id===m); const val = Math.round(balances[m]||0); return (<div key={m} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800"><div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-full text-white flex items-center justify-center bg-slate-300`}>{u.avatar}</div><div>{u.name}</div></div><div className={`text-sm ${val>=0 ? 'text-emerald-600' : 'text-rose-600'}`}>{val>=0 ? `Gets ₹${val}` : `Owes ₹${Math.abs(val)}`}</div></div>)})}</div></div><div className="card p-5"><div className="font-semibold mb-3">Expenses</div>{group.expenses.length===0 ? <div className="text-[var(--muted)]">No expenses added.</div> : (<div className="space-y-2">{[...group.expenses].reverse().map(e=>(<div key={e.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800"><div><div className="font-medium">{e.desc}</div><div className="text-xs text-[var(--muted)]">{e.category} • {e.date} • Paid by {db.users.find(u=>u.id===e.paidBy)?.name||e.paidBy}</div></div><div className="font-semibold">₹{e.amount}</div></div>))}</div>)}</div><OCRUpload onParsed={onParsed} /></>)}
      </div>
    </div>
  )
}
