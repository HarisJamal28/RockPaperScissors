const mainmenu = document.getElementById('mainmenu')
const tutorial = document.getElementById('tutorial')
const rule1 = document.getElementById('game-rule')
const rule2 = document.getElementById('game-play-rule')
const gamebutton = document.getElementById('game_button')
const disclaimer = document.getElementById('Disclaimer')
const P1 = document.getElementById('P1')
const P2 = document.getElementById('P2')
const Chance1 = document.getElementById('prob1')
const Chance2 = document.getElementById('prob2')
const Chance3 = document.getElementById('prob3')
const P1_1 = document.getElementById('P1_1')
const P1_2 = document.getElementById('P1_2')
const P1_3 = document.getElementById('P1_3')
const P1_1_1 = document.getElementById('P1_1_1')
const P1_2_2 = document.getElementById('P1_2_2')
const P1_3_3 = document.getElementById('P1_3_3')
const P2_1 = document.getElementById('P2_1')
const P2_2 = document.getElementById('P2_2')
const P2_3 = document.getElementById('P2_3')
const P2_1_1 = document.getElementById('P2_1_1')
const P2_2_2 = document.getElementById('P2_2_2')
const P2_3_3 = document.getElementById('P2_3_3')
const choicePreview = document.getElementById("PLAYER_CHOICE");
const choicePreview2 = document.getElementById("PLAYER_CHOICE2");
const RResult = document.getElementById("RoundResult");
const P1Round = document.getElementById("P1Go");
const P2Round = document.getElementById("P2Go");
const Finish = document.getElementById("Finish");
const Rematch = document.getElementById("Rematch");
const Versus = document.getElementById("Versus_tag");
const buttons = document.querySelectorAll(".P1-screen ul li button"); // Select all buttons
const buttons2 = document.querySelectorAll(".P2-screen ul li button"); // Select all buttons

tutorial.style.display = 'none'
rule2.style.display = 'none'
P1.style.display = 'none'
P2.style.display = 'none'
disclaimer.style.display = 'none'
RResult.style.display = 'none'
Finish.style.display = 'none'
Rematch.style.display = 'none'
GameFlag = false;
Chance1.style.width = Math.random() * 100 + '%';
Chance2.style.width = Math.random() * 100 + '%';
Chance3.style.width = Math.random() * 100 + '%';

P1Choices = [];
P2Choices = [];

P1WinScore = 0;
P2WinScore = 0;

function TutorialGo(){
    mainmenu.style.display = 'none'
    tutorial.style.display = 'flex'
}

function GameGo(){
    if(GameFlag){
        tutorial.style.display = 'none';
        P1.style.display = 'flex'
    }else{
    rule1.style.display = 'none'
    rule2.style.display = 'flex'
    gamebutton.innerText = 'Play'
    GameFlag = true;
    }
}

function Disclaimer(P1Toss){
    P1Choices.push(P1Toss);
    P1.style.display = 'none'
    disclaimer.style.display = 'flex'
}

function NextPlayer(){
    disclaimer.style.display = 'none'
    P2.style.display = 'flex'
    if (P2WinScore === 1) P2_1_1.style.backgroundColor = "black";
    if (P2WinScore === 2) P2_2_2.style.backgroundColor = "black";
    if (P2WinScore === 3) P2_3_3.style.backgroundColor = "black";
}

