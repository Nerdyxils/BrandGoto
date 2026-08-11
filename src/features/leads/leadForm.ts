export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  companyWebsite: string;
  services: string[];
  budget: string;
  countryCode: string;
}

export const LEAD_ENDPOINT = '/.netlify/functions/form-submit';

export const countryCodes: Record<string, string> = {
  US: '1', CA: '1', NG: '234', GB: '44', IN: '91', DE: '49', FR: '33', AU: '61', NZ: '64',
  ZA: '27', JP: '81', KR: '82', CN: '86', BR: '55', MX: '52', ES: '34', IT: '39', NL: '31',
  SE: '46', NO: '47', DK: '45', FI: '358', PL: '48', RU: '7',
};

export const services = ['GTM Infrastructure', '14-Day Launchpad', 'Fractional CTO & Engineering Retainer'];
export const budgetOptions = ['$3,500 - $5,500', '$5,500 - $8,500', '$10,000+', 'Not sure yet'];

export const emptyLeadForm = (countryCode = '1'): LeadFormData => ({
  name: '', phone: '', email: '', companyWebsite: '', services: [], budget: '', countryCode,
});

export const validateLeadForm = (data: LeadFormData, requireServices = false) => {
  const cleanedPhone = data.phone.replace(/\D/g, '');
  const formattedPhone = `+${data.countryCode}${cleanedPhone}`;
  if (!data.name.trim()) return { error: 'Please enter your name.', formattedPhone };
  if (!data.email.trim()) return { error: 'Please enter your email address.', formattedPhone };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { error: 'Please enter a valid email address.', formattedPhone };
  if (!data.companyWebsite.trim()) return { error: 'Please enter your company website or LinkedIn profile.', formattedPhone };
  if (cleanedPhone.length < 7 || cleanedPhone.length > 15) return { error: 'Please enter a valid phone number (7-15 digits).', formattedPhone };
  if (!/^\+\d+$/.test(formattedPhone)) return { error: "Invalid phone number format. It must start with '+' followed by digits only.", formattedPhone };
  if (requireServices && data.services.length === 0) return { error: 'Please select at least one service.', formattedPhone };
  return { formattedPhone };
};

const calculateComplexityScore = (selected: string[]) => {
  const scores: Record<string, number> = { 'GTM Infrastructure': 10, '14-Day Launchpad': 10, 'Fractional CTO & Engineering Retainer': 9 };
  return selected.reduce((total, service) => total + (scores[service] || 5), 0);
};

const calculateProjectValue = (selected: string[], budget: string) => {
  if (budget.includes('$10,000+')) return 10000;
  if (budget.includes('$5,500 - $8,500')) return 7000;
  if (budget.includes('$3,500 - $5,500')) return 4500;
  const values: Record<string, number> = { 'GTM Infrastructure': 5500, '14-Day Launchpad': 5500, 'Fractional CTO & Engineering Retainer': 10000 };
  return selected.reduce((total, service) => total + (values[service] || 5000), 0);
};

const emailTemplate = (selected: string[]) => {
  if (selected.length >= 3) return 'comprehensive_package';
  if (selected.includes('GTM Infrastructure')) return 'gtm_infrastructure_focused';
  if (selected.includes('14-Day Launchpad')) return 'launchpad_focused';
  if (selected.includes('Fractional CTO & Engineering Retainer')) return 'cto_focused';
  return 'general_inquiry';
};

export const buildLeadPayload = (data: LeadFormData, formSource: string, leadSource: string) => {
  const { formattedPhone } = validateLeadForm(data);
  return {
    email: data.email,
    firstname: data.name,
    phone: formattedPhone,
    company_website: data.companyWebsite,
    services_selected: data.services.join(';'),
    services_count: data.services.length,
    primary_service: data.services[0] || 'General Inquiry',
    budget_range: data.budget || 'Not specified',
    service_complexity_score: calculateComplexityScore(data.services),
    estimated_project_value: calculateProjectValue(data.services, data.budget),
    priority_level: data.services.length >= 3 || data.services.length > 0 ? 'High' : 'Medium',
    email_template_id: emailTemplate(data.services),
    page_url: window.location.href,
    form_source: formSource,
    lead_source: leadSource,
    consultation_status: 'New Lead',
    requires_consultation: data.services.length > 1 ? 'Yes' : 'No',
    automated_followup_enabled: 'Yes',
    form_timestamp: new Date().toISOString(),
    referrer: document.referrer || 'Direct',
    browser_info: navigator.userAgent.substring(0, 100),
  };
};
