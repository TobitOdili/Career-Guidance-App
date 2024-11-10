import { AIMessage } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export class OpenAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(messages: AIMessage[]): Promise<string> {
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  formatCoverLetterPrompt(params: {
    userName: string;
    userEmail: string;
    jobTitle: string;
    company: string;
    description: string;
    requirements: string[];
    currentSkills: string[];
    additionalSkills?: string[];
    missingSkills?: string[];
    userInsights: {
      recentCertifications?: string[];
      recentProjects?: string[];
      relevantExperience?: string[];
    };
  }): string {
    const {
      userName,
      userEmail,
      jobTitle,
      company,
      description,
      requirements,
      currentSkills,
      additionalSkills = [],
      missingSkills = [],
      userInsights
    } = params;

    let prompt = `Write a professional cover letter for ${userName} (${userEmail}) applying for a ${jobTitle} position at ${company}.

Context:
- Job Description: ${description}
- Required Skills: ${requirements.join(', ')}
- Current Skills: ${currentSkills.join(', ')}
${additionalSkills.length ? `- Skills Currently Learning: ${additionalSkills.join(', ')}` : ''}
${missingSkills.length ? `- Skills to Address: ${missingSkills.join(', ')}` : ''}

Recent Achievements to Highlight:`;

    if (userInsights.recentCertifications?.length) {
      prompt += `\n- Recent Certifications: ${userInsights.recentCertifications.join(', ')}`;
    }
    if (userInsights.recentProjects?.length) {
      prompt += `\n- Recent Projects: ${userInsights.recentProjects.join(', ')}`;
    }
    if (userInsights.relevantExperience?.length) {
      prompt += `\n- Relevant Experience: ${userInsights.relevantExperience.join(', ')}`;
    }

    prompt += `\n
Guidelines:
1. Start with a strong opening that shows enthusiasm for the role and company
2. Highlight relevant skills and experience, especially matching requirements
3. For missing skills (${missingSkills.join(', ')}), address them positively by:
   - Emphasizing quick learning ability and adaptability
   - Mentioning similar or transferable skills
   - Showing enthusiasm and concrete plans to acquire these skills
4. Demonstrate knowledge of the company and why you want to work there
5. Include specific examples from recent achievements
6. Keep the tone professional but engaging
7. Include a strong closing paragraph
8. Format as a proper business letter with today's date

Important:
- Focus on how skills and achievements align with their needs
- Show enthusiasm and cultural fit
- Be specific about potential contributions
- Keep it concise (3-4 paragraphs)
- Make it compelling and memorable
- Address skill gaps confidently and positively
- Include contact information in the header`;

    return prompt;
  }
}