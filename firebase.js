firebase.initializeApp({
  apiKey: "AIzaSyCvQX1CZOtwrgaQhFw_n0ixptfH5jmcKoQ",
  authDomain: "top-score-97007.firebaseapp.com",
  projectId: "top-score-97007"
});

var db = firebase.firestore();

function submitScore(score) {
  db.collection("scores").doc("top-score").set({
    score: score,
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

const score = document.querySelector('.score');

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.target.className.includes('final-score')) {
      console.log("GAME OVER");
      let finalScore = parseInt(mutation.target.innerHTML);
      console.log("final score", finalScore);
      submitScore(finalScore);
      score.classList.remove('final-score');
    }
  });
});

mutationObserver.observe(score, {
  attributes: true,
});
