import { CommandInteraction, MessageEmbed } from 'discord.js';

type MessageInfo = {
	interaction?: CommandInteraction,
	embed?: MessageEmbed,
	Position?: number,
	ImageArray?: string[],
	id: number
}

export interface TempConfig {
	agreedToOpenUrl: boolean,
	summaryPosition?: MessageInfo[]
}