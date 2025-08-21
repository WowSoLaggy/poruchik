const { destroy } = require('./utils/ydb.js');
const { run_action } = require('./actions.js');


async function get_action_name(event) {
  console.log('func call \'get_action\'');
  if (!event) {
    const errorMessage = 'No \'event\' provided';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  console.log('\'event\' provided');
  if (!event.params) {
    const errorMessage = 'No \'params\' provided';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  console.log('\'params\' provided');
  if (!event.params.proxy) {
    const errorMessage = 'No \'proxy\' provided';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  console.log('\'proxy\' provided');

  console.log('action: \'' + event.params.proxy + '\'');
  return event.params.proxy;
}


async function form_api_response(response_payload) {
  console.log('func call \'form_api_response\'');
  console.log('Response payload: ', JSON.stringify(response_payload));
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response_payload)
  };
}


async function on_request(event) {
  try {
    console.log('Request received');
    console.log(JSON.stringify(event));

    const action = await get_action_name(event);
    const response = await run_action(action);

    return await form_api_response(response);
  } finally {
    await destroy();
  }
}


module.exports = {
  on_request
};
