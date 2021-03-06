$(document).ready(function(){
  $('.sidenav').sidenav();
});

// 2. This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {

  const request = new Request('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+ channelId + '&maxResults=1&order=date&type=video&key=' + youtubeKey);
  const URL = request.url;
  const method = request.method;

  fetch(request).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    else {
      throw new Error('Something went wrong on Youtube api server!');
    }
  }).then(response => {
    for (let videos = 0; videos < response.items.length; videos++) {
      latestThreeVideosIds = [];
      latestThreeVideosIds.push(response.items[videos]);
    }

    for (let latestVids = 0; latestVids < latestThreeVideosIds.length; latestVids++) {
      let div = document.getElementById('video-title');
      div.innerHTML += latestThreeVideosIds[latestVids].snippet.title;

      player = new YT.Player('player', {
        height: '480', // 390, 400
        width: '853', // 390, 650
        videoId: latestThreeVideosIds[latestVids].id.videoId
      });
    }
  }).catch(error => {
    console.error(error);
  });
}

const request = new Request('https://www.blog.tthompson899.net/wp-json/wp/v2/posts?per_page=1&order=desc&orderBy=date');
const URL = request.url;
const method = request.method;

fetch(request).then(response => {
  if (response.status === 200) {
    return response.json();
  }
  else {
    throw new Error('Something went wrong on Wordpress api server!');
  }
}).then(response => {
  let blogTitleDiv = document.getElementById('blog-title');
  blogTitleDiv.innerHTML += response[0].title.rendered;

  let excerptContentDiv = document.getElementById('blog-content-snippet');
  excerptContentDiv.innerHTML += response[0].excerpt.rendered;

  // open link for blog post in new window
  let getLinkForExcerpt = excerptContentDiv.getElementsByTagName('a');
  getLinkForExcerpt[0].setAttribute('target', '_blank');
}).catch(error => {
  console.error(error);
});