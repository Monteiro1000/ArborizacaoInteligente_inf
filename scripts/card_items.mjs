import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = path.resolve('public/images/cards');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 21 items to process: 4 plans + 17 tree leaves
const CARD_ITEMS = [
  // 4 PLANOS (SEÇÃO DE SOLUÇÃO)
  {
    id: 'plano-satelite',
    category: 'plan',
    query: 'Sentinel-2 vegetation urban satellite',
    fallbackTitles: [
      'File:Urban Extents from VIIRS and MODIS Using Machine Learning Methods—Neural Network, 2015 Continental U.S. (48975917348).jpg',
      'File:Satellite image of Madagascar in September 2003.jpg'
    ],
    cardName: 'Plano 01: Satélite (Plano Base)',
    expectedView: 'Imagem de satélite / vista orbital multiespectral destacando áreas verdes urbanas e índice de vegetação.',
    searchTerm: 'satellite urban vegetation NDVI earth observation'
  },
  {
    id: 'plano-drones',
    category: 'plan',
    query: 'BLM drone training trees',
    fallbackTitles: [
      'File:BLM drone training above Horning Seed Orchard (35179078385).jpg',
      'File:BLM drone training (34216006294).jpg'
    ],
    cardName: 'Plano 02: Drones (Plano Integrado a Drones)',
    expectedView: 'Drone profissional sobrevoando copas de árvores em área verde com foco no monitoramento aéreo.',
    searchTerm: 'drone flying over urban forest trees aerial canopy'
  },
  {
    id: 'plano-sensores',
    category: 'plan',
    query: 'dendrometers trunk diameter monitored growing season OR weather station sensor tree',
    fallbackTitles: [
      'File:CSIRO ScienceImage 11432 The use of dendrometers allows small changes in trunk diameter to be monitored throughout the growing season.jpg',
      'File:WS-outdoor-west-gallery-40 (32751871504).jpg'
    ],
    cardName: 'Plano 03: Sensores IoT (Plano Sensores IoT)',
    expectedView: 'Sensor ambiental / equipamento de telemetria IoT instalado em tronco para monitoramento de microclima.',
    searchTerm: 'IoT environmental sensor tree trunk microcontroller telemetry'
  },
  {
    id: 'plano-cadastro',
    category: 'plan',
    query: 'Measuring Tree Trunk Circumference During Forest Fieldwork',
    fallbackTitles: [
      'File:Measuring Tree Trunk Circumference During Forest Fieldwork.jpg',
      'File:Apache-Sitgreaves National Forests - Timber Sales - Tree Measuring and Marking (20181206-FS-APACHE-SITGREAVES-LSC-0817).jpg'
    ],
    cardName: 'Plano 04: Cadastro Técnico em Campo (Plano Técnico)',
    expectedView: 'Técnico em campo medindo circunferência ou avaliando dados fitossanitários de árvore (sem pessoas identificáveis).',
    searchTerm: 'arborist inspecting tree trunk field technician urban forestry measurement'
  },

  // 17 FOLHAS DA ÁRVORE DO CONHECIMENTO
  // Galho 1: Benefícios Urbanos
  {
    id: 'folha-qualidade-ar',
    leafId: 'qualidade-ar',
    branchId: 'beneficios',
    query: 'avenue trees sunlight filtering greenery road',
    fallbackTitles: [
      'File:DFC 2054 A quiet narrow neighborhood street lined with trees and parked cars sunlight filtering through the greenery.jpg',
      'File:Tree canopy avenue sunlight.jpg'
    ],
    cardName: 'Folha: Qualidade do Ar & Filtro de Poluentes',
    expectedView: 'Corredor de árvores urbanas filtrando a luz e o ar em uma via pública com folhas viçosas.',
    searchTerm: 'trees filtering urban air sunbeams avenue'
  },
  {
    id: 'folha-saude-mental',
    leafId: 'saude-mental',
    branchId: 'beneficios',
    query: 'park green pathway trees serene nature',
    fallbackTitles: [
      'File:Staw Rów Kalny w Parku Tysiąclecia w Sosnowcu Milowicach.jpg',
      'File:Park Bioróżnorodności - 002.jpg'
    ],
    cardName: 'Folha: Saúde Mental & Bem-Estar',
    expectedView: 'Parque urbano arborizado com caminho tranquilo e sombras de árvores transmitindo paz e contato com a natureza.',
    searchTerm: 'urban park walking peaceful green trees wellbeing'
  },
  {
    id: 'folha-valorizacao-imobiliaria',
    leafId: 'valorizacao-imobiliaria',
    branchId: 'beneficios',
    query: 'Eagle Street, Carrollton, New Orleans, 2 May 2023 - 09.jpg',
    fallbackTitles: [
      'File:Eagle Street, Carrollton, New Orleans, 2 May 2023 - 09.jpg',
      'File:DFC 2054 A quiet narrow neighborhood street lined with trees and parked cars sunlight filtering through the greenery.jpg'
    ],
    cardName: 'Folha: Valorização Imobiliária & Estética Urbana',
    expectedView: 'Rua residencial com casas harmoniosamente integradas a árvores frondosas na calçada.',
    searchTerm: 'green residential street tree lined avenue neighborhood'
  },
  {
    id: 'folha-drenagem-urbana',
    leafId: 'drenagem-urbana',
    branchId: 'beneficios',
    query: 'bioswale rain garden green infrastructure stormwater',
    fallbackTitles: [
      'File:Rain garden with native plants.jpg',
      'File:Bioswale street stormwater.jpg'
    ],
    cardName: 'Folha: Drenagem Urbana & Prevenção de Enchentes',
    expectedView: 'Jardim de chuva (rain garden / biovaleta) com solo permeável e vegetação retendo água de chuva na cidade.',
    searchTerm: 'rain garden bioswale urban drainage trees stormwater'
  },

  // Galho 2: Biodiversidade & Ecologia
  {
    id: 'folha-avifauna',
    leafId: 'avifauna',
    branchId: 'biodiversidade',
    query: 'Bird on a branch urban tree',
    fallbackTitles: [
      'File:Bird on a branch (3410211488).jpg',
      'File:A Beauty Green Bird with Brown Top.jpg'
    ],
    cardName: 'Folha: Aves & Corredores Ecológicos',
    expectedView: 'Pássaro nativo pousado em galho de árvore em ambiente urbano/parque.',
    searchTerm: 'bird perched on tree branch urban wildlife'
  },
  {
    id: 'folha-polinizadores',
    leafId: 'polinizadores',
    branchId: 'biodiversidade',
    query: 'honey bee flower blooming tree',
    fallbackTitles: [
      'File:The Blooming Crimson Bee Balm (217748145).jpeg',
      'File:Bee on flower macro.jpg'
    ],
    cardName: 'Folha: Polinizadores & Insetos Nativos',
    expectedView: 'Abelha polinizadora coletando néctar em flor de árvore / florada urbana.',
    searchTerm: 'bee pollinating flower native tree urban garden'
  },
  {
    id: 'folha-especies-nativas',
    leafId: 'especies-nativas',
    branchId: 'biodiversidade',
    query: 'Handroanthus chrysotrichus OR ipe amarelo',
    fallbackTitles: [
      'File:Handroanthus chrysotrichus (Bignoniaceae) (40431898720).jpg',
      'File:Ipê (Avaré) REFON.jpg'
    ],
    cardName: 'Folha: Espécies Nativas vs Invasoras',
    expectedView: 'Árvore nativa brasileira florida (Ipê Amarelo) em destaque com copa exuberante.',
    searchTerm: 'ipe amarelo flowering native tree urban avenue Brazil'
  },

  // Galho 3: Clima & Cidade
  {
    id: 'folha-ilhas-calor',
    leafId: 'ilhas-calor',
    branchId: 'clima-cidade',
    query: 'tree canopy shaded street asphalt road',
    fallbackTitles: [
      'File:Ukraine, Krym, Yevpatoriya, Yevpatoriya, Yevpatoriia, ulitsa Pushkina - ulitsa Pushkina - vulytsia Pushkina, 3 (Yevpatoriya - Yevpatoriia) WMID6383203.jpg',
      'File:Canopy covered street.jpg'
    ],
    cardName: 'Folha: Ilhas de Calor & Microclima',
    expectedView: 'Contraste térmico evidente com copa densa de árvores sombreando o asfalto e resfriando a rua.',
    searchTerm: 'tree canopy shaded street vs sunny asphalt heat island'
  },
  {
    id: 'folha-sequestro-carbono',
    leafId: 'sequestro-carbono',
    branchId: 'clima-cidade',
    query: 'Sunlight through the trees forest',
    fallbackTitles: [
      'File:Sunlight through the trees 021-1.jpg',
      'File:Lush green tree canopy.jpg'
    ],
    cardName: 'Folha: Sequestro de Carbono & Mitigação',
    expectedView: 'Copa densa de folhas verdes saudáveis com luz solar intensa, simbolizando fotossíntese e captura de CO₂.',
    searchTerm: 'lush tree leaves sunlight carbon sequestration forest'
  },
  {
    id: 'folha-sombreamento',
    leafId: 'sombreamento',
    branchId: 'clima-cidade',
    query: 'tree shade sidewalk pedestrian urban street',
    fallbackTitles: [
      'File:Ukraine, Krym, Yevpatoriya, Yevpatoriya, Yevpatoriia, ulitsa Pushkina - ulitsa Pushkina - vulytsia Pushkina, 3 (Yevpatoriya - Yevpatoriia) WMID6383203.jpg',
      'File:Street with tree shadows.jpg'
    ],
    cardName: 'Folha: Sombreamento & Conforto Térmico do Pedestre',
    expectedView: 'Ampla mancha de sombra fresca projetada por árvores sobre a calçada de pedestres.',
    searchTerm: 'pedestrian tree shade sidewalk urban cooling'
  },

  // Galho 4: Tecnologia & Monitoramento
  {
    id: 'folha-sensores-iot',
    leafId: 'sensores-iot',
    branchId: 'tecnologia',
    query: 'weather station environmental sensor outdoor trunk',
    fallbackTitles: [
      'File:WS-outdoor-west-gallery-40 (32751871504).jpg',
      'File:WS-outdoor-west-gallery-34 (33554144746).jpg'
    ],
    cardName: 'Folha: Sensores IoT & Microclima',
    expectedView: 'Equipamento de telemetria ambiental e sensor climático fixado para medição externa.',
    searchTerm: 'weather station environmental sensor tree IoT'
  },
  {
    id: 'folha-drones-copas',
    leafId: 'drones-copas',
    branchId: 'tecnologia',
    query: 'drone orthomosaic aerial view trees canopy',
    fallbackTitles: [
      'File:BLM drone training (34216006294).jpg',
      'File:Aerial view of forest canopy.jpg'
    ],
    cardName: 'Folha: Drones & Mapeamento Aéreo das Copas',
    expectedView: 'Visão aérea top-down das copas de árvores capturada por drone para inventário florestal.',
    searchTerm: 'aerial drone orthomosaic urban tree canopy top view'
  },
  {
    id: 'folha-satelite-ndvi',
    leafId: 'satelite-ndvi',
    branchId: 'tecnologia',
    query: 'NDVI vegetation index map Landsat',
    fallbackTitles: [
      'File:Urban Extents from VIIRS and MODIS Using Machine Learning Methods—Neural Network, 2015 Continental U.S. (48975917348).jpg',
      'File:NDVI vegetation map.jpg'
    ],
    cardName: 'Folha: Sensoriamento Remoto & Índice NDVI',
    expectedView: 'Mapa ou imagem multiespectral com escala NDVI colorida evidenciando a densidade vegetal da cidade.',
    searchTerm: 'NDVI vegetation index satellite map urban canopy'
  },
  {
    id: 'folha-ia-fitossanitaria',
    leafId: 'ia-fitossanitaria',
    branchId: 'tecnologia',
    query: 'Lichen on tree trunk bark',
    fallbackTitles: [
      'File:Lichen on tree trunk.jpg',
      'File:Moss and lichen on a spruce trunk at Myrstigen trail 1.jpg'
    ],
    cardName: 'Folha: Inteligência Artificial & Saúde Arbórea',
    expectedView: 'Inspeção botânica detalhada de casca de árvore com fungos ou liquens para análise fitossanitária.',
    searchTerm: 'tree trunk bark health diagnosis plant pathology leaf disease'
  },

  // Galho 5: Como Participar
  {
    id: 'folha-ciencia-cidada',
    leafId: 'ciencia-cidada',
    branchId: 'como-participar',
    query: 'Katsura Tree Cercidiphyllum japonicum Guelph Ontario 2017-05-15',
    fallbackTitles: [
      'File:Katsura Tree (Cercidiphyllum japonicum) - Guelph, Ontario 2017-05-15.jpg'
    ],
    cardName: 'Folha: Ciência Cidadã & Mapeamento Coletivo',
    expectedView: 'Registro botânico e identificação colaborativa de árvore para catálogo científico.',
    searchTerm: 'citizen science tree mapping iNaturalist biodiversity observation'
  },
  {
    id: 'folha-plantio-voluntario',
    leafId: 'plantio-voluntario',
    branchId: 'como-participar',
    query: 'Tree Planting 7115691103',
    fallbackTitles: [
      'File:Tree Planting (7115691103).jpg',
      'File:Tree Planting (7115689963).jpg'
    ],
    cardName: 'Folha: Plantio Voluntário & Mutirões',
    expectedView: 'Mãos no solo fértil plantando e cuidando de uma muda jovem de árvore em ação comunitária.',
    searchTerm: 'hands planting young tree sapling soil volunteer community'
  },
  {
    id: 'folha-denuncia-poda',
    leafId: 'denuncia-poda',
    branchId: 'como-participar',
    query: 'tree trimming pruning street urban arborist',
    fallbackTitles: [
      'File:2008-04-21 Tree trimming on Gregson St 2.jpg',
      'File:Tree pruning arborist work.jpg'
    ],
    cardName: 'Folha: Fiscalização & Denúncias Ambientais',
    expectedView: 'Corte e poda técnica de galhos de árvore urbana para evitar danos e podas drásticas irregulares.',
    searchTerm: 'tree pruning branch management urban arborist work'
  }
];

export { CARD_ITEMS };
