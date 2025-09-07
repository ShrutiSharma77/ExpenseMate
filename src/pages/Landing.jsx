import React from 'react'

export default function Landing({ go }) {
  return (
    <div className="flex-1 flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Section */}
          <div>
            <div className="logo-mark mb-6 text-3xl font-bold">EM</div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              No more <span className="text-[var(--accent)]">awkward</span> money talks.
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)] max-w-lg">
              ExpenseMate helps you track, split, and settle expenses with friends — beautiful analytics, smart suggestions, and export-ready reports, all on the frontend.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn btn-primary" onClick={() => go('signup')}>Get Started →</button>
              <button className="btn btn-ghost border border-slate-200" onClick={() => go('login')}>Sign In</button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card p-4 glass">
                <div className="font-semibold">Split Expenses</div>
                <div className="text-sm text-[var(--muted)] mt-2">Split bills with friends quickly and clearly.</div>
              </div>
              <div className="card p-4 glass">
                <div className="font-semibold">Track Balances</div>
                <div className="text-sm text-[var(--muted)] mt-2">See who owes what at a glance.</div>
              </div>
              <div className="card p-4 glass">
                <div className="font-semibold">Export Reports</div>
                <div className="text-sm text-[var(--muted)] mt-2">Download CSV/PDF for records or sharing.</div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="card p-6 shadow-lg rounded-lg">
            <div className="text-sm text-[var(--muted)]">Create an account</div>
            <div className="mt-4 space-y-3">
              <input className="input w-full" placeholder="Full name" />
              <input className="input w-full" placeholder="Email" />
              <input className="input w-full" placeholder="Password" type="password" />
              <div className="flex items-center justify-between mt-2">
                <button className="btn btn-primary" onClick={() => go('signup')}>Create account</button>
                <a href="#" onClick={e => { e.preventDefault(); go('login') }} className="small text-[var(--accent)] hover:underline">
                  Already have an account?
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
