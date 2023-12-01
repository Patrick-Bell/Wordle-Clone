const targetWords = ["apple", "blues", "cloud"]
const dictionary = ["apple", "blues", "train", "fours", "highs", "frame", "boots", "laces", "plane", "plain", "guess", "virus", "cloud"]


let stats = JSON.parse(localStorage.getItem('wordleStats')) || {
  gamesPlayed: 1,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  winPercentage: 0,
  // Add more stats as needed
};

function updateWinPercentage() {
  if (stats.gamesPlayed === 0) {
    stats.winPercentage = 0;
  } else {
    stats.winPercentage = ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(2);
  }
}

// Call this function whenever you need to update the win percentage
updateWinPercentage();

// Retrieve UI elements for displaying stats
const gamesPlayedElement = document.querySelector(".stats-number-games-played");
const gamesWonElement = document.querySelector(".stats-number-games-won");
const currentStreakElement = document.querySelector(".stats-number-current-streak");
const maxStreakElement = document.querySelector(".stats-number-max-streak");
const winPercentageElement = document.querySelector(".stats-number-win-percentage")

function updateStatsUI() {
  gamesPlayedElement.textContent = stats.gamesPlayed;
  gamesWonElement.textContent = stats.gamesWon;
  currentStreakElement.textContent = stats.currentStreak;
  maxStreakElement.textContent = stats.maxStreak;
  winPercentageElement.textContent = stats.winPercentage + " %";
  updateWinPercentage();

}
  
  
  const WORD_LENGTH = 5
  const FLIP_ANIMATION_DURATION = 500
  const DANCE_ANIMATION_DURATION = 500
  let keyboard = document.querySelector("[data-keyboard]")
  let alertContainer = document.querySelector("[data-alert-container]")
  const guessGrid = document.querySelector("[data-guess-grid]")
  let randomIndex = Math.floor(Math.random() * targetWords.length);
  let targetWord = targetWords[randomIndex]
  const winModal = document.querySelector(".win-modal");
  const loseModal = document.querySelector(".lose-modal");
  let theWord = document.querySelector(".theword");
  let loseWord = document.querySelector(".loseword")
  theWord = targetWord;
  loseWord = targetWord;
  let wikiWord = targetWord;
  console.log(targetWord);
  console.log(wikiWord);

  // Define badge variables
const badge1 = document.querySelector("#badge1");
const badge2 = document.querySelector("#badge2");
const badge3 = document.querySelector("#badge3");
const badge4 = document.querySelector("#badge4");
const badge5 = document.querySelector("#badge5");
const badge6 = document.querySelector("#badge6");
const badge7 = document.querySelector("#badge7");
const badge9 = document.querySelector("#badge9");
const badge10 = document.querySelector("#badge10");
const badge11 = document.querySelector("#badge11");
const badge12 = document.querySelector("#badge12");
const badge13 = document.querySelector("#badge13");
const badge14 = document.querySelector("#badge14");
const badge15 = document.querySelector("#badge15");
const badge16 = document.querySelector("#badge16");
const platinumBadge = document.querySelector("#badgeplat");

let badge1Unlocked = localStorage.getItem('badge1Unlocked') === 'true';
let badge2Unlocked = localStorage.getItem('badge2Unlocked') === 'true';
let badge3Unlocked = localStorage.getItem('badge3Unlocked') === 'true';
let badge4Unlocked = localStorage.getItem('badge4Unlocked') === 'true';
let badge5Unlocked = localStorage.getItem('badge5Unlocked') === 'true';
let badge6Unlocked = localStorage.getItem('badge6Unlocked') === 'true';
let badge7Unlocked = localStorage.getItem('badge7Unlocked') === 'true';
let badge9Unlocked = localStorage.getItem('badge9Unlocked') === 'true';
let badge10Unlocked = localStorage.getItem('badge10Unlocked') === 'true';
let badge11Unlocked = localStorage.getItem('badge11Unlocked') === 'true';
let badge12Unlocked = localStorage.getItem('badge12Unlocked') === 'true';
let badge13Unlocked = localStorage.getItem('badge13Unlocked') === 'true';
let badge14Unlocked = localStorage.getItem('badge14Unlocked') === 'true';
let badge15Unlocked = localStorage.getItem('badge15Unlocked') === 'true';
let badge16Unlocked = localStorage.getItem('badge16Unlocked') === 'true';
let platinumBadgeUnlocked = localStorage.getItem('platinumBadgeUnlocked') === 'true';

