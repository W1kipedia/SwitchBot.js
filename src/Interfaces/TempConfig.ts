type MessageInfo = {
	id: number,
	Position: number,
	ImageArray: string[]
}

export interface TempConfig {
	agreedToOpenUrl: boolean,
	summaryPosition?: MessageInfo[]
}