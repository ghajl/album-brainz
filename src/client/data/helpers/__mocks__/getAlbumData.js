import getCoverData from './getCoverData';
import createAlbum from '../createAlbum';

const musicbrainzReleaseGroup = [
  {
    id: '1',
    'artist-credit': [
      {
        artist: {
          id: '1234',
          name: 'First Artist'
        }
      },
      {
        artist: {
          id: '456y',
          name: 'Secont Artist'
        }
      }
    ],
    'first-release-date': '2017-10-20',
    releases: [
      {
        id: '1'
      },
      {
        id: '2'
      }
    ],
    title: 'Album Title'
  }
];

export default id => {
  return new Promise((resolve, reject) => {
    process.nextTick(async () => {
      const releaseGroup = musicbrainzReleaseGroup.find(elem => elem.id === id);
      if (releaseGroup) {
        const {
          releases,
          title,
          'first-release-date': date,
          'artist-credit': artistCredit
        } = releaseGroup;
        const images = await getCoverData(releases);
        const album = createAlbum({
          id,
          title,
          artistCredit,
          images,
          date
        });
        resolve(album);
      }
      resolve({});
    });
  });
};
