# My First Chrome Extension: Video Speed Controller

A simple example that helps to understand the working principe of a Chrome extension. It is useful for setting the playback rate to customized value of the `<video>` in the opened tab.

## manifest.json
- Using Manifest v3
- Specify the 
  - Name, version, description, icons
  - Host permission: Can get access to which webpages?
  - Permission: Use which chrome API?
    - e.g. tabs, storage
  - Background scripts, content scripts: Which .js is used for each function/context?
  - default popup: the UI for controlling the extension
  - etc.

## Service worker (background)
- [DOC] When you reload the extension, Chrome will scan the specified file for additional instructions, such as important events it needs to listen for.
- Run separately from the main browser thread
- Could not access the wbe content 
  - Instead, use message passing and tell content script to take action
- e.g. Can be used for adding a listener ("on install" / "on reload") that send some message to the content script whenever user open a tab of a specific domain
- (Not used in this example)

## Content scripts
- Run in context of the webpage (the opened tab) we are on

## Message Passing
In this example, 
- popup.js get user input (playback `speed` to set)
- popup.js cannot access / alter the `<video>` directly!
- popup.js send the `speed` to the contentScript.js via message passing
- contentScript.js has a listener to any incoming message. It then receive the `speed` and set the `<video>` playbackRate property accordingly

> Note:
> - inorder to use jquey in contentScript.js, need to state that in the manifest.json: `"js": ["jquery-3.6.0.min.js","contentScript.js"]`