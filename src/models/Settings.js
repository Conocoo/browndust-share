import Cookies from 'js-cookie';

const Settings = {
  locale: Cookies.get('locale') === undefined ? 'US' : Cookies.get('locale'),
  countries: ['US', 'TW', 'CN', 'KR'],
  // language rule: https://github.com/ekwonye-richard/react-flags-select/blob/master/src/countries.js
  customLabels: { 'US': 'English', 'TW': 'Traditional Chinese', 'CN': 'Simplified Chinese', 'KR': 'Korea' },
};

export default Settings;
