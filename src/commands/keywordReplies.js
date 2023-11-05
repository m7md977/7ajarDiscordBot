// commands/keywordReplies.js

import { keywordResponses } from "../content/keywords.js";

export function handleKeywordReply(message) {
  if (message.author.bot) {
    return;
  }

  for (const pair of keywordResponses) {
    for (const keyword of pair.keywords) {
      if (message.content.includes(keyword)) {
        console.log(`Matched keyword: ${keyword}`);
        if (typeof pair.response === "string") {
          message.reply(pair.response);
          console.log(`Reply: ${pair.response}`);
        } else if (Array.isArray(pair.response) && pair.response.length > 0) {
          const randomResponse =
            pair.response[Math.floor(Math.random() * pair.response.length)];
          message.reply(randomResponse);
          console.log(`Reply: ${randomResponse}`);
        } else {
          console.error("No valid responses found for the matched keywords.");
        }
        return;
      }
    }
  }
}
