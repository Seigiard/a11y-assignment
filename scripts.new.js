function handleFromSubmitAndShowPopover(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const formDataObject = Array(...formData.entries());
  const popoverTarget = document.getElementById(form.getAttribute('popovertarget'));

  const dlElement = Array.from(popoverTarget.children).find(child => child.tagName === 'DL');
  if (dlElement) {
      dlElement.remove();
  }

  popoverTarget.insertAdjacentHTML('beforeend', '<dl>' + formDataObject.map(([name, value]) => `<dt>${name}</dt><dd>${value}<dd>`).join('') + '</dl>');
  popoverTarget.showPopover();
}

window.addEventListener("DOMContentLoaded", () => {
  const inputsQuantity = document.querySelectorAll('.input-quantity');
  inputsQuantity.forEach((input) => {
    const inputField = input.querySelector('.input-quantity__field');
    const inputBtnIncrease = input.querySelector('.input-quantity__btn[data-action=increase]');
    const inputBtnDecrease = input.querySelector('.input-quantity__btn[data-action=decrease]');
    inputBtnIncrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      inputField.value = initialValue + 1;
    });
    inputBtnDecrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      if (initialValue > 1) inputField.value = initialValue - 1;
    });
  });
})
