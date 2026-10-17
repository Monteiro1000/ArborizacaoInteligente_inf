import fs from 'fs';
import path from 'path';

const LEAF_ALTS = {
  'conforto-termico': {
    file: 'images/cards/folha-conforto-termico.webp',
    pt: 'Sombreamento natural projetado por copas frondosas sobre via urbana amenizando o microclima',
    en: 'Natural tree canopy shade cast over urban street cooling the microclimate',
    es: 'Sombra natural proyectada por copas frondosas sobre calle urbana refrescando el microclima'
  },
  'qualidade-ar': {
    file: 'images/cards/folha-qualidade-ar.webp',
    pt: 'Corredor arborizado com árvores filtrando material particulado e purificando o ar urbano',
    en: 'Tree-lined avenue with trees filtering particulate matter and purifying urban air',
    es: 'Avenida arbolada con árboles filtrando material particulado y purificando el aire urbano'
  },
  'saude-bem-estar': {
    file: 'images/cards/folha-saude-bem-estar.webp',
    pt: 'Caminho sereno em parque urbano arborizado proporcionando tranquilidade e contato com a natureza',
    en: 'Serene walkway in urban park providing tranquility and connection with nature',
    es: 'Sendero sereno en parque urbano arbolado proporcionando tranquilidad y conexión con la naturaleza'
  },
  'drenagem-solo': {
    file: 'images/cards/folha-drenagem-solo.webp',
    pt: 'Canteiro de chuva e solo permeável com vegetação absorvendo água pluvial e prevenindo alagamentos',
    en: 'Rain garden and permeable soil with vegetation absorbing stormwater and preventing floods',
    es: 'Jardín de lluvia y suelo permeable con vegetación absorbiendo agua pluvial y previniendo inundaciones'
  },
  'nativas-exoticas': {
    file: 'images/cards/folha-nativas-exoticas.webp',
    pt: 'Florada dourada de Ipê Amarelo destacando a beleza e a resiliência das espécies nativas',
    en: 'Golden blooming of native Yellow Ipe highlighting the beauty and resilience of native flora',
    es: 'Floración dorada de Ipê Amarillo destacando la belleza y resiliencia de las especies nativas'
  },
  'refugio-fauna': {
    file: 'images/cards/folha-refugio-fauna.webp',
    pt: 'Pássaro pousado em galho de árvore urbana demonstrando a importância do refúgio para a fauna',
    en: 'Bird perched on urban tree branch demonstrating the essential shelter for urban fauna',
    es: 'Ave posada en rama de árbol urbano demostrando la importancia del refugio para la fauna'
  },
  'porte-calcadas': {
    file: 'images/cards/folha-porte-calcadas.webp',
    pt: 'Poda técnica e manejo cuidadoso de árvore urbana compatibilizando copas com calçadas e redes',
    en: 'Technical pruning and careful tree management balancing canopies with sidewalks and utility lines',
    es: 'Poda técnica y manejo cuidadoso de árbol urbano compatibilizando copas con aceras y redes eléctricas'
  },
  'ilhas-calor': {
    file: 'images/cards/folha-ilhas-calor.webp',
    pt: 'Túnel verde de árvores gerando sombra densa e quebra térmica contra o calor do asfalto',
    en: 'Green tree tunnel providing dense shade and thermal break against asphalt heat',
    es: 'Túnel verde de árboles generando sombra densa y alivio térmico contra el calor del asfalto'
  },
  'desafio-sergipe': {
    file: 'images/cards/folha-desafio-sergipe.webp',
    pt: 'Rua residencial arborizada exemplificando a necessidade de expansão da cobertura arbórea urbana',
    en: 'Tree-lined residential street exemplifying the need to expand urban canopy cover',
    es: 'Calle residencial arbolada ejemplificando la necesidad de expandir la cobertura arbórea urbana'
  },
  'chuvas-umidade': {
    file: 'images/cards/folha-chuvas-umidade.webp',
    pt: 'Luz solar transpassando copas verdes densas durante o ciclo contínuo de evapotranspiração',
    en: 'Sunlight piercing through dense green leaves during continuous evapotranspiration cycle',
    es: 'Luz solar atravesando copas verdes densas durante el ciclo continuo de evapotranspiración'
  },
  'visao-satelite': {
    file: 'images/cards/folha-visao-satelite.webp',
    pt: 'Mapeamento orbital multiespectral com índice de vegetação NDVI realçando áreas verdes urbanas',
    en: 'Multispectral orbital mapping with NDVI vegetation index highlighting urban green spaces',
    es: 'Mapeo orbital multiespectral con índice de vegetación NDVI resaltando áreas verdes urbanas'
  },
  'drones-ia': {
    file: 'images/cards/folha-drones-ia.webp',
    pt: 'Voo de drone aéreo captando detalhes de copas e gerando ortomosaicos para inteligência artificial',
    en: 'Aerial drone flight capturing canopy details and generating orthomosaics for artificial intelligence',
    es: 'Vuelo de dron aéreo captando detalles de copas y generando ortomosaicos para inteligencia artificial'
  },
  'sensores-iot': {
    file: 'images/cards/folha-sensores-iot.webp',
    pt: 'Estação de telemetria ambiental e sensor acoplado para monitoramento microclimático 24 horas',
    en: 'Environmental telemetry station and sensor unit for 24/7 microclimate monitoring',
    es: 'Estación de telemetría ambiental y sensor para monitoreo microclimático las 24 horas'
  },
  'cadastro-tecnico': {
    file: 'images/cards/folha-cadastro-tecnico.webp',
    pt: 'Inspeção detalhada de casca e tronco de árvore para diagnóstico fitossanitário digital',
    en: 'Detailed inspection of tree bark and trunk for digital phytosanitary diagnostics',
    es: 'Inspección detallada de corteza y tronco de árbol para diagnóstico fitosanitario digital'
  },
  'cidadao-bairros': {
    file: 'images/cards/folha-cidadao-bairros.webp',
    pt: 'Mãos de moradores e voluntários plantando muda de árvore na terra durante ação comunitária',
    en: 'Hands of residents and volunteers planting a tree sapling in soil during community action',
    es: 'Manos de vecinos y voluntarios plantando una plántula de árbol en la tierra durante acción comunitaria'
  },
  'escolas-educacao': {
    file: 'images/cards/folha-escolas-educacao.webp',
    pt: 'Identificação botânica e estudo de árvore em atividade prática de ciência cidadã e educação ambiental',
    en: 'Botanical identification and tree study during citizen science and environmental education fieldwork',
    es: 'Identificación botánica y estudio de árbol en actividad práctica de ciencia ciudadana y educación ambiental'
  },
  'poder-publico': {
    file: 'images/cards/folha-poder-publico.webp',
    pt: 'Florada urbana com polinizador simbolizando a integração de áreas verdes no planejamento municipal',
    en: 'Urban tree blossom with pollinator symbolizing green space integration in city master plans',
    es: 'Floración urbana con polinizador simbolizando la integración de áreas verdes en la planificación municipal'
  }
};

