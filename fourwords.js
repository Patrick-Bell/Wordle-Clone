const targetWords = ["mins", "rich", "poor", "fire", "wind", "posh", "home", "iced", "fuck"]

const dictionary = ["that", "hand", "hour", "four", "then", "poop", "loan", "sick", "sock", "fuck", "sack", "none",
"nick", "pock", "pick", "loan", "many", "mins", "when", "what", "whom", "mank", "iced", "fire", "wind", "wins", "lose",
"mane", "fame", "same", "came", "lame", "posh", "poor", "rich", "tick", "exit", "home", "lone"]


  const WORD_LENGTH = 4
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
      showAlert("You Win", 5000)
      danceTiles(tiles)
      stopInteraction()

      setTimeout(function() {
        winModal.showModal();// This modal will change to something like win-modal.showModal()
      }, 2000);
      
      return;
    }
  
    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
    if (remainingTiles.length === 0) {
      showAlert(targetWord.toUpperCase(), 2000)
      stopInteraction()

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