const allBadgesUnlocked =
badge1Unlocked &&
badge2Unlocked &&
badge3Unlocked &&
badge4Unlocked &&
badge5Unlocked &&
badge6Unlocked &&
badge7Unlocked &&
badge9Unlocked &&
badge10Unlocked &&
badge11Unlocked &&
badge12Unlocked &&
badge13Unlocked &&
badge14Unlocked &&
badge16Unlocked
platinumBadgeUnlocked


let hiddenBadgeName = document.getElementById("badge6name");
let hiddenBadgeName2 = document.getElementById("badge7name");

let gameStartTime = new Date()
let gameEndTime = new Date()


// Function to retrieve badge status from localStorage
function retrieveBadgeStatus() {
  // Apply the badge status to the badge elements
  if (badge1Unlocked) {
    badge1.classList.remove("bi-file-lock-fill");
    badge1.classList.add("bi-hand-thumbs-up-fill");
    badge1.style.color = "blue";
  }
  if (badge2Unlocked) {
    badge2.classList.remove("bi-file-lock-fill");
    badge2.classList.add("bi-key-fill");
    badge2.style.color = "orange";
  }
  if (badge3Unlocked) {
    badge3.classList.remove("bi-file-lock-fill");
    badge3.classList.add("bi-suit-club-fill");
    badge3.style.color = "red";
  }
  if (badge4Unlocked) {
    badge4.classList.remove("bi-file-lock-fill");
    badge4.classList.add("bi-globe-americas");
    badge4.style.color = "blue";
  }
  if (badge5Unlocked) {
    badge5.classList.remove("bi-file-lock-fill");
    badge5.classList.add("bi-radioactive");
    badge5.style.color = "yellow";
  }
  if (badge6Unlocked) {
    badge6.classList.remove("bi-file-lock-fill")
    badge6.classList.add("bi-apple");
    badge6.style.color = "red"
    hiddenBadgeName.innerHTML = "Hidden Word: Apple!"
  }
  if (badge7Unlocked) {
    badge7.classList.remove("bi-file-lock-fill");
    badge7.classList.add("bi-rocket-takeoff-fill");
    badge7.style.color = "purple";
  }
  if (badge9Unlocked) {
    badge9.classList.remove("bi-file-lock-fill")
    badge9.classList.add("bi-pin-angle-fill")
    badge9.style.color = "lightblue"
  }
  if (badge10Unlocked) {
    badge10.classList.remove("bi-file-lock-fill")
    badge10.classList.add("bi-speedometer")
    badge10.style.color = "yellow"
  }
  if (badge11Unlocked) {
    badge11.classList.remove("bi-file-lock-fill");
    badge11.classList.add("bi-alarm-fill");
    badge11.style.color = "pink"
  }
  if (badge12Unlocked) {
    badge12.classList.remove("bi-file-lock-fill")
    badge12.classList.add("bi-file-word-fill")
    badge12.style.color = "gold"
  }
  if (badge13Unlocked) {
    badge13.classList.remove("bi-file-lock-fill")
    badge13.classList.add("bi-robot")
    badge13.style.color = "grey"
}
  if (badge14Unlocked) {
    badge14.classList.remove("bi-file-lock-fill")
    badge14.classList.add("bi-database-fill-check")
    badge14.style.color = "yellow"
} 
if (badge16Unlocked) {
  badge16.classList.remove("bi-file-lock-fill")
  badge16.classList.add("bi-cloudy-fill");
  badge16.style.color = "lightblue"
  hiddenBadgeName.innerHTML = "Hidden Word: Cloud!"
}
if (platinumBadgeUnlocked) {
    platinumBadge.classList.remove("bi-file-lock-fill");
    platinumBadge.classList.add("bi-gem");
    platinumBadge.style.color = "silver"
}
     
}

