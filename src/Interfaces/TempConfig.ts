import { CommandInteraction, MessageEmbed } from 'discord.js';

type MessageInfo = {
	interaction: CommandInteraction,
	embed: MessageEmbed,
	Position: number,
	ImageArray: string[]
}

export interface TempConfig {
	agreedToOpenUrl: boolean,
	summaryPosition?: MessageInfo[]
}