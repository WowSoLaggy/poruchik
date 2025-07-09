import { get_players } from './utils/players.js';
import { destroy } from './utils/ydb.js';


export async function get_players_list() {
  try {
    const players_list = await get_players();
    return JSON.stringify(players_list);
  } finally {
    await destroy();
  }
}
