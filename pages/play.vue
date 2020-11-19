<template>
  <div>
    <iframe id="slides" src="" frameborder="0"></iframe>
    <div id="quiz">
      <div
        v-for="(team, teamIndex) in match.teams"
        :key="team.id"
        class="team"
        v-bind:class="{ isActive: team.isActive }"
      >
        <div class="score">{{ score[teamIndex] }}</div>
        <div
          v-if="team.players.length < 4"
          class="addPlayer"
          @click="addPlayer(teamIndex)"
        >
          +
        </div>
        <div
          v-for="(player, playerIndex) in team.players"
          :key="player.id"
          class="player"
          v-bind:class="{ isActive: player.isActive }"
        >
          {{ playerIndex + 1 + " " + player.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      //Last team that buzzed
      buzzList: [0],
      currentSlide: 0,
      slidesUrl:
        "https://docs.google.com/presentation/d/e/2PACX-1vTO6jREKpD3JsrsnUlf-_PlSYFqO-WJ-PTt1D0R4yx1QuEZVzN7JZHe5guSZNIie53xxrjzgPYIAnzT/embed?start=true&loop=false&rm=minimal&delayms=0&slide="
    };
  },
  layout: "match",
  computed: {
    match() {
      return this.$store.state.match;
    },
    score() {
      let score = [];
      this.$store.state.match.teams.forEach(team => {
        let s = team.players.reduce((result, player) => {
          result += player.score;
          return result;
        }, 0);
        score.push(s);
      });
      return score;
    }
  },
  mounted() {
    window.onblur = function() {
      console.log("clicked");
      this.focus();
    };

    // focus();
    // var listener = window.addEventListener("blur", function() {
    //   console.log("blur");
    //   if (document.activeElement === document.getElementById("slides")) {
    //     // clicked }
    //     console.log("clicked");
    //     //window.removeEventListener("blur", listener);
    //   }
    //   this.focus();
    // });
  },
  methods: {
    addScore(team, inc) {
      this.$store.commit("addScore", { team, inc });
    },
    addPlayer(team) {
      this.$store.commit("addPlayer", team);
    },
    keyboardEvent(e) {
      //isbuzzing 1-8
      if (e.which >= 49 && e.which <= 56) {
        let team = e.which < 53 ? 0 : 1;
        let player = e.which - (team == 0 ? 49 : 53);
        this.buzzList.unshift(e.which - 49);
        this.$store.commit("activatePlayer", { team, player });
        this.$store.commit("activateTeam", team);
      }
      //Give the points to the last team that buzzed
      if (e.which === 107) {
        //+
        this.$store.commit("addScore", { player: this.buzzList[0], inc: 10 });
        this.$store.commit("deactivateAll");
      }
      //Reset all buzzers
      if (e.which === 82) {
        //r
        this.$store.commit("deactivateAll");
      }
      //Control Google Slides
      if (e.which === 37 || e.which === 39) {
        e.which == 37 ? this.currentSlide-- : this.currentSlide++;
        document.getElementById("slides").src =
          this.slidesUrl + this.currentSlide;
      }
    }
  }
};
</script>

<style>
.done {
  text-decoration: line-through;
}
#slides {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#quiz {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
}
</style>
