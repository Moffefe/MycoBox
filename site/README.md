# Website maintenance

GitHub Pages builds the landing page and guides from the repository's main branch.

- Edit guide content in `docs/*.md` and the security policy in `SECURITY.md`. These Markdown files are the single source used both on GitHub and on Pages.
- `_config.yml` enables the GitHub Pages-supported Markdown and relative-link plugins. Do not add `.nojekyll`: that would disable guide rendering.
- `_layouts/guide.html`, `_data/guides.yml` and `site/guides.css` supply the guide layout and navigation. `site/guides.js` adds a collapsible table of contents and mobile navigation; the content remains available without it.
- Preserve existing heading anchors when reorganizing a guide. Relative Markdown links keep working on GitHub and are converted to HTML destinations by Pages.
- The landing page is `index.html`; its appearance and gallery behavior live in `site/styles.css` and `site/script.js`.
- The hardware guide renders its existing Mermaid source with version 12.2.0 from jsDelivr, loaded only when a diagram is present. If it cannot load, the source and adjacent controller descriptions remain available.
- Keep screenshot pixels unchanged when adjusting the page layout. The restored measurement charts use `media/web-ui/measurements.png`.

After publishing, wait for the Pages build, then check the guide index, navigation, images and fragment links on desktop and at a narrow viewport. Check Markdown rendering on GitHub as well.
