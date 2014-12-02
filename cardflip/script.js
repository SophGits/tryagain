// NB To overcome CORS, run a server with python -m SimpleHTTPServer
$(document).ready(function(){
  var deck = []

  $('button').click(function(){
    // create deck
    $(deck).each(function(){
      console.log(this);
      $('body').append('<section class="container"><div class="card"><div class="front">a</div><div class="back"><img src="images/'+this+'"/>b</div></div></section>')
    })
  });

  $.ajax({
    url: 'images/',
    success: function (data) {
      // console.log(data)
      $(data).find('a:contains(".jpg"),a:contains(" + .png + ")').each(function () {
        var imgName = this.text.toString();
        deck.push(imgName);
       });
     }
  });


});
