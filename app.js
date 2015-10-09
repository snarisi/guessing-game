$(document).ready(function () {
  
  //initialize came by creating a number and setting the count to 5
  var number = Math.floor(Math.random()* 100 + 1),
    count = 5,
    prevGuesses = [];
  console.log(number);
  
  //when the user submits a guess
  $('#submit-guess').on('click', function () {
    
    //make sure the game hasn't ended
    if (count > 0) {
      var guess = parseFloat(document.getElementById('input').value, 10),
        distance = Math.abs(guess - number),
        temperature,
        direction;
      
      //subtract one from the count
      count -= 1;

      //generate feedback
      if (guessIsInvalid(guess)) {
        $('.feedback').html("<p>Please enter an integer from 1 to 100.</p");
        $('.feedback').show();
      } else {
        if (isRepeat(guess)) {
          $('.feedback').html("<p>Please enter a new guess.</p");
          $('.feedback').show();
        } else {
          
          //add guess to history
          prevGuesses.push(guess);
          
          //winning sequence
          if (guess === number) {
            gameEnd('win!');

          //losing sequence  
          } else if (count === 0) {
            gameEnd('lose :(');

          //regular guessing sequence
          } else {
            if (guess > number) {
              direction = "<span class='bold'>lower</span>";
            } else {
              direction = "<span class='bold'>higher</span>";
            }
            if (distance <= 10) {
              temperature = "<span class='red bold'>hot</span>";
            } else if (distance <= 25) {
              temperature = "<span class='red bold'>warm</span>";
            } else if (distance <= 50) {
              temperature = "<span class='blue bold'>cool</span>";
            } else if (distance <= 75) {
              temperature = "<span class='blue bold'>cold</span>";
            } else {
              temperature = "<span class='blue bold'>ice cold</span>";
            }
            $('.feedback').html("<p>Your guess is " + temperature + ".</p><p>Guess " +  direction + ".</p");

            //display feedback
            $('.feedback').show();

            //update count
            if (count === 1) {
              $('#count').html("You have <span class='bold'>" + count + "</span> guess left");
            } else {
              $('#count').html("You have <span class='bold'>" + count + "</span> guesses left");   
            }
          }
        }
      }
   
    }
  });
  
  //sequence when game ends
  function gameEnd(outcome) {
    $('#win-or-lose').html(outcome);
    $('.feedback').hide();
    $('.game-end').show();
    $('.fade-on-end').addClass('faded');
  }
  
  //check if guess is an integer from 1-100
  function guessIsInvalid(guess) {
    return (typeof guess !== 'number' || guess % 1 !== 0 || guess > 100 || guess < 1);
  }
  
  //check if guess is a repeat
  function isRepeat(guess) {
    return prevGuesses.indexOf(guess) > -1;
  }
  
  //hit enter to submit guess
  $('#input').on('keypress', function (event) {
    if (event.which === 13) {
      $('#submit-guess').trigger('click');
    }
  })
  
  //play again
  $('#play-again').on('click', function () {
    number = Math.floor(Math.random()* 100 + 1),
    count = 5;
    console.log(number);
    $('.game-end').hide();
    $('.feedback').hide();
    $('#count').html("You have <span class='bold'>" + count + "</span> guesses left");
    document.getElementById('input').value = "";
    $('.fade-on-end').removeClass('faded');
  });
  

});