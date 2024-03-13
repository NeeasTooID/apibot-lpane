module.exports = {
  name: 'ping',
  description: 'Kirim pesan "Pong!"',
  execute(message, client) {
    message.channel.send('Pong!');
  },
};