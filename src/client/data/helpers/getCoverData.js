import axios from 'axios';

export default async releases => {
  let images = [];
  for (let i = 0; i < releases.length; i++) {
    try {
      const data = await axios.get(`http://coverartarchive.org/release/${releases[i].id}`);
      if (data && data.data && data.data.images) {
        images = [...data.data.images];
        return images;
      }
    } catch (e) {}
  }
  return images;
};
