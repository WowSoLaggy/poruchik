import dotenv from 'dotenv';

import { get_players_list } from './api.js';



async function main() {
  try {
    const players = await get_players_list();
    console.log('Players:', players);
  } catch (error) {
    console.error('Error:', error);
  }
}


dotenv.config();
main()
  .then(() => console.log('Done'));
