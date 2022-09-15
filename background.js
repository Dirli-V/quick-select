async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);
    let currentTab = await getCurrentTab();
    console.log(currentTab);
    if (currentTab) {
      chrome.tabs.sendMessage(currentTab.id, {greeting: "hello"}, function(response) {
        console.log(response.farewell);
      });
    }
});
