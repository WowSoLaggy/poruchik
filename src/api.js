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

async function form_bad_api_response(error_message) {
  console.log('func call \'form_bad_api_response\'');
  console.error('Error message: ', error_message);
  return {
    statusCode: 400,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ error: error_message })
  };
}


async function on_request(event) {
  try {
    console.log('Request received');
    console.log(JSON.stringify(event));

    const action = await get_action_name(event);
    const response_payload = await run_action(action);

    const response = await form_api_response(response_payload);
    console.log('Sending response');
    console.log(JSON.stringify(response));
    
    return response;

  } catch (error) {
    console.error('Error processing request:', error);
    const response = await form_bad_api_response(error.message);
    console.log('Sending error response');
    console.log(JSON.stringify(response));
    return response;

  } finally {
    await destroy();
  }
}


module.exports = {
  on_request
};
