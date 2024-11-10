import { ResumeData } from '../types';

const API_KEY = 'tobitodili@gmail.com_wWp1srsrNTY5d8rVEK2qNq0D6ezWjl79QIJgLtoM71CIPV1t9E40oaco1SzkO88z';
const TEMPLATE_ID = 3469;

export class PDFService {
  static async generatePDF(data: ResumeData): Promise<string> {
    try {
      // Only include fields that have values
      const templateData: any = {};
      
      if (data.full_name) templateData.full_name = data.full_name;
      if (data.contact_email) templateData.contact_email = data.contact_email;
      if (data.phone_number) templateData.phone_number = data.phone_number;
      if (data.location) templateData.location = data.location;
      if (data.summary) templateData.summary = data.summary;
      
      if (data.work_experience?.length > 0) {
        templateData.work_experience = data.work_experience.map(exp => {
          const experience: any = {};
          if (exp.job_title) experience.job_title = exp.job_title;
          if (exp.company_name) experience.company_name = exp.company_name;
          if (exp.location) experience.location = exp.location;
          if (exp.start_date) experience.start_date = exp.start_date;
          if (exp.end_date) experience.end_date = exp.end_date;
          if (exp.responsibilities?.length > 0) {
            experience.responsibilities = exp.responsibilities;
          }
          return experience;
        });
      }

      if (data.education?.length > 0) {
        templateData.education = data.education.map(edu => {
          const education: any = {};
          if (edu.degree) education.degree = edu.degree;
          if (edu.field_of_study) education.field_of_study = edu.field_of_study;
          if (edu.institution) education.institution = edu.institution;
          if (edu.graduation_date) education.graduation_date = edu.graduation_date;
          return education;
        });
      }

      if (data.skills?.length > 0) {
        templateData.skills = data.skills;
      }

      const response = await fetch('https://api.pdf.co/v1/pdf/convert/from/html', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: TEMPLATE_ID,
          templateData: JSON.stringify(templateData),
          name: `resume_${Date.now()}.pdf`,
          async: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initiate PDF generation');
      }

      const responseData = await response.json();
      
      if (responseData.error) {
        throw new Error(responseData.message || 'PDF generation failed');
      }

      // If async is true, we need to poll for the job status
      if (responseData.jobId) {
        return await pollJobStatus(responseData.jobId);
      }

      return responseData.url;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  }
}

async function pollJobStatus(jobId: string): Promise<string> {
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch('https://api.pdf.co/v1/job/check', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobid: jobId })
      });

      if (!response.ok) {
        throw new Error('Failed to check job status');
      }

      const data = await response.json();

      if (data.status === 'success') {
        return data.url;
      } else if (data.status === 'working') {
        // Wait for 3 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;
      } else {
        throw new Error(`Job failed with status: ${data.status}`);
      }
    } catch (error) {
      console.error('Error checking job status:', error);
      throw error;
    }
  }

  throw new Error('PDF generation timed out');
}