import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, Save, Circle, CheckCircle2 } from 'lucide-react';

interface CurriculumBuilderProps {
  modules: any[];
  onChange: (modules: any[]) => void;
}

export function CurriculumBuilder({ modules, onChange }: CurriculumBuilderProps) {
  const [expandedMod, setExpandedMod] = useState<number | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null); // format: `${modIdx}-${unitIdx}`

  const addModule = () => {
    const newMod = { id: `mod-${Date.now()}`, title: 'New Module', description: '', units: [] };
    onChange([...(modules || []), newMod]);
    setExpandedMod(modules?.length || 0);
  };

  const updateModule = (idx: number, field: string, val: string) => {
    const updated = [...modules];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange(updated);
  };

  const removeModule = (idx: number) => {
    const updated = [...modules];
    updated.splice(idx, 1);
    onChange(updated);
  };

  const addUnit = (modIdx: number) => {
    const updated = [...modules];
    const newUnit = {
      id: `unit-${Date.now()}`,
      title: 'New Unit',
      type: 'reading',
      xp: 50,
      duration: '5 min',
      locked: false,
      content: { objectives: [], body: [], summary: '', quizQuestions: [], videoUrl: '', audioUrl: '' }
    };
    updated[modIdx].units = [...(updated[modIdx].units || []), newUnit];
    onChange(updated);
    setExpandedUnit(`${modIdx}-${updated[modIdx].units.length - 1}`);
  };

  const updateUnit = (modIdx: number, unitIdx: number, field: string, val: any) => {
    const updated = [...modules];
    updated[modIdx].units[unitIdx] = { ...updated[modIdx].units[unitIdx], [field]: val };
    onChange(updated);
  };

  const updateUnitContent = (modIdx: number, unitIdx: number, field: string, val: any) => {
    const updated = [...modules];
    const unit = updated[modIdx].units[unitIdx];
    unit.content = { ...unit.content, [field]: val };
    onChange(updated);
  };

  const removeUnit = (modIdx: number, unitIdx: number) => {
    const updated = [...modules];
    updated[modIdx].units.splice(unitIdx, 1);
    onChange(updated);
  };

  const handleArrayText = (modIdx: number, unitIdx: number, field: string, text: string) => {
    const arr = text.split('\n').filter(s => s.trim() !== '');
    updateUnitContent(modIdx, unitIdx, field, arr);
  };

  // --- Quiz Builder Helpers ---
  const addQuizQuestion = (modIdx: number, unitIdx: number) => {
    const updated = [...modules];
    const unitContent = updated[modIdx].units[unitIdx].content;
    const currentQuestions = unitContent.quizQuestions || [];
    unitContent.quizQuestions = [
      ...currentQuestions, 
      { question: 'New Question', options: ['Option 1'], correct: 0 }
    ];
    onChange(updated);
  };

  const updateQuizQuestion = (modIdx: number, unitIdx: number, qIdx: number, field: string, val: any) => {
    const updated = [...modules];
    const qs = updated[modIdx].units[unitIdx].content.quizQuestions;
    qs[qIdx] = { ...qs[qIdx], [field]: val };
    onChange(updated);
  };

  const removeQuizQuestion = (modIdx: number, unitIdx: number, qIdx: number) => {
    const updated = [...modules];
    updated[modIdx].units[unitIdx].content.quizQuestions.splice(qIdx, 1);
    onChange(updated);
  };

  const addQuizOption = (modIdx: number, unitIdx: number, qIdx: number) => {
    const updated = [...modules];
    const qs = updated[modIdx].units[unitIdx].content.quizQuestions;
    qs[qIdx].options.push(`Option ${qs[qIdx].options.length + 1}`);
    onChange(updated);
  };

  const updateQuizOption = (modIdx: number, unitIdx: number, qIdx: number, optIdx: number, val: string) => {
    const updated = [...modules];
    const qs = updated[modIdx].units[unitIdx].content.quizQuestions;
    qs[qIdx].options[optIdx] = val;
    onChange(updated);
  };

  const removeQuizOption = (modIdx: number, unitIdx: number, qIdx: number, optIdx: number) => {
    const updated = [...modules];
    const qs = updated[modIdx].units[unitIdx].content.quizQuestions;
    qs[qIdx].options.splice(optIdx, 1);
    // Adjust correct answer if needed
    if (qs[qIdx].correct === optIdx) {
      qs[qIdx].correct = 0;
    } else if (qs[qIdx].correct > optIdx) {
      qs[qIdx].correct -= 1;
    }
    onChange(updated);
  };

  if (!modules) return null;

  return (
    <div className="space-y-4">
      {modules.map((mod, modIdx) => (
        <div key={modIdx} className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
          {/* Module Header */}
          <div 
            className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer hover:bg-gray-200"
            onClick={() => setExpandedMod(expandedMod === modIdx ? null : modIdx)}
          >
            <div className="flex items-center gap-2">
              {expandedMod === modIdx ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
              <h3 className="font-semibold text-black">{mod.title || 'Untitled Module'}</h3>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeModule(modIdx); }}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Module Content */}
          {expandedMod === modIdx && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Module Title</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 text-sm bg-white text-black"
                    value={mod.title}
                    onChange={(e) => updateModule(modIdx, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Module ID</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 text-sm bg-white text-black"
                    value={mod.id}
                    onChange={(e) => updateModule(modIdx, 'id', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Module Description</label>
                <textarea
                  className="w-full border rounded p-2 text-sm bg-white text-black"
                  rows={2}
                  value={mod.description}
                  onChange={(e) => updateModule(modIdx, 'description', e.target.value)}
                />
              </div>

              {/* Units List */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm text-black">Units inside {mod.title}</h4>
                  <button
                    type="button"
                    onClick={() => addUnit(modIdx)}
                    className="flex items-center gap-1 text-xs text-black bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50"
                  >
                    <Plus className="w-3 h-3" /> Add Unit
                  </button>
                </div>

                <div className="space-y-3">
                  {(mod.units || []).map((unit: any, unitIdx: number) => {
                    const uKey = `${modIdx}-${unitIdx}`;
                    const isUnitExp = expandedUnit === uKey;

                    return (
                      <div key={unitIdx} className="border border-emerald-100 rounded bg-white overflow-hidden shadow-sm">
                        <div 
                          className="flex items-center justify-between p-3 bg-emerald-50/50 cursor-pointer hover:bg-emerald-50"
                          onClick={() => setExpandedUnit(isUnitExp ? null : uKey)}
                        >
                          <div className="flex items-center gap-2">
                            {isUnitExp ? <ChevronDown className="w-4 h-4 text-emerald-600" /> : <ChevronRight className="w-4 h-4 text-emerald-600" />}
                            <span className="font-medium text-sm text-emerald-900">{unit.title || 'Untitled Unit'}</span>
                            <span className="text-xs text-emerald-600 bg-emerald-100 px-2 rounded-full">{unit.type}</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeUnit(modIdx, unitIdx); }}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {isUnitExp && (
                          <div className="p-4 space-y-4 border-t border-emerald-100">
                            {/* Unit Metadata */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Title</label>
                                <input type="text" className="w-full border rounded p-1.5 text-sm bg-white text-black" value={unit.title} onChange={(e) => updateUnit(modIdx, unitIdx, 'title', e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">ID</label>
                                <input type="text" className="w-full border rounded p-1.5 text-sm bg-white text-black" value={unit.id} onChange={(e) => updateUnit(modIdx, unitIdx, 'id', e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Type</label>
                                <select className="w-full border rounded p-1.5 text-sm bg-white text-black" value={unit.type} onChange={(e) => updateUnit(modIdx, unitIdx, 'type', e.target.value)}>
                                  <option value="reading">Reading</option>
                                  <option value="video">Video</option>
                                  <option value="audio">Audio</option>
                                  <option value="quiz">Quiz / Assessment</option>
                                  <option value="mindfulness">Mindfulness</option>
                                  <option value="activity">Activity</option>
                                  <option value="reflection">Reflection</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">XP</label>
                                <input type="number" className="w-full border rounded p-1.5 text-sm bg-white text-black" value={unit.xp} onChange={(e) => updateUnit(modIdx, unitIdx, 'xp', parseInt(e.target.value))} />
                              </div>
                            </div>

                            {/* Unit Content */}
                            <div className="pt-2 border-t border-gray-100">
                              <h5 className="text-sm font-semibold mb-3 text-emerald-900">Lesson Content</h5>
                              
                              {/* Video Slot */}
                              {unit.type === 'video' && (
                                <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                                  <label className="block text-xs text-gray-700 font-semibold mb-1">Video URL (Vimeo, YouTube, etc)</label>
                                  <input type="text" className="w-full border rounded p-2 text-sm bg-white text-black" value={unit.content?.videoUrl || ''} onChange={(e) => updateUnitContent(modIdx, unitIdx, 'videoUrl', e.target.value)} placeholder="https://..." />
                                </div>
                              )}

                              {/* Audio Slot */}
                              {unit.type === 'audio' && (
                                <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                                  <label className="block text-xs text-gray-700 font-semibold mb-1">Audio URL (.mp3)</label>
                                  <input type="text" className="w-full border rounded p-2 text-sm bg-white text-black" value={unit.content?.audioUrl || ''} onChange={(e) => updateUnitContent(modIdx, unitIdx, 'audioUrl', e.target.value)} placeholder="https://..." />
                                </div>
                              )}

                              {/* Quiz Builder */}
                              {unit.type === 'quiz' ? (
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center bg-emerald-50 px-3 py-2 rounded">
                                    <span className="text-xs font-semibold text-emerald-800">Quiz Questions</span>
                                    <button type="button" onClick={() => addQuizQuestion(modIdx, unitIdx)} className="bg-[#1a5d47] text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-[#113d2f]">
                                      <Plus className="w-3 h-3" /> Add Question
                                    </button>
                                  </div>
                                  
                                  {(unit.content?.quizQuestions || []).map((q: any, qIdx: number) => (
                                    <div key={qIdx} className="border border-gray-200 rounded p-4 bg-white shadow-sm relative">
                                      <div className="flex items-start justify-between mb-3">
                                        <input 
                                          type="text" 
                                          className="flex-1 border-b border-gray-300 bg-transparent py-1 text-base font-medium focus:outline-none focus:border-[#1a5d47] text-black" 
                                          value={q.question} 
                                          onChange={(e) => updateQuizQuestion(modIdx, unitIdx, qIdx, 'question', e.target.value)}
                                          placeholder="Question Title"
                                        />
                                        <button onClick={() => removeQuizQuestion(modIdx, unitIdx, qIdx)} className="ml-4 text-red-400 hover:text-red-600">
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>

                                      <div className="space-y-2 mt-4 pl-2">
                                        {q.options.map((opt: string, optIdx: number) => (
                                          <div key={optIdx} className="flex items-center gap-3 group">
                                            <button 
                                              type="button" 
                                              onClick={() => updateQuizQuestion(modIdx, unitIdx, qIdx, 'correct', optIdx)}
                                              className={`transition-colors ${q.correct === optIdx ? 'text-[#1a5d47]' : 'text-gray-300 hover:text-gray-400'}`}
                                            >
                                              {q.correct === optIdx ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                            </button>
                                            <input 
                                              type="text" 
                                              className={`flex-1 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#1a5d47] focus:outline-none py-1 text-sm ${q.correct === optIdx ? 'font-medium text-black' : 'text-gray-600'}`}
                                              value={opt}
                                              onChange={(e) => updateQuizOption(modIdx, unitIdx, qIdx, optIdx, e.target.value)}
                                            />
                                            {q.options.length > 1 && (
                                              <button type="button" onClick={() => removeQuizOption(modIdx, unitIdx, qIdx, optIdx)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500">
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            )}
                                          </div>
                                        ))}
                                        <button type="button" onClick={() => addQuizOption(modIdx, unitIdx, qIdx)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a5d47] mt-2 pl-1 py-1">
                                          <Circle className="w-5 h-5 text-transparent border border-gray-300 rounded-full bg-gray-50" />
                                          <span>Add option</span>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                  {(!unit.content?.quizQuestions || unit.content.quizQuestions.length === 0) && (
                                    <p className="text-center text-xs text-gray-400 py-4 border border-dashed border-gray-200 rounded">No questions added yet.</p>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">Objectives (one per line)</label>
                                    <textarea
                                      className="w-full border rounded p-2 text-sm bg-white text-black"
                                      rows={3}
                                      value={(unit.content?.objectives || []).join('\n')}
                                      onChange={(e) => handleArrayText(modIdx, unitIdx, 'objectives', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">Body Text (one paragraph per line)</label>
                                    <textarea
                                      className="w-full border rounded p-2 text-sm bg-white text-black"
                                      rows={5}
                                      value={(unit.content?.body || []).join('\n')}
                                      onChange={(e) => handleArrayText(modIdx, unitIdx, 'body', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">Summary</label>
                                    <textarea
                                      className="w-full border rounded p-2 text-sm bg-white text-black"
                                      rows={2}
                                      value={unit.content?.summary || ''}
                                      onChange={(e) => updateUnitContent(modIdx, unitIdx, 'summary', e.target.value)}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addModule}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-black rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-4 h-4" /> Add New Module
      </button>
    </div>
  );
}
