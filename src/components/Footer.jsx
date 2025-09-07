import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="logo-mark">EM</div>
          <div className="text-lg font-bold logo-text">ExpenseMate</div>
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" onClick={e => e.preventDefault()} className="text-slate-300">About</a>
          <a href="#" onClick={e => e.preventDefault()} className="text-slate-300">Contact</a>
          <a href="#" onClick={e => e.preventDefault()} className="text-slate-300">Terms</a>
        </div>

        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} ExpenseMate
        </div>
      </div>
    </footer>
  )
}
