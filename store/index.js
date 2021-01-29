import state from "./state";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {}
};

// export const state = () => ({
//   user: null,
//   isAuthenticated: false,
//   increment: 10,
//   id: 0,
//   teams: [],
//   players: []
// });
// export const getters = {
//   score(state) {
//     return state.teams;
//   }
// };
// export const mutations = {
//   setUserToken(state, token) {
//     state.user["token"] = token;
//   },
//   setUserName(state, name) {
//     state.user["name"] = name;
//   },
//   activatePlayer(state, { team, player }) {
//     state.teams[team].players[player].isActive = true;
//   },
//   activateTeam(state, team) {
//     state.teams[team].isActive = true;
//   },
//   setTeams(state, nb) {
//     if (nb != 0) {
//       for (let i = 0; i < nb; i++) {
//         if (typeof state.teams[i] === "undefined") {
//           state.teams.push({
//             buzzerSound: null,
//             name: i + 1
//           });
//         }
//       }
//     }
//     state.teams = state.teams.slice(0, nb);
//   },
//   changeScore(state, { buzzer, add }) {
//     let player = state.players.find(p => {
//       return p.buzzer === buzzer;
//     });
//     player.score += add ? state.increment : -state.increment;
//   },
//   removePlayer(state, id) {
//     state.players = state.players.filter(function(obj) {
//       return obj.id !== id;
//     });
//   },
//   addPlayer(state, player) {
//     state.players.push({
//       name: player.name,
//       buzzer: player.buzzer,
//       score: 0,
//       color: player.color,
//       team: parseInt(player.team),
//       id: state.id
//     });
//     state.id++;
//   },
//   setTeamBuzzer(state, payload) {
//     state.teams[payload.team].buzzerSound = payload.buzzerSound;
//   }
//   //   deactivateAll(state) {
//   //     state.teams.forEach(team => {
//   //       team.isActive = false;
//   //       team.players.forEach(player => {
//   //         player.isActive = false;
//   //       });
//   //     });
//   //   }
// };
