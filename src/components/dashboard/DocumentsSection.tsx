import React, { useState } from 'react';
import { FileText, Download, Calendar, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  createdAt: Date;
  url: string;
  type: 'resume' | 'cover-letter';
  metadata?: {
    company?: string;
    position?: string;
  };
}

interface DocumentsSectionProps {
  documents: Document[];
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents, onView, onDownload }) => {
  const [activeTab, setActiveTab] = useState<'resumes' | 'cover-letters'>('resumes');

  const filteredDocuments = documents.filter(doc => 
    activeTab === 'resumes' ? doc.type === 'resume' : doc.type === 'cover-letter'
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Documents</h2>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('resumes')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'resumes'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Resumes
          {activeTab === 'resumes' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('cover-letters')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'cover-letters'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Cover Letters
          {activeTab === 'cover-letters' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4">
              <FileText className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600">
              {activeTab === 'resumes'
                ? 'No resumes yet. Create one using the Resume Builder above.'
                : 'No cover letters yet. Create one when applying for jobs.'}
            </p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{doc.name}</h3>
                    {doc.metadata?.company && (
                      <p className="text-sm text-gray-600 mt-1">
                        {doc.metadata.position} at {doc.metadata.company}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(doc)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDownload(doc)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentsSection;