import React from 'react'
import { saveAs } from 'file-saver'
import { utils } from 'xlsx'
import jsPDF from 'jspdf'
export default function ExportButton({ rows, fileName='expensemate-report' }){
  const onCSV = ()=>{ const ws = utils.json_to_sheet(rows); const csv = utils.sheet_to_csv(ws); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); saveAs(blob, `${fileName}.csv`); }
  const onPDF = ()=>{ const doc = new jsPDF(); doc.setFontSize(12); doc.text(fileName, 10, 10); let y=20; rows.forEach((r,i)=>{ const line = `${i+1}. ${r.desc||r.description||''} — ${r.amount}`; doc.text(line,10,y); y+=8; if(y>280){doc.addPage(); y=20} }); doc.save(`${fileName}.pdf`); }
  return (<div className="flex gap-2"><button className="btn btn-primary" onClick={onCSV}>Export CSV</button><button className="btn btn-ghost border border-slate-200" onClick={onPDF}>Export PDF</button></div>)
}
