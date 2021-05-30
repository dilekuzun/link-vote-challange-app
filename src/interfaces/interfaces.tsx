export interface IVoteLinkItem {
    linkId: string;
    linkName: string;
    linkUrl: string;
    linkPoint: number;
    linkAddDate: Date;
}

export interface INotificationMessage {
    msgSeverity: string;
    message: string;
}

export interface IOption {
    optionId: number;
    optionName: string;
}