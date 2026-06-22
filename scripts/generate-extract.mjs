import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { Lexer } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const CHAPTERS = [
  'intro_introduction.md',
  '1.1_agent_pas_marteau_universel.md',
  '1.2_difference_agent_vs_workflow_vs_automation.md',
  '1.3_signaux_agent_mauvaise_idee.md',
  '1.4_cout_cache_autonomie.md',
];

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n?/, '');
}

function renderTokens(doc, tokens, opts = {}) {
  for (const token of tokens) {
    switch (token.type) {
      case 'heading': {
        const sizes = { 1: 20, 2: 16, 3: 13, 4: 12 };
        const size = sizes[token.depth] || 11;
        doc.moveDown(token.depth === 1 ? 1.2 : 0.8);
        doc.font('Helvetica-Bold').fontSize(size).text(token.text, { continued: false });
        doc.font('Helvetica').fontSize(10);
        doc.moveDown(0.3);
        break;
      }
      case 'paragraph': {
        doc.moveDown(0.4);
        renderInline(doc, token.tokens || [{ type: 'text', text: token.text }]);
        doc.moveDown(0.1);
        break;
      }
      case 'blockquote': {
        doc.moveDown(0.4);
        doc.save();
        const x = doc.x;
        doc.rect(x - 12, doc.y, 3, 60).fill('#cccccc').restore();
        doc.fillColor('#555555').font('Helvetica-Oblique').fontSize(9.5);
        renderTokens(doc, token.tokens || [], opts);
        doc.fillColor('#000000').font('Helvetica').fontSize(10);
        doc.moveDown(0.3);
        break;
      }
      case 'list': {
        doc.moveDown(0.3);
        for (const item of token.items) {
          const bullet = token.ordered ? '' : '•  ';
          doc.font('Helvetica').fontSize(10);
          const savedX = doc.x;
          doc.text(bullet, { continued: true, indent: 10 });
          renderInline(doc, item.tokens?.[0]?.tokens || [{ type: 'text', text: item.text }]);
          doc.x = savedX;
        }
        doc.moveDown(0.2);
        break;
      }
      case 'code': {
        doc.moveDown(0.4);
        doc.rect(doc.x - 6, doc.y - 4, doc.page.width - doc.page.margins.left - doc.page.margins.right + 6, 0).stroke();
        doc.font('Courier').fontSize(8.5).fillColor('#222222')
          .text(token.text, { lineGap: 1 });
        doc.font('Helvetica').fontSize(10).fillColor('#000000');
        doc.moveDown(0.4);
        break;
      }
      case 'hr': {
        doc.moveDown(0.6);
        doc.moveTo(doc.page.margins.left, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .stroke('#cccccc');
        doc.moveDown(0.6);
        break;
      }
      case 'space':
        doc.moveDown(0.2);
        break;
      default:
        if (token.tokens) renderTokens(doc, token.tokens, opts);
        break;
    }
  }
}

function renderInline(doc, tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const isLast = i === tokens.length - 1;
    switch (t.type) {
      case 'strong':
        doc.font('Helvetica-Bold').text(t.text, { continued: !isLast });
        doc.font('Helvetica');
        break;
      case 'em':
        doc.font('Helvetica-Oblique').text(t.text, { continued: !isLast });
        doc.font('Helvetica');
        break;
      case 'codespan':
        doc.font('Courier').fontSize(9).text(t.text, { continued: !isLast });
        doc.font('Helvetica').fontSize(10);
        break;
      case 'text':
      case 'escape':
        doc.font('Helvetica').fontSize(10).text(t.text || t.raw || '', { continued: !isLast });
        break;
      default:
        if (t.text) doc.font('Helvetica').fontSize(10).text(t.text, { continued: !isLast });
        break;
    }
  }
}

const doc = new PDFDocument({
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  info: {
    Title: 'From Demo to Production — Extrait',
    Author: 'François Noel',
    Subject: 'Introduction + Partie 1, chapitres 1.1–1.4',
  },
});

const outputPath = join(ROOT, 'public', 'assets', 'from-demo-to-production-extrait.pdf');
const buffers = [];
doc.on('data', (chunk) => buffers.push(chunk));
doc.on('end', () => {
  writeFileSync(outputPath, Buffer.concat(buffers));
  console.log(`PDF généré : ${outputPath}`);
});

// Cover page
doc.font('Helvetica-Bold').fontSize(28).text('From Demo to Production', { align: 'center' });
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(14).fillColor('#555555')
  .text('Building AI Agents That Survive the Real World', { align: 'center' });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(10).fillColor('#888888')
  .text('François Noel — Extrait : Introduction + Partie 1 (chapitres 1.1–1.4)', { align: 'center' });
doc.fillColor('#000000');
doc.moveDown(2);
doc.font('Helvetica-Oblique').fontSize(9).fillColor('#666666')
  .text('Cet extrait est partagé à titre personnel. Merci de ne pas le redistribuer.', { align: 'center' });
doc.fillColor('#000000');

// Chapters
for (let i = 0; i < CHAPTERS.length; i++) {
  const filePath = join(ROOT, 'src', 'content', 'book', CHAPTERS[i]);
  const raw = readFileSync(filePath, 'utf-8');
  const content = stripFrontmatter(raw);
  const tokens = Lexer.lex(content);

  if (i === 0) {
    doc.addPage();
  } else {
    doc.addPage();
  }

  doc.font('Helvetica').fontSize(10);
  renderTokens(doc, tokens);
}

doc.end();
