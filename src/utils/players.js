import { get as get_ydb } from './ydb.js';


let _cache = null;


export async function get_players() {
  if (!_cache) {
    const query = `SELECT * FROM \`pref/players_tbl\``;

    try {
      const ydb = await get_ydb();
      _cache = await ydb.query(query);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  return _cache;
}
