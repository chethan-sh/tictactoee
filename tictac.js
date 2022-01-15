// let flag=true;
// let arr=[[],[],[]];
// let count=0;
// let xlast;
// let ylast=undefined;
// function displaycat() {
//     let divv=document.getElementsByClassName('playwith')[0];
//    if(flag)
//    {
//        divv.style.display='block';
//        flag=false;
//    }
//    else{
//     divv.style.display='none';
//     flag=true;
//    }
// }
// function createtd(a) {
//     let tr=document.createElement('tr');
//     let table=document.getElementById('table1');
//     for(let i=0;i<3;i++)
//     {
//         let td=document.createElement('td');
//         td.innerHTML='hj';
//         td.id=`${a}${i}`;
//         td.addEventListener('click',playwithsys);
//         tr.appendChild(td);
//     }
//     table.appendChild(tr);
// }

// function playwithsys() {
//     playwithsyss(event.target);
// }
// function playwithsyss(td) {
//     count++;
//     let i=Number(td.id[0]);
//     let j=Number(td.id[1]);
//     if(count%2!=0)
//     {
//         td.innerHTML='X';
//         arr[i][j]='X';
//         xlast=`${i}${j}`;
//         if(ylast==undefined)
//         {
//             if(i==2)
//             {
//                 ylast=`${0}${j}`;
//                 arr[0][j]='Y';
//             }else{
//                 ylast=`${i+1}${j}`;
//                 arr[i+1][j]='Y';
//             }
//             let tdn=document.getElementById(ylast);
//             tdn.innerHTML='Y';
//             count++;
//         }
//         else{
//                let loc= checkwin(ylast);
               
//                if(loc)
//                {
//                    console.log("game over"+loc);
//                }
//                else{
//                   let locc= insertY(xlast);
//                   ylast=locc;
//                   if(locc)
//                   {
//                     document.getElementById(locc).innerHTML='Y';
//                   }
//                }
//             count++;
//         }
//     }
// }
// function checkwin(name) {
//     let i=+name[0];
//     let j=+name[1];
//     let spc=0;
//     let ycount=0;
//     let loc='';
//     for(let k=0;k<3;k++)
//     {
//         if(arr[i][k]=='Y')
//         {
//             ycount++;
//         }
//         if(arr[i][k]==undefined)
//         {
//             spc++;
//             loc=`${i}${k}`;
//         }
//     }
//     if(ycount==2 && spc==1)
//     {
//        document.getElementById(loc).innerHTML='Y';
//         return loc;
//     }
//     ycount=0;
//     spc=0;
//     loc=false;
//     for(let k=0;k<3;k++)
//     {
//         if(arr[k][j]=='Y')
//         {
//             ycount++;
//         }
//         if(arr[k][j]==undefined)
//         {
//             spc++;
//             loc=`${k}${j}`;
//         }
//     }
//     if(ycount==2 && spc==1)
//     {
//         document.getElementById(loc).innerHTML='Y';
//         return loc;
//     }
//     return false;
// }
// function insertY(name) {
//     let i=+name[0];
//     let j=name[1];
//     let spc=0;
//     let ycount=0;
//     let loc='';
//     for(let k=0;k<3;k++)
//     {
//         if(arr[i][k]=='X')
//         {
//             ycount++;
//         }
//         if(arr[i][k]==undefined)
//         {
//           if(spc>0)
//           {
//             checkwin(ylast);
//           }
//             spc++;
//             loc=`${i}${k}`;
//         }
//     }
//     if(ycount==2 && spc==1)
//     {
//         return loc;
//     }
//     ycount=0;
//     spc=0;
//     loc=false;
//     for(let k=0;k<3;k++)
//     {
//         if(arr[k][j]=='X')
//         {
//             ycount++;
//         }
//         if(arr[k][j]==undefined)
//         {
//           if(spc>0)
//           {
//             checkwin(ylast);
//           }
//             spc++;
//             loc=`${k}${j}`;
//         }
//     }
//     if(ycount==2 && spc==1)
//     {
//         return loc;
//     }
//     return false;
    
// }
const statusDisplay = document.querySelector(".game--status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `${(currentPlayer=='O'?'player-2':'player-1')} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${(currentPlayer=='O'?'player-2':'player-1')}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
