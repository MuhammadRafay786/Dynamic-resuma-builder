document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById('profilePicture');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');

    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement) {

        const name = (nameElement as HTMLInputElement).value;
        const email = (emailElement as HTMLInputElement).value;
        const phone = (phoneElement as HTMLInputElement).value;
        const address = (addressElement as HTMLInputElement).value;
        const education = (educationElement as HTMLInputElement).value;
        const experience = (experienceElement as HTMLInputElement).value;
        const skills = (skillsElement as HTMLInputElement).value;

        // Handle profile picture
        const profilePictureFile = (profilePictureInput as HTMLInputElement).files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        // Create resume output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Work Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        } else {
            console.error('The resume output element is missing');
        }
} else {
    console.error('One or more form elements are missing');
}

// Get download button and resume output references
const downloadBtn = document.getElementById('downloadBtn');
const resumeOutputElement = document.getElementById('resumeOutput');

// Update the resume generation code to show the download button
if (downloadBtn && resumeOutputElement) {
    downloadBtn.style.display = 'block'; // Show download button
}

// Add download functionality
downloadBtn?.addEventListener('click', async () => {
    const resumeContent = document.getElementById('resumeOutput');
    
    if (resumeContent) {
        // Add styles for PDF generation
        resumeContent.style.padding = '20px';
        resumeContent.style.width = '210mm';
        resumeContent.style.minHeight = '297mm';
        
        const options = {
            margin: 10,
            filename: 'my-resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true,
                letterRendering: true,
                windowWidth: 800
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            // Wait for all images to load
            const images = resumeContent.getElementsByTagName('img');
            await Promise.all(Array.from(images).map(img => {
                return new Promise<void>((resolve) => {
                    if (img.complete) resolve(undefined);
                    img.onload = () => resolve(undefined);
                    img.onerror = () => resolve(undefined);
                });
            }));
            
            // @ts-ignore - html2pdf types not included
            await html2pdf().set(options).from(resumeContent).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }
});
    
    
});
