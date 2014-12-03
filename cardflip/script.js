// NB To overcome CORS, run a server with python -m SimpleHTTPServer
$(document).ready(function(){
  var deck = []
  // get images
  $.ajax({
    url: 'images/',
    success: function (data) {
      $(data).find('a:contains(".jpg"),a:contains(" + .png + ")').each(function () {
        var imgName = this.text.toString();
        deck.push(imgName);
       });
     }
  });


  // shuffle function
  function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  // scoring
  var score = 0;
  var target;
  // start new game
  $('#create-deck').click(function(){
    //clear deck
    $('#deck').html("");
    // duplicate and shuffle deck
    var dblDeck = deck.concat(deck);
    // shuffle deck
    dblDeck = shuffle(dblDeck);
    // create deck
    $(dblDeck).each(function(){
      $('#deck').append('<div class="container"><div class="card"><div class="front"></div><div class="back"><img src="images/'+this+'"/></div></div></div>')
    });
    target = deck.length * 2;
    $('#target p').html(target);
    return target;
  });

  function updateScore(num){
    score+=num;
    console.log(num);
    console.log(score);
    return $('#score p').html(score);
  }

  // select a card
  $('section').on("click", ".card", function(e){

    e.preventDefault();

    if($('.flipped').length >= 2) {

      $('.card').removeClass('flipped')
      $(this).addClass('flipped');

      console.log('case1'); // basically never happens

    } else if($('.flipped').length === 1) {

        var flippedCard = $('.flipped')[0]["innerHTML"];
        var img = $(this, 'div img')[0]["innerHTML"];

        if($('.matched').length === ((deck.length)*2) -2){
          $('.card').removeClass('matched').addClass('matched').addClass('complete');
          updateScore(1);
          console.log('case2')

        } else if(img === flippedCard) {
          $(this).addClass('matched');
          $('.flipped').removeClass('flipped').addClass('matched');
          updateScore(1);
          console.log('case3')

        } else {
          $(this).addClass('flipped')
            setTimeout("($('.flipped').removeClass('flipped'));", 400);
            updateScore(1);
            console.log('case4')
        }

      } else {
      $(this).addClass('flipped');
      updateScore(1);
      console.log('case5')
    }
  });


  // $('#create-deck').click();

});