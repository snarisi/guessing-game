$(document).ready(function () {
  var number,
    count,
    prevGuesses;
      
  //initialize game
  function initialize() {
    number = Math.floor(Math.random() * 100 + 1);
    count = 5;
    prevGuesses = [];
    $('.game-end').hide();
    $('#end-message').hide();
    $('#answer').hide();
    $('.feedback').hide();
    displayCount();
    document.getElementById('input').value = "";
    $('#guess-history').hide();
    $('#guess-history').empty();
    $('.fade-on-end').removeClass('faded');
  }
  
  //show user the current guess count
  function displayCount() {
    if (count === 1) {
      $('#guessOrGuesses').text('guess');
      $('#count').text(count);
    } else {
      $('#guessOrGuesses').text('guesses');
      $('#count').text(count);
    }
  }
  
  //find what direction the user should move in
  function getDirection(guess) {
    var dir;
    
    if (guess < number) {
      dir = "higher";
    } else {
      dir = "lower";
    }
    return "Guess <span class='bold'>" + dir + "</span>.";
  }
  
  //find the temperature of the guess
  function getTemperature(guess) {
    var distance = Math.abs(guess - number),
      temp,
      color;

    if (prevGuesses.length === 0) {
      if (distance <= 10) {
        temp = "hot";
        color = "red";
      } else if (distance <= 25) {
        temp = "warm";
        color = "red";
      } else if (distance <= 50) {
        temp = "cool";
        color = "blue";
      } else if (distance <= 75) {
        temp = "cold";
        color = "blue";
      } else {
        temp = "ice cold";
        color = "blue";
      }
      return "Your guess is <span class='bold " + color + "'>" + temp + "</span>.";
    } else {
      if (distance < Math.abs(number - prevGuesses[prevGuesses.length - 1])) {
        temp = "warmer";
        color = "red";
      } else {
        temp = "colder";
        color = "blue";
      }
      return "Getting <span class='bold " + color + "'>" + temp + "</span>.";
    }
  }
  
  //display guess feedback to the user
  function displayFeedback(temperature, direction) {
    $('.feedback').children().remove();
    $('.feedback').append("<p>" + temperature + "</p><p>" + direction + "</p>");
    $('.feedback').show();
  }
  
  //update guess history
  function updateGuessHistory(guess) {
    var description = $('.feedback').find('p').first().find('span').text();
    $('#guess-history').append("<li>" + guess + " (" + description + ")</li>");
  }
  
  //show alert when the game ends
  function gameEnd(outcome) {
    $('#win-or-lose').html(outcome);
    $('#end-message').show();
    $('.feedback').hide();
    $('.game-end').show();
    $('.fade-on-end').addClass('faded');
    if (outcome.search(/lose/) > -1) {
      $('#answer').html("The answer was: <span class='bold'>" + number + "</span>").show();
    }
  }
  
  //make sure the guess is an integer from 1-100
  function guessIsInvalid(guess) {
    return (typeof guess !== 'number' || guess % 1 !== 0 || guess > 100 || guess < 1);
  }
  
  //check if guess is a repeat
  function isRepeat(guess) {
    return prevGuesses.indexOf(guess) > -1;
  }
    
  //collect the user's guess
  $('#submit-guess').on('click', function () {
    
    //make sure the game hasn't ended
    if (count > 0) {
      //collect guess
      var guess = parseFloat(document.getElementById('input').value, 10),
        temperature = getTemperature(guess),
        direction = getDirection(guess);

      //make the guess is valid and new
      if (guessIsInvalid(guess)) {
        $('.feedback').html("<p>Please enter an integer from 1 to 100.</p");
        $('.feedback').show();
      } else if (isRepeat(guess)) {
        $('.feedback').html("<p>Please enter a new guess.</p");
        $('.feedback').show();
      } else {
        count -= 1;
        displayCount();

        if (guess === number) {
          gameEnd('win!');
        } else if (count === 0) {
          gameEnd('lose :(');
        } else {
          displayFeedback(temperature, direction);
          prevGuesses.push(guess);
          updateGuessHistory(guess);
        }
      }
    }
  });

  //allow the user to submit guess with the enter key
  $('#input').on('keypress', function (event) {
    if (event.which === 13) {
      $('#submit-guess').trigger('click');
    }
  });

  //allow the user to toggle the guess history display
  $('#history-toggle').on('click', function () {
    $('#guess-history').toggle();
  });
  
  //allow the user to click the button to play again
  $('#play-again').on('click', function () {
    initialize();
  });
  
  //allow the user to click the button to get the answer
  $('#hint').on('click', function () {
    $('#answer').html("The answer was: <span class='bold'>" + number + "</span>").show();
    $('.game-end').show();
    $('.feedback').hide();
    $('.fade-on-end').addClass('faded');
  });

  initialize();
});