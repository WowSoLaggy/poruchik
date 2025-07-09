import dotenv from 'dotenv';

import { on_request } from './api.js';



async function main() {
  try {
    const players = await on_request();
    console.log('Players:', players);
  } catch (error) {
    console.error('Error:', error);
  }
}


dotenv.config();
main()
  .then(() => console.log('Done'));
