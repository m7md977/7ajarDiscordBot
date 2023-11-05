import { sentences } from "./dailyMessage.js"; // Assuming dailyMessage.js is in the same directory
import { questionsArray as questions } from "../content/questions.js"; // Assuming questions.js is in the same directory
import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { verbenliste as verbs } from "../content/verben.js";  // Importing the verb list
import { aboutFields } from "../content/aboutFields.js";
// Individual command handlers:

function handleWortCommand(interaction) {
  if (interaction.channelId !== "1132862089829027870") {
    const deutschChannel = interaction.guild.channels.cache.get(
      "1132862089829027870"
    );
    interaction.reply(`Please use the /wort command in ${deutschChannel}.`);
    return;
  }

  const randomIndex = Math.floor(Math.random() * sentences.length);
  const randomSentence = sentences[randomIndex];
  interaction.reply(
    `\n${randomSentence.word}\n\nBeispiele:\n1. ${randomSentence.examples.join(
      "\n2. "
    )}`
  );
}

function handleQuestionCommand(interaction) {
  // Assuming you've imported the necessary data for this command
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];
  interaction.reply(randomQuestion);
}

async function handleVerbCommand(interaction) {
    const randomIndex = Math.floor(Math.random() * verbs.length);
    const randomVerb = verbs[randomIndex];
    await interaction.reply(`Verb: ${randomVerb.word}\n\nBeispiele:\n1. ${randomVerb.examples.join("\n2. ")}`);
  }

function handleAboutCommand(interaction) {
  const embed = new EmbedBuilder()
    .setColor("#0099ff") // You can choose any color you like
    .setTitle("About TAjAR")
    .setDescription("Some description here about your server")
    .addFields(aboutFields) // Add the array of fields to the embed

    // You can add a footer, thumbnail, and other fields as you like
    .setTimestamp();

  interaction.reply({ embeds: [embed] });
}


export function handleCommand(interaction) {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "wort":
      handleWortCommand(interaction);
      break;
    case "question":
      handleQuestionCommand(interaction);
      break;
    case "verb":
      handleVerbCommand(interaction);
      break;
    case "about":
      handleAboutCommand(interaction);
      break;
    default:
      console.warn(`Unknown command: ${interaction.commandName}`);
      break;
  }
}
