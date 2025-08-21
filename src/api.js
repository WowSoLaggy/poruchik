const { get_players } = require('./utils/players.js');
const { destroy } = require('./utils/ydb.js');


async function get_action(event) {
  console.log('func call \'get_action\'');
  if (!event) {
    console.error('No \'event\' provided');
    throw new Error('No \'event\' provided');
  }
  console.log('\'event\' provided');
  if (!event.params) {
    console.error('No \'params\' provided');
    throw new Error('No \'params\' provided');
  }
  console.log('\'params\' provided');
  if (!event.params.proxy) {
    console.error('No \'proxy\' provided');
    throw new Error('No \'proxy\' provided');
  }
  console.log('\'proxy\' provided');

  console.log('action: \'' + event.params.proxy + '\'');
  return event.params.proxy;
}

async function on_request(event) {
  
  console.log('LOG EVENT')
  console.log(JSON.stringify(event));
  console.log('LOG EVENT END')

  const action = await get_action(event);

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
