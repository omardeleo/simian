$(() => {
  const COLORS = ["red", "green","blue", "yellow"];
  let lightInterval;
  let count;
  let round;
  let score = 0;
  let sequence;
  let lightCount;
  let correctCount;
  let selector;
  let score_html;
  let isMuted = false;
  let highScore;
  let hiScore = $('.new-high-score, .new-high-score span');
  var flashInt;

  getHighScore();

  $(".new-game").click(newGame);

  function newGame() {
    resetGame();
    boardTurn();
    $(".score").css("opacity", "1");
  }

  function displayHighScore() {
    $(".high-score").html(convertScore(highScore));
  }

  function resetGame() {
    removeUserControls();
    stopLights();
    resetScore();
    getHighScore();
    count = 0;
    round = 1;
    sequence = [];
  }

  function resetScore() {
    score = 0;
    $(".score").html('0000000');
  }

  function getHighScore() {
    var docRef = db.collection("scores").doc("top-score");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            highScore = doc.data().score;
            displayHighScore();
        } else {
            console.error("Error getting document");
        }
    }).catch(function(error) {
        console.error("Error getting document: ", error);
    });
  }

  function convertScore(convert) {
    let score_string = String(convert);
    while (score_string.length < 7) {
      score_string = '0' + score_string;
    }
    return score_string;
  }

  function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function boardTurn(){
    let color = COLORS[randomInt(0,3)];
    selector = "."+color+".pad";
    sequence.push(selector);
    lightInterval = setInterval(lightSequence, 800);
  }

  function addUserControls() {
    $(".pad").on("mousedown", lightUp);
    $(".pad").on("mouseup", lightOff);
    $( ".pad" ).on("click", checkCorrect);
  }

  function removeUserControls() {
    $(".pad").off("mousedown", lightUp);
    $(".pad").off("mouseup", lightOff);
    $( ".pad" ).off("click", checkCorrect);
  }

  function lightUp() {
    $(this).css("opacity", "1");
  }

  function lightOff() {
    $(this).css("opacity", "0.4");
  }

  function lightSequence() {
    if (count < round) {
      selector = sequence[count];
      $(selector).css("opacity", "1");
      if (!isMuted) {
        playSound(selector);
      }
      window.setTimeout(dimPad.bind($(selector)), 500);
      count += 1;
    } else {
      count = 0;
      stopLights();
      userTurn();
    }
  }

  function stopLights() {
    clearInterval(lightInterval);
  }

  function userTurn() {
      lightCount = 0;
      correctCount = 0;
      addUserControls();
  }

  function isNewHighScore(score) {
    return score > highScore;
  }

  function submitScore(score) {
    db.collection("scores").doc("top-score").set({
      score: score,
    })
    .then(function() {
        getHighScore();
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  function endGame() {
    $(".game-over-screen").css("display", "flex");
    const score = parseInt($(".score").html());
    if (isNewHighScore(score)) {
      scoreAnimation();
      submitScore(score)
    };
    if (!isMuted) {
      $(".game-over-screen audio")[0].currentTime = 0;
      $(".game-over-screen audio")[0].play();
    }
  }

  function checkCorrect(event) {
    if (lightCount < sequence.length) {
      selector = sequence[lightCount];
      if (!isMuted) {
        playSound(selector);
      }
      if (event.target.className !== $(selector).attr("class")) {
        endGame();
      } else {
        correctFunction();
      }
      lightCount+= 1;
    }
  }

  function correctFunction() {
    correctCount += 1;
    increaseScore();
    if (correctCount === sequence.length) {
      correctSequence();
    }
  }

  function increaseScore() {
    score += 10;
    $(".score").html(convertScore(score));
  }

  function correctSequence() {
    removeUserControls();
    round += 1;
    niceScreen();
  }

  function niceScreen(){
    showNice();
    setTimeout(hideNice,400);
  }

  function hideNice() {
    $(".nice").css("display", "none");
    boardTurn();
  }

  function showNice() {
    $(".nice").css("display", "block");
  }

  function dimPad(){
    $(this).css("opacity", "0.4");
  }

  $(".play-again").click(returnToGame);

  function returnToGame(){
    $(".game-over-screen").css("display", "none");
    hiScore.css("display", "none");
    $(".game-over-screen audio")[0].pause();
    newGame();
  }

  $('.mute').click(muteToggle);

  function muteToggle() {
    if (!isMuted) {
      $('.mute').html("SOU<span>N</span>D O<span>N</span>");
    } else {
      $('.mute').html("SOU<span>N</span>D O<span>F</span>F");
    }
    isMuted = !isMuted;
  }

  function playSound(selector) {
    $(`${selector} audio`)[0].currentTime = 0;
    $(`${selector} audio`)[0].play();
  }

  $(".how-to-play").click(function() {
    $(".instructions-panel").css("display", "flex");
  })

  $(".close").click(function() {
    $(".instructions-panel").css("display", "none");
  })

  function scoreAnimation() {
    hiScore.show();
    flashScoreInt = setInterval(flashScore, 200);
    setTimeout(clearScoreInt, 5000);
  }

  function flashScore() {
    hiScore.toggleClass('lime');
  }

  function clearScoreInt() {
    clearInterval(flashScoreInt);
  }

});
