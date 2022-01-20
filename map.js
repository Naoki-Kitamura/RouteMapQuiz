var map = L.map('map');

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

graph = new Graph(edge);

var line = [];
var marker = [];

const EASY = 0;
const HARD = 1;
const start = 1189; // TOKYO
// var start = null;
var left = null;
var right = null;
var path_l = null;
var path_r = null;
var dist_l = null;
var dist_r = null;

var ans = null;
var difficulty = null;
var score = 0;

function drawPath(path){
  if(path==null){
    return;
  }

  var c = [];
  for(var i=0;i<path.length;i++){
    c.push([coord[Number(path[i])].lat,coord[Number(path[i])].lon]);
  }

  l = L.polyline(c,{
    "color": "#FF0000",
    "weight": 3,
    "opacity": 0.6
  }).addTo(map);
  line.push(l);
}

function drawNode(node){
  m = L.marker(
    [coord[node].lat, coord[node].lon]
  ).bindPopup(coord[node].name).addTo(map);
  marker.push(m);
}

function resetMap(){
  line.forEach(l=>{
    map.removeLayer(l);
  })
  line = [];

  marker.forEach(m=>{
    map.removeLayer(m);
  })
  marker = [];

  map.setView([35, 139], 5);
}

function resetGame(){
  resetMap();

  // start = null;
  goal = [];
  score = 0;

  document.getElementById("info").innerHTML = "";
}

function drawScore(){
  document.getElementById("score").innerHTML = "Score: " + score;
}

function newGame(diff){
  difficulty = diff;
  resetGame();
  document.getElementById("easy").style.visibility = "hidden";
  document.getElementById("hard").style.visibility = "hidden";
  document.getElementById("left").style.visibility = "visible";
  document.getElementById("right").style.visibility = "visible";
  nextStage();
}

function nextStage(){
  resetMap();
  drawScore();

  // start = Math.floor(Math.random()*coord.length);
  left = start;
  while(left==start){
    left = Math.floor(Math.random()*coord.length);
  }
  right = start;
  while(right==start||right==left){
    right = Math.floor(Math.random()*coord.length);
  }

  path_l = graph.findShortestPath(start.toString(), left.toString());
  dist_l = graph.getDist(left);
  path_r = graph.findShortestPath(start, right);
  dist_r = graph.getDist(right);
  ans = dist_l<dist_r ? left : right;

  document.getElementById("left").setAttribute("value", coord[left].name);
  document.getElementById("right").setAttribute("value", coord[right].name);

  if(difficulty==EASY){
    drawNode(left);
    drawNode(right);
  }
}

function gameOver(){
  document.getElementById("easy").style.visibility = "visible";
  document.getElementById("hard").style.visibility = "visible";
  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
  document.getElementById("info").innerHTML = "Game Over";

  drawPath(path_l);
  drawPath(path_r);
  drawNode(start);
  drawNode(left);
  drawNode(right);
}

function checkAnswer(input){
  if(input==ans){
    score += 1;
    nextStage();
  }
  else{
    gameOver();
  }
}

// 到達不能
// for(var i=0;i<coord.length;i++){
//   if(coord[i].name=="下白滝"){
//     graph.findShortestPath(start, i);
//     console.log(graph.getDist(i));
//     console.log(coord[i]);
//   }
// }

map.setView([35, 139], 5);
