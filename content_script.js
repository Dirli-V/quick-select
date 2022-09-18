function isVisible(e) {
  var rect = e.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function copyText() {
  var aElements = document.querySelectorAll("*");
  for (let i = 0; i < aElements.length; i++) {
    let e = aElements[i];
    if (!isVisible(e)) {
      continue;
    }
    if (e.href) {
      console.log(e.innerText);
    }
  }
}

chrome.runtime.onMessage.addListener(function (request) {
  switch (request.command) {
    case "copy-text":
      copyText();
      break;

    default:
      console.error("Unknown command", request);
      break;
  }
});
