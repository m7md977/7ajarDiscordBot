import { a1Wortliste as sentences } from "../content/worter.js";
import { verbenliste as verbs } from "../content/verben.js";  // Importing the verb list

import dotenv from "dotenv";

dotenv.config();
const CHANNEL_ID = process.env.CHANNEL_ID_HAUSAUFGABEN;
const ROLE_ID = process.env.ROLE_ID_HAUSAUFGABEN;

let currentIndex = 0; // Keep track of the current sentence index

function sendDailyMessage(client) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  const role = channel.guild.roles.cache.get(ROLE_ID); // Get the role by its ID

  if (channel && role) {
    // Fetch the last message sent in the channel
    channel.messages
      .fetch({ limit: 1 })
      .then((messages) => {
        const lastMessage = messages.first();
        
        // If there was no last message or the last message doesn't match any from the list
        if (!lastMessage) {
          currentIndex = 0; // Reset to the first message in the list
        } else {
          // Find the index of the last sent message in the sentences list
          const foundIndex = sentences.findIndex(sentence => lastMessage.content.includes(sentence.word));

          // If found, set the currentIndex to the next one, otherwise reset to the beginning
          if (foundIndex !== -1 && foundIndex < sentences.length - 1) {
            currentIndex = foundIndex + 1;
          } else {
            currentIndex = 0;
          }
        }
        
        const currentSentence = sentences[currentIndex];
        const taggedRole = `<@&${ROLE_ID}>`; // Tag the role using its ID
        const message = `${taggedRole}\n\n كلمة اليوم للحفظ \n\n${currentSentence.word}\n\nBeispiele:\n1. ${currentSentence.examples.join("\n2. ")}`;

        channel.send(message);
        console.log("Daily message sent successfully!");

        // No need to increment currentIndex here since we've done it above
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  } else {
    console.error("Channel or role not found!");
  }
}


let verbIndex = 0;  // Keep track of the current verb index

function sendDailyVerb(client) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  const role = channel.guild.roles.cache.get(ROLE_ID); // Get the role by its ID

  if (channel && role) {
    channel.messages
      .fetch({ limit: 1 })
      .then((messages) => {
        const lastMessage = messages.first();

        // Check the last verb sent
        if (!lastMessage) {
          verbIndex = 0; 
        } else {
          const foundIndex = verbs.findIndex(verb => lastMessage.content.includes(verb));

          if (foundIndex !== -1 && foundIndex < verbs.length - 1) {
            verbIndex = foundIndex + 1;
          } else {
            verbIndex = 0;
          }
        }

        const currentVerb = verbs[verbIndex];
        const taggedRole = `<@&${ROLE_ID}>`;
        const message = `${taggedRole}\n Verb des Tages: \n${currentVerb}`;

        channel.send(message);
        console.log("Daily verb sent successfully!");
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  } else {
    console.error("Channel or role not found!");
  }
}



export { sendDailyMessage, sendDailyVerb, sentences };