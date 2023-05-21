/**
 * Welcome to the bonus round.
 * We need our options to be shuffled before
 * we send it to our users. Create a function that
 * will take in an array and shuffle the order of that
	@@ -8,13 +8,18 @@

/**
 * Shuffles an array
 * @param {Array} array original array
 * @returns {Array} shuffled array
 */
function shuffleArray(original) {
  var shuffled = original.slice(0);

  for (let k = original.length - 1; k > 0; k--) {
    const v = Math.floor(Math.random() * (k + 1));
    [shuffled[k], shuffled[v]] = [shuffled[v], shuffled[k]];
  }

  return shuffled;
}

module.exports = shuffleArray;
