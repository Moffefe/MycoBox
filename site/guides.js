/* Content and guide links work without JavaScript; enhance navigation only. */
const article = document.querySelector('.guide-content');
const headings = [...article.querySelectorAll('h2[id], h3[id]')];
if (headings.length > 2) {
  const outline = document.createElement('details');
  outline.className = 'page-outline';
  const summary = document.createElement('summary');
  summary.textContent = 'On this page';
  const navigation = document.createElement('nav');
  navigation.setAttribute('aria-label', 'On this page');
  for (const heading of headings) {
    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    link.dataset.level = heading.tagName.slice(1);
    navigation.append(link);
  }
  outline.append(summary, navigation);
  const title = article.querySelector('h1');
  if (title) title.after(outline);
}
const menu = document.querySelector('.guide-menu');
const narrowScreen = window.matchMedia('(max-width: 760px)');
function adaptMenu() {
  menu.open = !narrowScreen.matches;
}
adaptMenu();
narrowScreen.addEventListener('change', adaptMenu);

/* GitHub's short source navigation is replaced by the page's breadcrumbs. */
for (const paragraph of [...article.children].filter(node => node.tagName === 'P').slice(0, 3)) {
  const links = [...paragraph.querySelectorAll('a')];
  const copy = paragraph.cloneNode(true);
  copy.querySelectorAll('a').forEach(link => link.remove());
  if (links.some(link => link.textContent === 'Documentation') &&
      links.some(link => link.textContent === 'MycoBox home') &&
      !copy.textContent.replace(/[\s·]/g, '')) paragraph.hidden = true;
}

/* Render the existing Markdown diagram only on pages that contain one. */
const diagrams = [...article.querySelectorAll('code.language-mermaid, .language-mermaid code')];
if (diagrams.length) {
  import('https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs').then(async ({default: mermaid}) => {
    mermaid.initialize({startOnLoad: false, securityLevel: 'strict', theme: 'dark', flowchart: {htmlLabels: false}});
    for (const [index, code] of diagrams.entries()) {
      const {svg} = await mermaid.render('guide-diagram-' + index, code.textContent);
      const figure = document.createElement('figure');
      figure.className = 'guide-diagram';
      figure.innerHTML = svg;
      code.closest('.highlighter-rouge, pre').replaceWith(figure);
    }
  }).catch(() => {
    /* Keep the source diagram and the controller descriptions if rendering is unavailable. */
  });
}
