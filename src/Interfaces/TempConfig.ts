import { CommandInteraction } from 'discord.js';

type MessageInfo = {
	interaction: CommandInteraction,
	Position: number,
	ImageArray: string[]
}

export interface TempConfig {
	agreedToOpenUrl: boolean,
	summaryPosition?: MessageInfo[]
}