import ydb_api from 'ydb_api';

let ydb = null;

export async function get() {
  if (!ydb)
    ydb = await new ydb_api().init();
  return ydb;
}

export async function destroy() {
  if (ydb) {
    await ydb.destroy();
    ydb = null;
  }
}
