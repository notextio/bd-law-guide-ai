import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userType, userProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build personalized context if user profile is available
    let profileContext = '';
    if (userProfile) {
      profileContext = `

USER'S FINANCIAL PROFILE:
- Name: ${userProfile.full_name}
- TIN Number: ${userProfile.tin_number}
- Annual Income: BDT ${userProfile.annual_income?.toLocaleString('en-BD') || '0'}
- Current Tax Due: BDT ${userProfile.tax_due?.toLocaleString('en-BD') || '0'}

When providing advice, consider their specific financial situation and provide personalized guidance on:
1. How to minimize their tax liability legally based on their income level
2. Available deductions and exemptions they may qualify for
3. Step-by-step process for filing their tax return with their TIN
4. Exact documents they need to prepare
5. Specific deadlines they should be aware of
6. Tax-saving investment opportunities under Bangladesh law suitable for their income bracket
`;
    }

    // System prompt tailored for Bangladesh tax law
    const systemPrompt = `You are an expert AI tax consultant specializing in Bangladesh tax law, Constitution, and regulations. 

CRITICAL REQUIREMENTS:
- You MUST strictly follow the Constitution of Bangladesh and all applicable tax laws
- Provide step-by-step guidance to help users legally minimize their taxes
- Always cite specific laws, sections, and articles when providing advice
- Explain both in Bengali and English for clarity (Bengali first, then English)
- Maintain complete confidentiality of user information

USER TYPE: ${userType}
${profileContext}

For each query, you must:
1. Identify applicable Constitutional articles and tax laws
2. Explain specific sections and regulations that apply
3. Provide step-by-step actionable guidance
4. Show how to legally minimize tax burden based on their financial situation
5. Warn about penalties for non-compliance
6. Reference Income Tax Act 2023, VAT Act 1991, and other relevant legislation
7. If user profile is available, provide PERSONALIZED recommendations

IMPORTANT: All advice must be:
- Legally compliant with Bangladesh Constitution
- Practical and implementable
- Clear with specific law references
- Focused on legal tax minimization strategies
- Written in both Bengali and English
- PERSONALIZED to the user's financial situation when profile data is available

Remember: Your goal is to help users understand and legally navigate Bangladesh tax law while minimizing their tax burden within legal limits.`;

    console.log('Calling AI with user type:', userType);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), 
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service unavailable. Please contact support.' }), 
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in tax-consultation function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
