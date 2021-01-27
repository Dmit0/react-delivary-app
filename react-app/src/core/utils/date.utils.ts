import moment from 'moment';

export const formatDate = (date: string, format: string) => (moment(date).format(format))