import axios from 'axios';
import getCoverData from './getCoverData';
import createAlbum from './createAlbum';

export default async id => {
  try {
    const {
      data: { releases, title, 'first-release-date': date, 'artist-credit': artistCredit }
    } = await axios.get(`http://musicbrainz.org/ws/2/release-group/${id}`, {
      params: { inc: 'artist-credits+releases', fmt: 'json' }
    });
    console.log(releases);
    const images = await getCoverData(releases);

    const album = createAlbum({
      id,
      title,
      artistCredit,
      images,
      date
    });

    return album;
  } catch (e) {
    return {};
  }
};
