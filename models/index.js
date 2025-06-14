const Post = require('./models/Post');
app.use('/api/posts', require('./routes/posts'));
db.sync().then(() => console.log('✅ DB оновлено'));
