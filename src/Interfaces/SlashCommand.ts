import { CommandInteraction } from 'discord.js';

interface Run {
	(interaction: CommandInteraction)
}

export interface SlashCommand {
	run: Run
}
