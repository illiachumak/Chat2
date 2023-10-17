import io from 'socket.io-client'
import { base_url } from './assets/utils';

const socket = io.connect(`${base_url}`)

export default socket;
