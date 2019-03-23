import axios from 'axios';

export default async releases => {
  for (let i = 0; i < releases.length; i++) {
    try {
      const data = await axios.get(`http://coverartarchive.org/release/${releases[i].id}`);
      const coverData = data?.data?.images || [];
      return coverData;
    } catch (e) {}
  }
  return {};
};
