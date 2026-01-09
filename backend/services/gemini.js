// Gemini AI Service for content generation
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
  }

  async generateContent(prompt) {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Gemini API error:', error);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('No content generated');
      }

      return text;
    } catch (error) {
      console.error('Gemini service error:', error);
      throw error;
    }
  }

  // Parse JSON from Gemini response (handles markdown code blocks)
  parseJsonResponse(text) {
    try {
      // Remove markdown code blocks if present
      let jsonStr = text.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.slice(7);
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith('```')) {
        jsonStr = jsonStr.slice(0, -3);
      }
      return JSON.parse(jsonStr.trim());
    } catch (error) {
      console.error('Failed to parse JSON response:', text);
      throw new Error('Failed to parse AI response as JSON');
    }
  }

  // Generate roadmap with sub-skills
  async generateRoadmap(skill) {
    const prompt = `Generate a learning roadmap for the skill: "${skill}".
Return JSON only in this exact format (no markdown, no explanation):

{
  "skill": "${skill}",
  "domain": "detected domain name",
  "subSkills": [
    {
      "name": "sub skill name",
      "description": "brief description",
      "order": 1
    }
  ]
}

Generate 5-8 sub-skills that progressively build upon each other from beginner to advanced.
Focus on practical, industry-relevant skills.`;

    const response = await this.generateContent(prompt);
    return this.parseJsonResponse(response);
  }

  // Generate micro-skills with code examples
  async generateMicroSkills(skill, subSkill) {
    const prompt = `For the skill "${skill}" and sub-skill "${subSkill}", generate detailed micro-skills with learning content.

Return JSON only in this exact format (no markdown, no explanation):

{
  "subSkill": "${subSkill}",
  "microSkills": [
    {
      "title": "micro skill title",
      "explanation": "detailed explanation (2-3 paragraphs)",
      "code": "complete code example with comments",
      "output": "expected output or result",
      "notes": "key points and best practices"
    }
  ]
}

Generate 4-6 micro-skills that cover the essential concepts of "${subSkill}".
Each micro-skill should include practical code examples that are runnable.
Make the code examples comprehensive with proper comments.`;

    const response = await this.generateContent(prompt);
    return this.parseJsonResponse(response);
  }
}

module.exports = new GeminiService();