// Function to update badge status
function updateBadges() {
  if (stats.gamesPlayed >= 1 && stats.gamesPlayed < 2) {
    badge1Unlocked = true;
    badge1.classList.remove("bi-file-lock-fill");
    badge1.classList.add("bi-hand-thumbs-up-fill");
    badge1.style.color = "blue";
    localStorage.setItem('badge1Unlocked', 'true');
  }
  if (!badge2Unlocked && stats.gamesWon >= 1 && stats.gamesWon < 2) {
    badge2.classList.remove("bi-file-lock-fill");
    badge2.classList.add("bi-key-fill");
    badge2.style.color = "orange";
    localStorage.setItem('badge2Unlocked', 'true');
  }
  if (!badge3Unlocked && stats.maxStreak >= 10 && stats.maxStreak < 11) {
    badge3.classList.remove("bi-file-lock-fill");
    badge3.classList.add("bi-suit-club-fill");
    badge3.style.color = "red";
    localStorage.setItem('badge3Unlocked', 'true');
  }
  if (!badge4Unlocked && stats.gamesPlayed >= 10 && stats.gamesPlayed < 11) {
    badge4.classList.remove("bi-file-lock-fill");
    badge4.classList.add("bi-globe-americas");
    badge4.style.color = "blue";
    localStorage.setItem('badge4Unlocked', 'true');
  }
  if (!badge5Unlocked && stats.maxStreak >= 25 && stats.maxStreak < 26) {
    badge5.classList.remove("bi-file-lock-fill");
    badge5.classList.add("bi-radioactive");
    badge5.style.color = "yellow";
    localStorage.setItem('badge5Unlocked', 'true');
  }
  if (!badge7Unlocked && stats.gamesPlayed >= 25 && stats.gamesPlayed < 26) {
    badge7.classList.remove("bi-file-lock-fill");
    badge7.classList.add("bi-rocket-takeoff-fill");
    badge7.style.color = "purple";
    localStorage.setItem('badge7Unlocked', 'true')
  }
  if (!badge11Unlocked && stats.gamesPlayed >= 100 && stats.gamesPlayed < 101) {
    badge11.classList.remove("bi-file-lock-fill");
    badge11.classList.add("bi-alarm-fill");
    badge11.style.color = "pink";
    localStorage.setItem('badge11Unlocked', 'true')
  }
  if (!badge12Unlocked && stats.gamesWon >= 1000 && stats.gamesWon < 1001) {
    badge12.classList.remove("bi-file-lock-fill");
    badge12.classList.add("bi-file-word-fill");
    badge12.style.color = "gold";
    localStorage.setItem('badge12Unlocked', 'true')
  }
  if (!badge14Unlocked && stats.gamesPlayed >= 20 && stats.winPercentage >= 70) {
    badge14.classList.remove("bi-file-lock-fill");
    badge14.classList.add("bi-database-fill-check");
    badge14.style.color = "yellow";
    localStorage.setItem('badge14Unlocked', 'true')
  }
  // If all other badges are unlocked, unlock the special badge
  if (allBadgesUnlocked && !platinumBadgeUnlocked) {
    platinumBadgeUnlocked = true;  // Set platinumBadgeUnlocked to true
    platinumBadge.classList.remove("bi-file-lock-fill");
    platinumBadge.classList.add("bi-gem");
    platinumBadge.style.color = "silver";  // Adjust the color based on your design
    localStorage.setItem('platinumBadgeUnlocked', 'true');
  }


  retrieveBadgeStatus();

}

  updateBadges();
  retrieveBadgeStatus();
  startInteraction();
  gameStartTime = new Date()


  function startInteraction() {
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("keydown", handleKeyPress)
  }
  
  function stopInteraction() {
    document.removeEventListener("click", handleMouseClick)
    document.removeEventListener("keydown", handleKeyPress)
  }
  
  function handleMouseClick(e) {
    if (e.target.matches("[data-key]")) {
      pressKey(e.target.dataset.key)
      return
    }
  
    if (e.target.matches("[data-enter]")) {
      submitGuess()
      return
    }
  
    if (e.target.matches("[data-delete]")) {
      deleteKey()
      return
    }
  }
  
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      submitGuess()
      return
    }
  
    if (e.key === "Backspace" || e.key === "Delete") {
      deleteKey()
      return
    }
  
    if (e.key.match(/^[a-z]$/)) {
      pressKey(e.key)
      return
    }
  }
  
  function pressKey(key) {
    const activeTiles = getActiveTiles()
    if (activeTiles.length >= WORD_LENGTH) return
    const nextTile = guessGrid.querySelector(":not([data-letter])")
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
  }
  
  function deleteKey() {
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
  }

  

  function updateWikiLink() {
    const wikiSentence = document.querySelector(".wiki");
    const wikiLoseSentence = document.querySelector(".wikilose");
    const wikiLearn = "https://en.wikipedia.org/wiki/";
    theWord.innerHTML = `${targetWord}`
    loseWord.innerHTML = `${targetWord}`
    wikiSentence.innerHTML = `<strong>Learn More:</strong> <a id="learn-more-link" href="${wikiLearn}${wikiWord}" target="_blank">Click Here!</a>`;
    wikiLoseSentence.innerHTML = `<strong>Learn More:</strong> <a id="learn-more-link" href="${wikiLearn}${wikiWord}" target="_blank">Click Here!</a>`;
  }
  
  function submitGuess() {
    const activeTiles = [...getActiveTiles()];
    if (activeTiles.length !== WORD_LENGTH) {
      showAlert("Not enough letters");
      shakeTiles(activeTiles);
      return;
    }
  
    const guess = activeTiles.reduce((word, tile) => {
      return word + tile.dataset.letter;
    }, "");
  
    if (!dictionary.includes(guess)) {
      showAlert("Not in word list");
      shakeTiles(activeTiles);
      return;
    }
  
    // Set the data-guessed attribute to "true" on the active tiles so the tiles can change to white...
    activeTiles.forEach(tile => {
      tile.dataset.guessed = "true";
    });
  
    // Change text color of the active tiles to white once the guess has been submitted (=true)
    activeTiles.forEach(tile => {
      tile.style.color = "white";
    });
  
    stopInteraction();
    activeTiles.forEach((...params) => flipTile(...params, guess));
  }
  
  function flipTile(tile, index, array, guess) {
    const letter = tile.dataset.letter
    const key = keyboard.querySelector(`[data-key="${letter}"i]`)
    setTimeout(() => {
      tile.classList.add("flip")
    }, (index * FLIP_ANIMATION_DURATION) / 2)
  
    tile.addEventListener(
      "transitionend",
      () => {
        tile.classList.remove("flip")
        if (targetWord[index] === letter) {
          tile.dataset.state = "correct"
          key.classList.add("correct")
        } else if (targetWord.includes(letter)) {
          tile.dataset.state = "wrong-location"
          key.classList.add("wrong-location")
        } else {
          tile.dataset.state = "wrong"
          key.classList.add("wrong")
        }
  
        if (index === array.length - 1) {
          tile.addEventListener(
            "transitionend",
            () => {
              startInteraction()
              checkWinLose(guess, array)
            },
            { once: true }
          )
        }
      },
      { once: true }
    )
  }
  
  function getActiveTiles() {
    return guessGrid.querySelectorAll('[data-state="active"]')
  }
  
  function showAlert(message, duration = 1000) {
    const alert = document.createElement("div")
    alert.textContent = message
    alert.classList.add("alert")
    alertContainer.prepend(alert)
    if (duration == null) return
  
    setTimeout(() => {
      alert.classList.add("hide")
      alert.addEventListener("transitionend", () => {
        alert.remove()
      })
    }, duration)
  }
  
  function shakeTiles(tiles) {
    tiles.forEach(tile => {
      tile.classList.add("shake")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("shake")
        },
        { once: true }
      )
    })
  }
  
  function checkWinLose(guess, tiles) {
    if (guess === targetWord) {
      //showAlert("You Win", 5000)
      danceTiles(tiles)
      stopInteraction()

      stats.gamesWon += 1;
      stats.currentStreak += 1;

      console.log(stats)

    if (stats.currentStreak >= stats.maxStreak) {
      stats.maxStreak = stats.currentStreak;
    } else {
      stats.maxStreak = stats.maxStreak;
    }

    stats.winPercentage = ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(2);
    localStorage.setItem('wordleStats', JSON.stringify(stats));

    updateStatsUI();
    updateWinPercentage();
    localStorage.setItem('wordleStats', JSON.stringify(stats));
    updateWikiLink()

    gameEndTime = new Date()
  const gameDuration = (gameEndTime - gameStartTime) / 1000; // in seconds
  console.log(gameDuration)
  if (!badge9Unlocked && gameDuration < 30) {
    badge9.classList.remove("bi-file-lock-fill");
    badge9.classList.add("bi-pin-angle-fill");
    badge9.style.color = "lightblue";
    localStorage.setItem('badge9Unlocked', 'true')
  }
  if (!badge10Unlocked && gameDuration < 10) {
    badge10.classList.remove("bi-file-lock-fill");
    badge10.classList.add("bi-speedometer");
    badge10.style.color = "yellow";
    localStorage.setItem('badge10Unlocked', 'true')
  }
  if (!badge13Unlocked && gameDuration < 3) {
    badge13.classList.remove("bi-file-lock-fill");
    badge13.classList.add("bi-robot");
    badge13.style.color = "grey";
    localStorage.setItem('badge13Unlocked', 'true');
  }
  if (!badge6Unlocked && targetWord === guess && targetWord == "apple") {
    badge6.classList.remove("bi-file-lock-fill");
    badge6.classList.add("bi-apple");
    badge6.style.color = "red";
    hiddenBadgeName.innerHTML = "Hidden Word: Apple"
    localStorage.setItem('badge6Unlocked', 'true')
  }
  if (!badge16Unlocked && targetWord === guess && targetWord == "cloud") {
    badge16.classList.remove("bi-file-lock-fill");
    badge16.classList.add("bi-cloudy-fill");
    badge16.style.color = "lightblue";
    hiddenBadgeName2.innerHTML = "Hidden Word: Cloud"
    localStorage.setItem('badge16Unlocked', 'true');
  }

  

  console.log(gameDuration)
  const resetTimer = new Date()
  resetTimer
      setTimeout(function() {
        winModal.showModal();
        document.querySelector(".theword").textContent = targetWord;
        document.querySelector(".wintimertext").textContent = `You won the game in ${gameDuration.toFixed(2)} seconds!`
        updateBadges();
        retrieveBadgeStatus();

        // This modal will change to something like win-modal.showModal()
      }, 2000);
      
      return;
    }
  
    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
    if (remainingTiles.length === 0) {
      //showAlert(targetWord.toUpperCase(), 2000)
      stopInteraction()
      console.log("user losing the game")


      stats.currentStreak = 0;
      updateWinPercentage();
      updateStatsUI();
      localStorage.setItem('wordleStats', JSON.stringify(stats));
      updateWikiLink();


      setTimeout(function() {
        loseModal.showModal();
        document.querySelector(".loseword").textContent = targetWord;
        updateBadges();
        retrieveBadgeStatus();

      }, 2000);
    }
  }
  
  function danceTiles(tiles) {
    tiles.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("dance")
        tile.addEventListener(
          "animationend",
          () => {
            tile.classList.remove("dance")
          },
          { once: true }
        )
      }, (index * DANCE_ANIMATION_DURATION) / 5)
    })
  }
  

  const body = document.body;
  const tiles = document.querySelectorAll(".tile");
  const modeToggle = document.getElementById("icon");
  
  function setupNewGame() {
    const winModal = document.querySelector(".win-modal");
    const loseModal = document.querySelector(".lose-modal");
  
    winModal.querySelector(".next-game").addEventListener("click", newGame);
    loseModal.querySelector(".next-game").addEventListener("click", newGame);
  
    function updateTextColor() {
      const isLightMode = body.classList.contains("lightmode");
      const textcolor = isLightMode ? "black" : "white";
      tiles.forEach(tile => {
        tile.style.color = textcolor;
      });
    }
  
    function newGame() {
      gameStartTime = new Date();
      stats.gamesPlayed += 1;
      updateStatsUI();
      localStorage.setItem('wordleStats', JSON.stringify(stats));
      resetBoard();
      winModal.close();
      loseModal.close();
      targetWord = targetWords[Math.floor(Math.random() * targetWords.length)];
      wikiWord = targetWord; // Update wikiWord to match targetWord
      theWord = targetWord
      console.log(targetWord);
      console.log(wikiWord);
      wordGuessed = false;
      updateWikiLink();
      updateTextColor();
      resetKeyboardButtons();
      startInteraction();
      updateBadges();
      retrieveBadgeStatus();
    }

  
    function resetBoard() {
      tiles.forEach(tile => {
        tile.textContent = "";
        delete tile.dataset.state;
        delete tile.dataset.letter;
      });
      updateTextColor();
      startInteraction();
    }
  
    function resetKeyboardButtons() {
      const keyboardButtons = document.querySelectorAll("[data-key]");
      keyboardButtons.forEach(button => {
        button.classList.remove("correct", "wrong-location", "wrong");
      });
    }
  
    updateTextColor(); // Update text color when setting up the game
  
    modeToggle.addEventListener("click", function () {
      body.classList.toggle("lightmode");
      if (body.classList.contains("lightmode")) {
        modeToggle.classList.remove("bi-sun-fill");
        modeToggle.classList.add("bi-moon-fill");
        modeToggle.style.color = "black";
      } else {
        modeToggle.classList.add("bi-sun-fill");
        modeToggle.classList.remove("bi-moon-fill");
        modeToggle.style.color = "white";
      }
  
      updateTextColor();
    });
  }
  

  setupNewGame();
  
  
  // Modal pop up
  const modal = document.querySelector(".modal")
  const openModal = document.querySelector(".bi-info-square-fill")
  const closeModal = document.querySelector("#close-modal")

  openModal.addEventListener("click", () => {
    modal.showModal();
  })

  closeModal.addEventListener("click", () => {
    modal.close();
  })



  document.addEventListener("DOMContentLoaded", () => {
    // Define the variables for stats modal elements
    const statModal = document.querySelector(".stat-modal");
    const openStatModal = document.querySelector("#statsicon");
    const closeStatModal = document.querySelector("#close-stat-modal");
  
    // ...
  
    // Define the updateStatsModal function
    function updateStatsModal() {
      // Fetch the stats from localStorage
      const storedStats = JSON.parse(localStorage.getItem('wordleStats'));
  
      // Check if there are stored stats in localStorage
      if (storedStats) {
        // Update the stats modal with the retrieved stats
        const gamesPlayedStatElement = document.querySelector(".stats-number-games-played");
        const gamesWonStatElement = document.querySelector(".stats-number-games-won");
        const currentStreakStatElement = document.querySelector(".stats-number-current-streak");
        const maxStreakStatElement = document.querySelector(".stats-number-max-streak");
        const winPercentageStatElement = document.querySelector(".stats-number-win-percentage");
  
        gamesPlayedStatElement.textContent = storedStats.gamesPlayed;
        gamesWonStatElement.textContent = storedStats.gamesWon;
        currentStreakStatElement.textContent = storedStats.currentStreak;
        maxStreakStatElement.textContent = storedStats.maxStreak;
        winPercentageStatElement.textContent = storedStats.winPercentage;
      }
    }
  
    // ...
  
    openStatModal.addEventListener("click", () => {
      updateStatsModal(); // Update the stats when the modal is opened
      updateStatsUI();
      localStorage.setItem('wordleStats', JSON.stringify(stats));
      statModal.showModal();
    });
  
    closeStatModal.addEventListener("click", () => {
      statModal.close();
    });
  });

  const awardModal = document.querySelector(".award-modal");
  const openAwardModal = document.querySelector("#awardicon")
  const closeAwardModal = document.querySelector("#close-award-modal")

  openAwardModal.addEventListener("click", () => {
    awardModal.showModal()
  });
  
  closeAwardModal.addEventListener("click", () => {
    awardModal.close();
  })



  // Reset the stats and badge progress

