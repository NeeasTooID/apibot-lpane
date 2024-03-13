const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const fs = require('fs'); // Require the fs module

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

// List to store commands
const commands = [];

// Load all commands from the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command);
}

// Ketika bot siap
client.on('ready', () => {
  console.log('Bot siap!');

  // Set status bot
  client.user.setActivity('ngetst', { type: 'PLAYING' });
});

// Ketika menerima pesan
client.on('message', message => {
  // Periksa apakah pesan dimulai dengan '!'
  if (message.content.startsWith('!')) {
    const commandName = message.content.slice(1).split(' ')[0];
    const command = commands.find(cmd => cmd.name === commandName);

    if (command) {
      command.execute(message, client);
    }
  }
});

// Login ke Discord dengan token bot
client.login(config.token);
