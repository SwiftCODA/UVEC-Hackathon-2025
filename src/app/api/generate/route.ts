import { NextResponse } from "next/server";

// Helper to split full name into first and last
function splitName(fullName: string | undefined) {
  const name = (fullName || "").trim();
  if (!name) return { firstName: "", lastName: "" };
  const parts = name.split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");
  return { firstName, lastName };
}



export async function POST(request: Request) {
  const data = await request.json();

  // Map the builder's ResumeData shape to the required input shape for downstream use
  const basic = data?.basicInfo || {};
  const { firstName, lastName } = splitName(basic.name);
  const city = basic.city || "";
  const stateProvinceAbbreviation = basic.stateProvince || "";

  const education = Array.isArray(data?.education)
    ? data.education.map((e: any) => ({
        credential: e.credential || "",
        faculty: e.faculty || "",
        major: e.major || "",
        institution: e.school || "",
        // Graduation date is mandatory on the frontend; if the user is currently studying,
        // the expected date is still stored in endDate and mapped here.
        graduationDate: e.endDate || undefined,
        city,
        stateProvinceAbbreviation,
      }))
    : undefined;

  const experience = Array.isArray(data?.experience)
    ? data.experience.map((x: any) => ({
        jobTitle: x.jobTitle || "",
        companyName: x.company || "",
        startDate: x.startDate || "",
        endDate: x.current ? undefined : x.endDate || undefined,
        accomplishments: x.responsibilities || "",
        city,
        stateProvinceAbbreviation,
      }))
    : undefined;

  const projects = Array.isArray(data?.projects)
    ? data.projects.map((p: any) => ({
        title: p.name || "",
        startDate: p.startDate || "",
        endDate: p.current ? undefined : p.endDate || undefined,
        accomplishments: p.description || "",
        link: p.link || undefined,
      }))
    : undefined;

  const skills = Array.isArray(data?.skills) ? data.skills.filter((s: any) => !!s) : undefined;

  const transformed = {
    firstName,
    lastName,
    city,
    stateProvinceAbbreviation,
    githubUsername: basic.githubUsername || undefined,
    linkedinUrl: basic.linkedinUrl || undefined,
    phoneNumber: basic.phone || undefined,
    emailAddress: basic.email || undefined,
    education,
    experience,
    projects,
    skills,
  };

  return NextResponse.json({ success: true, resume: transformed });
}
