const { get_players } = require('./utils/players.js');


const actions = {
  get_players: async function() {
    // Implement logic to get players
    console.log('Action: \'get_players\'');
    const players_list = await get_players();
    return players_list;
  },
  get_games: async function() {
    // Implement logic to get games
    console.log('Action: \'get_games\'');
    // This is a placeholder; replace with actual game retrieval logic
    return ["Game1", "Game2", "Game3"];
  }
};

function run_action(actionName) {
  const action = actions[actionName];
  if (typeof action === "function") {
    return action();
  } else {
    const errorMessage = `Unknown action: ${actionName}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}


module.exports = {
  run_action
};
