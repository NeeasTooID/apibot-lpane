const axios = require('axios');

// Fungsi untuk membuat server di Pterodactyl
async function createServer(serverName, serverType, consoleID) {
    try {
        const response = await axios.post('https://panel.yourpterodactylpanel.com/api/application/servers', {
            name: serverName,
            // Sesuaikan dengan struktur objek yang diperlukan oleh API Pterodactyl
            // Misalnya, Anda mungkin perlu menyertakan jenis server, lokasi, dsb.
            // Lihat dokumentasi API Pterodactyl Anda untuk rincian lebih lanjut
            type: serverType,
            // Mungkin perlu disesuaikan sesuai kebutuhan
            // Lokasi: '1' (misalnya, jika Anda hanya memiliki satu lokasi)
        }, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY', // Ganti dengan kunci API Anda
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

// Command untuk membuat server
module.exports = {
    name: 'createServer',
    description: 'Membuat server baru di Pterodactyl',
    async execute(message, args) {
        const serverName = args[0]; // Nama server yang diambil dari argumen perintah
        const serverType = args[1]; // Jenis server yang diambil dari argumen perintah
        const consoleID = 'YOUR_CONSOLE_ID'; // ID konsol pengguna (dapat diperoleh dari database atau cara lain)

        try {
            const serverData = await createServer(serverName, serverType, consoleID);
            message.reply(`Server ${serverData.name} telah dibuat.`);
        } catch (error) {
            message.reply(`Gagal membuat server: ${error}`);
        }
    },
};
