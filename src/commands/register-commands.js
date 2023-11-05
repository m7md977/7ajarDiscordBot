import dotenv from "dotenv";
import { REST, Routes } from "discord.js";
import { client } from "../../main.js";
dotenv.config();

const commands = [
  {
    name: "about",
    description: "Learn more about 7ajar Server and Community",
  },
  {
    name: "wort",
    description: "Deutsches Wort mit Beispielen",
  },
  {
    name: "verb",
    description: "Deutsches Verb mit Beispielen",
  },
  {
    name: "question",
    description: "get a random Question",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function registerCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    const guild = client.guilds.cache.first();

    // Check if the bot is in any guild
    if (!guild) {
      console.error("Bot is not in any guild.");
      return;
    }

    // Get the Guild ID
    const guildId = guild.id;

    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

export { registerCommands };
