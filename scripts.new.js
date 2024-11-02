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
  const inputsQuantity = document.querySelectorAll('.productForm-quantity');
  inputsQuantity.forEach((input) => {
    const inputField = input.querySelector('.productForm-quantity__field');
    const inputQuantityText = document.getElementById(inputField.getAttribute('data-sync-with'))

    const inputBtnIncrease = input.querySelector('.productForm-quantity__btn[data-action=increase]');
    const inputBtnDecrease = input.querySelector('.productForm-quantity__btn[data-action=decrease]');
    inputBtnIncrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      inputField.value = initialValue + 1;
      syncState()
    });
    inputBtnDecrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      if (initialValue > 1) inputField.value = initialValue - 1;
      syncState()
    });

    inputField.addEventListener('change', syncState)
    syncState()

    function syncState() {
      const value = inputField.value * 1;
      const items = value === 1 ? 'item' : 'items';
      inputQuantityText.textContent = `${value} ${items}`;

      if (value === 1) {
        inputBtnDecrease.setAttribute('disabled', true);
      } else {
        inputBtnDecrease.removeAttribute('disabled');
      }
    }
  });
})

window.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('#color-select input');
  radioButtons.forEach((input) => {
    const syncedElement = document.getElementById(input.getAttribute('data-sync-with'))

    input.addEventListener('change', syncState)

    function syncState(e) {
      const value = e.target.getAttribute('aria-label') || e.target.value;
      syncedElement.textContent = `Color - ${value}`;
    }
  });
})

window.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu_toggle');
  menuToggle.getElementsByTagName('input')[0].addEventListener('change', (e => {
    menuToggle.setAttribute('aria-label', e.target.checked ? 'Collapse menu' : 'Expand menu')
  }))
})

window.addEventListener("DOMContentLoaded", () => {
  const popovers = document.querySelectorAll('[popover]');

  function handleFocusOnOpen(element) {
      const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusableElement = focusableElements[0];
      (firstFocusableElement || element).focus();
  }

  popovers.forEach((popoverElement) => {
      popoverElement.addEventListener("toggle", ({newState}) => { newState === 'open' && handleFocusOnOpen(popoverElement) });
  });
})
