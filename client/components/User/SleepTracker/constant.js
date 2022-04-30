export const data = [
  {
    name: 'Average Slept Time',
    vehical: 'Now',
    msg: 'Check Your Weekly Report',
    img: require('../../../assets/track.png'),
  },
];

export const getMonthName = (index) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  if (index) {
    return monthNames[index];
  }
};
