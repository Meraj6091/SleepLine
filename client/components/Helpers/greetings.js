export const getGreetings = () => {
  let now = new Date();
  let hrs = now.getHours();
  let msg = '';

  if (hrs >= 0) {
    msg = 'Good Morning';
  } // REALLY early
  if (hrs > 6) {
    msg = 'Good Morning';
  } // After 6am
  if (hrs > 12) {
    msg = 'Good Afternoon';
  } // After 12pm
  if (hrs > 17) {
    msg = 'Good Evening';
  } // After 5pm
  if (hrs > 22) {
    msg = 'Good Night!';
  } // After 10pm
  return msg;
};
