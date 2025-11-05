# Demo User Setup Instructions

## Demo User Credentials

To create the demo user, please follow these steps:

1. **Go to the Signup page** at `/signup`

2. **Fill in the following details:**
   - Full Name: `মোহাম্মদ করিম (Mohammad Karim)`
   - TIN Number: `123456789012`
   - Email: `demo@tax.gov.bd`
   - Password: `demo123`
   - Confirm Password: `demo123`

3. **After signup, update the financial data:**

After the demo user is created, you need to manually update their financial information in the backend database:

Go to your Lovable Cloud backend and run this SQL query:

```sql
UPDATE profiles 
SET 
  annual_income = 1200000.00,
  tax_due = 180000.00
WHERE tin_number = '123456789012';
```

## Demo User Financial Profile

- **Name:** মোহাম্মদ করিম (Mohammad Karim)
- **TIN:** 123456789012
- **Annual Income:** ৳12,00,000 (BDT 1.2 Million)
- **Tax Due:** ৳1,80,000 (BDT 180,000)

## Testing the Demo User

1. Login with:
   - Email: `demo@tax.gov.bd`
   - Password: `demo123`

2. Navigate to the Consultation page

3. The user's financial overview should display:
   - Their name and TIN
   - Annual income: ৳12,00,000
   - Tax due: ৳1,80,000

4. Select a user type (e.g., "Employee")

5. Ask the AI questions like:
   - "আমার কর কিভাবে কমাতে পারি?" (How can I reduce my tax?)
   - "কর জমা দেওয়ার প্রক্রিয়া কি?" (What is the tax submission process?)
   - "আমার জন্য কোন কর ছাড় পাওয়া যাবে?" (What tax exemptions are available for me?)

The AI will provide personalized guidance based on the demo user's specific financial situation.
