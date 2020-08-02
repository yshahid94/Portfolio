<template>
  <div class="container">
    <div class="row">
      {{ status }}
    </div>
    <div class="row">
      Current player: {{ currentPlayer }}
    </div>
    
    <div style="max-width:800px; padding: 0px 100px">
      <div class="row" v-for="(n, i) in 3" :key=n>
        <TicTacToeCell v-for="(n, j) in 3"
        :key=n
        :value="board[i][j]"
        :height="height"
        :width="width"
        @clickEmit="childClicked(i, j)"/>
      </div>
    </div>

    <!-- <div class="row">
      <div class="board">
        <div v-for="(n, i) in 3" :key=n>
          <div v-for="(n, j) in 3" :key=n>
            <TicTacToeCell 
            :value="board[i][j]"
            :height="height"
            :width="width"
            @clickEmit="childClicked(i, j)"/>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicTacToeCell from "@/components/TicTacToe/TicTacToeCell.vue";
@Component({
  components: {
    TicTacToeCell
  }
})
export default class TicTacToeBoard extends Vue {
  childClicked(x: number, y: number) {
    // console.log("clicked: " + x + " " + y);
    if (this.board[x][y] !== '')
    {
      return;
    }
    this.board[x][y] = this.currentPlayer;
    this.$forceUpdate();
    if(this.playerHasTicTacToe(this.currentPlayer))
    {
      this.status = this.currentPlayer + ' player won the round!';
      this.board = [['', '', ''],
          ['', '', ''],
          ['', '', '']];
    }
    else if (!this.anyMovesPossible())
    {
      this.status = 'No one wins!';
      this.board = [['', '', ''],
          ['', '', ''],
          ['', '', '']];
    }

    if(this.currentPlayer == 'x')
    {
      this.currentPlayer = 'o';
    }
    else
    {
      this.currentPlayer = 'x';
    }
  }
  board = [['', '', ''],
          ['', '', ''],
          ['', '', '']];
  currentPlayer = 'x';
  height = 150;
  width = 150;
  status = 'Playing first game';
  playerHasTicTacToe(player: string) {
    // Horizontal rows
    for (let i=0; i<3; i++) {
      if (this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player) {
        return true;
      }
    }

    // Vertical rows
    for (let i=0; i<3; i++) {
      if (this.board[i][0] === player && this.board[i][1] === player && this.board[i][2] === player) {
        return true;
      }
    }

    // Diagonals
    if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
      return true;
    }
    if (this.board[2][0] === player && this.board[1][1] === player && this.board[0][2] === player) {
      return true;
    }
    return false;
  }
  anyMovesPossible(): boolean {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        if (this.board[i][j] === '') {
          return true;
        }
      }
    }
    return false;
  }
}
</script>

<style lang="css" scoped>
  .board {
    display: flex;
    flex-wrap: wrap;
    /* width: 300px;
    height: 300px; */
  }
</style>
