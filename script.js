const inputField = document.querySelectorAll('.input-field');
const inputForm = document.querySelector('.input-form');

var isValidFirstName;
var isValidLastName;
var isValidEmailAddress;
var isValidPassword;

document.querySelectorAll('.input-field').forEach((field) => {
  field.value = '';
});

document.querySelector('[data-type="Email Address"]').addEventListener('focus', (e) => {
  if(e.target.value == 'email@example/com' && e.target.placeholder.length == 0){
    e.target.value = '';
    e.target.classList.remove('input-field-invalid-text');
  }
});

inputField.forEach(i => i.addEventListener('input', (e) => {
  const group = e.target.parentNode.parentNode;
  const field = group.querySelector('.input-field');
  const invalid = group.querySelector('.input-invalid');
  const icon = group.querySelector('.input-field-invalid-icon');
  
  const input = field.value;
  const inputType = field.dataset.type;
  const inputPattern = field.dataset.pattern;

  if (input.length == 0) {
    field.classList.remove('input-field-invalid-text');
    field.classList.add('input-field-invalid');
    field.placeholder = inputType;
    invalid.textContent = `${inputType} cannot be empty`;
    invalid.classList.add('show-invalid');
    icon.classList.add('show-invalid-icon');
    return;
  }
  
  if(!validateInput(input, inputType)){
    field.classList.add('input-field-invalid');
    field.classList.add('input-field-invalid-text');
    if (inputType.toLowerCase() == 'email address') invalid.textContent = `${inputType} should follow this pattern ${inputPattern}`;
    else if (inputType.toLowerCase() == 'password') invalid.textContent = `${inputType} should contain atleast one ${inputPattern} and must atleast be 8 characters long.`;
    else invalid.textContent = `${inputType} should only contain the characters ${inputPattern} and should be 3-48 characters long.`;
    invalid.classList.add('show-invalid');
    icon.classList.add('show-invalid-icon');
  } else {
    field.classList.remove('input-field-invalid');
    field.classList.remove('input-field-invalid-text');
    invalid.textContent = '';
    invalid.classList.remove('show-invalid');
    icon.classList.remove('show-invalid-icon');
  }
}));

inputForm.addEventListener('submit', (e) => {
  inputField.forEach((input) => {
    const inputType = input.dataset.type;
    const group = input.parentNode.parentNode;
    const field = group.querySelector('.input-field');
    const invalid = group.querySelector('.input-invalid');
    const icon = group.querySelector('.input-field-invalid-icon');
    const inputPattern = input.dataset.pattern;
    
    if (input.value.length == 0 || !validateInput(input.value, inputType)) {
      field.classList.add('input-field-invalid')
      if (inputType.toLowerCase() == 'email address'){
        field.value = "email@example/com";
        field.classList.add('input-field-invalid-text');
      }

      field.placeholder = "";

      if (input.value.length > 0 && !validateInput(input.value, inputType)){
        if (inputType.toLowerCase() == 'email address') invalid.textContent = `${inputType} should follow this pattern ${inputPattern}`;
        else if (inputType.toLowerCase() == 'password') invalid.textContent = `${inputType} should contain atleast one ${inputPattern} and must atleast be 8 characters long.`;
        else invalid.textContent = `${inputType} should only contain the characters ${inputPattern} and should be 3-48 cha`;
      }
      else invalid.textContent = `${inputType} cannot be empty`;
      invalid.classList.add('show-invalid');
      icon.classList.add('show-invalid-icon');
      e.preventDefault();
    } else {
      field.classList.remove('input-field-invalid')
      invalid.textContent = "";
      invalid.classList.remove('show-invalid');
      icon.classList.remove('show-invalid-icon');
    }
  });

  if (!isValidFirstName || !isValidLastName || !isValidEmailAddress || !isValidPassword)
    e.preventDefault();
});

function validateInput(input, type) {
  if (type.toLowerCase() == 'first name'){
    isValidFirstName = input.match(/^(?=.{3,48}$)[a-zA-Z]+([',. -][a-zA-Z]+)*$/);
    return isValidFirstName;
  }

  if (type.toLowerCase() == 'last name'){
    isValidLastName = input.match(/^(?=.{3,48}$)[a-zA-Z]+([',. -][a-zA-Z]+)*$/);
    return isValidLastName;
  }

  if (type.toLowerCase() == 'email address'){
    isValidEmailAddress = input.toLowerCase()
                                .match(/^(?=.{6,256}$)(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return isValidEmailAddress;
  }

  if (type.toLowerCase() == 'password'){
    isValidPassword = input.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,256}$/);
    return isValidPassword;
  }
}