import { ResumeData } from '../types';

const API_KEY = 'tobitodili@gmail.com_wWp1srsrNTY5d8rVEK2qNq0D6ezWjl79QIJgLtoM71CIPV1t9E40oaco1SzkO88z';
const TEMPLATE_ID = 3469;

export class PDFService {
  static async generatePDF(data: ResumeData): Promise<string> {
    try {
      console.log('Starting PDF generation with data:', data);

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

      console.log('Prepared template data:', templateData);

      // Generate HTML content
      const htmlContent = generateHTML(templateData);

      // Convert HTML to PDF using pdf.co API
      const response = await fetch('https://api.pdf.co/v1/pdf/convert/from/html', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          html: htmlContent,
          name: `resume_${Date.now()}.pdf`,
          async: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('PDF generation API error:', errorData);
        throw new Error(`Failed to generate PDF: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('PDF generation response:', result);

      if (result.error) {
        throw new Error(result.message || 'PDF generation failed');
      }

      return result.url;

    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  }

  static async downloadPDF(url: string, filename: string): Promise<void> {
    try {
      console.log('Downloading PDF from:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      console.log('PDF downloaded successfully');
    } catch (error) {
      console.error('PDF download error:', error);
      throw error;
    }
  }
}

function generateHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${data.full_name}'s Resume</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 40px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          color: #2563eb;
          font-size: 28px;
        }
        .contact {
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          color: #1e40af;
          border-bottom: 2px solid #93c5fd;
          padding-bottom: 5px;
          margin-bottom: 15px;
          font-size: 18px;
        }
        .experience-item {
          margin-bottom: 20px;
        }
        .experience-header {
          margin-bottom: 10px;
        }
        .job-title {
          font-weight: bold;
          color: #1e40af;
        }
        .company {
          font-style: italic;
        }
        .date {
          color: #666;
          font-size: 14px;
        }
        ul {
          margin: 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill {
          background: #e5e7eb;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.full_name}</h1>
      </div>
      
      <div class="contact">
        ${data.contact_email} | ${data.phone_number} | ${data.location}
      </div>

      ${data.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p>${data.summary}</p>
        </div>
      ` : ''}

      ${data.work_experience?.length ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${data.work_experience.map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <span class="job-title">${exp.job_title}</span> at 
                <span class="company">${exp.company_name}</span>
                <div class="date">${exp.start_date} - ${exp.end_date || 'Present'}</div>
              </div>
              <ul>
                ${exp.responsibilities.map(resp => `
                  <li>${resp}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education?.length ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${data.education.map(edu => `
            <div class="experience-item">
              <div class="experience-header">
                <span class="job-title">${edu.degree}</span> in 
                <span class="company">${edu.field_of_study}</span>
                <div>${edu.institution}</div>
                <div class="date">Graduated: ${edu.graduation_date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills?.length ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills">
            ${data.skills.map(skill => `
              <span class="skill">${skill}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </body>
    </html>
  `;
}