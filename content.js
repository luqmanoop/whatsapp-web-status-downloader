function downloadStatus(statusURL, type = 'img') {
  const statusId = statusURL.split('.com/')[1];
  let link = document.createElement('a');
  link.href = statusURL;
  link.download = type === 'img' ? `${statusId}.jpeg` : `${statusId}.mp4`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

chrome.runtime.onMessage.addListener(function(request) {
  if (request.message === 'process_download') {
    const attributeSelector = "src*='blob:https://web.whatsapp.com'";
    let imgStatus = document.querySelector(`img[${attributeSelector}]`);
    let vidStatus = document.querySelector(`video[${attributeSelector}]`);

    if (imgStatus) {
      downloadStatus(imgStatus.getAttribute('src'));
    } else if (vidStatus) {
      downloadStatus(vidStatus.getAttribute('src'), 'video');
    }
  }
});
