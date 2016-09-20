const App = React.createClass({
  
  getInitialState(){
    return{
      playerOneMoves: [],
      playerTwoMoves: [],
      playerTurn: false,
      possibleWaysToWin: [ 
          ['zero', 'one', 'two'],
          ['three', 'four', 'five'],
          ['six', 'seven', 'eight'],
          ['zero', 'three', 'six'],
          ['one', 'four', 'seven'],
          ['two', 'five', 'eight'],
          ['zero', 'four', 'eight'],
          ['two', 'four', 'six'],
      ]
    }
  },

  // delete


resetGame(){
  let boards = ['zero','one','two','three','four','five','six','seven','eight']
  boards.forEach(function(arg){document.getElementById(arg).innerHTML = ''})
  document.getElementById('winner').innerHTML = ''
  document.getElementById('current-player').innerHTML = ''
  this.setState({
    playerOneMoves: [],
    playerTwoMoves: [],
    playerTurn: false,
  })
 }, 

 isWinner(bigArr, smallArr) {
  //Check to see if there are enough moves to win
  if(smallArr.length < 2){
    return false
  } else {
    for(var i = 0; i < bigArr.length; i++) {
      var matchCount = 0;
      let bigArrChunck = bigArr[i];
      for (var j = 0; j < smallArr.length; j++){
              
      if(bigArr[i].includes(smallArr[j])){
        matchCount++
                        console.log('===============++++++++++++++++=========================I am smallArr: ', smallArr)
                        console.log('I AM MATCH COUNT BEFORE THE WINNER CONDITION: --------------------', matchCount);
        if(matchCount === 3){
          document.getElementById('winner').innerHTML = 'You Big Winner You!'
                        console.log('THIS IS MATCH COUNT=========winner condition met==========', matchCount)
        }
      }
      }//var j for
    }//var i for
  }//else
},

  getChoiceValue(e){
    //deconstruct state for players and moves and turns
    const { playerOneMoves, playerTwoMoves, playerTurn } = this.state
      // <<<---------------delete to here

    let selection = e.target.getAttribute('data-tag')
    //PlayerOne is false. If false. Update state and switch playerTurn
    if(!playerTurn) {
      let playerTurnSwitch = true
      document.getElementById(selection).innerHTML = 'X';
      this.setState({
        playerTurn: playerTurnSwitch,
        playerOneMoves: [...playerOneMoves, selection] 
      })
      document.getElementById(selection).innerHTML = 'X';
      document.getElementById('current-player').innerHTML = 'Player Two...can you take any longer?!';
      this.isWinner(this.state.possibleWaysToWin, this.state.playerOneMoves)
    //playerTwo is true. If true. Update state and switch playerTurn
    } else {
      let playerTurnSwitch = false
      document.getElementById(selection).innerHTML = 'O';
      this.setState({
        playerTurn: playerTurnSwitch,
        playerTwoMoves: [...playerTwoMoves, selection] 
      })
      document.getElementById('current-player').innerHTML = 'Player One, Come On!';
      this.isWinner(this.state.possibleWaysToWin, this.state.playerTwoMoves)
    }
    // console.log("I'm player one moves: ", playerOneMoves)
    // console.log("I'm player two moves: ", playerTwoMoves)
  },

  render(){

    return (
      <div className='container'>
        <div className='boardContainer'>
          <h1 id="winner" className="winner-msg"></h1>
          <span onClick={this.getChoiceValue} data-tag={'zero'}  className='col-sm-4 boardSection '><p id='zero'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'one'}   className='col-sm-4 boardSection '><p id='one'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'two'}   className='col-sm-4 boardSection '><p id='two' ></p></span>
          <span onClick={this.getChoiceValue} data-tag={'three'} className='col-sm-4 boardSection '><p id='three'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'four'}  className='col-sm-4 boardSection '><p id='four'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'five'}  className='col-sm-4 boardSection '><p id='five'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'six'}   className='col-sm-4 boardSection '><p id='six'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'seven'} className='col-sm-4 boardSection '><p id='seven'></p></span>
          <span onClick={this.getChoiceValue} data-tag={'eight'} className='col-sm-4 boardSection '><p id='eight'></p></span> 
          <h2 id='current-player' className='currentPlayer'>Ged' In Here. It's Your Turn</h2>
          <button onClick={this.resetGame} id='reset-game' className='btn btn-lg btn-block btn-success'>Reset Game</button>
        </div>
      </div>
    )
  }
})

ReactDOM.render (<div className='main-app'>
  <App />
  </div>,
  document.getElementById('root')
)