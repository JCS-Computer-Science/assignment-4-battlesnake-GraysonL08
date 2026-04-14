export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    }
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    if(myHead.x == 0) {
        moveSafety.left = false;
        if(myHead.y > 4) {
            moveSafety.up = false;
        } else if(myHead.y < 5) {
            moveSafety.down = false;
        }
    } else if(myHead.x == 10) {
        moveSafety.right = false;
        if(myHead.y > 4) {
            moveSafety.up = false;
        } else if(myHead.y < 5) {
            moveSafety.down = false;
        }
    }
    if(myHead.y == 0) {
        moveSafety.down = false;
        if(myHead.x > 4) {
            moveSafety.right = false;
        } else if(myHead.x < 5) {
            moveSafety.left = false;
        }
    } else if(myHead.y == 10) {
        moveSafety.up = false;
        if(myHead.x > 4) {
            moveSafety.right = false;
        } else if(myHead.x < 5) {
            moveSafety.left = false;
        }
    }
    
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    /* need object with all snake coordinates
    prevent head from being able to move into any of the body's coordinates
    move direction opposite from body (maybe)
    find out how to get object to track all snake coordinates even as it grows
    get it to track when food is eaten so it knows when to grow */
   /* for(let i = 0; i < length + 1; i++) {
    if(gameState.you.body[i.x] == head.x - 1) {
        moveSafety.left = false;
    }
    if(gameState.you.body[i.x] == head.x + 1) {
        moveSafety.right = false;
    }
    if(gameState.you.body[i.y] == head.y - 1) {
        moveSafety.down = false;
    }
    if(gameState.you.body[i.y] == head.y + 1) {
        moveSafety.up = false;
    }
   } */
  //while() {
    for(let i = 0; i < gameState.you.body.length + 1; i++) {
        if(gameState.you.body[i.x] == myHead.x - 1) {
            moveSafety.left = false;
        }
        if(gameState.you.body[i.x] == myHead.x + 1) {
            moveSafety.right = false;
        }
        if(gameState.you.body[i.y] == myHead.y - 1) {
            moveSafety.down = false;
        }
        if(gameState.you.body[i.y] == myHead.y + 1) {
            moveSafety.up = false;
        }
    }
  //}
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    
    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    
    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}