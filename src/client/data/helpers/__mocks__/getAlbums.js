import Promise from 'bluebird';
import getCoverData from './getCoverData';
import createAlbum from '../createAlbum';

const musicbrainzReleaseGroup = [
  {
    id: '416a8b3b-d268-4e32-ae3d-1267cbe2ab44',
    'artist-credit': [
      {
        artist: {
          id: '068df31f-729b-4179-b82c-1d8aef61bd0b',
          name: 'Victor Ruiz'
        }
      }
    ],

    releases: [
      {
        id: '56'
      }
    ],
    title: 'Nevermind'
  },
  {
    id: '1b022e01-4da6-387b-8658-8678046e4cef',
    'artist-credit': [
      {
        artist: {
          id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da',
          name: 'Nirvana'
        }
      }
    ],

    releases: [
      {
        id: '1'
      },
      {
        id: '2'
      }
    ],
    title: 'Nevermind'
  }
];

export default keyword => {
  return new Promise((resolve, reject) => {
    process.nextTick(async () => {
      const releaseGroups = musicbrainzReleaseGroup.filter(elem =>
        RegExp(keyword, 'i').test(elem.title)
      );
      let albums = [];
      if (releaseGroups.length) {
        albums = await Promise.map(releaseGroups, async releaseGroup => {
          const { id, title, releases, 'artist-credit': artistCredit } = releaseGroup;
          const images = await getCoverData(releases);
          const album = createAlbum({
            id,
            title,
            artistCredit,
            images
          });
          return album;
        });
      }
      resolve(albums);
    });
  });
};
