//1.deposit some money
//2.determine number of lines to bet
//3.collect the bet amount
//4.spin the slot machine
//5.check if the user won
//6.give the user winnings
//7.play again

const prompt=require("prompt-sync")();


const ROWS=3;
const COLS=3;
const SYMBOLS_COUNT ={
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}
const SYMBOL_VALUE ={
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit=()=>{
  while(true){
    const depositAmount=prompt("Enter a deposit amount: ");
    const numberdepositAmount=parseFloat(depositAmount); 

    if(isNaN(numberdepositAmount)|| numberdepositAmount<=0)
    {
        console.log("Invalid deposit amount,try again.");
    }
    else{
        return numberdepositAmount;
    }

  }
    
};
const getNumberOfLines=()=>{
    while(true){
        const Lines=prompt("Enter the number of lines to bet on(1-3): ");
        const numberOfLines=parseFloat(Lines); 
    
        if(isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines > 3)
        {
            console.log("Invalid number of lines,try again.");
        }
        else{
            return numberOfLines;
        }
    
      }

};
const getBet=(balance,Lines)=>
{
    while(true){
        const bet=prompt("Enter the  bet perline : ");
        const numberbet=parseFloat(bet); 
    
        if(isNaN(numberbet)|| numberbet<=0 || numberbet > balance/Lines)
        {
            console.log("Invalid number of lines,try again.");
        }
        else{
            return numberbet;
        }
    
      }

};
const spin=()=>{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT) )
    {
        for(let i=0;i<count;i++)
        {
            symbols.push(symbol);
        }
    }
    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
          const selectSymbol=reelSymbols[randomIndex];
          reels[i].push(selectSymbol);
          reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;

};
const transpose=(reels)=>
{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++)
        {
            rows[i].push(reels[j][i])
        }
    }
    return rows;

};
const getWinnings=(rows,bet,Lines)=>{
    let winnings=0;
    for(let row=0;row<Lines;row++)
    {
        const symbols=rows[row];
        let allSame=true;
        for(const symbol of symbols)
        {
            if(symbol!=symbols[0])
            {
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings+=bet*SYMBOL_VALUE[symbols[0]];

        }

    }
    return winnings;
}
const printRows=(rows)=>
{
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
          rowString += symbol;
          if (i != row.length - 1) {
            rowString += " | ";
          }
        }
        console.log(rowString);
      }

};
const game=()=>{
    let balance=deposit();
    while(true)
    {
    console.log("you have a balance of Rs"+balance);
    
    const numberOfLines=getNumberOfLines();
    const bet=getBet(balance,numberOfLines);
    balance-=bet*numberOfLines;

    const reels=spin();
    const rows=transpose(reels);
    printRows(rows);
    const winnings=getWinnings(rows,bet,numberOfLines);
    balance+=winnings;
    console.log("You won, Rs"+winnings.toString());
    if(balance<=0){
        console.log("You are out of money");
        break;
    }
    const playagain=prompt("Do you want to play again(y/n)?");
    if(playagain!="y")break;

    }
    
};
game();
