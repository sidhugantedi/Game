/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;


var lastDice;

//see function at bottom
init();

document.querySelector('.btn-roll').addEventListener('click', function() {

	if (gamePlaying) {
		//1. need a random number
	var dice = Math.floor(Math.random() * 6) + 1;

	//2. display the result
	var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'images/dice-' + dice + '.png';


	//3. update the roundscore IF the rolled number is not a 1
	if(lastDice === 6 && dice === 6) {
		scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = '0';
		nextPlayer();	

	}
		else if(dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		}else {
			
			//nextPlayer..check the function nextPlayer to understand
			nextPlayer();
		}
		lastDice = dice;
	}

});
	//selecting the hold button to give a function
			document.querySelector('.btn-hold').addEventListener('click', function() {

			if (gamePlaying) {
					//add current score to global score i.e player-score
				//scores[activePlayer] = scores[activePlayer] + roundScore;
				scores[activePlayer] += roundScore;


				//update the UI 
				//document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
				document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
				var input = document.querySelector('.final-score').value;

				var winningScore;

				if(input) {
					winningScore = input;
				} else {
					winningScore = 55;
				}



				/*check if player won the game ==> explain by step
1.if the if statement is true then display the Player name as winner;
2. hide the dice image after declaring the winner;
3. to add a class of winner ===? look into css class winner;
4. to avoid toggling the active class to next player, we remove the active class.*/

				if(scores[activePlayer] >= winningScore) {
					document.querySelector('#name-'  + activePlayer).textContent = 'Winner!';
					document.querySelector('.dice').style.display = 'none';
					document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
					document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
					//document.querySelector(.activePlayer).classList.add('winning-class');
					document.querySelector('body').classList.add('after-win');
					gamePlaying = false;
					
					//document.querySelector('.wrapper').classList.add('animation');

				}else {

				//nextPlayer..check the function nextPlayer to understand
				nextPlayer();
				}
			}


			});

			function nextPlayer() {
				//next player turn

			activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
			roundScore = 0;

			/*explanation

			 if (activePlayer === 1) {
			 	activePlayer = 2;
			 }else {
			 	activePlayer = 1
			 }    */


			//to update the current score to zero when the dice is 1.
			document.getElementById('current-1').textContent = '0';
			document.getElementById('current-2').textContent = '0';


			/*to change the active class with grey background when the player is changed.
			 the below code only changes from player 1 to player 2 but it doesnot changes back
			 document.querySelector('.player-1-panel').classList.remove('active');
			 document.querySelector('.player-2-panel').classList.add('active');*/


			//the below code toggles between player 1 and player 2
			document.querySelector('.player-1-panel').classList.toggle('active');
			document.querySelector('.player-2-panel').classList.toggle('active');

			//now we have to hide the dice once again
			document.querySelector('.dice').style.display = 'none';

			};

			document.querySelector('.btn-new').addEventListener('click', init);

			function init() {
scores = [0,0,0];
roundScore = 0;
activePlayer = 1;
gamePlaying = true;
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-1').textContent = 0;
document.getElementById('score-2').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('current-2').textContent = 0;
document.getElementById('name-1').textContent = 'player 1';
document.getElementById('name-2').textContent = 'player 2';
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-2-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.add('active');
document.querySelector('.player-2-panel').classList.remove('active');
document.querySelector('body').classList.add('after-win');
document.querySelector('body').classList.remove('after-win');

			};


// dice = Math.floor(Math.random() * 6) + 1;

// document.querySelector('#current-' + activePlayer).innerHTML = dice;







