export default ({ id, artistCredit = [], images = [], title = '', date = '' }) => ({
  id,
  artists: artistCredit.map(item => ({
    id: item.artist.id,
    name: item.artist.name
  })),
  images,
  title,
  date
});


