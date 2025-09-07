import React, { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts'
import ExportButton from '../components/ExportButton'

export default function Dashboard({ db, ui, auth }){
  const name = auth ? auth.name : 'Friend'
  const currency = ui.currency || '₹'
  const all = useMemo(()=> db.groups.flatMap(g => g.expenses.map(e => ({...e, group: g.name}))), [db])

  const totals = useMemo(()=>{
    let youOwe=0, owedToYou=0
    db.groups.forEach(g=> g.expenses.forEach(e=> {
      const per = e.amount / g.members.length
      if(e.paidBy === 'u1') owedToYou += e.amount - per
      else youOwe += per
    }))
    const byCat = {}
    all.forEach(a=> byCat[a.category] = (byCat[a.category]||0) + a.amount)
    const pie = Object.entries(byCat).map(([name, value])=>({ name, value }))
    return { youOwe: Math.round(youOwe), owedToYou: Math.round(owedToYou), net: Math.round(owedToYou - youOwe), pie }
  }, [db, all])

  const trend = useMemo(()=>{
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']
    return months.map((m,i)=>({ name:m, amt: Math.round(800 + Math.sin(i)*300 + (i%2)*200) }))
  }, [])

  const byGroup = useMemo(()=>{
    const map = {}
    db.groups.forEach(g=> map[g.name] = (map[g.name]||0) + g.expenses.reduce((a,b)=> a + b.amount, 0))
    return Object.entries(map).map(([name,total])=>({ name, total }))
  }, [db])

  const COLORS_LIGHT = ['#7c3aed','#06b6d4','#f97316','#22c55e','#ef4444']
  const COLORS_DARK = ['#a78bfa','#67e8f9','#fb923c','#4ade80','#fca5a5']
  const COLORS = ui && ui.dark ? COLORS_DARK : COLORS_LIGHT

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {name}</h1>
          <div className="text-sm text-[var(--muted)] mt-1">Here’s what happened recently</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total', value: all.reduce((a,b)=>a+b.amount,0) },
          { title: 'You Owe', value: totals.youOwe },
          { title: 'Owed to You', value: totals.owedToYou },
          { title: 'Net', value: totals.net }
        ].map((c,i)=>(
          <div key={i} className="card p-5">
            <div className="text-sm text-[var(--muted)]">{c.title}</div>
            <div className="text-2xl font-bold mt-2">{currency}{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-5">
          <div className="text-sm text-[var(--muted)] mb-2">Spending by Category</div>
          <div className="h-64">
            {totals.pie.length===0 ? <div className="h-full flex items-center justify-center text-[var(--muted)]">No data</div> : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={totals.pie} outerRadius={90} label>
                    {totals.pie.map((entry,idx)=>(<Cell key={idx} fill={COLORS[idx%COLORS.length]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <div className="text-sm text-[var(--muted)] mb-2">Monthly Trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke={ui.dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                <XAxis dataKey="name" stroke={ui.dark ? '#cbd5e1' : '#475569'} />
                <YAxis stroke={ui.dark ? '#cbd5e1' : '#475569'} />
                <Tooltip />
                <Line type="monotone" dataKey="amt" stroke={ui.dark ? '#a78bfa' : '#7c3aed'} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-5 lg:col-span-2">
          <div className="text-sm text-[var(--muted)] mb-2">Group Comparison</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byGroup}><CartesianGrid strokeDasharray="3 3" stroke={ui.dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'} /><XAxis dataKey="name" stroke={ui.dark ? '#cbd5e1' : '#475569'} /><YAxis stroke={ui.dark ? '#cbd5e1' : '#475569'} /><Tooltip /><Bar dataKey="total" fill={ui.dark ? '#67e8f9' : '#22c55e'} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-[var(--muted)] mb-2">Insights</div>
          <ul className="space-y-2 text-sm">
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-opacity-10">Smart insights will appear here.</li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-opacity-10">Try adding expenses in groups.</li>
          </ul>
          <div className="mt-4"><ExportButton rows={all} /></div>
        </div>
      </div>
    </div>
  )
}
