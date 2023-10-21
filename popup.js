document.getElementById('search-input').addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    const searchInput = document.getElementById('search-input').value;
    const gif = document.getElementById('gif');
    if (searchInput.trim !== '') {
      const apiKey = "Qv2jvdER3sB9QjBS1YIXI8PgNP1yRcNQ";
      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}`;
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log(data); // -> GIF { data: [ 50 x { images: { fixed_height: { url: *URL* } } } ] }
        const gifFromResponse = data.data[Math.floor(Math.random() * 50)];
        gif.src = gifFromResponse.images.fixed_height.url;
        gif.alt = `${searchInput} GIF`;
        // Unhide <DIV> element containing GIF and Copy Button
        document.getElementById('gif-and-copy-button').classList.remove('hide');
      })
      .catch(error => console.log('Error fetching GIF: ', error));
    }
    if (searchInput === '') {
      document.getElementById('gif-and-copy-button').classList.add('hide');
    }
  }
});

document.getElementById('search-input').addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    const apiKey = "Qv2jvdER3sB9QjBS1YIXI8PgNP1yRcNQ";
    const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // -> GIF { data: [ { images: { fixed_height: { url: *URL* } } } ] }
      const gifFromResponse = data.data;
      gif.src = gifFromResponse.images.fixed_height.url;
      gif.alt = `${searchInput} GIF`;
      // Unhide <DIV> element containing GIF and Copy Button
      document.getElementById('gif-and-copy-button').classList.remove('hide');
    })
    .catch(error => console.log('Error fetching GIF: ', error));
  }
})

document.getElementById('copy-button').addEventListener('click', function () {
  const gifUrl = gif.src;
  navigator.clipboard.writeText(gifUrl).then(() => {
    alert('GIF copied to clipboard:\n\n' + gifUrl)
  }, () => {
    console.error("failed to copy")
  })
});