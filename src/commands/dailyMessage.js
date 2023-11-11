import { a1Wortliste as sentences } from "../content/worter.js";
import { verbenliste as verbs } from "../content/verben.js";  
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const CHANNEL_ID = process.env.CHANNEL_ID_HAUSAUFGABEN;
const ROLE_ID = process.env.ROLE_ID_HAUSAUFGABEN;

// Assuming a JSON file for storing indices
const INDEX_FILE = 'indices.json';

// Read the last indices from file
function readIndices() {
  try {
    const data = fs.readFileSync(INDEX_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading indices file:', err);
    return { wordIndex: 0, verbIndex: 0 };
  }
}

// Save the current indices to file
function saveIndices(indices) {
  try {
    const data = JSON.stringify(indices);
    fs.writeFileSync(INDEX_FILE, data, 'utf8');
  } catch (err) {
    console.error('Error writing indices file:', err);
  }
}

function sendDailyMessage(client) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  const role = channel.guild.roles.cache.get(ROLE_ID);
  const indices = readIndices();

  if (channel && role) {
    channel.messages
      .fetch({ limit: 1 })
      .then((messages) => {
        const lastMessage = messages.first();
        
        if (!lastMessage || !sentences.some(sentence => lastMessage.content.includes(sentence.word))) {
          indices.wordIndex = (indices.wordIndex + 1) % sentences.length;
        }

        const currentSentence = sentences[indices.wordIndex];
        const taggedRole = `<@&${ROLE_ID}>`; 
        const message = `${taggedRole}\n\n كلمة اليوم للحفظ \n\n${currentSentence.word}\n\nBeispiele:\n1. ${currentSentence.examples.join("\n2. ")}`;

        channel.send(message);
        saveIndices(indices);
        console.log("Daily message sent successfully!");

      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  } else {
    console.error("Channel or role not found!");
  }
}

function sendDailyVerb(client) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  const role = channel.guild.roles.cache.get(ROLE_ID);
  const indices = readIndices();

  if (channel && role) {
    channel.messages
      .fetch({ limit: 1 })
      .then((messages) => {
        const lastMessage = messages.first();

        if (!lastMessage || !verbs.some(verb => lastMessage.content.includes(verb))) {
          indices.verbIndex = (indices.verbIndex + 1) % verbs.length;
        }

        const currentVerb = verbs[indices.verbIndex];
        const message = `\n Verb des Tages: \n${currentVerb.word} \n\nBeispiele:\n1. ${currentVerb.examples.join("\n2. ")}`;
        channel.send(message);
        saveIndices(indices);
        console.log("Daily verb sent successfully!");
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  } else {
    console.error("Channel or role not found!");
  }
}

export { sendDailyMessage, sendDailyVerb };
