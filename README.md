# Hebrew Vowel Match

Current version: **1.9.1**

A simple drag-and-drop HTML learning game that helps students match Hebrew vowels to their English sound equivalents.

Website: [https://esemmelman.github.io/avery-hebrew/](https://esemmelman.github.io/avery-hebrew/)

## Included vowels

- Hiriq -> ee
- Tsere -> ay
- Segol -> eh
- Patach -> a
- Kamatz -> ah
- Shva -> eh / silent
- Holam -> oh
- Chataf Patach -> a
- Chataf Segol -> eh
- Chataf Kamatz -> aw / ah

## Run locally

1. Open `index.html` in a browser, or
2. Serve the folder with a local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub-ready setup

This project is structured as a static site and can be published with GitHub Pages.

### Option 1: GitHub Pages

1. Create a new repository on GitHub.
2. Upload these files to the repository.
3. Go to Settings > Pages.
4. Select the branch to deploy and the root folder.
5. Save the settings.

### Option 2: GitHub Actions

A sample Pages workflow is included in `.github/workflows/pages.yml`.

## Project files

- `index.html` – app layout
- `style.css` – styling
- `script.js` – drag/drop logic
- `.github/workflows/pages.yml` – deployment workflow for GitHub Pages

## License

This project is provided for educational use.
