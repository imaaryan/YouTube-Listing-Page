let videoGrid = document.querySelector(".video-grid");
let searchBar = document.querySelector(".search-bar");

let videosData = [];

async function fetchResponse() {
  const url =
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=20&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function apiResponce() {
  let response = await fetchResponse();

  videosData = response.map((e) => {
    let videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.innerHTML = `
     <a href="https://www.youtube.com/watch?v=${e.items.id}" target="_blank">
          <div class="thumbnail">
            <img
              src="${e.items.snippet.thumbnails.standard.url}"
              alt="thumbnail"
            />
          </div>
          <div class="video-info">
            <div class="video-details">
              <div class="video-title">
               ${e.items.snippet.title}
              </div>
              </a>
             <a href="https://www.youtube.com/channel/${e.items.snippet.channelId}" target="_blank">
              <div class="channel-name"> ${e.items.snippet.channelTitle}</div>
             </a>
            </div>
          </div>`;
    videoGrid.appendChild(videoCard);

    return {
      videoTitle: e.items.snippet.title,
      channleName: e.items.snippet.channelTitle,
      videoCard: videoCard,
    };
  });
}
apiResponce();

function searchVideos() {
  searchBar.addEventListener("input", () => {
    let searchInput = searchBar.value.toLowerCase();

    videosData.forEach((e) => {
      let isVisible =
        e.videoTitle.toLowerCase().includes(searchInput) ||
        e.channleName.toLowerCase().includes(searchInput);
      e.videoCard.classList.toggle("hide", !isVisible);
    });
  });
}
searchVideos();

