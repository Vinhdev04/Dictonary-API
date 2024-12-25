const keyAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";
console.log(keyAPI);

const result = document.querySelector("#result");
console.log("🚀 ~ result :", result);

const searchBtn = document.querySelector("#search-btn");
console.log("🚀 ~ searchBtn :", searchBtn);

const sounds = document.querySelector("#sound");
console.log("🚀 ~ sounds:", sounds);

searchBtn.addEventListener("click", function () {
  let input = document.querySelector("#search-word").value;
  console.log(input);

  fetch(`${keyAPI}${input}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      result.innerHTML = ` 
        <div class="word">
          <h3 class="title">${input}</h3>
          <button class="control" onclick="playSound()" >
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="word-details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>${data[0].phonetic}</p>
        </div>
        <p class="word-mean">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
        </p>
      `;

      // Check if the audio URL exists
      const audioUrl = data[0].phonetics[0]?.audio;
      if (audioUrl) {
        sounds.setAttribute("src", `https:${audioUrl}`);
      } else {
        console.log("No audio available for this word.");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "<p>Sorry, we couldn't find the word.</p>";
    });
});

function playSound() {
  sounds.play();
}
