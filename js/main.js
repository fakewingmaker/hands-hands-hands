function handlePopup() {
    const popup = document.querySelector(".popup");
    const videos = document.querySelectorAll(".mainvideo");
  
    const observer = new IntersectionObserver(
      function(videos) {
        console.log ('videos')
        videos.forEach(function(video) {
          if (video.isIntersecting) {
            const images = video.target.getAttribute('data-images').split(',');
            updatePopupImages(popup, images);
            popup.removeAttribute("hidden")
            popup.setAttribute("data-puzzle", video.target.id)
            document.body.setAttribute("no-scroll", true)
            observer.unobserve(video.target)
          }
        });
      }, {
        threshold: 0.1
      }
    )
  
    if(videos) {
      videos.forEach(mainvideo => observer.observe(mainvideo))
    };
  }
  
  function updatePopupImages(popup, images) {
    popup.innerHTML = '';
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = image;
      img.alt = '';
      popup.appendChild(img);
    });
  }
  
  function handlePuzzle() {
    const popup = document.querySelector(".popup");
    popup.addEventListener("click", function (event) {
      if (event.target.tagName === 'IMG') {
        event.target.style.display = 'none';
        const allImagesHidden = Array.from(popup.querySelectorAll('img')).every(img => img.style.display === 'none');
        if (allImagesHidden) {
          popup.setAttribute("hidden", true);
          document.body.removeAttribute("no-scroll");
          const videoId = popup.getAttribute("data-puzzle");
          document.getElementById(videoId).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    });
  }
  
  window.onload = function () {
    handlePopup();
    handlePuzzle();
  };
  