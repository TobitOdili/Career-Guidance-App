import React, { useState } from 'react';
import { Bot, FileText, Download, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useAI } from '../ai/AIProvider';
import { ResumeData } from './types';
import QuestionForm from './QuestionForm';
import { PDFService } from './services/pdfService';
import { RESUME_BUILDER_STEPS } from './constants';
import { useDocuments } from '../../hooks/useDocuments';
import { useUser } from '../../contexts/UserContext';

interface ResumeBuilderProps {
  onClose: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onClose }) => {
  const { userData } = useUser();
  const { addDocument } = useDocuments();
  const { generateAIResponse } = useAI();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<Partial<ResumeData>>({
    work_experience: [],
    education: [],
    skills: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep < RESUME_BUILDER_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleUpdateData = (data: Partial<ResumeData>) => {
    setResumeData(prev => {
      const newData = { ...prev };
      
      // Handle arrays specially
      if (Array.isArray(data.work_experience)) {
        newData.work_experience = [...(prev.work_experience || []), ...data.work_experience];
      }
      if (Array.isArray(data.education)) {
        newData.education = [...(prev.education || []), ...data.education];
      }
      if (Array.isArray(data.skills)) {
        newData.skills = [...(prev.skills || []), ...data.skills];
      }
      
      // Handle other fields
      return { ...newData, ...data };
    });
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      console.log('Generating PDF with data:', resumeData);

      // Generate PDF
      const url = await PDFService.generatePDF(resumeData as ResumeData);
      console.log('Generated PDF URL:', url);

      // Save to Supabase
      try {
        await addDocument({
          name: resumeData.full_name ? `${resumeData.full_name}'s Resume` : 'New Resume',
          type: 'resume',
          url,
          metadata: {
            resumeData
          }
        });
        console.log('Successfully saved to Supabase');
      } catch (dbError) {
        console.error('Failed to save to Supabase:', dbError);
        // Continue with download even if Supabase save fails
      }

      // Download the file
      try {
        await PDFService.downloadPDF(url, `resume_${Date.now()}.pdf`);
        onClose();
      } catch (downloadError) {
        console.error('Failed to download PDF:', downloadError);
        throw new Error('Failed to download the generated PDF');
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const isStepValid = () => {
    const step = RESUME_BUILDER_STEPS[currentStep];
    const requiredFields = step.questions
      .filter(q => q.required)
      .map(q => q.field);

    return requiredFields.every(field => {
      const value = resumeData[field as keyof ResumeData];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return Boolean(value);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">AI Resume Builder</h1>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {RESUME_BUILDER_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 relative ${
                  index < RESUME_BUILDER_STEPS.length - 1 ? 'after:content-[""] after:absolute after:top-1/2 after:w-full after:h-0.5 after:bg-gray-200' : ''
                }`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm text-gray-600">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Current Step */}
        <div className="mb-8">
          <QuestionForm
            step={RESUME_BUILDER_STEPS[currentStep]}
            data={resumeData}
            onChange={handleUpdateData}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep === RESUME_BUILDER_STEPS.length - 1 ? (
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating || !isStepValid()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Generate Resume PDF
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;