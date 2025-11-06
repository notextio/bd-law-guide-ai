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

    // System prompt with specific legal references
    const systemPrompt = `You are an expert AI tax consultant specializing in Bangladesh tax law with detailed knowledge of Income Tax Ordinance 1984 and Finance Acts.

CRITICAL REQUIREMENTS:
- Always cite Income Tax Ordinance 1984 sections (Section 44, Section 24, etc.)
- Reference Finance Act 2024 amendments
- Provide advice in the user's language (Bengali/English)
- Include specific legal article numbers in every response

USER TYPE: ${userType}
${profileContext}

TAX OPTIMIZATION STRATEGIES (with legal references):
1. Investment Tax Credit - Section 44 of Income Tax Ordinance 1984
2. Life Insurance Premium Rebate - Section 44(2)
3. Provident Fund Contribution - Section 24
4. Charitable Donations - Section 44(6)
5. Zakat Fund Deduction - Section 44(4)

TAX BRACKETS FY 2024-2025:
- ৳0-3.5 lakh: 0% (tax-free)
- ৳3.5-4.5 lakh: 5%
- ৳4.5-7.5 lakh: 10%
- ৳7.5-11.5 lakh: 15%
- ৳11.5-16.5 lakh: 20%
- Above ৳16.5 lakh: 25%

RESPONSE FORMAT:
"[Detailed explanation]

**Legal Reference**: Income Tax Ordinance 1984, Section [number], as amended by Finance Act 2024

**Practical Advice**: [Specific steps]"

Always follow NBR guidelines and provide only legal tax-saving methods.`;

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
