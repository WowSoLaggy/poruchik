const ydb_api = require('ydb_api');


let ydb = null;


async function get() {
  if (!ydb)
    ydb = await new ydb_api().init();
  return ydb;
}

async function destroy() {
  if (ydb) {
    await ydb.destroy();
    ydb = null;
  }
}


module.exports = {
  get,
  destroy
};
