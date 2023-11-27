


function getData() {
  const xhr = new XMLHttpRequest();
  var word = document.getElementById("word").value;
  var letters = /^[A-Za-z]+$/;

  if (word.match(letters)) {
    let endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    xhr.open("GET", endpoint, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        displayData(response);
      } else {
        displayError("Failed to fetch");
      }
    };
    xhr.onerror = function() {
      displayError("An error occurred");
    };
    xhr.send();
  } else {
    displayError("Invalid word");
  }
}

function displayData(data) {
  const wordDataElement = document.getElementById("wordData");
  wordDataElement.innerHTML = "";

  const word = data[0].word;
  const meaning = data[0].meanings[0];
  const definition = meaning.definitions[0].definition;
  const example = meaning.definitions[0].example;
  const partOfSpeech = meaning.partOfSpeech;
  const synonyms = meaning.definitions[0].synonyms;

  const wordElement = document.createElement("p");
  wordElement.textContent = "Word: " + word;

  const partOfSpeechElement = document.createElement("p");
  partOfSpeechElement.textContent = "Part of Speech: " + partOfSpeech;

  const definitionElement = document.createElement("p");
  definitionElement.textContent = "Definition: " + definition;

  const exampleElement = document.createElement("p");
  if (example && example.length > 0) {
    exampleElement.textContent = "Example: " + example;
  } else {
    exampleElement.textContent = "Example: Sorry, no examples available";
  }

  const synonymsElement = document.createElement("p");
  if (synonyms && synonyms.length > 0) {
    synonymsElement.textContent = "Synonyms: " + synonyms.join(", ");
  } else {
    synonymsElement.textContent = "Synonyms: Sorry, no synonyms available";
  }

  
  const share = document.createElement("button");
  share.textContent = "Share";
  share.addEventListener("click", shareWord);

  wordDataElement.appendChild(wordElement);
  wordDataElement.appendChild(partOfSpeechElement);
  wordDataElement.appendChild(definitionElement);
  wordDataElement.appendChild(exampleElement);
  wordDataElement.appendChild(synonymsElement);
  wordDataElement.appendChild(share);

}
function clearData() {
  const wordDataElement = document.getElementById("wordData");
  wordDataElement.innerHTML = "";
}


function shareWord() {
  const word = document.getElementById("word").value;
  const url = window.location.href;
  const shareText = `Check out the definition of '${word}' on this dictionary website: ${url}`;

  // Use the Web Share API to open the share dialog
  if (navigator.share) {
    navigator.share({
      title: "Dictionary Word",
      text: shareText
    })
      .then(() => console.log("Shared successfully."))
      .catch((error) => console.log("Error sharing:", error));
  } else {
    // Fallback behavior if the Web Share API is not supported
    console.log("Web Share API is not supported.");
    // You can provide an alternative share mechanism here, such as copying the shareText to the clipboard or opening a share dialog.
  }
}