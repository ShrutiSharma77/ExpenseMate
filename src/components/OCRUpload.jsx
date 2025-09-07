import React, { useState } from 'react'
export default function OCRUpload({ onParsed }){
  const [items, setItems] = useState([])
  const handle = (e)=>{ const f = e.target.files?.[0]; if(!f) return; setTimeout(()=>{ const dummy=[{description:'Paneer Tikka',amount:250},{description:'Butter Naan',amount:120},{description:'Coke',amount:60}]; setItems(dummy); onParsed && onParsed(dummy); }, 700) }
  return (
    <div className="card p-4">
      <div className="font-semibold mb-2">Scan Bill (OCR mock)</div>
      <input type="file" accept="image/*" onChange={handle} />
      {items.length>0 && <ul className="mt-3 text-sm">{items.map((it,i)=>(<li key={i}>{it.description} — {it.amount}</li>))}</ul>}
    </div>
  )
}
