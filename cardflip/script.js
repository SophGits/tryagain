// NB To overcome CORS, run a server with python -m SimpleHTTPServer

var deck = [
  {
    icon: ''
  },
  {

  },
  {

  }
]

// $('#new-deck').onClick(createDeck());

function createDeck(){

}

// <section class="container">
//   <div id="card">
//     <div class="front">a</div>
//     <div class="back">b</div>
//   </div>
// </section>


var fileExt = {};
    fileExt[0]=".png";
    fileExt[1]=".jpg";
    fileExt[2]=".gif";
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: 'images/',
    success: function (data) {
      console.log(data);
       $("#fileNames").html('<ul>');
       //List all png or jpg or gif file names in the page
       $(data).find('a:contains(" + fileExt[0] + "),a:contains(" + fileExt[1] + "),a:contains(" + fileExt[2] + ")').each(function () {
           var filename = this.href.replace(window.location.host, "").replace("http:///", "");
           $("#fileNames").append( '<li>'+filename+'</li>');
       });
       $("#fileNames").append('</ul>');
     }
  });