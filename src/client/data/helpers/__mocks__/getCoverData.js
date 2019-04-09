const coverartarchive = [
  {
    releaseId: '1',
    images: [
      {
        id: '1',
        image: 'image.jpg',
        thumbnails: {
          large: 'image-large.jpg',
          small: 'image-small.jpg'
        }
      }
    ]
  }
];

export default releases => {
  for (let i = 0; i < releases.length; i++) {
    const data = coverartarchive.find(elem => elem.releaseId === releases[i].id);
    if (data)
      return new Promise(resolve => {
        process.nextTick(() => resolve([...data.images]));
      });
  }
  return new Promise(resolve => {
    process.nextTick(() => resolve([]));
  });
};
