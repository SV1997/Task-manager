# Task Management Frontend

A modern, responsive React + TypeScript + Vite application for task management with multi-select dropdowns and Excel export functionality.

## Features

### Task Management
- ✅ **Create Tasks** with multi-select dropdowns for authors and divisions
- ✅ **Multi-Select Authors**: Aditya Prakash Rao, Shreya Ramakrishnan, Shaashwat Jindal, Preksha Dugar, Vaibhav Sharma, Aditya Pandey
- ✅ **Multi-Select Divisions**: MVL, Road Safety, Transport, Other
- ✅ **Task Description** with rich text area
- ✅ **Date Picker** for task date
- ✅ **Status Selection**: Pending, In Progress, Completed, Cancelled
- ✅ **Priority Selection**: Low, Medium, High, Urgent

### Display & Export
- ✅ **View All Tasks** with beautiful card layout
- ✅ **Pagination** for large task lists
- ✅ **Real-time Updates** when new tasks are created
- ✅ **Download Excel** button to export all tasks
- ✅ **Responsive Design** works on all devices

### Design
- 🎨 **Distinctive UI** with custom fonts and colors
- 🎨 **Smooth Animations** for better UX
- 🎨 **Modern Aesthetics** avoiding generic AI design patterns
- 🎨 **Cabinet Grotesk** font for headings
- 🎨 **JetBrains Mono** for code/badges

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Custom styling with animations

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   The `.env` file is already configured:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
task-management-frontend/
├── src/
│   ├── components/
│   │   ├── MultiSelect.tsx       # Multi-select dropdown component
│   │   ├── MultiSelect.css
│   │   ├── TaskForm.tsx          # Task creation form
│   │   ├── TaskForm.css
│   │   ├── TaskList.tsx          # Task list display
│   │   └── TaskList.css
│   ├── services/
│   │   └── api.ts                # API service with axios
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx                   # Main app component
│   ├── App.css                   # Main app styles
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── .env                          # Environment variables
└── README.md                     # Documentation
```

## Usage

### Creating a Task

1. Select one or more **Authors** from the dropdown
2. Select one or more **Divisions** from the dropdown
3. Enter a **Task Description**
4. Pick a **Date**
5. Choose **Status** (default: Pending)
6. Choose **Priority** (default: Medium)
7. Click **Create Task**

### Multi-Select Dropdowns

The multi-select dropdowns feature:
- **Checkboxes** for each option
- **Select All / Deselect All** button
- **Click outside** to close
- **Visual feedback** when items are selected
- Shows **"X selected"** when multiple items are chosen

### Viewing Tasks

- All tasks are displayed in a **card grid layout**
- Each card shows:
  - Status and Priority badges
  - Task date
  - Task description
  - Author(s)
  - Division(s)
- **Pagination** at the bottom for navigation
- **Auto-refresh** when new tasks are created

### Downloading Excel

Click the **"Download Excel"** button in the header to:
- Export all tasks to an Excel file
- File includes: ID, Author, Division, Task, Date, Status, Priority, etc.
- Automatically downloads with filename: `tasks_YYYY-MM-DD.xlsx`

## API Integration

The frontend connects to the backend API at `http://localhost:5000`:

### Endpoints Used

- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all tasks (with pagination)
- `GET /api/tasks/download/excel` - Download Excel file

### Configuration

Update `VITE_API_URL` in `.env` if your backend runs on a different port:

```env
VITE_API_URL=http://localhost:5000
```

## Build for Production

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Preview production build:**
   ```bash
   npm run preview
   ```

3. **Deploy:**
   - The `dist` folder contains the production build
   - Deploy to Vercel, Netlify, or any static hosting service

## Customization

### Changing Colors

Edit CSS variables in `src/App.css`:

```css
:root {
  --primary: #FF6B35;           /* Main brand color */
  --primary-dark: #E85A2A;      /* Darker shade */
  --text-primary: #1A1A2E;      /* Main text color */
  /* ... more variables ... */
}
```

### Adding More Authors or Divisions

Edit `src/types/index.ts`:

```typescript
export const AUTHORS = [
  'Aditya Prakash Rao',
  'Shreya Ramakrishnan',
  // Add more authors here
] as const;

export const DIVISIONS = [
  'MVL',
  'Road Safety',
  // Add more divisions here
] as const;
```

### Changing Fonts

The app uses:
- **Cabinet Grotesk** - Display font (headings, UI)
- **JetBrains Mono** - Monospace font (badges, dates)

To change fonts, update the Google Fonts link in `index.html` and CSS references.

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Hot Module Replacement

Vite provides instant HMR (Hot Module Replacement) during development. Changes appear immediately without page refresh.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Backend Connection Issues

If you see "Failed to create task" or "Failed to fetch tasks":

1. Make sure backend is running on `http://localhost:5000`
2. Check `.env` file has correct `VITE_API_URL`
3. Verify CORS is enabled in backend
4. Check browser console for detailed errors

### Excel Download Not Working

1. Ensure backend `/api/tasks/download/excel` endpoint is accessible
2. Check browser's download settings
3. Look for blocked pop-ups

### Multi-Select Not Opening

1. Clear browser cache
2. Check console for JavaScript errors
3. Ensure all dependencies are installed

## License

ISC

## Support

For issues and questions, please check the backend API documentation or contact the development team.
