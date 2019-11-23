const simp3 = new Simp3();

function clearParagraphInput(paragraphElement) {
  paragraphElement.innerText = ""; // clear output
}

function getPlainInput() {
  return document.getElementById("plainText");
}

function getEncodedInput() {
  return document.getElementById("encodedText");
}

function displayOutput(paragraphElement, outputText) {
  let output = document.createTextNode(outputText);
  paragraphElement.appendChild(output);
}

function addInputListeners() {
  let plainInput = document.getElementById("plainText");
  plainInput.addEventListener('input', (e) => {
    console.log("plainText: ", e.target.value);
  });

  let encodedInput = document.getElementById("encodedText");
  encodedInput.addEventListener('input', (e) => {
    console.log("encodedText: ", e.target.value);
  });
}

function copyResults(val) {
  const el = document.createElement('textarea');
  el.value = val;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand('copy');
  document.body.removeChild(el);

  alert("Copied the encoded text");
}

function displayEncodedResult() {
  let encodedVal = simp3.encode(getPlainInput().value);
  let paragraph = document.getElementById("encoded-output");
  clearParagraphInput(paragraph);
  displayOutput(paragraph, encodedVal);
  copyResults(encodedVal);
}

function displayDecodedResult() {
  let decodedVal = simp3.decode(getEncodedInput().value);
  let paragraph = document.getElementById("decoded-output");
  clearParagraphInput(paragraph);
  displayOutput(paragraph, decodedVal);
  copyResults(decodedVal);
}

function addButtonListeners() {
  let encodeBtn = document.getElementById("encode-btn");
  encodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayEncodedResult();
  });

  let decodeBtn = document.getElementById("decode-btn");
  decodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayDecodedResult();
  });
}

addInputListeners();
addButtonListeners();

