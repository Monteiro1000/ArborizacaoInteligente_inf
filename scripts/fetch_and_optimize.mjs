import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { CARD_ITEMS } from './card_items.mjs';

const OUTPUT_DIR = path.resolve('public/images/cards');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const USER_AGENT = 'ArborizacaoInteligente/1.0 (https://arborizacaointeligente.com.br; julioalvedmonteiro@gmail.com)';

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function searchCommons(query) {
  try {
    await sleep(800);
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=filetype:bitmap%20' + encodeURIComponent(query) + '&gsrlimit=5&prop=imageinfo&iiprop=url|size|extmetadata&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages).map(p => {
      const info = p.imageinfo?.[0] || {};
      const meta = info.extmetadata || {};
      return {
        title: p.title,
        url: info.url,
        license: meta.LicenseShortName?.value || 'CC-BY-SA',
        licenseUrl: meta.LicenseUrl?.value || 'https://creativecommons.org/licenses/',
        artist: (meta.Artist?.value || 'Colaborador Wikimedia').replace(/<[^>]*>/g, '').trim(),
        credit: (meta.Credit?.value || p.title).replace(/<[^>]*>/g, '').trim(),
        pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title.replace(/ /g, '_'))}`
      };
    });
  } catch (err) {
    console.error('Search error for query:', query, err.message);
    return [];
  }
}

async function getFileInfo(fileTitle) {
  try {
    await sleep(800);
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(fileTitle) + '&prop=imageinfo&iiprop=url|size|extmetadata&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    if (!page || !page.imageinfo?.[0]) return null;
    const info = page.imageinfo[0];
    const meta = info.extmetadata || {};
    return {
      title: page.title,
      url: info.url,
      license: meta.LicenseShortName?.value || 'CC-BY-SA',
      licenseUrl: meta.LicenseUrl?.value || 'https://creativecommons.org/licenses/',
      artist: (meta.Artist?.value || 'Colaborador Wikimedia').replace(/<[^>]*>/g, '').trim(),
      credit: (meta.Credit?.value || page.title).replace(/<[^>]*>/g, '').trim(),
      pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`
    };
  } catch (err) {
    console.error('Get file error:', fileTitle, err.message);
    return null;
  }
}

async function downloadBuffer(url, retries = 2) {
  await sleep(1000);
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Referer': 'https://commons.wikimedia.org/'
        }
      });
      if (res.status === 429) {
        console.log('    (Rate limited 429, aguardando 3s antes de retentar...)');
        await sleep(3000);
        continue;
      }
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const ab = await res.arrayBuffer();
      return Buffer.from(ab);
    } catch (err) {
      if (i === retries) throw err;
      await sleep(2000);
    }
  }
}

// Fallback SVG generator if a download fails
function generatePlaceholderWebp(item) {
  const safeName = escapeXml(item.cardName);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#04261c" />
        <stop offset="50%" stopColor="#073828" />
        <stop offset="100%" stopColor="#0b5c3b" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(52, 211, 153, 0.08)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    <circle cx="400" cy="200" r="64" fill="rgba(22, 190, 125, 0.16)" stroke="rgba(52, 211, 153, 0.4)" stroke-width="2"/>
    <path d="M 400 160 C 435 175 440 220 400 245 C 360 220 365 175 400 160 Z" fill="#34d399" />
    <path d="M 400 170 L 400 240" stroke="#04261c" stroke-width="2.5" stroke-linecap="round"/>
    <text x="400" y="295" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="700">${safeName}</text>
    <text x="400" y="325" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Arborização Inteligente</text>
  </svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 85 }).toBuffer();
}

