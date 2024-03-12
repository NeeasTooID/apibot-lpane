module.exports = {
    name: 'ping',
    description: 'Menampilkan pong!',
    execute(message, args) {
      message.reply('Pong!');
    },
  };