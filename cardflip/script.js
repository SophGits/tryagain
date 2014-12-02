// NB To overcome CORS, run a server with python -m SimpleHTTPServer


// $('#new-deck').onClick(createDeck());

function createDeck(){

}

// <section class="container">
//   <div id="card">
//     <div class="front">a</div>
//     <div class="back">b</div>
//   </div>
// </section>


var deck = []
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