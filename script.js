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
  inputField.forEach((input) => {
    console.log(input);

    const inputType = input.placeholder;
    const group = input.parentNode;
    const invalid = group.querySelector('.input-invalid');
    
    if (input.value.length == 0){
      invalid.textContent = `${inputType} cannot be empty`;
      invalid.classList.add('show-invalid');
      e.preventDefault();
    } else {
      invalid.textContent = "";
      invalid.classList.remove('show-invalid');
    }
  });
});