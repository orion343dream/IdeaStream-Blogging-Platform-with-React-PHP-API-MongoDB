import express from 'express';
    import cors from 'cors';
    import 'dotenv/config';

    const app = express();
    const port = process.env.PORT || 3001;

    app.use(cors());
    app.use(express.json());

    app.get('/api', (req, res) => {
      res.json({ message: 'Welcome to the IdeaStream API!' });
    });

    // Placeholder for future routes
    // app.use('/api/auth', authRoutes);
    // app.use('/api/posts', postRoutes);
    // app.use('/api/comments', commentRoutes);

    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`);
    });
