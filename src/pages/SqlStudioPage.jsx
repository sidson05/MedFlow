import React, { useState } from 'react';
import { ANALYTICAL_QUERIES } from '../db/analyticalQueries';
import { executeSqlQuery } from '../db/sqlEngine';
import { Play, Code, Database, ChevronRight, Copy, Check, Clock } from 'lucide-react';

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
    <div className="space-y-4 pb-8">
      {/* Header Banner */}
      <div className="health-card p-[21px] bg-accentSoft/30 border border-line">
        <div className="flex items-center space-x-2 text-accent mb-1.5">
          <Database className="w-4 h-4" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">Live SQL Engine & Interview Showcase</span>
        </div>
        <h2 className="text-xl font-semibold text-ink">Hospital Database SQL Query Studio</h2>
        <p className="text-[12.5px] text-muted mt-1 max-w-3xl leading-relaxed">
          Execute analytical SQL queries live against the hospital relational schema. Test CTEs, Window functions (<code className="bg-panel2 px-1.5 py-0.5 rounded text-accent font-semibold">LAG</code>, <code className="bg-panel2 px-1.5 py-0.5 rounded text-accent font-semibold">DENSE_RANK</code>), and conditional aggregations used in production healthcare reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SQL Templates Sidebar (1/3 width) */}
        <div className="health-card p-[21px] space-y-3.5">
          <h3 className="text-[15px] font-semibold text-ink flex items-center gap-2">
            <Code className="w-4 h-4 text-accent" /> Analytical query templates
          </h3>

          <div className="space-y-2">
            {ANALYTICAL_QUERIES.map((q) => {
              const isSelected = selectedTemplate.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectTemplate(q)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accentSoft border-accent/40 text-ink shadow-2xs'
                      : 'bg-panel border-line text-ink hover:bg-panel2'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className={isSelected ? 'text-accent' : 'text-ink'}>
                      {q.title}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-accent' : 'text-muted'}`} />
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] mt-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-panel2 border border-line text-muted font-mono">{q.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-good/10 text-good font-semibold">{q.difficulty}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SQL Editor & Results Window (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Query Editor Box */}
          <div className="health-card p-[21px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-line">
              <div>
                <h4 className="text-[15px] font-semibold text-ink">{selectedTemplate.title}</h4>
                <p className="text-[12px] text-muted mt-0.5">{selectedTemplate.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySql}
                  className="flex items-center space-x-1.5 bg-panel2 hover:bg-line border border-line text-ink px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-good" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleRunQuery}
                  className="flex items-center space-x-1.5 bg-forest hover:opacity-95 text-forestTx px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-opacity cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run query</span>
                </button>
              </div>
            </div>

            <textarea
              value={sqlText}
              onChange={(e) => setSqlText(e.target.value)}
              rows={8}
              spellCheck={false}
              className="w-full bg-panel2 border border-line rounded-xl p-3.5 font-mono text-[12px] text-ink focus:outline-none focus:border-accent leading-relaxed resize-none shadow-2xs"
            />
          </div>

          {/* Results Table */}
          <div className="health-card p-[21px]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-line">
              <span className="text-xs font-semibold text-ink">Query execution result</span>
              <div className="flex items-center space-x-3 text-[11px] text-muted">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-accent" /> {queryResult.executionTimeMs} ms
                </span>
                <span>•</span>
                <span>{queryResult.rowCount} rows returned</span>
              </div>
            </div>

            <div className="overflow-x-auto max-h-72">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-muted text-[11.5px] uppercase tracking-wider sticky top-0 bg-panel">
                    {queryResult.columns.map((col) => (
                      <th key={col} className="pb-2.5 font-medium">{col.replace(/_/g, ' ')}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {queryResult.rows.map((row, index) => (
                    <tr key={index} className="hover:bg-panel2 transition-colors">
                      {queryResult.columns.map((col) => (
                        <td key={col} className="py-2.5 font-mono text-ink text-[12px]">
                          {row[col] !== null ? String(row[col]) : <span className="text-muted italic">NULL</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
