import moment from 'moment';

export const getRand = () => {
    return Math.random().toString(36).substr(2, 9);
};

export function today() {
    return moment(new Date()).locale('tr').format('DD/MM/YYYY HH:mm:ss');
}

export function convertBackToDate(localeDateString: string) {
    return moment(localeDateString, 'DD/MM/YYYY HH:mm:ss').toDate();
}

export function isDateLater(date1Str: string, date2Str: string) {
    const date1 = convertBackToDate(date1Str);
    const date2 = convertBackToDate(date2Str);
    const date1Unit = (date1.getDate()) + (date1.getMonth()*30) + (date1.getFullYear()*365);
    const date2Unit = (date2.getDate()) + (date2.getMonth()*30) + (date2.getFullYear()*365);
    return date2Unit >= date1Unit;
}