document.querySelector(".control-buttons").onclick = function() {
    let yourName = prompt("What's Your Name?")
    
    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Guest";
    }else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();
}

//effect duration
let duration = 1000;

//win counter
let winCounter = 0;


let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

//create range of keys
//let orderRange = [...Array(block.length).keys()];       // option 1
let orderRange = Array.from(Array(blocks.length).keys());  // option 2

//console.log(orderRange);
shuffle(orderRange);
//console.log(orderRange);

//add order css property to game blocks
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener("click", () => {
        flipBlock(block);
    })
})

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    //collect all flipped blocks
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    //if there is two flipped blocks
    if(allFlippedBlocks.length == 2) {
        //console.log("Two Flipped Blocks Selected");

        //stop clicking function
        stopClicking();

        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
}

function checkMatchedBlocks(firstBlock,secondBlock) {

    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.technology == secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        winCounter++;

        if(winCounter === 10) {
            setTimeout(() => {
                blocksContainer.classList.add("no-clicking");
                alert("You Won!");
            },duration);
        }
        

    }else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration);

        if(parseInt(triesElement.innerHTML) == 7) {
            setTimeout(() => {
                blocksContainer.classList.add("no-clicking");
                alert("You Lost!");
            },duration);
            
        }
    }

}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        //remove class no clicking after the duration
        blocksContainer.classList.remove("no-clicking");
    },duration)
}

//shuffle function
function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}