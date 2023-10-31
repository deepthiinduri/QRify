const itemList = [
  "",
  "Name",
  "Url",
  "Phone Number",
  "Email",
  "Contact",
  "Paragraph",
  "Description",
  "Link",
  "Address",
];

const outputEl = document.getElementById("animate");
const typeSpeed = 100;
const eraseSpeed = 50;
const pauseDuration = 1000;

function animateText(text) {
  let textIndex = 0;

  function typeText() {
    if (textIndex < text.length) {
      outputEl.textContent += text.charAt(textIndex);
      textIndex++;
      setTimeout(typeText, typeSpeed);
    } else {
      setTimeout(eraseText, pauseDuration);
    }
  }

  function eraseText() {
    if (textIndex > 0) {
      outputEl.textContent = outputEl.textContent.slice(0, -1);
      textIndex--;
      setTimeout(eraseText, eraseSpeed);
    } else {
      proceedToNextItem();
      textIndex = 0;
    }
  }

  function proceedToNextItem() {
    outputEl.textContent = "";

    if (itemList.length > 0) {
      const nextItem = itemList.shift();
      setTimeout(() => animateText(nextItem), pauseDuration);
    } else {
      outputEl.innerHTML = "Text";
    }
  }

  typeText();
}

const initialItem = itemList.shift();
animateText(initialItem);
