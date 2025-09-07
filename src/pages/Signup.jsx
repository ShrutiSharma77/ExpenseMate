import React, { useState } from 'react'
export default function Signup({ go, setAuth }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    if(!name || !email || !password) return alert('Fill all fields')
    const usersRaw = localStorage.getItem('em:users')
    const users = usersRaw ? JSON.parse(usersRaw) : []
    if(users.find(u=>u.email===email)) return alert('User exists, please login')
    const u = { name, email, password }
    users.push(u)
    localStorage.setItem('em:users', JSON.stringify(users))
    setAuth({ name, email })
    localStorage.setItem('em:auth', JSON.stringify({ name, email }))
    go('dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 w-full max-w-md">
        <div className="logo-mark mb-4">EM</div>
        <h2 className="text-2xl font-bold">Create your account</h2>
        <div className="mt-4 space-y-3">
          <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <input className="input" placeholder="Confirm password" type="password" />
          <div className="flex items-center justify-between mt-2">
            <button className="btn btn-primary" onClick={submit}>Sign up</button>
            <a href="#" onClick={e=>{e.preventDefault(); go('login')}} className="small">Or sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}
