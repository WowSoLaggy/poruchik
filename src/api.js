import { get_players } from './utils/players.js';
import { destroy } from './utils/ydb.js';


export async function on_request(event) {
  
  console.log(event);

  try {
    const players_list = await get_players();
    return JSON.stringify(players_list);
  } finally {
    await destroy();
  }
}
