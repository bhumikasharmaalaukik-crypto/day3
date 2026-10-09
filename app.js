const VIEWS = ['login', 'register'];
const DEFAULT_VIEW = 'login';

const views = Object.fromEntries(
  VIEWS.map(name => [name, document.getElementById(`view-${name}`)])
);
const navLinks = document.querySelectorAll('.auth-nav [data-nav]');


function getViewFromHash() {
  const name = location.hash.slice(1);              
  return VIEWS.includes(name) ? name : DEFAULT_VIEW; 
}
function showView(active) {
  VIEWS.forEach(name => {
    views[name].hidden = name !== active;           
  });

  navLinks.forEach(link => {                        
    if (link.dataset.nav === active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  document.title = views[active].dataset.title;     
  views[active].querySelector('h1').focus();        
}
document.addEventListener('click', event => {
  const link = event.target.closest('[data-nav]');
  if (!link) return;

  event.preventDefault();
  const target = link.dataset.nav;
  if (target !== getViewFromHash()) {
    location.hash = target;                         
  }
});

window.addEventListener('hashchange', () => showView(getViewFromHash()));
function messageFor(input) {
  const label = document.querySelector(`label[for="${input.id}"]`).textContent;
  const v = input.validity;

  if (v.valueMissing) return `${label} is required.`;
  if (v.typeMismatch) return 'Enter a valid email, like name@example.com.';
  if (v.tooShort)     return `${label} needs at least ${input.minLength} characters.`;
  if (v.customError)  return input.validationMessage;
  return '';
}

function validateField(input) {
  
  if (input.id === 'reg-confirm' || input.id === 'reg-password') {
    const pw = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm');
    confirm.setCustomValidity(
      confirm.value && confirm.value !== pw.value ? 'Passwords do not match.' : ''
    );
  }

  const message = messageFor(input);
  document.getElementById(`${input.id}-error`).textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return message;
}

document.querySelectorAll('form[data-form]').forEach(form => {
  const inputs = [...form.querySelectorAll('input')];
  const success = form.querySelector('.success');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
      
      if (input.id === 'reg-password') {
        const confirm = document.getElementById('reg-confirm');
        if (confirm.value) validateField(confirm);
      }
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const firstBad = inputs.find(input => validateField(input));
    inputs.forEach(validateField);               

    if (firstBad) {
      firstBad.focus();
      success.hidden = true;
      return;
    }

    
    if (form.dataset.form === 'register') {
      form.reset();
      location.hash = 'login';                      
    } else {
      success.textContent = 'Logged in successfully (demo).';
      success.hidden = false;
    }
  });
});
=======
const VIEWS = ['login', 'register'];
const DEFAULT_VIEW = 'login';

const views = Object.fromEntries(
  VIEWS.map(name => [name, document.getElementById(`view-${name}`)])
);
const navLinks = document.querySelectorAll('.auth-nav [data-nav]');


function getViewFromHash() {
  const name = location.hash.slice(1);              
  return VIEWS.includes(name) ? name : DEFAULT_VIEW; 
}
function showView(active) {
  VIEWS.forEach(name => {
    views[name].hidden = name !== active;           
  });

  navLinks.forEach(link => {                        
    if (link.dataset.nav === active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  document.title = views[active].dataset.title;     
  views[active].querySelector('h1').focus();        
}
document.addEventListener('click', event => {
  const link = event.target.closest('[data-nav]');
  if (!link) return;

  event.preventDefault();
  const target = link.dataset.nav;
  if (target !== getViewFromHash()) {
    location.hash = target;                         
  }
});

window.addEventListener('hashchange', () => showView(getViewFromHash()));
function messageFor(input) {
  const label = document.querySelector(`label[for="${input.id}"]`).textContent;
  const v = input.validity;

  if (v.valueMissing) return `${label} is required.`;
  if (v.typeMismatch) return 'Enter a valid email, like name@example.com.';
  if (v.tooShort)     return `${label} needs at least ${input.minLength} characters.`;
  if (v.customError)  return input.validationMessage;
  return '';
}

function validateField(input) {
  
  if (input.id === 'reg-confirm' || input.id === 'reg-password') {
    const pw = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm');
    confirm.setCustomValidity(
      confirm.value && confirm.value !== pw.value ? 'Passwords do not match.' : ''
    );
  }

  const message = messageFor(input);
  document.getElementById(`${input.id}-error`).textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return message;
}

document.querySelectorAll('form[data-form]').forEach(form => {
  const inputs = [...form.querySelectorAll('input')];
  const success = form.querySelector('.success');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
      
      if (input.id === 'reg-password') {
        const confirm = document.getElementById('reg-confirm');
        if (confirm.value) validateField(confirm);
      }
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const firstBad = inputs.find(input => validateField(input));
    inputs.forEach(validateField);               

    if (firstBad) {
      firstBad.focus();
      success.hidden = true;
      return;
    }

    
    if (form.dataset.form === 'register') {
      form.reset();
      location.hash = 'login';                      
    } else {
      success.textContent = 'Logged in successfully (demo).';
      success.hidden = false;
    }
  });
});
>>>>>>> 3da56306abad99e2078a0f485279c0500b1339f0
showView(getViewFromHash());