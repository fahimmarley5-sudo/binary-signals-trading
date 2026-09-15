const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Tell the server to look for static files in the root folder
app.use(express.static(__dirname));

// Send your index.html file whenever someone opens your website URL
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
