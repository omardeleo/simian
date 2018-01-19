$(()=> {
  $(".pad").mouseover(function(){$(this).css("opacity", "1");});
  $(".pad").mouseleave(function(){$(this).css("opacity", "0.4");});
  $(".end-game").click(stopLights);
  $(".start-game").click(startGame);

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

  function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function resetGame() {
    stopLights();
    $( ".pad" ).off("click", checkCorrect);
    count = 0;
    round = 1;
    score = 0;
    sequence = [];
    score_html = "<p>"+ score + "</p>";
    $(".score").html(score_html);
  }

  function startGame() {
    resetGame();
    boardTurn();
  }

  function boardTurn(){
    let color = COLORS[randomInt(0,3)];
    selector = "."+color+".pad";
    sequence.push(selector);
    lightInterval = setInterval(lightUp, 800);
    console.log(sequence);
  }

  function lightUp() {
    if (count < round) {
      selector = sequence[count];
      $(selector).css("opacity", "1");
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
      $( ".pad" ).on("click", checkCorrect);
  }

  function checkCorrect(event) {
      if (lightCount < sequence.length) {
        selector = sequence[lightCount];
        if (event.target.className !== $(selector).attr("class")) {
          console.log("GAME OVER!");
          resetGame();
        } else {
          correctFunction();
        }
        lightCount+= 1;
      }
  }

  function correctFunction() {
    correctCount += 1;
    score += 10;
    score_html = "<p>"+ score + "</p>";
    $(".score").html(score_html);
    if (correctCount === sequence.length) {
      $( ".pad" ).off("click", checkCorrect);
      round += 1;
      boardTurn();
    }
  }

  function dimPad(){
    $(this).css("opacity", "0.4");
  }



});
