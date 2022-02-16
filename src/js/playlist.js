function getAccessToken() {
  const hash = window.location.hash;
  const hashWithoutHash = hash.substring(1);

  const params = hashWithoutHash.split('&');
  const keyValues = params.map((param) => param.split('='));

  const accessToken = keyValues[0][1];
  return accessToken;
}

function getPlaylist(playlistId) {
  let offset = 0;
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return fetch(url, { headers }).then((res) => res.json());
}

function renderPlaylist(playlistId) {
  const container = document.querySelector('#tracks');
  const audioPlayer = document.querySelector('#player');
  getPlaylist(playlistId).then((res) => {
    const tracks = res.items;
    tracks.forEach((track) => {
      if (track.track.preview_url === null) return;
      const playlistItem = document.createElement('div');
      playlistItem.classList.add('playlist-item');

      const playlistItemImages = document.createElement('img');
      playlistItemImages.classList.add('playlist-item-img');
      playlistItemImages.setAttribute('src', track.track.album.images[1].url);

      const playlistItemTitles = document.createElement('div');
      playlistItemTitles.classList.add('playlist-item-title');
      playlistItemTitles.innerHTML = track.track.name;

      playlistItem.addEventListener('click', () => {
        if (currentlyActive === track.track.id) {
          audioPlayer.pause();
          currentlyActive = null;
          playlistItem.classList.remove('active');
        } else {
          if (currentlyActive) {
            document.querySelector('.active').classList.remove('active');
          }
          currentlyActive = track.track.id;
          playlistItem.classList.add('active');

          if (track.track.preview_url) {
            audioPlayer.setAttribute('src', track.track.preview_url);
            audioPlayer.play();
          } else {
            audioPlayer.pause();
          }
        }
      });

      playlistItem.appendChild(playlistItemImages);
      playlistItem.appendChild(playlistItemTitles);
      container.appendChild(playlistItem);
    });
  });
}

let currentlyActive;

renderPlaylist('0DB9fMOskowjeJGLyRZ7st');
