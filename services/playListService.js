import HttpClient from './api';

export const getPlayList = function (offset, country) {
  return HttpClient().get(
    `browse/featured-playlists?country=${country}&timestamp=2014-10-23T09%3A00%3A00.000Z&limit=10&offset=${offset}`,
  );
};

export const getTrackList = function (playListId, offset) {
  return HttpClient().get(
    `https://api.spotify.com/v1/playlists/${playListId}/tracks?market=ES&fields=items(track(name%2Cduration_ms%2Cpopularity%2Cartists%2Calbum(images)))&limit=10&offset=${offset}`,
  );
};
