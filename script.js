const inputField = document.querySelectorAll('.input-field');
const inputForm = document.querySelector('.input-form');

var isValidFirstName;
var isValidLastName;
var isValidEmailAddress;
var isValidPassword;

inputField.forEach(i => i.addEventListener('input', (e) => {
  const group = e.target.parentNode;
  const field = group.querySelector('.input-field');
  const invalid = group.querySelector('.input-invalid');
  
  const input = field.value;
  const inputType = field.placeholder;
  const inputPattern = field.dataset.pattern;

  if (input.length == 0) {
    invalid.textContent = `${inputType} cannot be empty`;
    invalid.classList.add('show-invalid');
    field.classList.add('input-field-invalid');
    field.classList.remove('input-field-invalid-text');
    return;
  }
  
  if(!validateInput(input, inputType)){
    if (inputType.toLowerCase() == 'email address') invalid.textContent = `${inputType} should follow this pattern ${inputPattern}`;
    else if (inputType.toLowerCase() == 'password') invalid.textContent = `${inputType} should contain atleast one ${inputPattern} and must atleast be 8 characters long.`;
    else invalid.textContent = `${inputType} should only contain characters ${inputPattern}`;
    invalid.classList.add('show-invalid');
    field.classList.add('input-field-invalid');
    field.classList.add('input-field-invalid-text');
  } else {
    invalid.textContent = '';
    invalid.classList.remove('show-invalid');
    field.classList.remove('input-field-invalid');
    field.classList.remove('input-field-invalid-text');
  }

  console.log(inputType);
}));

inputForm.addEventListener('submit', (e) => {
  inputField.forEach((input) => {
    console.log(input);

    const inputType = input.placeholder;
    const group = input.parentNode;
    const field = group.querySelector('.input-field');
    const invalid = group.querySelector('.input-invalid');
    
    if (input.value.length == 0){
      if (inputType.toLowerCase() == 'email address'){
        field.value = "email@example/com";
        field.classList.add('input-field-invalid-text');
      } else {
        field.value = " ";
      }

      invalid.textContent = `${inputType} cannot be empty`;
      invalid.classList.add('show-invalid');
      field.classList.add('input-field-invalid')
      e.preventDefault();
    } else {
      invalid.textContent = "";
      invalid.classList.remove('show-invalid');
      field.classList.remove('input-field-invalid')
    }
  });

  if (!isValidFirstName || !isValidLastName || !isValidEmailAddress || !isValidPassword)
    e.preventDefault();
});

function validateInput(input, type) {
  if (type.toLowerCase() == 'first name'){
    isValidFirstName = input.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    return isValidFirstName;
  }

  if (type.toLowerCase() == 'last name'){
    isValidLastName = input.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    return isValidLastName;
  }

  if (type.toLowerCase() == 'email address'){
    isValidEmailAddress = input.toLowerCase()
                                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return isValidEmailAddress;
  }

  if (type.toLowerCase() == 'password'){
    isValidPassword = input.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/);
    return isValidPassword;
  }
}