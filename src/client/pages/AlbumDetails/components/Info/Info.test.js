import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Info from './Info';

afterAll(cleanup);

describe('album info component', () => {
  const id = '1234';
  const artist = [{ id: '1', name: 'First Name' }, { id: '2', name: 'Second Name' }];
  const title = 'Album Title';
  const date = '2016-12-17';

  const { getAllByTestId, getByTestId, getByText } = render(
    <Info id={id} title={title} artist={artist} date={date} />
  );
  it('renders album title', () => {
    expect(getByTestId('title').textContent).toBe('Album Title');
  });
  it('renders artists names', () => {
    const artists = getByTestId('artists');
    const name = getByTestId('name');
    const names = getAllByTestId('name');
    const firstName = getByText(/First Name/i);
    const secondName = getByText(/Second Name/i);

    expect(artists).toContainElement(name);
    expect(names).toHaveLength(2);
    expect(names).toContain(firstName);
    expect(names).toContain(secondName);
  });
  it('renders release date', () => {
    expect(getByTestId('date').textContent).toBe('2016-12-17');
  });
});
