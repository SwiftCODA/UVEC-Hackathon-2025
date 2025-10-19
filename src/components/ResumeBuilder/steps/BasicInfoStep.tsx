"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "../types";

interface BasicInfoStepProps {
  data: ResumeData['basicInfo'];
  onChange: (data: ResumeData['basicInfo']) => void;
}

const USA_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"
];
const CANADA_PROVINCES = [
  "AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"
];

export const BasicInfoStep = ({ data, onChange }: BasicInfoStepProps) => {
  const handleChange = (field: keyof ResumeData['basicInfo'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  const countryCode = (data.country === 'USA' || data.country === 'Canada') ? '+1' : '';

  const formatNorthAmerican = (rawDigits: string) => {
    const d = rawDigits.replace(/\D/g, '').slice(0, 10);
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 10);
    if (d.length <= 3) return p1;
    if (d.length <= 6) return `(${p1}) ${p2}`;
    return `(${p1}) ${p2}-${p3}`;
  };

  const handlePhoneInput = (value: string) => {
    // Remove everything except digits
    let digits = value.replace(/\D/g, '');
    // If country has +1 code selected, strip leading 1 from typed digits
    if (countryCode === '+1' && digits.startsWith('1')) {
      digits = digits.slice(1);
    }
    const formatted = formatNorthAmerican(digits);
    const withCode = countryCode ? `${countryCode} ${formatted}` : formatted;
    handleChange('phone', withCode.trim());
  };

  return (
    <div className="form-section animate-fade-in">
      <div>
  <h2 className="text-2xl font-semibold text-foreground mb-2">Let&apos;s start with the basics</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="mt-1.5"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="mt-1.5"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => handlePhoneInput(e.target.value)}
              placeholder={`${countryCode || '+1'} (555) 123-4567`}
              className="mt-1.5 tracking-wide"
              maxLength={20}
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={data.country}
              onChange={(e) => {
                const country = e.target.value as 'USA' | 'Canada' | '';
                // reset state/province when country changes and normalize phone prefix
                let nextPhone = data.phone || '';
                const stripped = nextPhone.replace(/\D/g, '');
                if (country === 'USA' || country === 'Canada') {
                  // ensure +1 prefix
                  const core = stripped.startsWith('1') ? stripped.slice(1) : stripped;
                  const formatted = formatNorthAmerican(core);
                  nextPhone = `+1 ${formatted}`.trim();
                } else {
                  // remove +1 if leaving N.A.
                  const core = stripped.startsWith('1') ? stripped.slice(1) : stripped;
                  nextPhone = formatNorthAmerican(core);
                }
                onChange({ ...data, country, stateProvince: '', city: data.city, phone: nextPhone });
              }}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stateProvince">{data.country === 'Canada' ? 'Province/Territory' : 'State'}</Label>
            <select
              id="stateProvince"
              className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              value={data.stateProvince}
              onChange={(e) => handleChange('stateProvince', e.target.value)}
              disabled={!data.country}
            >
              <option value="">{data.country ? 'Select one' : 'Select country first'}</option>
              {(data.country === 'Canada' ? CANADA_PROVINCES : USA_STATES).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="City"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="githubUsername">GitHub Username</Label>
            <Input
              id="githubUsername"
              type="text"
              value={data.githubUsername || ''}
              onChange={(e) => handleChange('githubUsername', e.target.value)}
              placeholder="your-github-handle"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn</Label>
            <Input
              id="linkedinUrl"
              type="url"
              value={data.linkedinUrl || ''}
              onChange={(e) => handleChange('linkedinUrl', e.target.value)}
              placeholder="https://www.linkedin.com/in/your-handle"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
