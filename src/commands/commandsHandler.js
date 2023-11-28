import { a1Wortliste as sentences } from "../content/worter.js";
import { questionsArray as questions } from "../content/questions.js";
import { verbenliste as verbs } from "../content/verben.js";
import { taniaQuestions as tania } from "../content/taniaQuestions.js";
import { aboutFields } from "../content/aboutFields.js";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";

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

function handleVerbCommand(interaction) {
  const randomIndex = Math.floor(Math.random() * verbs.length);
  const randomVerb = verbs[randomIndex];
  interaction.reply(
    `Verb: ${randomVerb.word}\n\nBeispiele:\n1. ${randomVerb.examples.join(
      "\n2. "
    )}`
  );
}

function handleQuestionCommand(interaction) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];
  interaction.reply(randomQuestion);
}

function handleTaniaCommand(interaction) {
  const randomIndex = Math.floor(Math.random() * tania.length);
  const randomQuestion = tania[randomIndex];
  interaction.reply(randomQuestion);
}

async function randomUser(message) {
  const members = await message.guild.members.fetch();

  const nonBotMembers = members.filter(member => !member.user.bot);

  if (nonBotMembers.size === 0) {
      message.channel.send("No non-bot users found in this server.");
      return;
  }

  const randomMember = nonBotMembers.random();

  const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Random User")
      .setDescription(`The chosen one is ${randomMember.toString()}`)
      .setTimestamp();

  message.channel.send({ embeds: [embed] });
}

function handleAboutCommand(interaction) {
  const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("About 7AjAR")

    .setDescription("Welcome to 7AjAR Server!")
    .addFields(aboutFields)

    .setTimestamp()
    .setAuthor({
      name: "Source Code",
      url: "https://github.com/m7md977/7ajarDiscordBot",
    });
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
    case "tania":
      handleTaniaCommand(interaction);
      break;
    case "randomuser":
      randomUser(interaction);
      break;
    default:
      console.warn(`Unknown command: ${interaction.commandName}`);
      break;
  }
}
