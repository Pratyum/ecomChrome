chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    data = request.source.data;
    output = ''
    for(var i=0; i<data.length; i++){
      var weight = String(data[i].weight);
      var dimensions = String(data[i].dimensions);
      var name = String(data[i].name);
      var price = String(data[i].price);
      var link = String(data[i].url);
      console.log(price);
      output += '<div class="card-list">\n' +
          '<div class=media-img>\n' +  
          '<img class="img-fluid" alt="Image" src='+link+'>\n' + 
          '</div>\n' +
          '<div class="media-body">\n' + 
            '<h6 class="card-title">'+name+'</h6>\n' +
            '<ul>' + 
              '<li>Price: '+price+'</li>'+
              '<li>Weight: '+weight+'</li>'+
              '<li>Dimensions: '+dimensions+'</li>'+
            '</ul>' +
          '</div>\n' + 
        '</div>\n'
      console.log(output);
    }
    // console.log(request.source.data);
    message.innerHTML = output;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "js/getPageSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;