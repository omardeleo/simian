$(()=> {
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

  $(".start-game").click(startGame);

  function startGame() {
    resetGame();
    boardTurn();
    $(".score").css("opacity", "1");
  }

  function resetGame() {
    removeUserControls();
    stopLights();
    resetScore();
    count = 0;
    round = 1;
    sequence = [];
  }

  function resetScore() {
    score = 0;
    $(".score").html('0000000');
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

  function endGame() {
    $(".game-over-screen").css("display", "flex");
  }

  function checkCorrect(event) {
    if (lightCount < sequence.length) {
      selector = sequence[lightCount];
      if (!isMuted) {
        playSound(selector);
      }
      if (event.target.className !== $(selector).attr("class")) {
        endGame();
        resetGame();
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
    let score_string = String(score);
    while (score_string.length < 7) {
      score_string = '0' + score_string;
    }
    $(".score").html(score_string);
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
});
