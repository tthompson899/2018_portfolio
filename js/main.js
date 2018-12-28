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
      player = new YT.Player('player', {
        height: '390',
        width: '390',
        videoId: latestThreeVideosIds[latestVids].id.videoId, // SwT9F0ZrrFQ find a way to add latest video
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
  }).catch(error => {
    console.error(error);
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}