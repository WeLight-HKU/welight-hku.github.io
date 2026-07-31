const lazyPublicationVideos = document.querySelectorAll(
  "video[data-lazy-src]"
);

const loadPublicationVideo = (video) => {
  if (!video.src) {
    video.src = video.dataset.lazySrc;
    video.load();
  }

  video.play().catch(() => {
    // The poster remains visible when autoplay is disabled by the browser.
  });
};

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          loadPublicationVideo(video);
        } else if (!video.paused) {
          video.pause();
        }
      });
    },
    { rootMargin: "300px 0px" }
  );

  lazyPublicationVideos.forEach((video) => videoObserver.observe(video));
} else {
  lazyPublicationVideos.forEach(loadPublicationVideo);
}
