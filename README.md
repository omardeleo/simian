![](http://txt-dynamic.cdn.1001fonts.net/txt/dHRmLjE1OC4wMDAwMDAuVTBsTlNVRk8uMgAA/pricedown.black.png "Simian Logo")
### THE ULTIMATE GAME OF MONKEY SEE, MONKEY DO
![](/assets/images/simian_screen_01.png)

# **[Play SIMIAN](https://omardeleo.github.io/simian/ "Play SIMIAN")**

Simian is a pattern-matching memory game. The board plays a random sequence of lights, and the player must repeat the sequence by pressing the colored pads in the correct order. After each successful turn, the sequence increases by one light. The objective of the game is to set a new high score.

#### **Features**
* New Game button
* Board with 4 different-colored light-up push-pads
* How To Play instructional guide
* Sound effects via HTML `<audio>`
* Sound Off/On button
* Current Score display
* High Score display
* Game Over screen
* Links to my awesome work

#### **Technologies, Libraries, APIs**
* HTML for markup
* CSS for styling
* JavaScript + jQuery for DOM manipulation and interactivity
* Firebase for getting and updating High Score

### Start a New Game
![](https://media.giphy.com/media/42AFZTmJMhcVPBSgXG/giphy.gif "New Game")

To begin playing, simply click the NEW GAME button.

### New High Score
![](https://media.giphy.com/media/1MXuVWQys4IuvM4COr/giphy.gif "New High Score")

When a new High Score is set, the GAME OVER screen flashes a blinking message.

### jQuery Animation
Aside from DOM manipulation and interactivity, jQuery is excellent for quick-and-easy animations.

![](https://media.giphy.com/media/B2NgoeEz7o1qAAXxbe/giphy.gif "jQuery Animation")

The blinking NEW HIGH SCORE message was animated using jQuery's `toggleClass()` method, in conjuction with `setInterval()` and `setTimeout()`, which are provided by the Web API.
```  
function scoreAnimation() {
  hiScore.show();
  flashScoreInt = setInterval(flashScore, 200);
  setTimeout(clearScoreInt, 5000);
}

function flashScore() {
  hiScore.toggleClass('lime');
}

```

### Cloud database implementation
Making live updates to the SIMIAN database is painless thanks to Google Firebase and Cloud Firestore. A call to write to the database creates a `Promise` object, which upon succeeding updates the HIGH SCORE display, or upon failure displays a console error.

```
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
```

![](https://naturescrusaders.files.wordpress.com/2009/08/monkeymirror.jpg)

# **[Play SIMIAN](https://omardeleo.github.io/simian/ "Play SIMIAN")**
