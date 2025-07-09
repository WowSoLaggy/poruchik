const { get : get_ydb } = require('./ydb.js');


let _cache = null;


async function get_players() {
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


module.exports = {
  get_players
};
