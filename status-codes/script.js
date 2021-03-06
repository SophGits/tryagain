document.addEventListener("DOMContentLoaded", function(event) {
  window.app = {};

  var codes = [
    {
      code: 200,
      description: 'Ok' ,
      explanation: 'Standard response for successful requests. The actual response will depend on the request method used: 1) in a GET request, the response will contain an entity corresponding to the requested resource; 2) in a POST the response will contain an entity describing/containing the result of the action.'
    },
    {
      code: 404,
      description: 'Not Found',
      explanation: 'The requested resource wasn\'t found but may be available again in the future.'
    },
    {
      code: 503,
      description: 'Service Unavailable',
      explanation: 'Usually temporary. The server is unavailable (because it\'s overloaded or down for maintenenace'
    },
   {
     code: 202,
     description: 'Accepted',
     explanation: 'The request has been accepted for processing, but the processing has not been completed. The request may eventually be acton upon - but it may not, as it could be disallowed when processing actually takes place.'
   },
   {
     code: 400,
     description: 'Bad Request',
     explanation: 'The server can\'t or won\'t process the request because of something that is thought to be a client error.'
   },
   {
     code: 401,
     description: 'Unauthorised',
     explanation: 'Similar to 403 (Forbidden) but specifically used when authenitication is needed and hasn\'t been provided (or it failed). The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource.'
   },
   {
     code: 403,
     description: 'Forbidden',
     explanation: 'It *was* a valid request, but the server is refusing to respond.'
   },
   {
     code: 304,
     description: 'Not Modified',
     explanation: 'You don\'t need to give this resource to the client as it hasn\'t changed since they downloaded it. "Indicates the resource hasn\'t been modified since the version specified by the request headers If-Modified-Since or If-None-Match."'
   },
   {
     code: 303,
     description: 'See Other',
     explanation: 'The response to this request can be found under another URI using a GET method. When you get a 303 in response to a POST, PUT or DELETE you should assume the server has received the data, and the redirect should be issued with a separate GET.'
   },
   {
     code: 302,
     description: 'Found',
     explanation: 'Some applications use this as if it were a 303 (See Other). With 303, you are performing a GET on the location field-value regardless of the original request methos (the client is not supposed to chnage the method on the redirect request.\nHTTP/1.0(RFC 1945): Client should perform a temporary redirect (original phrase was "Moved temporarily").\nHTTP/1.1: 303 (See Other) & 307 (Temporary Redirect) added for severs wanting to make it clear which kind of reaction is expected of the client.'
   },
   {
     code: 429,
     description: 'Too Many Requests',
     explanation: 'The user has sent too many requests in a certain amount of time. Intended for use with rate-limiting schemes.'
   },
   {
     code: 410,
     description: 'Gone',
     explanation: 'The requested resource is not and will not be available again. This should be used when a resource has been removed on purpose and ought to be purged. Rhe client should not not request the resource again in the future clients like search engines should remove the resource from their indices.'
   },
   {
     code: 301,
     description: 'Moved Permanently',
     explanation: 'This and all future requests should be directed to a given URI - which should be provided in the location field part of the response.'
   },
   {
     code: 502,
     description: 'Bad Gateway',
     explanation: 'The server was acting as a gateway or proxy and received an invalid response from the server upstream.'
   },
   {
     code: 500,
     description: 'Internal Server Error',
     explanation: 'Generic error message. Given when an unexpected condition was encountered and no more specific message is suitable.'
   },
   {
     code: 418,
     description: "I'm a Teapot",
     explanation: '1998 April Fool\'s joke. (Implemented in RFC 2324 Hyper Text Coffee Pot Control Protocol).'
   },
  ]

  $('#showAll').on('click', function(){
    showAll(false, false);
  });
  $('#clearCodes').on('click', function(){
    var codeInputs = $('table tr  td:nth-child(1) input');
    codeInputs = $.each(codeInputs, function(key, val){
      return val['value'] = "";
    })
  });
  $('#clearMessages').on('click', function(){
    var messageInputs = $('table tr  td:nth-child(2) input');
    messageInputs = $.each(messageInputs, function(key, val){
      return val['value'] = "";
    })
  });
  $('#clearRandom').on('click', function(){
    showAll(true, false);
  });

  var clearRandom = function(info){
    if(Math.random() > 0.49){
      return "<input value="+info+"></input><span>"+info+"</span>";
    } else {
      return "<input value=''></input><span>"+info+"</span>";
    };
  }
  var showAll = function(codeA, descA){
    $('table').html(" ");
      var codeStrHead = '<tr><th>Code</th><th>Description</th><th>Explanation</th></tr>';
      $('table').append(codeStrHead);
    for(i=0; i<codes.length; i++){
      app.code = codes[i].code;
      app.desc = codes[i].description;
      app.expl = codes[i].explanation;

        if(codeA != false){
          var codeString = clearRandom(app.code);
        } else {
          var codeString = "<input value="+app.code+"></input><span>"+app.code+"</span>"
        }
        if(descA != false){
          var codeString = clearRandom(app.desc);
        } else {
          var descString = "<input value="+'"'+app.desc+'"' + "></input><span>"+app.desc+"</span>";
        }

      var tableStr = "<tr><td>"+codeString+"</td><td>"+descString+"</td><td><p>"+app.expl+"</p></td></tr>";

      $('table').append(tableStr);
    }
  }
  showAll(false, false);


  $('input').on('keypress', (function(e){
    if ( e.which == 13 ) {
      e.preventDefault();
      var outerTd = $(this).closest('td');
      spanVal = $('span', outerTd)[0].innerHTML;
      $(this).val() === spanVal ? correct(this):wrong(this);
    } else {
      return;
    }
  }));

  var correct = function(a){
    // console.log('correct');
    // console.log(a);
    $(a).removeClass('correct wrong').addClass('correct');
  }
  var wrong = function(a){
    // console.log('wrong');
     $(a).removeClass('correct wrong').addClass('wrong');
  }
});

