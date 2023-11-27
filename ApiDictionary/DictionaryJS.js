


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
    displayError("Sorry, Try Again");
  }
}

function displayData(data) {
  const wordDataElement = document.getElementById("wordData");
  wordDataElement.innerHTML = "";
if (data.length > 0) {


  const word = data[0].word;
  const meaning = data[0].meanings[0];
  const definition = data[0].meanings[0].definitions[0].definition;
  const example = meaning.definitions[0].example;
  const partOfSpeech = meaning.partOfSpeech;
  const synonyms = meaning.definitions[0].synonyms;
  const antonyms= meaning.definitions[0].antonyms;

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

  const antonymsElement = document.createElement("p");
  if (antonyms && antonyms.length > 0) {
    antonymsElement.textContent = "antonyms: " + antonyms.join(", ");
  } else {
    antonymsElement.textContent = "Antonyms: Sorry, no Antonyms available";
  }
  

  wordDataElement.appendChild(wordElement);
  wordDataElement.appendChild(partOfSpeechElement);
  wordDataElement.appendChild(definitionElement);
  wordDataElement.appendChild(exampleElement);
  wordDataElement.appendChild(synonymsElement);
  wordDataElement.appendChild(antonymsElement);
  

}
else{
  displayError("Sorry, Try Again");
}
}


function clearData() {
  const wordDataElement = document.getElementById("wordData");
  wordDataElement.innerHTML = "";
}


function shareWord() {
  const word = document.getElementById("word").value;
  const url = window.location.href;
  const shareText = `Check out the definition of '${word}' on this dictionary website: ${url}`;

 
  if (navigator.share) {
    navigator.share({
      title: "Dictionary Word",
      text: shareText
    })
      .then(() => console.log("Shared successfully."))
      .catch((error) => console.log("Error sharing:", error));
  } else {
    
    console.log("Web Share API is not supported.");
    
  }
}

function displayError(errorMessage) {
  const errorElement = document.createElement("p");
  errorElement.textContent = errorMessage;
  const wordDataElement = document.getElementById("wordData");
  wordDataElement.innerHTML = "";
  wordDataElement.appendChild(errorElement);
}