const resetStatsButton = document.getElementById("reset-stats-button");
// Define badge variables
badge1Unlocked = false;
badge2Unlocked = false;
badge3Unlocked = false;
badge4Unlocked = false;
badge5Unlocked = false;
badge6Unlocked = false;
badge7Unlocked = false;
badge9Unlocked = false;
badge10Unlocked = false;
badge11Unlocked = false;
badge12Unlocked = false;
badge13Unlocked = false;
badge14Unlocked = false;
badge15Unlocked = false;
badge16Unlocked = false;
platinumBadgeUnlocked = false;



// Function to reset badge status
function resetBadges() {
  // Reset badge status variables and update their status
  badge1Unlocked = false;
  badge2Unlocked = false;
  badge3Unlocked = false;
  badge4Unlocked = false;
  badge5Unlocked = false;
  badge6Unlocked = false;
  badge7Unlocked = false;
  badge9Unlocked = false;
  badge10Unlocked = false;
  badge11Unlocked = false;
  badge12Unlocked = false;
  badge13Unlocked = false;
  badge14Unlocked = false;
  badge15Unlocked = false;
  badge16Unlocked = false;
  platinumBadgeUnlocked = false;




  // Reset badge UI and remove "unlocked" status
  badge1.classList.add("bi-file-lock-fill");
  badge1.classList.remove("bi-hand-thumbs-up-fill");
  badge1.style.color = "";

  badge2.classList.add("bi-file-lock-fill");
  badge2.classList.remove("bi-key-fill");
  badge2.style.color = "";

  badge3.classList.add("bi-file-lock-fill");
  badge3.classList.remove("bi-suit-club-fill");
  badge3.style.color = "";

  badge4.classList.add("bi-file-lock-fill");
  badge4.classList.remove("bi-globe-americas");
  badge4.style.color = "";

  badge5.classList.add("bi-file-lock-fill");
  badge5.classList.remove("bi-radioactive");
  badge5.style.color = "";

  badge6.classList.remove("bi-apple")
  badge6.classList.add("bi-file-lock-fill");
  badge6.style.color = ""
  hiddenBadgeName.innerHTML = "Hidden Word"

  badge7.classList.add("bi-file-lock-fill");
  badge7.classList.remove("bi-rocket-takeoff-fill");
  badge7.style.color = "";

  badge9.classList.add("bi-file-lock-fill");
  badge9.classList.remove("bi-pin-angle-fill");
  badge9.style.color = "";

  badge10.classList.add("bi-file-lock-fill");
  badge10.classList.remove("bi-speedometer");
  badge10.style.color = "";

  badge11.classList.add("bi-file-lock-fill");
  badge11.classList.remove("bi-alarm-fill");
  badge11.style.color = "";

  badge12.classList.add("bi-file-lock-fill");
  badge12.classList.remove("bi-speedometer");
  badge12.style.color = "";

  badge13.classList.add("bi-file-lock-fill");
  badge13.classList.remove("bi-robot");
  badge13.style.color = "";

  badge14.classList.remove("bi-database-fill-check")
  badge14.classList.add("bi-file-lock-fill")
  badge14.style.color = ""

  badge15.classList.remove("bi-compass-fill");
  badge15.classList.add("bi-file-lock-fill"); // Adjust the class based on your design
  badge15.style.color = ""; // Adjust the color

  badge16.classList.remove("bi-cloudy-fill");
  badge16.classList.add("bi-file-lock-fill");
  badge16.style.color = "";
  hiddenBadgeName2.innerHTML = "Hidden Word"

  platinumBadge.classList.remove("bi-gem");
  platinumBadge.classList.add("bi-file-lock-fill");
  platinumBadge.style.color = "";  // Adjust the color based on your design



  

  // Clear badge-related items from local storage
  localStorage.removeItem('badge1Unlocked');
  localStorage.removeItem('badge2Unlocked');
  localStorage.removeItem('badge3Unlocked');
  localStorage.removeItem('badge4Unlocked');
  localStorage.removeItem('badge5Unlocked');
  localStorage.removeItem('badge6Unlocked');
  localStorage.removeItem('badge7Unlocked');
  localStorage.removeItem('badge9Unlocked');
  localStorage.removeItem('badge10Unlocked');
  localStorage.removeItem('badge11Unlocked');
  localStorage.removeItem('badge12Unlocked');
  localStorage.removeItem('badge13Unlocked');
  localStorage.removeItem('badge14Unlocked');
  localStorage.removeItem('badge15Unlocked');
  localStorage.removeItem('badge16Unlocked');
  localStorage.removeItem('platinumBadgeUnlocked')


}


