let homoglyphs = {};

fetch("homoglyphs.json")
  .then(response => response.json())
  .then(data => {
    homoglyphs = data;
  })
  .catch(error => {
    console.error("Failed to load homoglyphs.json:", error);
  });

// Event setup
let inputField = document.getElementById("inputText");
inputField.addEventListener("input", checkHomoglyphs);

// Detection logic
function checkHomoglyphs() {
  let input = inputField.value;
  let result = document.getElementById("result");
  let found = [];

  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    for (let base in homoglyphs) {
      if (homoglyphs[base].includes(char)) {
        found.push(`'${char}' at position ${i + 1} (looks like '${base}')`);
      }
    }
  }

  if (found.length === 0) {
    result.innerHTML = "<span style='color:green'>No homoglyphs detected!</span>";
  } else {
    result.innerHTML =
      "<span style='color:red'>Potential Homoglyphs Detected:</span><br>" +
      found.join("<br>");
  }
}
