import { Events } from '../Interfaces';

export const event: Events = {
	name: 'error',
	run: async (client, error:Error) => {
		console.log(error);
	}
}
