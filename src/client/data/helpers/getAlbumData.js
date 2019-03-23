import axios from 'axios';
import getCoverData from './getCoverData';

export default async id => {
  try {
    const album = {
      id,
      image: null,
      artist: [],
      title: null,
      date: null
    };
    const albumData = await axios.get(`http://musicbrainz.org/ws/2/release-group/${id}`, {
      params: { inc: 'artist-credits+releases', fmt: 'json' }
    });

    album.title = albumData.data.title;
    album.artist = albumData.data['artist-credit'].map(item => ({
      id: item.artist.id,
      name: item.artist.name
    }));
    album.date = albumData.data['first-release-date'];
    const releases = albumData.data['releases'];
    try {
      const coverData = await getCoverData(releases);
      album.image = coverData[0]?.thumbnails?.large || null;
    } catch (err) {}
    console.log(album);

    return album;
  } catch (e) {
    return {};
  }
};
