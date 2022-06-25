import axios from 'axios';

export async function updateArtistsIndex(...artistIds: string[]) {
  return axios.post('/api/search/update-indexes', {
    index: 'artists',
    ids: artistIds,
  });
}

export async function updateWorksIndex(...workIds: string[]) {
  return axios.post('/api/search/update-indexes', {
    index: 'works',
    ids: workIds,
  });
}