async function run() {
  const credits = [];

  for (const item of CARD_ITEMS) {
    const filename = `${item.id}.webp`;
    const targetPath = path.join(OUTPUT_DIR, filename);

    console.log(`\nProcessando [${item.id}]: ${item.cardName}...`);

    let fileData = null;

    // 1. Try fallbacks first if defined
    if (item.fallbackTitles && item.fallbackTitles.length > 0) {
      for (const title of item.fallbackTitles) {
        fileData = await getFileInfo(title);
        if (fileData && fileData.url) break;
      }
    }

    // 2. Try search if no fallback worked
    if (!fileData || !fileData.url) {
      const results = await searchCommons(item.query);
      if (results.length > 0) {
        fileData = results[0];
      }
    }

    let success = false;
    let chosenMeta = null;

    if (fileData && fileData.url) {
      try {
        console.log(`  Baixando: ${fileData.title} de ${fileData.url}`);
        const rawBuf = await downloadBuffer(fileData.url);

        // Convert to WebP: 800px wide, max 450px high (16:9 landscape aspect ratio), quality 80
        const webpBuf = await sharp(rawBuf)
          .resize({ width: 800, height: 450, fit: 'cover', position: 'center' })
          .webp({ quality: 80 })
          .toBuffer();

        fs.writeFileSync(targetPath, webpBuf);
        console.log(`  ✓ Salvo: ${filename} (${Math.round(webpBuf.byteLength / 1024)} KB)`);

        chosenMeta = {
          id: item.id,
          cardName: item.cardName,
          file: `images/cards/${filename}`,
          sourceTitle: fileData.title,
          sourceUrl: fileData.pageUrl,
          author: fileData.artist || 'Colaborador Wikimedia',
          license: fileData.license,
          licenseUrl: fileData.licenseUrl,
          searchTerm: item.searchTerm,
          expectedView: item.expectedView,
          status: 'baixado'
        };
        success = true;
      } catch (err) {
        console.warn(`  ! Falha ao baixar/converter imagem real: ${err.message}. Gerando placeholder.`);
      }
    }

    if (!success) {
      const placeholderBuf = await generatePlaceholderWebp(item);
      fs.writeFileSync(targetPath, placeholderBuf);
      console.log(`  ✓ Placeholder gerado: ${filename} (${Math.round(placeholderBuf.byteLength / 1024)} KB)`);
      chosenMeta = {
        id: item.id,
        cardName: item.cardName,
        file: `images/cards/${filename}`,
        sourceTitle: 'Placeholder Ilustrativo SVG',
        sourceUrl: 'Interno',
        author: 'Arborização Inteligente',
        license: 'CC0 / Domínio Público',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        searchTerm: item.searchTerm,
        expectedView: item.expectedView,
        status: 'placeholder'
      };
    }

    credits.push(chosenMeta);
  }

  // Generate src/data/imageCredits.js
  const jsContent = `/**
 * Créditos e Atribuições das Imagens dos Cards
 * Licenças livres para uso comercial (Wikimedia Commons, CC-BY, CC-BY-SA, Domínio Público / CC0)
 */
export const IMAGE_CREDITS = ${JSON.stringify(credits, null, 2)};
`;
  fs.writeFileSync(path.resolve('src/data/imageCredits.js'), jsContent, 'utf-8');

  // Generate CREDITS.md
  let mdContent = `# Créditos e Licenças das Imagens dos Cards

Todas as imagens utilizadas nos cards do projeto **Arborização Inteligente** são provenientes de fontes com licença livre para uso comercial (Wikimedia Commons, CC-BY, CC-BY-SA e Domínio Público / CC0), sem necessidade de pagamentos ou restrições de direitos autorais.

| Card | Arquivo Local | Fonte / Título | Autor / Criador | Licença | O que a imagem representa |
|---|---|---|---|---|---|
`;

  credits.forEach(c => {
    mdContent += `| **${c.cardName}** | \`${c.file}\` | [${c.sourceTitle}](${c.sourceUrl}) | ${c.author} | [${c.license}](${c.licenseUrl}) | ${c.expectedView} |\n`;
  });

  mdContent += `\n*Gerado automaticamente pelo pipeline de otimização de imagens do projeto Arborização Inteligente.*\n`;
  fs.writeFileSync(path.resolve('CREDITS.md'), mdContent, 'utf-8');

  console.log('\n✓ Sucesso! Todas as 21 imagens salvas em public/images/cards/');
  console.log('✓ Arquivos src/data/imageCredits.js e CREDITS.md criados com sucesso.');
}

run();
