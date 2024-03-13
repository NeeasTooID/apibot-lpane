const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

// Ketika bot siap
client.on('ready', () => {
  console.log('Bot siap!');

  // Set status bot
  client.user.setActivity('Menunggu perintah...', { type: 'PLAYING' });
});

// Memuat semua command dari folder commands
const commands = require('./commands');  // Assuming the folder is in the same directory as index.js

// Ketika menerima pesan
client.on('message', message => {
  // Periksa isi pesan
  if (message.content.startsWith('!')) {
    const commandName = message.content.slice(1).split(' ')[0];
    const command = commands[commandName];

    if (command) {
      command.execute(message, client);
    }
  }
});

// Login ke Discord dengan token bot
client.login(config.token);
