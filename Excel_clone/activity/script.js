let cellcontent = document.querySelector(".cells-content");

function initcells(){
let cellscontent ="<div class = 'top-left-cell'></div>";
cellscontent += "<div class = 'top-row'>"

for(let i=0;i<26;i++){
 cellscontent += `<div class= 'top-row-cell'>${String.fromCharCode(65+i)}</div>`
}
cellscontent +="</div>"

cellscontent += "<div class = 'left-col'>"

for(let i=0;i<100;i++){
    cellscontent += `<div class='left-col-cell'>${i+1}</div>`;

}

cellscontent +="</div>"
cellscontent +="<div class = 'cells'  >"

for(let i=0;i<100;i++){
    cellscontent += "<div class = 'row'>"
    for(let j=0 ; j<26 ; j++){
        cellscontent += "<div class = 'cell' contentEditable = 'true' ></div>"
    }
    cellscontent += "</div>"
}
cellscontent +="</div>"
cellcontent.innerHTML = cellscontent;
 
}


initcells();

let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");

cellcontent.addEventListener("scroll" , function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";  
})