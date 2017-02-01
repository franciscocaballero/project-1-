//Thank you KelllyK for giving access to your public pen
$(document).ready(function() {
 var sequence =[];    /*setting up variables*/
  var counter = 0;
  var playing = false;
  var move = 0;
  var clickCount= 0;

function gameStart(){ /*if statment if counter is greater than 20 class messageWinner Will apper*/
  if (counter >= 20){

    $('.messageWinner').removeClass('hidden');
  }else{
    if (playing ===false){
      addToSequence();
      counter++;
      updateCounter(counter);
      playSequence(sequence);
    }
  }
}
function addToSequence(){
var random = Math.floor(Math.random()*4)+1; /*GOD BLESS YOU CODECADEMY!!!!!! function random picks a random number 1-4*/
sequence.push(random); /*adding random to array sequence*/
}
function playSequence(sequence){ /*setting up loop*/
  var i = 0;
  var interval = setInterval(function(){
    lightUp(sequence[i]);
    i++;
    if(i >= sequence.length){
      clearInterval(interval);
    }
  },700);
  playing = true;
}

function lightUp(box){
  playSound(box);
  var $box = $('#' + box).addClass('lit'); /*using jQuery .addClass to add more than one class at a time*/
  window.setTimeout(function(){
    $box.removeClass('lit');
  },400);
}

function updateCounter(counter){
  $('.counter').text('Round: '+ counter);
}

  $('.box').on('click', function(){
    //if the player has not repeated the full sequence
    if(clickCount < sequence.length && playing === true){
        move = $(this).attr('data-box');
        lightUp(move);
        if (checkSequence(move,clickCount)){
          clickCount ++;
          if (clickCount >= sequence.length){
            playing = false;
            clickCount = 0;
            window.setTimeout(gameStart, 600);
          }
        }else{
          playing = false;
          updateCounter('X');
          $('.messageLoser').removeClass('hidden'); // if false message player sorry try again
        }
      }

  });

function checkSequence(move, clickCount){
  var result = false;
  if (move == sequence[clickCount]){
    result = true;
  }
  return result;
}

function playSound(clip){
  var sound = $('#clip'+ clip)[0];
  sound.currentTime = 0;
  sound.play();
}
$('.start').on('click', function(){
  sequence =[];
  counter = 0;
  playing = false;
  move = 0;
  clickCount= 0;
  updateCounter(counter);
  $(".messageWinner,.messageLoser ").addClass('hidden');
  gameStart();
});

$('.play').on('click', function(){
  sequence =[];
  counter = 0;
  playing = false;
  move = 0;
  clickCount= 0;
  updateCounter(counter);
  gameStart();
  });

});
