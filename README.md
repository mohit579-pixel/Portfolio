# Mohit Khandelwal — Portfolio

Personal portfolio of Mohit Khandelwal, Java/Spring Boot backend engineer.
It's a dark "session recording" style site with a command menu (Ctrl/Cmd+K), sound effects you can mute, and a page for each project with a playable demo.

Built with React 18 and Vite. It's a static site with no backend, so it runs on any static host.

## Run it locally

You need Node.js 20.19 or newer (22 recommended, see `.nvmrc`).

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
npm run format    # Prettier
```

## Edit the content

All text lives in `src/data/`, so you shouldn't need to touch components to change content.

| File          | What it holds                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `links.js`    | Email address, plus GitHub / LinkedIn / Blog / Resume URLs. A link appears in the footer only when its URL is filled in. |
| `profile.js`  | Page title, hero text, the "at a glance" rows, section headings, About text, education, footer line.                     |
| `projects.js` | The three projects: name, type, stack, badge, "What I built" text.                                                       |
| `jobs.js`     | The experience log.                                                                                                      |
| `skills.js`   | The toolbox categories and skills.                                                                                       |
| `arch.js`     | The nodes of the EdgeVerve request-flow diagram.                                                                         |
| `demos.js`    | Sample data for the demos (appointment slots, property listings, stays and reviews).                                     |

The page `<title>`, description and social-preview tags are in `index.html`.

## Project structure

```
src/
  main.jsx, App.jsx
  components/   UI pieces (Cursor, CommandMenu, ProjectPage, Toolbox, ...)
  demos/        Dental, XRay, Mantionify, Wanderlust (lazy-loaded per project page)
  lib/          sfx.js (WebAudio sounds), hash router, plain demo logic
  data/         all content (see above)
  styles/       global.css plus one stylesheet per area
```

Project pages use hash URLs such as `#/p/P-01`. These work on any static host with no rewrite rules, and both direct links and the browser back button work.

## Deploy

### Render (free Static Site)

The repo includes `render.yaml`, so Render reads the settings from it.

1. Push this repo to GitHub.
2. On https://dashboard.render.com choose **New > Static Site** and connect the repository.
3. Check the settings: build command `npm ci && npm run build`, publish directory `dist`.
4. Click **Create Static Site**. Every push to the main branch redeploys.

(Or use **New > Blueprint** and pick the repo, and Render applies `render.yaml` as-is, including the cache headers for `/assets`.)

### Alternatives

- **Netlify:** New site from Git, build command `npm run build`, publish directory `dist`.
- **Vercel:** Import the repo. It detects Vite (build `npm run build`, output `dist`) automatically.

## License

MIT, see [LICENSE](LICENSE).
