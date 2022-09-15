const inputField = document.querySelectorAll('.input-field');
const inputForm = document.querySelector('.input-form');

const isValidFirstName = false;
const isValidLastName = false;
const isValidEmailAddress = false;
const isValidPassword = false;

inputField.forEach(i => i.addEventListener('input', (e) => {
  const group = e.target.parentNode;
  const field = group.querySelector('.input-field');
  const invalid = group.querySelector('.input-invalid');
}));

inputForm.addEventListener('submit', (e) => {
  console.log(e.target);
  e.preventDefault();
});