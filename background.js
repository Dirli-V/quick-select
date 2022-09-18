async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function copyText() {
  let currentTab = await getCurrentTab();
  if (!currentTab) {
    console.error("Cannot find currently active tab");
    return;
  }

  chrome.tabs.sendMessage(
    currentTab.id,
    { command: "copy-text" }
  );
}

chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "copy-text":
      await copyText();
      break;
    default:
      console.error("Unknown command", command);
      break;
  }
});
