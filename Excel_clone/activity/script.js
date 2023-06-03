let cellcontent = document.querySelector(".cells-content");

function initcells(){
let cells ="";
for(let i=0;i<100;i++){
    cells += "<div class = 'row'>"
    for(let j=0 ; j<26 ; j++){
        cells += "<div class = 'cell'>Cell</div>"
    }
    cells += "</div>"
}
cellcontent.innerHTML = cells;
 
}

initcells();