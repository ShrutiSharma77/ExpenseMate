import React, { useState } from 'react'
export default function Login({ go, setAuth }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    const usersRaw = localStorage.getItem('em:users')
    const users = usersRaw ? JSON.parse(usersRaw) : []
    const found = users.find(u=> u.email === email && u.password === password)
    if(found){ setAuth({ name: found.name, email: found.email }); localStorage.setItem('em:auth', JSON.stringify({ name: found.name, email: found.email })); go('dashboard') }
    else alert('Invalid credentials or user not found. Please sign up.')
  }

  const google = ()=>{ alert('Mock Google login - creating demo user'); const demo = { name: 'Alex', email: 'alex@example.com'}; setAuth(demo); localStorage.setItem('em:auth', JSON.stringify(demo)); go('dashboard') }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-6">
        <div className="card p-8 glass">
          <div className="logo-mark mb-4">EM</div>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-[var(--muted)] mt-2">Sign in to continue to ExpenseMate</p>
          <div className="mt-6 space-y-3">
            <div>
              <label className="small">Email</label>
              <input className="input" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="small">Password</label>
              <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 small"><input type="checkbox" /> Remember me</label>
              <a href="#" onClick={e=>e.preventDefault()} className="small">Forgot?</a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button className="btn btn-primary" onClick={submit}>Sign in</button>
              <button className="btn btn-ghost border border-slate-200" onClick={google}>Sign in with Google</button>
            </div>
            <div className="text-sm text-[var(--muted)] mt-4">Don't have an account? <a href="#" onClick={e=>{e.preventDefault(); go('signup')}} className="text-[var(--accent)]">Sign up</a></div>
          </div>
        </div>
        <div className="card p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[var(--muted)]">Secure. Fast. Friendly.</div>
            <div className="mt-4 text-sm text-[var(--muted)]">Use ExpenseMate to manage shared expenses with friends. Upload bills, split items, and export reports.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
