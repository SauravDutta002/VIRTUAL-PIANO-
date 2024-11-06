const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input"),
  toggleButton = document.querySelector(".toggle-sequence"),
  songSelector = document.querySelector("#songSelector");

let allKeys = [],
  audio = new Audio(`tunes/a.wav`),
  isSequenceEnabled = true;

const songSequences = {
  "Happy Birthday": [
    "s",
    "s",
    "d",
    "s",
    "g",
    "f",
    "s",
    "s",
    "d",
    "s",
    "h",
    "g",
    "s",
    "s",
    "u",
    "y",
    "g",
    "f",
    "d",
    "j",
    "j",
    "y",
    "g",
    "h",
    "g",
  ],

  "Twinkle Twinkle": [
    "a",
    "a",
    "g",
    "g",
    "h",
    "h",
    "g",
    "f",
    "f",
    "d",
    "d",
    "a",
  ],
  "Saregamapa": [
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "k",
    "j",
    "h",
    "g",
    "f",
    "d",
    "s",
    "a",
  ],
};

let currentNoteIndex = 0;
let songSequence = songSequences["Happy Birthday"];

const playTune = (key) => {
  audio.src = `tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => {
      clickedKey.classList.remove("active");
    }, 150);
  }

  if (isSequenceEnabled) {
    if (key === songSequence[currentNoteIndex]) {
      removeHighlight();
      currentNoteIndex++;
      highlightNextKey();
    } else {
      clickedKey.classList.add("error");
      setTimeout(() => {
        clickedKey.classList.remove("error");
      }, 300);
    }

    if (currentNoteIndex >= songSequence.length) {
      currentNoteIndex = 0;
      highlightNextKey();
    }
  }
};

const highlightNextKey = () => {
  if (currentNoteIndex < songSequence.length) {
    const nextKey = songSequence[currentNoteIndex];
    const keyToHighlight = document.querySelector(`[data-key="${nextKey}"]`);

    if (keyToHighlight) {
      keyToHighlight.classList.add("highlight");
    }
  }
};

const removeHighlight = () => {
  pianoKeys.forEach((key) => key.classList.remove("highlight"));
};

const toggleSequence = () => {
  isSequenceEnabled = !isSequenceEnabled;
  toggleButton.textContent = isSequenceEnabled ? "Disable Song" : "Enable Song";

  if (isSequenceEnabled) {
    currentNoteIndex = 0;
    highlightNextKey();
  } else {
    removeHighlight();
  }
};

const changeSong = () => {
  const selectedSong = songSelector.value;
  songSequence = songSequences[selectedSong] || songSequences["Happy Birthday"];
  currentNoteIndex = 0;
  highlightNextKey();
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
toggleButton.addEventListener("click", toggleSequence);

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (allKeys.includes(key)) {
    playTune(key);
  }
});

songSelector.addEventListener("change", changeSong);
