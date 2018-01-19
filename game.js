$(()=> {
  $(".pad").mouseover(function(){$(this).css("opacity", "1")});
  $(".pad").mouseleave(function(){$(this).css("opacity", "0.4")});
  $(".end-game").click(stopLights);
  $(".start-game").click(startGame);


  function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const COLORS = ["red", "green","blue", "yellow"];

  let lightInterval;
  let count;
  let round;
  let score;
  let sequence = [];

  function startGame() {
    count = 1;
    round = 1;
    lightInterval = setInterval(lightUp, 1000);
  }

  function stopLights() {
    clearInterval(lightInterval);
  }

  function lightUp() {
    if (count <= round) {
      let color = COLORS[randomInt(0,3)];
      let selector = "."+color+".pad";
      $(selector).css("opacity", "1");
      window.setTimeout(dimPad.bind($(selector)), 500);
      sequence.push($(selector).attr("class"));
      count += 1;
    } else {
      count = 1;
      stopLights();
      userTurn();
      console.log(sequence);
    }
  }
  let i;
  let correctCount;

  function userTurn() {
      i = 0;
      correctCount = 0;
      $( ".pad" ).on("click", checkCorrect);

  }

  function checkCorrect(event) {
      if (i < sequence.length) {
        console.log(event.target.className);
        if (event.target.className !== sequence[i]) {
          console.log("GAME OVER!");
          sequence = [];
        } else {
          correctFunction();
        }
        i+= 1;
      }

  }

  function correctFunction() {
    correctCount += 1;
    if (correctCount === sequence.length) {
      console.log("Congratulations!");
      $( ".pad" ).off("click", checkCorrect);
      sequence = [];
      round += 1;
      lightInterval = setInterval(lightUp, 1000);
    }
  }

  function dimPad(){
    $(this).css("opacity", "0.4");
  }

});
