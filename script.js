const inputField = document.querySelectorAll('.input-field');

inputField.forEach(i => i.addEventListener('input', (e) => {
  const group = e.target.parentNode;
  const field = group.querySelector('.input-field');
  const invalid = group.querySelector('.input-invalid');
  invalid.textContent = field.value;
}));