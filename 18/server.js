const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/Song');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/music');
        console.log('Connected to MongoDB');

        // Automatically insert 5 songs when connected to the database
        await insertSongsIfNotExist();
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Function to insert 5 songs if they don't already exist
const insertSongsIfNotExist = async () => {
    const songs = [
        {
            songname: 'Song1',
            film: 'Film1',
            music_director: 'MD1',
            singer: 'Singer1',
            actor: 'Actor1',
            actress: 'Actress1'
        },
        {
            songname: 'Song2',
            film: 'Film2',
            music_director: 'MD2',
            singer: 'Singer2',
            actor: 'Actor2',
            actress: 'Actress2'
        },
        {
            songname: 'Song3',
            film: 'Film3',
            music_director: 'MD3',
            singer: 'Singer3',
            actor: 'Actor3',
            actress: 'Actress3'
        },
        {
            songname: 'Song4',
            film: 'Film4',
            music_director: 'MD4',
            singer: 'Singer4',
            actor: 'Actor4',
            actress: 'Actress4'
        },
        {
            songname: 'Song5',
            film: 'Film5',
            music_director: 'MD5',
            singer: 'Singer5',
            actor: 'Actor5',
            actress: 'Actress5'
        }
    ];


    // Check if any songs already exist to prevent duplicate insertions
    const existingSongs = await Song.find();
    if (existingSongs.length === 0) {
        try {
            await Song.insertMany(songs);
            console.log('5 songs inserted successfully');
        } catch (err) {
            console.error('Error inserting songs:', err);
        }
    } else {
        console.log('Songs already exist, skipping insertion.');
    }
};

// 1. Create Database (Handled automatically by MongoDB, no need to create explicitly)

// 3. Display Total Count of Documents and List all Songs
app.get('/songs', async (req, res) => {
    try {
        const totalCount = await Song.countDocuments();
        const allSongs = await Song.find();
        res.json({ totalCount, allSongs });
    } catch (err) {
        res.status(500).send('Error fetching songs');
    }
});

// 4. List Specified Music Director Songs
app.get('/songs/md/:musicDirector', async (req, res) => {
    const { musicDirector } = req.params;
    try {
        const songs = await Song.find({ music_director: musicDirector });
        res.json(songs);
    } catch (err) {
        res.status(500).send('Error fetching songs by music director');
    }
});

// 5. List Specified Music Director Songs Sung by Specified Singer
app.get('/songs/md/:musicDirector/singer/:singer', async (req, res) => {
    const { musicDirector, singer } = req.params;
    try {
        const songs = await Song.find({ music_director: musicDirector, singer: singer });
        res.json(songs);
    } catch (err) {
        res.status(500).send('Error fetching songs');
    }
});

// 6. Delete a Song
app.delete('/songs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Song.findByIdAndDelete(id);
        res.send(result ? 'Song deleted' : 'Song not found');
    } catch (err) {
        res.status(500).send('Error deleting song');
    }
});

// 7. Add a New Song
app.post('/songs/add', async (req, res) => {
    const { songname, film, music_director, singer } = req.body;

    if (!songname || !film || !music_director || !singer) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newSong = new Song({ songname, film, music_director, singer });
        await newSong.save();
        res.send('New song added');
    } catch (err) {
        console.error('Error adding song:', err);
        res.status(500).send('Error adding song');
    }
});

// 8. List Songs Sung by Specified Singer from a Specified Film
app.get('/songs/singer/:singer/film/:film', async (req, res) => {
    const { singer, film } = req.params;
    try {
        const songs = await Song.find({ singer: singer, film: film });
        res.json(songs);
    } catch (err) {
        res.status(500).send('Error fetching songs');
    }
});

// 9. Update Document by Adding Actor and Actress
app.put('/songs/:id/update', async (req, res) => {
    const { id } = req.params;
    const { actor, actress } = req.body;

    try {
        const updatedSong = await Song.findByIdAndUpdate(id, { actor, actress }, { new: true });
        res.send(updatedSong ? 'Song updated' : 'Song not found');
    } catch (err) {
        res.status(500).send('Error updating song');
    }
});

// 10. Display Data in Browser in Tabular Format
app.get('/songs/table', async (req, res) => {
    try {
        const songs = await Song.find();
        let tableHtml = '<table border="1"><tr><th>Song Name</th><th>Film Name</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>';
        songs.forEach(song => {
            tableHtml += `
        <tr>
          <td>${song.songname}</td>
          <td>${song.film}</td>
          <td>${song.music_director}</td>
          <td>${song.singer}</td>
          <td>${song.actor || ''}</td>
          <td>${song.actress || ''}</td>
        </tr>
      `;
        });
        tableHtml += '</table>';
        res.send(tableHtml);
    } catch (err) {
        res.status(500).send('Error displaying data');
    }
});

// Connect to MongoDB
connectToDatabase();

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
