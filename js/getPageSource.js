// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',node = document_root.querySelectorAll('a');
    var endJson = {html:'',data:[]};
    node.forEach(function (value, index){
        if(index > 1 && index < node.length - 9 && index%2 == 0){
            var url = value.href;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url, false ); // false for synchronous request
            xmlHttp.send( null );
            var parser = new DOMParser();
            var parsedHTML = parser.parseFromString(xmlHttp.response,'text/html');
            var weight = '',dimensions='';
            parsedHTML.querySelectorAll('.sNqDog').forEach(function(value,index){ 
                if(value.innerText.includes('kg')){
                    weight = value.innerText.split()[0];
                }
                if(value.innerText.match(/\b((\d+\.?\d* mm)( x ))+\b/i)){
                    dimensions = value.innerText.split()[0];
                }
            });
            weight = weight.slice(0,weight.length-3);
            var price = parsedHTML.getElementsByClassName('_1vC4OE _37U4_g')[0].innerText;
            price = price.slice(1, price.length).replace(",", "");
            var imageLink = value.children[0].src;
            var item = {name:node[index+1].innerText, weight:weight, dimensions:dimensions, price:price, url:imageLink};
            endJson.data.push(item);
        }
    });
    return endJson;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document),
    orgSource: document
});