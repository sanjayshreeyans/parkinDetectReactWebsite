# 🧠 Parkinson’s Detection App

Welcome to the **Parkinson’s Detection App**! This is a **React** website powered by a custom **Django backend** with machine learning models designed to detect early signs of Parkinson’s disease through wave and spiral drawings.

## 🚀 Getting Started

To get the app up and running locally, follow these steps:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action!

## 💻 Technologies Used
- **React** for the front-end interface
- **Next.js** for server-side rendering
- **Django** API for backend processing
- **Machine Learning** models with XGBoost and RandomForest for prediction
- **Base64 encoding** for image data transfer

## 🛠️ Project Structure
- `/components`: Contains reusable UI components.
- page.tsx refers to the home-page.tsx

## 🔧 How it Works
1. **Frontend**: Users upload wave and spiral drawings through an interactive React interface.
2. **Backend**: The images are sent to the Django backend using API routes, where machine learning models analyze the drawings.
3. **Prediction**: Results are processed and displayed to the user in real-time.

## 🌐 Deployment

This app can be easily deployed using platforms like **Vercel** or **Netlify**.

For deployment instructions, refer to:
- [Vercel Deployment Documentation](https://vercel.com/docs)

## 🎉 Contributions

Contributions are welcome! Feel free to open issues or pull requests to help improve this app.
