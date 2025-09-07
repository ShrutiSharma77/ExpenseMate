import React, { useState } from 'react'

export default function Friends({ db, ui }) {
  const [friends, setFriends] = useState(db.friends || [])

  const addFriend = () => {
    const name = prompt('Friend name?')
    if (!name) return
    const f = { id: 'f'+Math.random().toString(36).slice(2,8), name, balance: 0 }
    const next = [f, ...friends]
    setFriends(next)

    const raw = localStorage.getItem('em:db')
    if (raw) {
      const obj = JSON.parse(raw)
      obj.friends = next
      localStorage.setItem('em:db', JSON.stringify(obj))
    }
  }

  const view = (f) => { alert(`${f.name} — balance: ₹${f.balance}`) }

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto p-6">
      
      <div className="card p-5 mb-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">Friends</div>
          <div className="text-sm text-[var(--muted)]">Add and manage friends</div>
        </div>
        <div>
          <button className="btn btn-primary" onClick={addFriend}>+ Add Friend</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {friends.map(f => (
          <div key={f.id} className="card p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-white font-bold">{f.name[0]}</div>
                <div>
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-xs text-[var(--muted)]">Friend</div>
                </div>
              </div>
              <div className={`${f.balance>=0 ? 'text-emerald-600' : 'text-rose-600'} font-semibold`}>
                {f.balance>=0 ? `Gets ₹${f.balance}` : `Owes ₹${Math.abs(f.balance)}`}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn btn-primary" onClick={() => view(f)}>View</button>
              <button className="btn btn-ghost border border-slate-200">Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
