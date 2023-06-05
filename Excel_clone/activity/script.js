let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");

cellsContentDiv.addEventListener("scroll" , function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";  
})

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(e){
        let rowid= Number(e.target.getAttribute("rowid"));
        let colid= Number(e.target.getAttribute("colid"));

        let address= String.fromCharCode(65+colid)+(rowid+1)+"";
        console.log(address);

        document.querySelector("#address").value = address ;
        

    })
    allCells[i].addEventListener("blur" , function(e){
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        let cellObject = db[rowId][colId];
        console.log("before update " , cellObject);

        if(cellObject.value == cellValue){
            return;
        }

        // update the cellobject value if not same
        cellObject.value = cellValue;
        console.log("after update " , cellObject);
    })
}