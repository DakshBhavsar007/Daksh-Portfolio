import { ResumeRole } from '../data/resumeData';

export function generateResumeHtml(resume: ResumeRole): string {
  const skillsHtml = resume.skillsByCategory
    .map(
      (cat) => `
      <div style="margin-bottom: 6px;">
        <span style="font-weight: 700; color: #111111;">${cat.category}:</span>
        <span style="color: #222222; margin-left: 4px;">${cat.skills}</span>
      </div>`
    )
    .join('');

  const projectsHtml = resume.experienceOrProjects
    .map(
      (item) => `
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-weight: 700; font-size: 13.5px; color: #0d47a1;">
            ${item.title}
            ${
              item.liveUrl
                ? ` — <a href="${item.liveUrl}" target="_blank" style="color: #1a73e8; text-decoration: underline; font-weight: normal; font-size: 12px;">Live Site</a>`
                : ''
            }
            ${
              item.githubUrl
                ? ` | <a href="${item.githubUrl}" target="_blank" style="color: #1a73e8; text-decoration: underline; font-weight: normal; font-size: 12px;">GitHub</a>`
                : ''
            }
          </div>
        </div>
        <ul style="margin: 0; padding-left: 18px; color: #222222; font-size: 12.5px; line-height: 1.45;">
          ${item.points.map((pt) => `<li style="margin-bottom: 3px;">${pt}</li>`).join('')}
        </ul>
        ${
          item.techStack
            ? `<div style="font-size: 12px; color: #444444; margin-top: 2px; padding-left: 18px;">
                <strong>Tech Stack:</strong> ${item.techStack}
              </div>`
            : ''
        }
      </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bhavsar Daksh Narendrabhai - ${resume.shortRole} Resume</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111111;
      background: #ffffff;
      line-height: 1.4;
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 14px;
    }
    .name {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #000000;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .role-title {
      font-size: 13.5px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 6px;
    }
    .contacts {
      font-size: 12px;
      color: #444444;
    }
    .contacts a {
      color: #1a73e8;
      text-decoration: underline;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #0d47a1;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      border-bottom: 1.5px solid #0d47a1;
      padding-bottom: 2px;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .summary-text {
      font-size: 12.5px;
      color: #222222;
      line-height: 1.5;
      text-align: justify;
    }
    .edu-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 12.5px;
    }
    .edu-inst {
      font-weight: 700;
      color: #111111;
    }
    .edu-meta {
      font-size: 12px;
      color: #555555;
    }
    .no-print {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #111111;
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      font-weight: bold;
      font-size: 14px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">BHAVSAR DAKSH NARENDRABHAI</div>
    <div class="role-title">${resume.roleTitle}</div>
    <div class="contacts">
      <a href="mailto:dakshbhavsar3699@gmail.com">dakshbhavsar3699@gmail.com</a> | 
      <span>8849538117</span> | 
      <span>Ahmedabad, Gujarat, India</span> | 
      <a href="https://linkedin.com/in/daksh-bhavsar-96b102339" target="_blank">LinkedIn</a> | 
      <a href="https://github.com/DakshBhavsar007" target="_blank">GitHub</a> | 
      <a href="https://daksh-portfolio-beta.vercel.app/" target="_blank">Portfolio</a>
    </div>
  </div>

  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <div class="summary-text">${resume.summary}</div>

  <div class="section-title">EDUCATION</div>
  <div class="edu-row">
    <div>
      <span class="edu-inst">${resume.education.degree}</span>, ${resume.education.institution} — ${resume.education.location}
    </div>
    <div class="edu-meta">${resume.education.period}</div>
  </div>
  <div class="edu-meta" style="margin-top: 2px;">
    ${resume.education.semester} | CGPA: <strong>${resume.education.cgpa}</strong>
  </div>

  <div class="section-title">TECHNICAL SKILLS</div>
  <div style="font-size: 12.5px; line-height: 1.5;">
    ${skillsHtml}
  </div>

  <div class="section-title">${resume.id === 'devops' ? 'RELEVANT INFRASTRUCTURE & MONITORING EXPERIENCE' : 'PROJECTS'}</div>
  ${projectsHtml}

  <div class="section-title">CERTIFICATIONS</div>
  <div style="font-size: 12.5px; color: #1a73e8;">
    <a href="https://linkedin.com/in/daksh-bhavsar-96b102339" target="_blank" style="color: #1a73e8; text-decoration: underline;">View all certifications on LinkedIn/GitHub</a>
  </div>

  <div class="section-title">LANGUAGES</div>
  <div style="font-size: 12.5px; color: #222222;">
    ${resume.languages.join(', ')}
  </div>

  <button class="no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
</body>
</html>`;
}

export function downloadResumeAsHtml(resume: ResumeRole) {
  const htmlContent = generateResumeHtml(resume);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // If popup blocked, direct download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Daksh_Bhavsar_${resume.shortRole.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function openPrintableResume(resume: ResumeRole) {
  const htmlContent = generateResumeHtml(resume);
  const win = window.open('', '_blank');
  if (win) {
    win.document.open();
    win.document.write(htmlContent);
    win.document.close();
    // Auto trigger print after render
    setTimeout(() => {
      win.focus();
      win.print();
    }, 400);
  } else {
    downloadResumeAsHtml(resume);
  }
}
