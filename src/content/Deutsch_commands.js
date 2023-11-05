import dotenv from "dotenv";
import { REST, Routes } from "discord.js";
import { a1Wortliste } from './worter.js';
dotenv.config();

const commands = [
    {
      name: "wort",
      execute: () => {
        const randomIndex = Math.floor(Math.random() * a1Wortliste.length);
        return a1Wortliste[randomIndex];
      },
      description: "wort",
    },
  ];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function deutschCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

export { deutschCommands };