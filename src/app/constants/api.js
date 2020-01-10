const axios = require('axios');

export const fetchData = async () => {
  try {
    const response = await axios.get(
      'http://www.mocky.io/v2/5c9105cb330000112b649af8',
    );
    const data = response.data;
    console.log(data,'eheehhe');
    return data;
  } catch (e) {
    console.log(e);
  }
};