// Event listener for the reset stats button
resetStatsButton.addEventListener("click", function () {
  // Reset the stats object to its initial values
  stats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winPercentage: 0,
    // Add more stats as needed
  };

  // Update the UI to reflect the reset stats
  gamesPlayedElement.textContent = stats.gamesPlayed;
  gamesWonElement.textContent = stats.gamesWon;
  currentStreakElement.textContent = stats.currentStreak;
  maxStreakElement.textContent = stats.maxStreak;
  winPercentageElement.textContent = stats.winPercentage;

  // Store the reset stats in localStorage
  localStorage.setItem('wordleStats', JSON.stringify(stats));

  // Reset badge progress and clear related local storage
  resetBadges();
});


let shareBtn = document.querySelector("#share-btn");
let isSharing = false;

shareBtn.addEventListener("click", () => {
    if (isSharing) {
        console.log('Sharing in progress. Please wait.');
        return;
    }

    // Example using html2canvas library
    html2canvas(document.getElementById('your-stats-modal')).then((canvas) => {
        // 'canvas' now contains the captured content
        const imgDataUrl = canvas.toDataURL('image/png');

        if (navigator.share) {
            isSharing = true;

            canvas.toBlob((blob) => {
                setTimeout(() => { // Introduce a delay before the second share attempt
                    navigator.share({
                        title: 'My Stats',
                        text: 'Check out my awesome stats!',
                        files: [new File([blob], 'stats.png', { type: 'image/png' })],
                    })
                    .then(() => {
                        console.log('Shared successfully');
                        isSharing = false;
                    })
                    .catch((error) => {
                        console.error('Error sharing:', error);
                        isSharing = false;
                    });
                }, 500); // Adjust the delay time as needed
            }, 'image/png');
        } else {
            // Fallback for browsers that don't support Web Share API
            // Handle sharing using another approach
        }

        // Use 'imgDataUrl' for sharing or display
    });
});

