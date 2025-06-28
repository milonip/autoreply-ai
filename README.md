# AutoReply.ai 🚀

**Smart AI-powered reply suggestions for emails and messages**

AutoReply.ai is a modern web application that generates contextually appropriate reply suggestions using AI. Simply paste a received message, select your desired tone, and get instant professional reply options powered by Groq's lightning-fast AI models.

## ✨ Features

- **🤖 AI-Powered Replies**: Generate intelligent responses using Groq's Llama3-8b model
- **🎯 Multiple Tones**: Choose from friendly, professional, empathetic, or blunt communication styles
- **⚡ Lightning Fast**: Sub-500ms response times for instant results
- **📋 One-Click Copy**: Copy any generated reply directly to your clipboard
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, accessible interface built with Radix UI and Tailwind CSS
- **🔒 Privacy First**: Your messages are processed securely and not stored

## 🚀 Live Demo

Try AutoReply.ai live: [Your Deployment URL Here]

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for modern styling
- **Radix UI** for accessible components
- **React Query** for efficient data fetching
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Groq AI** for fast, high-quality text generation
- **Zod** for runtime validation
- **Drizzle ORM** for database operations

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Groq API key (free at [console.groq.com](https://console.groq.com))

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autoreply-ai.git
   cd autoreply-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5000` to see the application running.

## 🎯 Usage

1. **Enter your message**: Paste the email or message you received
2. **Select tone**: Choose how you want to respond (friendly, professional, empathetic, or blunt)
3. **Generate replies**: Click "Generate Replies" to get AI-powered suggestions
4. **Copy and use**: Click any reply to copy it to your clipboard

### Example

**Input Message:**
> "Thanks for the great presentation today! I learned a lot about AI implementation."

**Generated Replies (Professional tone):**
- "Thank you for your kind feedback. I'm glad the presentation was valuable and informative."
- "I appreciate your positive feedback. It's rewarding to know the AI implementation insights were helpful."
- "Thank you for attending and for your thoughtful comment. I'm pleased the session met your expectations."

## 🔑 Getting Your Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

Groq offers generous free usage limits, making it perfect for personal and small business use.

## 🏗️ Project Structure

```
autoreply-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utilities and API client
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── services/          # Business logic
│   └── routes.ts          # API endpoints
├── shared/                # Shared types and schemas
└── README.md
```

## 🚀 Deployment

### Deploy to Replit (Recommended)

1. Fork this repository on Replit
2. Add your `GROQ_API_KEY` to Replit Secrets
3. Click "Run" to start the application
4. Use Replit's deployment feature for production

### Deploy to Vercel/Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting platform

3. Set environment variables in your hosting platform's dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for providing fast, free AI inference
- [Radix UI](https://radix-ui.com) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [React Query](https://tanstack.com/query) for powerful data synchronization

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/autoreply-ai/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about your environment and the issue

---

**Made with ❤️ using React, Node.js, and Groq AI**