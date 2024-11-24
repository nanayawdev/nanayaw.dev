# Personal Portfolio Website

A modern, responsive portfolio website built with React, Vite, and TailwindCSS. Features a dark mode toggle, smooth scrolling navigation, and dynamic content sections.

## 🚀 Features

- **Responsive Design**
  - Mobile-first approach with adaptive layouts
  - Fluid typography and spacing
  - Optimized images with automatic resizing
  - Flexible grid systems for different screen sizes

- **Dark Mode**
  - System-aware theme detection
  - Manual toggle with persistent preferences
  - Smooth transition animations
  - Consistent color palette across themes

- **Smooth Navigation**
  - Single-page application architecture
  - Smooth scrolling between sections
  - Active link highlighting
  - Collapsible mobile menu
  - Progress indicator for long-form content

- **Modern UI Components**
  - Custom-built React components
  - Framer Motion animations and transitions
  - Loading skeletons for dynamic content
  - Toast notifications
  - Modal dialogs
  - Interactive tooltips

- **Blog Integration**
  - Dynamic blog post loading
  - Categories and tags support
  - Search functionality
  - Reading time estimates
  - Social sharing buttons
  - Markdown support with syntax highlighting

- **Portfolio Showcase**
  - Filterable project grid
  - Project detail modals
  - Live preview links
  - GitHub repository integration
  - Technology stack badges
  - Image galleries with lightbox

- **Contact Form**
  - Form validation
  - CAPTCHA protection
  - Auto-response system
  - File attachment support
  - Success/error notifications

- **Performance Optimized**
  - Built with Vite for faster development
  - Code splitting and lazy loading
  - Image optimization and WebP support
  - Caching strategies
  - Minified production builds
  - Lighthouse score optimization

## 🛠 Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Routing**: React Router DOM
- **Type Checking**: PropTypes
- **Code Quality**: ESLint & Prettier

## 🎨 Design System

### Colors
The project uses a custom color palette with the primary color "riptide":

```
fontSize: {
  'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
  'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
}
```

### Typography

Two main font families are used:
- **Headings**: Lufga (Custom font)
- **Body**: Satoshi (Custom font)

Custom font sizes are defined for consistent typography:

```

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── ui/
│   ├── Navbar/
│   ├── Blog/
│   └── ProfileCard/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── styles/
└── utils/
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The development server will start at `http://localhost:2025`

## 🛠 Build

To create a production build:

```bash
npm run build
```

## 🎨 Customization

### Tailwind Configuration

The project uses a custom Tailwind configuration with extended themes. You can modify the `tailwind.config.js` file to customize:

- Colors
- Typography
- Spacing
- Animations
- Border radius
- Container sizes

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: Default
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

## 🌙 Dark Mode

Dark mode is implemented using Tailwind's dark mode class strategy. The theme can be:
- Automatically set based on system preferences
- Manually toggled by the user
- Persisted using localStorage

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
```

This README provides a comprehensive overview of the project structure, features, and setup instructions. Let me know if you'd like me to expand on any section or add additional information!
```

</rewritten_file>
```

</rewritten_file>