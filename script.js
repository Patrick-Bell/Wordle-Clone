  // Your JavaScript code here

const targetWords = ["apple", "blues"]

const dictionary = ["apple", "blues"]
  
  // Initialize stats
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
  console.log(targetWord)


  
  startInteraction()

  
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


      setTimeout(function() {
        winModal.showModal();// This modal will change to something like win-modal.showModal()
      }, 2000);
      
      return;
    }
  
    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
    if (remainingTiles.length === 0) {
      //showAlert(targetWord.toUpperCase(), 2000)
      stopInteraction()


      stats.currentStreak = 0;
      updateWinPercentage();
      updateStatsUI();
      localStorage.setItem('wordleStats', JSON.stringify(stats));

      setTimeout(function() {
        loseModal.showModal();
      }, 2000);
    }
    return;
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
      stats.gamesPlayed += 1;
      updateStatsUI();
      localStorage.setItem('wordleStats', JSON.stringify(stats));
      resetBoard();
      winModal.close();
      loseModal.close();
      targetWord = targetWords[Math.floor(Math.random() * targetWords.length)];
      console.log(targetWord);
      wordGuessed = false;
      updateTextColor();
      resetKeyboardButtons();
      startInteraction();
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


  const settingModal = document.querySelector(".setting-modal")
  const openSettingModal = document.querySelector(".bi-gear-fill")
  const closeSettingModal = document.querySelector("#close-setting-modal")

  openSettingModal.addEventListener("click", () => {
    settingModal.showModal();
  })

  closeSettingModal.addEventListener("click", () => {
    settingModal.close();
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

const resetStatsButton = document.getElementById("reset-stats-button");

resetStatsButton.addEventListener("click", function () {
  // Reset the stats object to its initial values
  stats = {
    gamesPlayed: 1,
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
});

const theWord = document.querySelector(".theword");
theWord.innerHTML = targetWord;

const loseWord = document.querySelector(".loseword");
loseWord.innerHTML = targetWord;
