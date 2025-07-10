# 🧳 Nuxt 3 Mini Job Board

A clean, dark-themed job board built with **Nuxt 3** and **Vue 3**, featuring job filters, animated pagination, and detailed job views — all powered by static JSON data.

## 🚀 Features

- Browse job listings from a static `jobs.json` file
- Filter by **Title**, **Location**, and **Job Type** (live updates)
- Paginated results (5 jobs per page with animation)
- Detailed job view with fallback 404 for invalid IDs
- Responsive design with floating and 3D-Depth based UI

---

## 🛠️ Setup Instructions

Make sure to install dependencies:

```bash
# 1. Clone the repository (if uploaded to github)
git clone <url>
cd nuxt3-job-board

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```
After following the above steps, visit [localhost:3000](http://localhost:3000/) in your browser to check out the web-app


## 🧱 Project Structure

```bash
│
├── assets/
│   └── css/   
│       └── main.css           # For Tailwind Setup   
│
├── components/
│   ├── Custom-Select.vue      # Custom input dropdown menu (styled and themed)
│   └── JobCard.vue            # Visual card component for displaying job summary (title + company)
│
├── composables/
│   └── usePagination.ts       # Composable for handling pagination logic (5 items/page)
│
├── layouts/
│   └── default.vue            # Themed layout with background, shared across pages
│
├── pages/
│   ├── index.vue              # Home page — displays job list with real-time filters
│   ├── 404.vue                # Custom error page (shown if job ID not found)
│   └── jobs/[id].vue          # Dynamic route: displays detailed job information
│
├── public/
│   └── data/   
│   │   └── jobs.json         # Static JSON file containing job listings
│   ├── favicon.ico
│   └── robots.txt
│
├── app.vue                   # Nuxt app entry point
├── nuxt.config.ts            # Nuxt configuration (modules, paths, etc.)
├── tsconfig.json             # TypeScript Configuration
├── package.json
├── package-lock.json
├── node_modules/             
├── server/
└── README.md
```

## 🐞 Known Issues
  - Manual input of an job ID directly in the url leads to a 404 — **expected behavior**
  - No other currently known issues. However I do think the UI of the Custom Input dropdown menu could have been done a bit 
    differently to imporove readablitly.

## 🛠 Questions? (Context: This project was based a task assigned to me. This questions are meant for assigners to review)
 1. About the "Route Validation" for Job Details page, should we build it such a way that even editing the url with /jobs/[id] 
    manually would result in a valid page? If so i would use a onMounted() lifecycle hook to callback an asnync function that
    would validate the route.
    Right now my route is validated only if approached through the homepage
 2. I didn't exactly understand what the useJobs() composable would be used for or what it is supposed to do, so I haven't used it.
---
