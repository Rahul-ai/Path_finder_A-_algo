function removeFromArray(arr,elt){
for(var i=arr.length -1;i>=0;i--){
if(arr[i] == elt){
arr.splice(i,1);
}
}
}
function heuristic(a,b){
var d= dist(a.i,a.j,b.i,b.j);
return d;
}
var cols=50;  //set columns
var rows=50;  //set rows
var grid=new Array(cols);   
var openSet=[];
var closeSet=[];
var start ;
var end;
var w,h;
var path=[];
var nosolution=false;
function Spot(i,j){
this.i=i;
this.j=j;
this.f=0;
this.g=0;
this.h=0;
this.neighbors=[];
this.previous= undefined;
this.wall=false;
if(random(1)<0.4){
// setting the wall
this.wall=true;
}
this.show=function(color){
fill(color);
if(this.wall){
fill(0);
//giving the "Black" color to wall
}
noStroke(0);
rect(this.i * w, this.j * h, w-1 , h-1);
}
this.addNeighbors = function(grid){ 
// setting the neighbors for each grid
var i=this.i;
var j=this.j;
if(i <cols - 1){
this.neighbors.push(grid[i+1][j]);
}
if(i>0){
this.neighbors.push(grid[i - 1][j]);
}
if(j < rows-1){
this.neighbors.push(grid[i][j+1]);
}
if(j>0) 
{
this.neighbors.push(grid[i][j-1]);
}  
if(i >0&&j>0){
this.neighbors.push(grid[i-1][j-1]);
}
if( i<cols-1 && j>0){
this.neighbors.push(grid[i+1][j-1]);
}
if(i<cols-1 && j<rows-1){
this.neighbors.push(grid[i+1][j+1]);
}
}
}
function setup(){
createCanvas(400,400);
w=width/cols; 
h=height/cols;
for(var i=0;i<cols;i++)
{
grid[i]=new Array(rows);
}
for(var i=0;i<cols;i++){
for(var j=0;j<rows;j++){
grid[i][j]=new Spot(i,j);
}
}
for(var i=0;i<cols;i++){
for(var j=0;j<rows;j++){
grid[i][j].addNeighbors(grid);
}
}
start=grid[0][0];
end=grid[cols-1][rows-1];
end.wall=false;
start.wall=false;
openSet.push(start);
console.log(grid);
}
function draw(){
// Doing the recursion job
if (openSet.length>0){
var final=0;      
for(var i=0;i<openSet.length;i++){
 if(openSet[i].f < openSet[final].f){
  final=i;
}
} 
var current =openSet[final];
if(current===end){	
noLoop();
console.log("i am Happy bro And you know why");
}
removeFromArray(openSet,current);
closeSet.push(current);
var neighbors = current.neighbors;
for(var i =0; i<neighbors.length;i++){
var neighbor=neighbors[i];
if(!closeSet.includes(neighbor) && !neighbor.wall){
var tempG=current.g+1; 
  var newpath=false;
if(openSet.includes(neighbor)){
if(tempG < neighbor.g){
  newpath = true;
neighbor.g = tempG;
} 
}else{
neighbor.g=tempG;
  newpath =true;
openSet.push(neighbor);
}
  if(newpath){
neighbor.h = heuristic(neighbor,end);
neighbor.f= neighbor.g+neighbor.h;
neighbor.previous=current;
  }
} 
}
}
else{
console.log("no Solution");
nosolution=true;
noloop();
}
background(0);
for(var i=0;i<cols;i++){
for(var j=0;j<rows;j++){
grid[i][j].show(color(255));
}
}
for(var i=0;i<closeSet.length;i++){
closeSet[i].show(color(255,0,0));
}
for(var i=0;i<openSet.length;i++){
openSet[i].show(color(0,255,0));
}
	path=[];
	var temp =current;
	path.push(temp);
while(temp.previous){
	path.push(temp.previous);
   temp = temp.previous;
}

for(var i=0;i< path.length; i++){
path[i].show(color(0,0,255));
}
}



