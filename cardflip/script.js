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

  // start new game
  $('#create-deck').click(function(){
    //clear deck
    $('#deck').html("");
    // shuffle cards
    deck = shuffle(deck);
    // duplicate deck
    deck = deck.concat(deck);
    // create deck
    $(deck).each(function(){
      $('#deck').append('<div class="container"><div class="card"><div class="front">Front</div><div class="back"><img src="images/'+this+'"/></div></div></div>')
    })
  });
  // select a card
  $('section').on("click", ".card", function(e){
    e.preventDefault();
    if($('.flipped').length >= 2){
      $('.card').removeClass('flipped')
      $(this).addClass('flipped');
    } else {
      $(this).addClass('flipped');
    }
  });

  // no idea why this won't work
  (function(){
    $('#create-deck').trigger('click');
  })();

});
