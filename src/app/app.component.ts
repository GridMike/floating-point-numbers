import { Component } from '@angular/core';
import { RoundResult } from './model/round-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  currentAiRound: number = 0;
  currentUserRound: number = 0;
  roundCounter: number = 0;
  roundResult: RoundResult = {
    isWin: 'Start new game',
    userScore: 0,
    aiScore: 0
  }
  gameResult: string = ""
  aiOverallScore: number = 0;
  userOverallScore: number = 0;
  btcAccount: string | null = localStorage.getItem('btcAccount') === null || '' ? '0' : localStorage.getItem('btcAccount');
  gameStatus: boolean = true;

  countGame(): void {
    this.roundCounter = this.roundCounter + 1
    let currentBtc = localStorage.getItem('btcAccount');

    if (this.roundCounter === 7) {
      this.gameStatus = false;

      if (this.userOverallScore > this.aiOverallScore) {
        this.userOverallScore;
        if (this.userOverallScore <= 1) {
          let newBtc = Number(currentBtc) + 0.1;
          localStorage.setItem('btcAccount', newBtc.toString().slice(0,3)) 
        } else {
          let newBtc = Number(currentBtc) + 0.7;
          localStorage.setItem('btcAccount', newBtc.toString().slice(0,3)) 
        }
        this.gameResult = 'You have won the game!'
      } else if(this.userOverallScore === this.aiOverallScore) {
        this.userOverallScore;
        let newBtc = Number(currentBtc) + 0.1;
        localStorage.setItem('btcAccount', newBtc.toString().slice(0,3)) 
        this.gameResult = 'Game ends in a tie'
      } else {
        this.gameResult = `You've lost the game`
      }
      
    } else if(this.roundCounter === 8) {
      this.roundCounter = 0;
      this.aiOverallScore = 0;
      this.userOverallScore = 0;
      this.gameStatus = true;
      this.btcAccount = currentBtc;

      this.roundResult = {
        isWin: 'Start new game',
        userScore: 0,
        aiScore: 0
      }
    } else {
      this.currentAiRound = Math.floor(Math.random() * (2 + 1))
      this.currentUserRound = Math.floor(Math.random() * (2 + 1))
      this.gameStatus = true;

      if(this.currentUserRound > this.currentAiRound) {
        this.roundResult = {
          isWin: 'Win :)',
          userScore: 0.2,
          aiScore: 0
        }
      } else if (this.currentUserRound === this.currentAiRound) {
        this.roundResult = {
          isWin: 'Tie :]',
          userScore: 0.1,
          aiScore: 0.1
        }
      } else {
        this.roundResult = {
          isWin: 'Loss :(',
          userScore: 0,
          aiScore: 0.2
        }
      } 
      this.aiOverallScore = this.aiOverallScore + this.roundResult.aiScore;
      this.userOverallScore = this.userOverallScore + this.roundResult.userScore;
    }
  }
}
