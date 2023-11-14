import { a1Wortliste as sentences } from "../content/worter.js";
import { verbenliste as verbs } from "../content/verben.js";  
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const CHANNEL_ID = process.env.CHANNEL_ID_HAUSAUFGABEN;
const ROLE_ID = process.env.ROLE_ID_HAUSAUFGABEN;

const INDEX_FILE = 'indices.json';

function readIndices() {
  try {
    const data = fs.readFileSync(INDEX_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading indices file:', err);
    return { wordIndex: 0, verbIndex: 0 };
  }
}

function saveIndices(indices) {
  try {
    const data = JSON.stringify(indices);
    fs.writeFileSync(INDEX_FILE, data, 'utf8');
    console.log("Indices saved:", indices);
  } catch (err) {
    console.error('Error writing indices file:', err);
  }
}

function sendDailyContent(client) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  const role = channel.guild.roles.cache.get(ROLE_ID);
  const indices = readIndices();

  // Increment indices
  indices.wordIndex = (indices.wordIndex + 1) % sentences.length;
  indices.verbIndex = (indices.verbIndex + 1) % verbs.length;

  const currentSentence = sentences[indices.wordIndex];
  const currentVerb = verbs[indices.verbIndex];

  const message = `${role.toString()}\n\ Wort des Tages: \n\n${currentSentence.word}\n\nBeispiele:\n1. ${currentSentence.examples.join("\n2. ")}\n\nVerb des Tages: \n\n${currentVerb.word} \n\nBeispiele:\n1. ${currentVerb.examples.join("\n2. ")}`;

  channel.send(message).then(() => {
    saveIndices(indices);
    console.log("Daily content sent:", message);
  }).catch(error => {
    console.error("Error sending message:", error);
  });
}

export { sendDailyContent };
