$(document).ready(function () {
  
  //initialize came by creating a number and setting the count to 5
  var number = Math.floor(Math.random()* 100 + 1),
    count = 5;
  console.log(number);
  
  //when the user submits a guess
  $('#submit-guess').on('click', function () {
    
    //make sure the game hasn't ended
    if (count > 0) {
      var guess = parseInt(document.getElementById('input').value, 10),
        distance = Math.abs(guess - number),
        temperature,
        direction;

      //subtract one from the count
      count -= 1;

      //generate feedback
      if (typeof guess !== 'number' || guess % 1 !== 0 || guess > 100 || guess < 1) {
        $('.feedback').html("<p>Please enter an integer from 1 to 100.</p");
      } else {
        if (guess === number) {
          $('.feedback').html("<p class='red bold'>You win!</p>");
        } else if (count === 0) {
          $('.feedback').html("<p>Sorry, you lose :(</p>");
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
        }
      }
      //display feedback
      $('.feedback').show();

      //update count
      $('#count').html("You have <span class='bold'>" + count + "</span> guesses left");      
    }
  });
  
  //click on enter
  //play again
});