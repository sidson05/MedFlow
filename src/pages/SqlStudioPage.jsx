import React, { useState } from 'react';
import { ANALYTICAL_QUERIES } from '../db/analyticalQueries';
import { executeSqlQuery } from '../db/sqlEngine';
import { Play, Code, CheckCircle, Clock, Database, ChevronRight, Copy, Check } from 'lucide-react';

export default function SqlStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(ANALYTICAL_QUERIES[0]);
  const [sqlText, setSqlText] = useState(ANALYTICAL_QUERIES[0].sql);
  const [queryResult, setQueryResult] = useState(() => executeSqlQuery(ANALYTICAL_QUERIES[0].sql));
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (query) => {
    setSelectedTemplate(query);
    setSqlText(query.sql);
    setQueryResult(executeSqlQuery(query.sql));
  };

  const handleRunQuery = () => {
    const res = executeSqlQuery(sqlText);
    setQueryResult(res);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <div className="health-card p-6 bg-gradient-to-r from-[#1A1C23] via-[#1E2538] to-[#1A1C23]">
        <div className="flex items-center space-x-3 text-blue-400 mb-2">
          <Database className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Live SQL Engine & Interview Showcase</span>
        </div>
        <h2 className="text-xl font-bold text-white">Hospital Database SQL Query Studio</h2>
        <p className="text-xs text-[#94A3B8] mt-1 max-w-3xl">
          Execute analytical SQL queries live against the hospital relational schema. Test CTEs, Window functions (<code className="text-blue-300">LAG</code>, <code className="text-blue-300">DENSE_RANK</code>), and conditional aggregations used in real production healthcare reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SQL Templates Sidebar (1/3 width) */}
        <div className="health-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-400" /> Analytical Query Templates
          </h3>

          <div className="space-y-2.5">
            {ANALYTICAL_QUERIES.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSelectTemplate(q)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                  selectedTemplate.id === q.id
                    ? 'bg-blue-600/15 border-blue-500/60 text-white shadow-md'
                    : 'bg-[#121316] border-[#2A2D3A] text-[#94A3B8] hover:text-white hover:bg-[#1C1F2B]'
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className={selectedTemplate.id === q.id ? 'text-blue-400' : 'text-white'}>
                    {q.title}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#64748B]" />
                </div>
                <div className="flex items-center space-x-2 text-[10px] mt-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#252936] text-blue-300 font-mono">{q.category}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{q.difficulty}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SQL Editor & Results Window (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Query Editor Box */}
          <div className="health-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#2A2D3A]">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedTemplate.title}</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">{selectedTemplate.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySql}
                  className="flex items-center space-x-1 bg-[#222530] hover:bg-[#2C3040] text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleRunQuery}
                  className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute SQL</span>
                </button>
              </div>
            </div>

            {/* Syntax Styled Textarea */}
            <div className="relative rounded-xl overflow-hidden border border-[#2A2D3A] bg-[#0E1015]">
              <textarea
                value={sqlText}
                onChange={(e) => setSqlText(e.target.value)}
                rows={10}
                className="w-full bg-transparent p-4 font-mono text-xs text-blue-300 focus:outline-none resize-none leading-relaxed"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Results Table */}
          {queryResult && (
            <div className="health-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2D3A]">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Query Executed Cleanly
                  </span>
                  <span className="text-xs text-[#64748B] font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {queryResult.executionTimeMs} ms
                  </span>
                </div>
                <span className="text-xs text-[#94A3B8] font-mono">
                  {queryResult.rowCount} rows returned
                </span>
              </div>

              <div className="overflow-x-auto max-h-80">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#2A2D3A] text-blue-400 bg-[#121316]">
                      {queryResult.columns.map((col) => (
                        <th key={col} className="p-3 font-semibold uppercase tracking-wider">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2D3A]/60">
                    {queryResult.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#222530] transition-colors">
                        {queryResult.columns.map((col) => (
                          <td key={col} className="p-3 text-slate-200">{String(row[col] ?? '')}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
