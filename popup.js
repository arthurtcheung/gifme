// FETCH GIFS FROM GIPHY SEARCH ENDPOINT
document.getElementById('search-input').addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    const searchInput = document.getElementById('search-input').value;
    const gif = document.getElementById('gif');
    // Fetch GIF
    if (searchInput.trim !== '') {
      const apiKey = "Qv2jvdER3sB9QjBS1YIXI8PgNP1yRcNQ";
      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}`;
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data); // -> GIF { data: [ 50 x { images: { fixed_height: { url: *URL* } } } ] 
        const gifFromResponse = data.data[Math.floor(Math.random() * 50)];
        gif.src = gifFromResponse.images.fixed_height.url;
        gif.alt = `${searchInput} GIF`;
        // Unhide GIF and Copy button
        document.getElementById('gif-and-copy-button').classList.remove('hide');
      })
      .catch(error => console.log('Error fetching GIF: ', error));
    }
    // If the search bar is empty and the user presses 'Enter', hide GIF and Copy button
    if (searchInput === '') {
      document.getElementById('gif-and-copy-button').classList.add('hide');
    }
  }
});

// FETCH GIFS FROM GIPHY TRENDING ENDPOINT
document.getElementById('search-input').addEventListener('keydown', function (event) {
  // Fetch GIF
  if (event.code === 'ArrowRight') {
    const apiKey = "Qv2jvdER3sB9QjBS1YIXI8PgNP1yRcNQ";
    const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // -> GIF { data: { images: { fixed_height: { url: *URL* } } } }
      const gifFromResponse = data.data;
      gif.src = gifFromResponse.images.fixed_height.url;
      gif.alt = `${searchInput} GIF`;
      // Unhide GIF and Copy Button
      document.getElementById('gif-and-copy-button').classList.remove('hide');
    })
    .catch(error => console.log('Error fetching GIF: ', error));
  }
})

// COPY GIF TO CLIPBOARD
document.getElementById('copy-button').addEventListener('click', function () {
  const gifUrl = gif.src;
  navigator.clipboard.writeText(gifUrl).then(() => {
    alert('GIF copied to clipboard:\n' + gifUrl)
  }, () => {
    console.error("Failed to copy")
  })
});