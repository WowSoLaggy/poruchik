const { get_players } = require('./utils/players.js');
const { destroy } = require('./utils/ydb.js');


async function on_request(event) {
  
  console.log(event);

  try {
    const players_list = await get_players();
    return JSON.stringify(players_list);
  } finally {
    await destroy();
  }
}


module.exports = {
  on_request
};
