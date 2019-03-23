import getCoverData from './getCoverData';

export default id => {
  const title = 'Album Title';
  const artist = [{ id: '1234', name: 'First Artist' }, { id: '456y', name: 'Secont Artist' }];
  const date = '2017-10-20';
  const image = 'image-large.jpg';

  return {
    id,
    image,
    artist,
    title,
    date
  };
};
