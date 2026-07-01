# Mini Build - AI Assistant

A professional ChatGPT-like AI Assistant powered by Google Gemini API.

## 🚀 Features

✨ **Core Features**
- Natural human-like conversations
- Context-aware responses
- Multi-turn dialogue
- Streaming responses with typing animation

🤖 **AI Capabilities**
- Code generation (Multiple languages)
- Syntax highlighting & copy functionality
- Code explanation & debugging
- Image generation (Text-to-Image)
- Image upload & analysis
- Long-term memory system

🎨 **UI/UX**
- Modern dark theme with blue neon accents
- Responsive design (Desktop, Tablet, Mobile)
- Smooth animations
- Professional interface
- Custom neon eagle logo

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS
- **AI:** Google Gemini API
- **Storage:** LocalStorage (Conversations & Memory)
- **Syntax Highlighting:** highlight.js
- **Icons:** react-icons

## 📋 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/kashanmuhammadkashan48-sudo/Mini-build-.git
cd Mini-build-
```

### 2. Get Gemini API Key
- Visit: https://ai.google.dev/
- Create a new API key
- Copy your API key

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🎯 Features Guide

### Chat Interface
- Start a new conversation
- Ask questions and get intelligent responses
- View conversation history

### Code Generation
- Generate code in multiple languages
- Copy code with one click
- Download code files
- Syntax highlighting for readability

### Image Generation
- Generate images from text descriptions
- Download generated images
- Preview before saving

### Image Analysis
- Upload images
- Get detailed analysis
- Extract text (OCR)
- Answer questions about images

### Memory System
- Automatic memory of preferences
- Remembers user name and coding language preferences
- Maintains conversation context
- View and manage memories

## 📱 Responsive Design

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 🔒 Security

- API key stored only in environment variables
- Never exposed on frontend
- Secure error handling
- Input validation

## 🚀 Deployment

### Deploy on Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy on Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy build folder to Netlify
3. Add environment variables in Netlify dashboard

## 📝 Project Structure

```
Mini-build-/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatInterface.js
│   │   ├── MessageList.js
│   │   ├── Message.js
│   │   ├── CodeBlock.js
│   │   ├── ChatInput.js
│   │   └── Sidebar.js
│   ├── services/
│   │   └── geminiService.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── App.css
│   │   ├── ChatInterface.css
│   │   ├── MessageList.css
│   │   ├── Message.css
│   │   ├── CodeBlock.css
│   │   ├── ChatInput.css
│   │   └── Sidebar.css
│   ├── App.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Customization

### Change Theme Colors
Edit `src/styles/global.css` and update color values:
- Primary color: `#00d9ff` (Cyan)
- Secondary color: `#0099cc` (Blue)
- Background: `#0a0e27` (Dark)

### Add Custom Logo
Replace logo in `public/` directory and update references

## 🐛 Troubleshooting

### API Key Error
- Verify `.env.local` file exists
- Check API key is correct
- Ensure no extra spaces in the key

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS Issues
- Use a backend proxy for API calls
- Configure CORS headers properly

## 📚 Resources

- [Gemini API Documentation](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [highlight.js Documentation](https://highlightjs.org/)

## 📄 License

MIT License - Feel free to use and modify

## 👤 Author

Created with ❤️ by Kashan Muhammad

---

**Made with 🦅 Mini Build**
