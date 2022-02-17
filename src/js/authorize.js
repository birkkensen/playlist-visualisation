const loginBtn = document.getElementById('login-button');
loginBtn.addEventListener('click', () => {
  const client_id = '87618b6dd23445a7842d92de79a95355';
  const redirect_uri =
    'https://playlist-visualisation.netlify.app/playlist.html';

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  window.location.href = url;
});
