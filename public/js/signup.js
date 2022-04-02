async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const job_title = document.querySelector('#job-title-signup').value.trim();
    const company_name = document.querySelector('#company-name-signup').value.trim();

    if(username && email && password && job_title && company_name) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
                job_title,
                company_name
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //check the response status
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);