const PLAN_ALTS = {
  satelite: {
    file: 'images/cards/plano-satelite.webp',
    pt: 'Imagem orbital de satélite multiespectral monitorando a cobertura vegetal e índice NDVI urbano',
    en: 'Multispectral orbital satellite imagery monitoring urban tree canopy cover and NDVI index',
    es: 'Imagen orbital de satélite multiespectral monitoreando la cobertura vegetal urbana y el índice NDVI'
  },
  drones: {
    file: 'images/cards/plano-drones.webp',
    pt: 'Drone de precisão realizando voo sobre copas de árvores urbanas para modelagem e mapeamento',
    en: 'Precision drone flying over urban tree canopies for modeling and mapping',
    es: 'Dron de precisión sobrevolando copas de árboles urbanos para modelado y mapeo'
  },
  sensores: {
    file: 'images/cards/plano-sensores.webp',
    pt: 'Sensor IoT de microclima e dendrômetro acoplado a tronco de árvore monitorando parâmetros vitais',
    en: 'IoT microclimate sensor and dendrometer attached to tree trunk monitoring vital parameters',
    es: 'Sensor IoT de microclima y dendrómetro fijado al tronco monitoreando parámetros vitales'
  },
  cadastro: {
    file: 'images/cards/plano-cadastro.webp',
    pt: 'Técnico ambiental realizando medição de tronco e inventário fitossanitário em campo',
    en: 'Environmental technician performing tree trunk measurement and phytosanitary field inventory',
    es: 'Técnico ambiental realizando medición de tronco e inventario fitosanitario en campo'
  }
};