function RoundResult(P2Toss) {
    P2Choices.push(P2Toss);
    P2.style.display = 'none';
    RResult.style.display = 'flex';
  
    const p1Last = P1Choices[P1Choices.length - 1];
    const p2Last = P2Choices[P2Choices.length - 1];
  
    const icons = [
      "fa fa-hand-back-fist", // Rock
      "fa fa-hand",           // Paper
      "fa fa-scissors"        // Scissors
    ];
  
    let index = 0;
    const shuffleDuration = 3000; // 5 seconds
    const intervalTime = 100; // shuffle every 100ms
  
    const shuffleInterval = setInterval(() => {
      const currentIcon = icons[index % icons.length];
      P1Round.innerHTML = `<i class="${currentIcon}"></i>`;
      P2Round.innerHTML = `<i class="${currentIcon}"></i>`;
      index++;
    }, intervalTime);
  
    setTimeout(() => {
      clearInterval(shuffleInterval);

      const p1Icon = getIconClass(p1Last);
      const p2Icon = getIconClass(p2Last);
  
      P1Round.innerHTML = `<i class="${p1Icon}"></i>`;
      P2Round.innerHTML = `<i class="${p2Icon}"></i>`;  

      const winner = getWinner(p1Last, p2Last);

      if (winner === "P1") {
        P1Round.classList.add("winner");
        P2Round.classList.add("loser");
        P1WinScore++;

        if (P1WinScore === 1) P1_1.style.backgroundColor = "black";
        if (P1WinScore === 2) P1_2.style.backgroundColor = "black";
        if (P1WinScore === 3) P1_3.style.backgroundColor = "black";

      } else if (winner === "P2") {
        P1Round.classList.add("loser");
        P2Round.classList.add("winner");
        P2WinScore++;

        if (P2WinScore === 1) P2_1.style.backgroundColor = "black";
        if (P2WinScore === 2) P2_2.style.backgroundColor = "black";
        if (P2WinScore === 3) P2_3.style.backgroundColor = "black";

      } else {
        P1Round.classList.add("draw");
        P2Round.classList.add("draw");
        Versus.innerText = 'DRAW'
      }

      Finish.style.display = 'flex'

      if (P1WinScore === 3 || P2WinScore === 3) {
        if(P1WinScore === 3){
            Versus.innerText = 'Player 1 WINS';
            Finish.style.display = 'none'
            Rematch.style.display = 'flex'
        }else{
            Versus.innerText = 'Player 2 WINS';
            Finish.style.display = 'none'
            Rematch.style.display = 'flex'
        }
      }

      P1Round.innerHTML = `<i class="${getIconClass(p1Last)}"></i>`;
      P2Round.innerHTML = `<i class="${getIconClass(p2Last)}"></i>`;
    }, shuffleDuration);
  }
  

  function getWinner(p1, p2) {
    if (p1 === p2) return "Draw";
  
    if (
      (p1 === "Rock" && p2 === "Scissors") ||
      (p1 === "Paper" && p2 === "Rock") ||
      (p1 === "Scissors" && p2 === "Paper")
    ) {
      return "P1";
    } else {
      return "P2";
    }
  }

function getIconClass(choice) {
    switch (choice) {
      case "Rock":
        return "fa fa-hand-back-fist";
      case "Paper":
        return "fa fa-hand";
      case "Scissors":
        return "fa fa-scissors";
      default:
        return "";
    }
  }


  function StartOver(){
        P1Choices = [];
        P2Choices = [];
        P1Round.innerHTML = '';
        P2Round.innerHTML = '';
        P1Round.className = 'P1_choice';
        P2Round.className = 'P2_choice';
        if (P1WinScore === 1) P1_1_1.style.backgroundColor = "black";
        if (P1WinScore === 2) P1_2_2.style.backgroundColor = "black";
        if (P1WinScore === 3) P1_3_3.style.backgroundColor = "black";
        Versus.innerText = 'VERSUS';
        Finish.style.display = 'none';
        RResult.style.display = 'none';
        P1.style.display = 'flex'
  }

  function Restart(){
    window.location.reload();
  }

buttons.forEach(button => {
    const icon = button.querySelector("i"); // Get the icon inside the button
  
    button.addEventListener("mouseenter", () => {
      choicePreview.className = icon.className; // Set the class of the preview to the icon's class
      choicePreview.classList.add("show"); // Add the 'show' class to trigger the transition
    });
  
    button.addEventListener("mouseleave", () => {
      choicePreview.classList.remove("show"); // Remove the 'show' class to reset the opacity and transform
      choicePreview.className = ""; // Reset the icon class
    });
  });

buttons2.forEach(button => {
    const icon2 = button.querySelector("i"); // Get the icon inside the button
  
    button.addEventListener("mouseenter", () => {
      choicePreview2.className = icon2.className; // Set the class of the preview to the icon's class
      choicePreview2.classList.add("show"); // Add the 'show' class to trigger the transition
    });
  
    button.addEventListener("mouseleave", () => {
      choicePreview2.classList.remove("show"); // Remove the 'show' class to reset the opacity and transform
      choicePreview2.className = ""; // Reset the icon class
    });
  });