import {
  sendDailyContent
} from "./src/commands/dailyMessage.js";
import { handleCommand } from "./src/commands/commandsHandler.js";
import { registerCommands } from "./src/commands/register-commands.js";
import { handleKeywordReply } from "./src/commands/keywordReplies.js";

import { Client, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  cron.schedule("0 14 * * *", () => {
    sendDailyContent(client);
  });
  registerCommands();
});

client.on("interactionCreate", async (interaction) => {
  handleCommand(interaction);
});

client.on("messageCreate", handleKeywordReply);

client.login(DISCORD_TOKEN);
export { client };