async function updateKnowledgeTree() {
  const filePath = path.resolve('src/data/knowledgeTree.js');
  let content = fs.readFileSync(filePath, 'utf-8');

  // For each leaf in LEAF_ALTS, if it doesn't already have image: { ... }, add it
  for (const [leafId, data] of Object.entries(LEAF_ALTS)) {
    // Regex to match leaf object by id
    const leafRegex = new RegExp(`(id:\\s*['"]${leafId}['"][\\s\\S]*?)(sourceUrl:\\s*['"][^'"]*['"]\\s*)(,\\s*isTodo:\\s*true)?(\\s*})`, 'g');

    // We can update for each language block
    content = content.replace(leafRegex, (match, before, sourceUrl, isTodo, after) => {
      if (match.includes('image:')) return match;
      const todoStr = isTodo ? `${isTodo}` : '';
      return `${before}${sourceUrl}${todoStr},\n            image: {\n              src: '${data.file}',\n              alt: '${data.pt}'\n            }${after}`;
    });
  }

  // Also customize alt for en and es
  // We can do language-specific regex replacement in sections
  const enMatch = content.indexOf('en: {');
  const esMatch = content.indexOf('es: {');

  if (enMatch !== -1 && esMatch !== -1) {
    let ptSection = content.slice(0, enMatch);
    let enSection = content.slice(enMatch, esMatch);
    let esSection = content.slice(esMatch);

    for (const [leafId, data] of Object.entries(LEAF_ALTS)) {
      const enLeafRegex = new RegExp(`(id:\\s*['"]${leafId}['"][\\s\\S]*?image:\\s*{[\\s\\S]*?alt:\\s*['"])([^'"]*)(['"])`, 'g');
      enSection = enSection.replace(enLeafRegex, `$1${data.en}$3`);

      const esLeafRegex = new RegExp(`(id:\\s*['"]${leafId}['"][\\s\\S]*?image:\\s*{[\\s\\S]*?alt:\\s*['"])([^'"]*)(['"])`, 'g');
      esSection = esSection.replace(esLeafRegex, `$1${data.es}$3`);
    }

    content = ptSection + enSection + esSection;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('✓ src/data/knowledgeTree.js atualizado com imagens e alts em PT, EN, ES');
}

async function updateI18nData() {
  const filePath = path.resolve('src/data/i18nData.js');
  let content = fs.readFileSync(filePath, 'utf-8');

  for (const [planId, data] of Object.entries(PLAN_ALTS)) {
    // Regex for plan in solution.plans
    const planRegex = new RegExp(`(id:\\s*['"]${planId}['"][\\s\\S]*?)(price:\\s*['"][^'"]*['"]\\s*)(\\s*})`, 'g');

    content = content.replace(planRegex, (match, before, price, after) => {
      if (match.includes('image:')) return match;
      return `${before}${price},\n          image: {\n            src: '${data.file}',\n            alt: '${data.pt}'\n          }${after}`;
    });
  }

  // Update EN and ES alts for plans
  const enMatch = content.indexOf('en: {');
  const esMatch = content.indexOf('es: {');

  if (enMatch !== -1 && esMatch !== -1) {
    let ptSection = content.slice(0, enMatch);
    let enSection = content.slice(enMatch, esMatch);
    let esSection = content.slice(esMatch);

    for (const [planId, data] of Object.entries(PLAN_ALTS)) {
      const enPlanRegex = new RegExp(`(id:\\s*['"]${planId}['"][\\s\\S]*?image:\\s*{[\\s\\S]*?alt:\\s*['"])([^'"]*)(['"])`, 'g');
      enSection = enSection.replace(enPlanRegex, `$1${data.en}$3`);

      const esPlanRegex = new RegExp(`(id:\\s*['"]${planId}['"][\\s\\S]*?image:\\s*{[\\s\\S]*?alt:\\s*['"])([^'"]*)(['"])`, 'g');
      esSection = esSection.replace(esPlanRegex, `$1${data.es}$3`);
    }

    content = ptSection + enSection + esSection;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('✓ src/data/i18nData.js atualizado com imagens e alts dos planos em PT, EN, ES');
}

async function updateSolutionData() {
  const filePath = path.resolve('src/data/solutionData.js');
  let content = fs.readFileSync(filePath, 'utf-8');

  const planMap = {
    'plano-1': 'satelite',
    'plano-2': 'cadastro',
    'plano-3': 'drones',
    'plano-4': 'sensores'
  };

  for (const [pId, key] of Object.entries(planMap)) {
    const data = PLAN_ALTS[key];
    const regex = new RegExp(`(id:\\s*['"]${pId}['"][\\s\\S]*?)(delay:\\s*['"][^'"]*['"]\\s*)(\\s*})`, 'g');
    content = content.replace(regex, (match, before, delay, after) => {
      if (match.includes('image:')) return match;
      return `${before}${delay},\n    image: {\n      src: '${data.file}',\n      alt: '${data.pt}'\n    }${after}`;
    });
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('✓ src/data/solutionData.js atualizado com imagens dos planos');
}

async function run() {
  await updateKnowledgeTree();
  await updateI18nData();
  await updateSolutionData();
}

run();
