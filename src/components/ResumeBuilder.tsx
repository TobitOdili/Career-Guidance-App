import React, { useState } from 'react';
import { FileText, Download, Eye, Plus, Trash2 } from 'lucide-react';

interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

const ResumeBuilder = () => {
  const [sections, setSections] = useState<ResumeSection[]>([
    { id: '1', title: 'Professional Summary', content: '' },
    { id: '2', title: 'Work Experience', content: '' },
    { id: '3', title: 'Education', content: '' },
    { id: '4', title: 'Skills', content: '' }
  ]);
  const [activeSection, setActiveSection] = useState<string>('1');
  const [showPreview, setShowPreview] = useState(false);

  const handleContentChange = (id: string, content: string) => {
    setSections(prev => prev.map(section =>
      section.id === id ? { ...section, content } : section
    ));
  };

  const addNewSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: ''
    };
    setSections(prev => [...prev, newSection]);
    setActiveSection(newSection.id);
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
    if (activeSection === id) {
      setActiveSection(sections[0]?.id || '');
    }
  };

  const downloadResume = () => {
    const content = sections
      .map(section => `${section.title}\n${section.content}\n\n`)
      .join('');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Resume Builder
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={downloadResume}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.title}
            </button>
          ))}
          <button
            onClick={addNewSection}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Section
          </button>
        </div>
      </div>

      <div className="p-6">
        {showPreview ? (
          <div className="prose max-w-none">
            {sections.map(section => (
              <div key={section.id} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                <div className="whitespace-pre-wrap text-gray-600">{section.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map(section => (
              section.id === activeSection && (
                <div key={section.id}>
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        setSections(prev => prev.map(s =>
                          s.id === section.id ? { ...s, title: e.target.value } : s
                        ));
                      }}
                      className="text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0"
                    />
                    {sections.length > 1 && (
                      <button
                        onClick={() => removeSection(section.id)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleContentChange(section.id, e.target.value)}
                    placeholder={`Enter your ${section.title.toLowerCase()}...`}
                    className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;