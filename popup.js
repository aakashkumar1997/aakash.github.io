const Http = new XMLHttpRequest();

function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

var endpoint='https://www.googleapis.com/youtube/v3/playlistItems';
const data = {
	part: "snippet",
	playlistId: "RD4nL1HFV-PqI",
	maxResults: "30",
	key: "AIzaSyBSk5uSwupF0odOcihVDZuENklIr9ULFlI"
};

var url = endpoint + formatParams(data);
Http.open("GET", url, true);
Http.send();

Http.onreadystatechange = (e) => {
  var parsedData = JSON.parse(Http.response);
  for(item of parsedData.items) {
  	var node = document.createElement("DIV");
  	var imageNode = document.createElement("DIV");
  	var textNode = document.createElement("DIV");
  	var imageNodeImage = document.createElement("IMG");
  	var textNodeText = document.createElement("DIV");
  	imageNodeImage.src = item.snippet.thumbnails.default.url;
  	imageNode.appendChild(imageNodeImage);
  	textNodeText.innerHTML = item.snippet.title;
  	textNode.appendChild(textNodeText);
  	node.appendChild(imageNode);
  	node.appendChild(textNode);
  	imageNode.classList.add("outer_div_content_box_image_div");
  	textNode.classList.add("outer_div_content_box_text_div");
  	imageNodeImage.classList.add("outer_div_content_box_image_div_image");
  	textNodeText.classList.add("outer_div_content_box_text_div_text");
  	node.classList.add("outer_div_content_box");
  	node.setAttribute("id", item.snippet.resourceId.videoId);
  	document.getElementsByClassName('outer_div')[0].appendChild(node);
  }

  document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
  	startVideo(e.path[0].id);
  });


}

function startVideo(videoId) {
	console.log(videoId);
	var player = document.getElementById('player');
	player.style.display = "block";
	player.src = "https://www.youtube.com/embed/" + videoId;
	console.log(player)
}