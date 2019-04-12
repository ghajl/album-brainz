import axios from 'axios';
import Promise from 'bluebird';
import getCoverData from './getCoverData';
import createAlbum from './createAlbum';

export default async keyword => {
  try {
    const { data } = await axios.get('http://musicbrainz.org/ws/2/release-group', {
      params: { query: keyword, fmt: 'json' }
    });
    const { 'release-groups': releaseGroups } = data;

    const albums = await Promise.map(releaseGroups, async releaseGroup => {
      const { id, title, releases, 'artist-credit': artistCredit } = releaseGroup;
      const images = await getCoverData(releases);
      const album = createAlbum({
        id,
        title,
        artistCredit,
        images
      });
      return Promise.resolve(album);
    });

    return albums;
  } catch (e) {
    throw new Error(e);
  }
};
