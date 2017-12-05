const selectedAspsp = () => {
  if (localStorage.getItem('selectedAspsp')) {
    return JSON.parse(localStorage.getItem('selectedAspsp'));
  }
  throw Error('no selected ASPSP in local storage');
};

export const getSelectedAspsp = selectedAspsp; // eslint-disable-line
