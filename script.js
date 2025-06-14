const form = document.getElementById('resumeForm');
const preview = document.getElementById('resumePreview');

function updatePreview(data) {
  const { name, email, phone, linkedin, summary, experience, education, skills } = data;

  preview.innerHTML = `
    <h2>${name || ''}</h2>
    <p><strong>Email:</strong> ${email || ''}</p>
    <p><strong>Phone:</strong> ${phone || ''}</p>
    <p><strong>LinkedIn:</strong> ${linkedin || ''}</p>
    <h3>Summary</h3><p>${summary || ''}</p>
    <h3>Experience</h3><p>${experience || ''}</p>
    <h3>Education</h3><p>${education || ''}</p>
    <h3>Skills</h3><ul>${(skills || '').split(',').map(s => `<li>${s.trim()}</li>`).join('')}</ul>
  `;
}

function getFormData() {
  return {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    linkedin: document.getElementById('linkedin').value,
    summary: document.getElementById('summary').value,
    experience: document.getElementById('experience').value,
    education: document.getElementById('education').value,
    skills: document.getElementById('skills').value,
  };
}

function setFormData(data) {
  document.getElementById('name').value = data.name || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('phone').value = data.phone || '';
  document.getElementById('linkedin').value = data.linkedin || '';
  document.getElementById('summary').value = data.summary || '';
  document.getElementById('experience').value = data.experience || '';
  document.getElementById('education').value = data.education || '';
  document.getElementById('skills').value = data.skills || '';
  updatePreview(data);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = getFormData();
  updatePreview(data);
});

document.getElementById('downloadPdf').addEventListener('click', function () {
  html2pdf().from(preview).save('My_Resume.pdf');
});

document.getElementById('downloadJson').addEventListener('click', function () {
  const data = getFormData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "resume.json";
  a.click();
});

document.getElementById('uploadJson').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    setFormData(data);
  };
  reader.readAsText(file);
});
