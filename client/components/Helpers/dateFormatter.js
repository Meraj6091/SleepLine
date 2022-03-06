import moment from 'moment';
export const formatDate = (date, type) => {
  if (date && type === 'expirationDate') {
    return moment(date).format('MM/YYYY');
  } else if (date && !type) {
    return moment(date).format('DD/MM/YYYY');
  }
};
