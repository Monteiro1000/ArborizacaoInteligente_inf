/**
 * Dados da Árvore do Conhecimento (Knowledge Tree)
 * Estrutura: Galhos -> Folhas
 * Suporta PT, EN e ES
 */

export const KNOWLEDGE_TREE_GEOMETRY = {
  trunk: {
    baseX: 480,
    baseY: 660,
    topX: 480,
    topY: 340,
    labelX: 480,
    labelY: 530,
    path: 'M 480 660 C 480 560 480 440 480 340',
    rootsPath: 'M 420 660 C 440 645 460 655 480 660 C 500 655 520 645 540 660 M 450 660 L 400 685 M 510 660 L 560 685 M 480 660 L 480 690'
  },
  branches: [
    {
      id: 'beneficios',
      side: 'left',
      branchPath: 'M 480 470 C 400 470 320 490 200 500',
      subBranch1: 'M 350 480 C 290 440 240 430 180 435',
      subBranch2: 'M 280 488 C 240 530 200 550 150 560',
      labelX: 200,
      labelY: 480,
      badgeX: 215,
      badgeY: 485,
      leaves: [
        { id: 'conforto-termico', cx: 135, cy: 435, icon: 'sun' },
        { id: 'qualidade-ar', cx: 110, cy: 505, icon: 'wind' },
        { id: 'saude-bem-estar', cx: 180, cy: 565, icon: 'heart' },
        { id: 'drenagem-solo', cx: 260, cy: 550, icon: 'drop' }
      ]
    },
    {
      id: 'biodiversidade',
      side: 'left',
      branchPath: 'M 480 390 C 390 380 300 320 190 250',
      subBranch1: 'M 340 345 C 270 290 220 230 160 190',
      subBranch2: 'M 260 295 C 220 310 180 320 140 310',
      labelX: 210,
      labelY: 230,
      badgeX: 210,
      badgeY: 235,
      leaves: [
        { id: 'nativas-exoticas', cx: 145, cy: 180, icon: 'plant' },
        { id: 'refugio-fauna', cx: 115, cy: 260, icon: 'bird' },
        { id: 'porte-calcadas', cx: 190, cy: 330, icon: 'ruler' }
      ]
    },
    {
      id: 'clima-cidade',
      side: 'top',
      branchPath: 'M 480 340 C 480 250 480 180 480 110',
      subBranch1: 'M 480 230 C 430 180 390 140 350 110',
      subBranch2: 'M 480 230 C 530 180 570 140 610 110',
      labelX: 480,
      labelY: 35,
      badgeX: 480,
      badgeY: 35,
      leaves: [
        { id: 'ilhas-calor', cx: 330, cy: 105, icon: 'thermometer' },
        { id: 'desafio-sergipe', cx: 480, cy: 95, icon: 'warning' },
        { id: 'chuvas-umidade', cx: 630, cy: 105, icon: 'cloud-rain' }
      ]
    },
    {
      id: 'tecnologia',
      side: 'right',
      branchPath: 'M 480 390 C 570 380 660 320 770 250',
      subBranch1: 'M 620 345 C 690 290 740 230 800 190',
      subBranch2: 'M 700 295 C 740 310 780 320 820 310',
      labelX: 750,
      labelY: 230,
      badgeX: 750,
      badgeY: 235,
      leaves: [
        { id: 'visao-satelite', cx: 815, cy: 180, icon: 'satellite' },
        { id: 'drones-ia', cx: 845, cy: 260, icon: 'drone' },
        { id: 'sensores-iot', cx: 770, cy: 330, icon: 'cpu' },
        { id: 'cadastro-tecnico', cx: 695, cy: 375, icon: 'clipboard' }
      ]
    },
    {
      id: 'como-participar',
      side: 'right',
      branchPath: 'M 480 470 C 560 470 640 490 760 500',
      subBranch1: 'M 610 480 C 670 440 720 430 780 435',
      subBranch2: 'M 680 488 C 720 530 760 550 810 560',
      labelX: 760,
      labelY: 480,
      badgeX: 745,
      badgeY: 485,
      leaves: [
        { id: 'cidadao-bairros', cx: 825, cy: 435, icon: 'users' },
        { id: 'escolas-educacao', cx: 850, cy: 505, icon: 'book' },
        { id: 'poder-publico', cx: 780, cy: 565, icon: 'building' }
      ]
    }
  ]
};

export const BRANCH_ZOOM_VIEWBOX = {
  all: [0, 0, 960, 700],
  beneficios: [20, 340, 480, 340],
  biodiversidade: [20, 95, 480, 340],
  'clima-cidade': [240, 10, 480, 340],
  tecnologia: [460, 95, 480, 340],
  'como-participar': [460, 340, 480, 340]
};

export const KNOWLEDGE_TREE_DATA = {
  pt: {
    sectionTitle: 'Árvore do Conhecimento: Arborização Urbana',
    sectionSubtitle:
      'Navegue pelos galhos e folhas para descobrir como a infraestrutura verde transforma o clima, a biodiversidade e a qualidade de vida das nossas cidades.',
    trunkTitle: 'Arborização Urbana',
    trunkSubtitle: 'Infraestrutura Verde Vital',
    progressTitle: 'Progresso da sua exploração',
    progressExplored: 'Você explorou',
    progressOf: 'de',
    progressLeaves: 'folhas',
    progressPercent: 'concluído',
    progressCompleteMsg: 'Parabéns! Você descobriu todo o conhecimento da floresta urbana.',
    restartBtn: 'Recomeçar',
    restartAria: 'Zerar o progresso de exploração da árvore',
    hintText: 'Clique em um galho para destacá-lo ou selecione uma folha para ler seus dados.',
    zoomFullTreeBtn: 'Ver Árvore Completa',
    mobileHintTapBranch: 'Toque em um galho ou filtro para aproximar',
    mobileZoomingIn: 'Galho em foco:',
    closeModalAria: 'Fechar detalhes da folha',
    prevLeafBtn: 'Anterior',
    nextLeafBtn: 'Próxima',
    leafExploredBadge: 'Explorada',
    leafNewBadge: 'Nova',
    curiosityBadge: 'Dado em Destaque',
    sourceLabel: 'Fonte Oficial:',
    todoTag: 'TODO: validar fonte',
    branchSelectorAll: 'Todos os galhos',
    branches: [
      {
        id: 'beneficios',
        name: 'Benefícios',
        shortDesc: 'Sombra, qualidade do ar, conforto térmico e saúde coletiva.',
        leaves: [
          {
            id: 'conforto-termico',
            title: 'Conforto Térmico Urbano',
            text: 'As copas das árvores amenizam a sensação térmica através do sombreamento direto do asfalto e da evapotranspiração, que resfria naturalmente o microclima ao redor.',
            curiosity: 'Redução comprovada de 2°C a 5°C na temperatura dos microclimas urbanos arborizados.',
            sourceLabel: 'Embrapa Florestas',
            sourceUrl: 'https://www.embrapa.br/florestas'
          ,
            image: {
              src: 'images/cards/folha-conforto-termico.webp',
              alt: 'Sombreamento natural projetado por copas frondosas sobre via urbana amenizando o microclima'
            }},
          {
            id: 'qualidade-ar',
            title: 'Qualidade do Ar Respirável',
            text: 'A superfície foliar atua como biofiltro eficiente, retendo material particulado nocivo emitido por veículos e absorvendo gases como dióxido de enxofre e óxidos de nitrogênio.',
            curiosity: 'Árvores adultas e saudáveis chegam a reter toneladas de particulados suspensos por quilômetro quadrado a cada ano.',
            sourceLabel: 'OMS (Organização Mundial da Saúde)',
            sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health',
            image: {
              src: 'images/cards/folha-qualidade-ar.webp',
              alt: 'Avenida arborizada com árvores filtrando material particulado e purificando o ar urbano'
            }
          },
          {
            id: 'saude-bem-estar',
            title: 'Saúde Mental e Bem-Estar',
            text: 'O contato visual diário com áreas arborizadas reduz comprovadamente os índices de estresse, ansiedade e frequência cardíaca, estimulando a convivência comunitária.',
            curiosity: 'Estudos apontam redução de até 30% em biomarcadores de estresse para pedestres que caminham em vias com vegetação densa.',
            sourceLabel: 'ONU-Habitat (Cidades Sustentáveis)',
            sourceUrl: 'https://brasil.un.org/pt-br/sdgs/11'
          ,
            image: {
              src: 'images/cards/folha-saude-bem-estar.webp',
              alt: 'Caminho sereno em parque urbano arborizado proporcionando tranquilidade e contato com a natureza'
            }},
          {
            id: 'drenagem-solo',
            title: 'Drenagem e Solo Permeável',
            text: 'As raízes estruturam o subsolo, criando macroporos que elevam a absorção hídrica pluvial e retardam o escoamento rápido que causa alagamentos e erosões.',
            curiosity: 'Solos com cobertura arbórea aumentam em até 4 vezes a velocidade de infiltração da água da chuva em comparação a solos compactados.',
            sourceLabel: 'ANA (Agência Nacional de Águas)',
            sourceUrl: 'https://www.gov.br/ana/pt-br'
          ,
            image: {
              src: 'images/cards/folha-drenagem-solo.webp',
              alt: 'Canteiro de chuva e solo permeável com vegetação absorvendo água pluvial e prevenindo alagamentos'
            }}
        ]
      },
      {
        id: 'biodiversidade',
        name: 'Espécies e Biodiversidade',
        shortDesc: 'Nativas versus exóticas, fauna urbana e compatibilidade.',
        leaves: [
          {
            id: 'nativas-exoticas',
            title: 'Espécies Nativas x Exóticas',
            text: 'Dar prioridade a árvores nativas preserva os biomas regionais, reduz riscos fitossanitários e impede a proliferação agressiva de plantas invasoras que desequilibram o ecossistema.',
            curiosity: 'Plantas exóticas invasoras competem por água e nutrientes e muitas vezes danificam estruturas urbanas por falta de raízes adequadas ao solo local.',
            sourceLabel: 'ICMBio / Instituto Hórus',
            sourceUrl: 'https://www.gov.br/icmbio/pt-br'
          ,
            image: {
              src: 'images/cards/folha-nativas-exoticas.webp',
              alt: 'Florada dourada de Ipê Amarelo destacando a beleza e a resiliência das espécies nativas'
            }},
          {
            id: 'refugio-fauna',
            title: 'Refúgio para a Fauna Urbana',
            text: 'Árvores proporcionam pouso, nidificação e alimentação indispensáveis para pássaros, abelhas nativas polinizadoras e pequenos animais em plena malha urbana.',
            curiosity: 'Corredores verdes contínuos aumentam em mais de 60% o trânsito seguro de pássaros nativos entre parques urbanos e áreas rurais.',
            sourceLabel: 'Flora do Brasil 2020',
            sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
          ,
            image: {
              src: 'images/cards/folha-refugio-fauna.webp',
              alt: 'Pássaro pousado em galho de árvore urbana demonstrando a importância do refúgio para a fauna'
            }},
          {
            id: 'porte-calcadas',
            title: 'Porte e Compatibilidade',
            text: 'O planejamento silvícola urbano exige adequar a altura da copa e o formato radicular à largura das calçadas, tubulações subterrâneas e fiação elétrica.',
            curiosity: 'A escolha da espécie correta para cada largura de calçada evita podas drásticas e impede quebras mecânicas em tempestades.',
            sourceLabel: 'Ministério do Meio Ambiente (MMA)',
            sourceUrl: 'https://www.gov.br/mma/pt-br'
          ,
            image: {
              src: 'images/cards/folha-porte-calcadas.webp',
              alt: 'Poda técnica e manejo cuidadoso de árvore urbana compatibilizando copas com calçadas e redes'
            }}
        ]
      },
      {
        id: 'clima-cidade',
        name: 'Clima e Cidade',
        shortDesc: 'Ilhas de calor, regulação pluviométrica e o desafio em Sergipe.',
        leaves: [
          {
            id: 'ilhas-calor',
            title: 'Combate às Ilhas de Calor',
            text: 'Superfícies de asfalto e concreto retêm calor excessivo ao longo do dia. O dossel vegetal cria quebras térmicas estratégicas que esfriam quarteirões inteiros.',
            curiosity: 'Bairros sem arborização chegam a registrar até 8°C a mais de temperatura no solo quando comparados a ruas arborizadas vizinhas.',
            sourceLabel: 'INPE / Sensoriamento Remoto',
            sourceUrl: 'https://earthobservatory.nasa.gov/'
          ,
            image: {
              src: 'images/cards/folha-ilhas-calor.webp',
              alt: 'Túnel verde de árvores gerando sombra densa e quebra térmica contra o calor do asfalto'
            }},
          {
            id: 'desafio-sergipe',
            title: 'O Desafio Crítico em Sergipe',
            text: 'Segundo os dados do Censo do IBGE (2022), Sergipe registra o menor índice de vias públicas arborizadas de todo o Brasil, agravando o calor e a vulnerabilidade ambiental.',
            curiosity: 'TODO: validar fonte — Menor taxa de arborização no entorno de domicílios do país conforme Censo Demográfico 2022 do IBGE.',
            sourceLabel: 'Censo Demográfico IBGE 2022 (TODO: validar fonte)',
            sourceUrl: 'https://censo2022.ibge.gov.br/',
            isTodo: true,
            image: {
              src: 'images/cards/folha-desafio-sergipe.webp',
              alt: 'Rua residencial arborizada exemplificando a necessidade de expansão da cobertura arbórea urbana'
            }
          },
          {
            id: 'chuvas-umidade',
            title: 'Regulação de Chuvas e Umidade',
            text: 'A vegetação urbana atua como um pulmão umedecedor constante, alimentando a umidade relativa do ar através da transpiração contínua das árvores.',
            curiosity: 'Uma árvore de grande porte pode bombear diariamente centenas de litros de água do solo para a atmosfera em forma de vapor limpo.',
            sourceLabel: 'Embrapa Solos',
            sourceUrl: 'https://www.embrapa.br/solos'
          ,
            image: {
              src: 'images/cards/folha-chuvas-umidade.webp',
              alt: 'Luz solar transpassando copas verdes densas durante o ciclo contínuo de evapotranspiração'
            }}
        ]
      },
      {
        id: 'tecnologia',
        name: 'Tecnologia e Monitoramento',
        shortDesc: 'Satélites, drones, sensores IoT e cadastramento fitossanitário.',
        leaves: [
          {
            id: 'visao-satelite',
            title: 'Sensoriamento Remoto Orbital',
            text: 'Imagens multiespectrais captadas por satélite geram índices como o NDVI, mapeando com precisão a densidade da copa e identificando vazios verdes em toda a cidade.',
            curiosity: 'Permite monitorar a evolução histórica da cobertura vegetal de municípios inteiros sem depender exclusivamente de vistorias manuais.',
            sourceLabel: 'INPE / Sensoriamento Remoto',
            sourceUrl: 'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
          ,
            image: {
              src: 'images/cards/folha-visao-satelite.webp',
              alt: 'Mapeamento orbital multiespectral com índice de vegetação NDVI realçando áreas verdes urbanas'
            }},
          {
            id: 'drones-ia',
            title: 'Drones e Visão Computacional',
            text: 'Voos automatizados realizam inspeções de alta definição nas copas, alimentando modelos de IA para detecção precoce de pragas, galhos secos e risco de queda.',
            curiosity: 'Gera modelos tridimensionais (ortomosaicos) para avaliar a volumetria e a saúde fitossanitária de cada indivíduo arbóreo.',
            sourceLabel: 'MCTI / Inovação Tecnológica',
            sourceUrl: 'https://www.gov.br/mcti/pt-br'
          ,
            image: {
              src: 'images/cards/folha-drones-ia.webp',
              alt: 'Voo de drone aéreo captando detalhes de copas e gerando ortomosaicos para inteligência artificial'
            }},
          {
            id: 'sensores-iot',
            title: 'Telemetria IoT em Tempo Real',
            text: 'Microcontroladores acoplados às árvores monitoram temperatura, umidade do ar e umidade do solo 24 horas por dia, disparando alertas de estresse vegetal.',
            curiosity: 'Sensores com hardware dedicado (ESP32) transmitem telemetria contínua com baixo consumo e conectividade de longo alcance.',
            sourceLabel: 'Espressif Systems IoT',
            sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
          ,
            image: {
              src: 'images/cards/folha-sensores-iot.webp',
              alt: 'Estação de telemetria ambiental e sensor acoplado para monitoramento microclimático 24 horas'
            }},
          {
            id: 'cadastro-tecnico',
            title: 'Inventário Digital Fitossanitário',
            text: 'Ferramenta georreferenciada para prefeituras e pesquisadores cadastrarem o histórico completo de podas, adubações e manutenções de cada espécime.',
            curiosity: 'Substitui papéis por relatórios digitais integrados com histórico fitossanitário e alertas para equipes de poda técnica.',
            sourceLabel: 'IBGE Cidades',
            sourceUrl: 'https://cidades.ibge.gov.br/'
          ,
            image: {
              src: 'images/cards/folha-cadastro-tecnico.webp',
              alt: 'Inspeção detalhada de casca e tronco de árvore para diagnóstico fitossanitário digital'
            }}
        ]
      },
      {
        id: 'como-participar',
        name: 'Como Participar',
        shortDesc: 'Cidadãos, escolas, universidades e o papel do poder público.',
        leaves: [
          {
            id: 'cidadao-bairros',
            title: 'Ação Cidadã e Comunitária',
            text: 'Moradores podem proteger calçadas vivas, cuidar de mudas recém-plantadas, evitar concretar a base dos troncos e comunicar riscos às autoridades ambientais.',
            curiosity: 'Deixar canteiros permeáveis ao redor das árvores garante água e oxigênio para as raízes e evita rachaduras nas calçadas.',
            sourceLabel: 'Sociedade Brasileira de Arborização Urbana (SBAU)',
            sourceUrl: 'https://sbau.org.br/'
          ,
            image: {
              src: 'images/cards/folha-cidadao-bairros.webp',
              alt: 'Mãos de moradores e voluntários plantando muda de árvore na terra durante ação comunitária'
            }},
          {
            id: 'escolas-educacao',
            title: 'Educação e Ciência Cidadã',
            text: 'Escolas e universidades podem usar as árvores da vizinhança como laboratórios vivos para aulas de botânica, clima, conscientização ecológica e projetos comunitários.',
            curiosity: 'Atividades práticas de plantio geram vínculos de pertencimento e reduzem significativamente o vandalismo contra mudas urbanas.',
            sourceLabel: 'MEC / Educação Ambiental',
            sourceUrl: 'https://www.gov.br/mec/pt-br'
          ,
            image: {
              src: 'images/cards/folha-escolas-educacao.webp',
              alt: 'Identificação botânica e estudo de árvore em atividade prática de ciência cidadã e educação ambiental'
            }},
          {
            id: 'poder-publico',
            title: 'Gestão Pública e Planejamento',
            text: 'Prefeituras e secretarias precisam de leis técnicas de arborização, viveiros municipais de espécies nativas e planos diretores verdes de longo prazo.',
            curiosity: 'Cidades que legislam sobre diretrizes arborizadas reduzem gastos em saúde pública relacionados a doenças respiratórias e hipertermia.',
            sourceLabel: 'Ministério do Meio Ambiente (MMA)',
            sourceUrl: 'https://www.gov.br/mma/pt-br'
          ,
            image: {
              src: 'images/cards/folha-poder-publico.webp',
              alt: 'Florada urbana com polinizador simbolizando a integração de áreas verdes no planejamento municipal'
            }}
        ]
      }
    ]
  },
  en: {
    sectionTitle: 'Knowledge Tree: Urban Forestry',
    sectionSubtitle:
      'Navigate through the branches and leaves to discover how green infrastructure transforms climate, biodiversity, and urban quality of life.',
    trunkTitle: 'Urban Forestry',
    trunkSubtitle: 'Vital Green Infrastructure',
    progressTitle: 'Your exploration progress',
    progressExplored: 'You explored',
    progressOf: 'of',
    progressLeaves: 'leaves',
    progressPercent: 'completed',
    progressCompleteMsg: 'Congratulations! You unlocked all the knowledge of the urban forest.',
    restartBtn: 'Start Over',
    restartAria: 'Reset tree exploration progress',
    hintText: 'Click on a branch to highlight it or select a leaf to read its insights.',
    zoomFullTreeBtn: 'View Full Tree',
    mobileHintTapBranch: 'Tap a branch or filter to zoom in',
    mobileZoomingIn: 'Focused branch:',
    closeModalAria: 'Close leaf details',
    prevLeafBtn: 'Previous',
    nextLeafBtn: 'Next',
    leafExploredBadge: 'Explored',
    leafNewBadge: 'New',
    curiosityBadge: 'Featured Fact',
    sourceLabel: 'Official Source:',
    todoTag: 'TODO: validate source',
    branchSelectorAll: 'All branches',
    branches: [
      {
        id: 'beneficios',
        name: 'Benefits',
        shortDesc: 'Shade, clean air, thermal comfort, and public health.',
        leaves: [
          {
            id: 'conforto-termico',
            title: 'Urban Thermal Comfort',
            text: 'Tree canopies mitigate extreme heat through direct shade and evapotranspiration, naturally cooling the surrounding street microclimate.',
            curiosity: 'Proven 2°C to 5°C reduction in ambient temperature across tree-lined urban corridors.',
            sourceLabel: 'Embrapa Forestry',
            sourceUrl: 'https://www.embrapa.br/florestas'
          ,
            image: {
              src: 'images/cards/folha-conforto-termico.webp',
              alt: 'Natural tree canopy shade cast over urban street cooling the microclimate'
            }},
          {
            id: 'qualidade-ar',
            title: 'Breathable Air Quality',
            text: 'Leaf surfaces act as natural biofilters, capturing harmful airborne particulate matter from traffic and absorbing pollutant gases.',
            curiosity: 'Mature urban trees capture tons of particulate matter per square kilometer every year.',
            sourceLabel: 'WHO (World Health Organization)',
            sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health'
          ,
            image: {
              src: 'images/cards/folha-qualidade-ar.webp',
              alt: 'Tree-lined avenue with trees filtering particulate matter and purifying urban air'
            }},
          {
            id: 'saude-bem-estar',
            title: 'Mental Health & Well-Being',
            text: 'Daily visual connection with leafy landscapes reduces stress, lower heart rates, and boosts social cohesion and physical activity.',
            curiosity: 'Pedestrians walking down leafy avenues experience up to 30% lower cortisol and anxiety biomarkers.',
            sourceLabel: 'UN-Habitat (Sustainable Cities)',
            sourceUrl: 'https://brasil.un.org/pt-br/sdgs/11'
          ,
            image: {
              src: 'images/cards/folha-saude-bem-estar.webp',
              alt: 'Serene walkway in urban park providing tranquility and connection with nature'
            }},
          {
            id: 'drenagem-solo',
            title: 'Drainage & Soil Health',
            text: 'Root networks open macro-pores in urban soil, maximizing storm infiltration and preventing flash floods and street erosion.',
            curiosity: 'Tree-covered soils increase rainwater infiltration rates up to 4 times compared to compacted dirt or bare asphalt.',
            sourceLabel: 'ANA (National Water Agency)',
            sourceUrl: 'https://www.gov.br/ana/pt-br'
          ,
            image: {
              src: 'images/cards/folha-drenagem-solo.webp',
              alt: 'Rain garden and permeable soil with vegetation absorbing stormwater and preventing floods'
            }}
        ]
      },
      {
        id: 'biodiversidade',
        name: 'Species & Biodiversity',
        shortDesc: 'Native versus exotic species, urban wildlife, and compatibility.',
        leaves: [
          {
            id: 'nativas-exoticas',
            title: 'Native vs. Invasive Species',
            text: 'Prioritizing native flora preserves regional biomes, minimizes pest risks, and prevents aggressive invasive trees from harming local ecology.',
            curiosity: 'Invasive species disrupt local food webs and often damage sidewalks due to root types ill-suited for local ground conditions.',
            sourceLabel: 'ICMBio / Hórus Institute',
            sourceUrl: 'https://www.gov.br/icmbio/pt-br'
          ,
            image: {
              src: 'images/cards/folha-nativas-exoticas.webp',
              alt: 'Golden blooming of native Yellow Ipe highlighting the beauty and resilience of native flora'
            }},
          {
            id: 'refugio-fauna',
            title: 'Refuge for Urban Wildlife',
            text: 'Urban canopies provide critical nesting, feeding, and resting grounds for birds, native bees, and pollinators within city limits.',
            curiosity: 'Green corridors boost safe native bird transit between parks and rural reserves by over 60%.',
            sourceLabel: 'Flora do Brasil 2020',
            sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
          ,
            image: {
              src: 'images/cards/folha-refugio-fauna.webp',
              alt: 'Bird perched on urban tree branch demonstrating the essential shelter for urban fauna'
            }},
          {
            id: 'porte-calcadas',
            title: 'Tree Scale & Street Compatibility',
            text: 'Urban forestry requires sizing canopy height and root depth to match street widths, subterranean utilities, and power lines.',
            curiosity: 'Strategic species selection prevents over 90% of structural conflicts with sidewalk paving and electrical wires.',
            sourceLabel: 'Ministry of Environment (MMA)',
            sourceUrl: 'https://www.gov.br/mma/pt-br'
          ,
            image: {
              src: 'images/cards/folha-porte-calcadas.webp',
              alt: 'Technical pruning and careful tree management balancing canopies with sidewalks and utility lines'
            }}
        ]
      },
      {
        id: 'clima-cidade',
        name: 'Climate & The City',
        shortDesc: 'Urban heat islands, rainfall balance, and the challenge in Sergipe.',
        leaves: [
          {
            id: 'ilhas-calor',
            title: 'Tackling Urban Heat Islands',
            text: 'Asphalt and concrete absorb and radiate solar energy all day. Continuous tree cover interrupts heat buildup and cools entire blocks.',
            curiosity: 'Canopy-deprived neighborhoods can be up to 8°C hotter at ground level than adjacent tree-lined streets.',
            sourceLabel: 'INPE / Remote Sensing',
            sourceUrl: 'https://earthobservatory.nasa.gov/'
          ,
            image: {
              src: 'images/cards/folha-ilhas-calor.webp',
              alt: 'Green tree tunnel providing dense shade and thermal break against asphalt heat'
            }},
          {
            id: 'desafio-sergipe',
            title: 'The Critical Challenge in Sergipe',
            text: 'According to official Brazilian Census data (IBGE 2022), Sergipe has the lowest rate of tree-lined urban streets in Brazil, heightening urban heat vulnerability.',
            curiosity: 'TODO: validar fonte — Lowest street-tree coverage per household in Brazil based on IBGE 2022 Demographic Census.',
            sourceLabel: 'IBGE 2022 Demographic Census (TODO: validar fonte)',
            sourceUrl: 'https://censo2022.ibge.gov.br/',
            isTodo: true,
            image: {
              src: 'images/cards/folha-desafio-sergipe.webp',
              alt: 'Tree-lined residential street exemplifying the need to expand urban canopy cover'
            }
          },
          {
            id: 'chuvas-umidade',
            title: 'Rainfall & Humidity Regulation',
            text: 'Urban trees act as living humidifiers, pumping moisture back into the atmosphere and easing dryness during drought spells.',
            curiosity: 'A mature tree can cycle hundreds of liters of water daily from soil into clean atmospheric vapor.',
            sourceLabel: 'Embrapa Soils',
            sourceUrl: 'https://www.embrapa.br/solos'
          ,
            image: {
              src: 'images/cards/folha-chuvas-umidade.webp',
              alt: 'Sunlight piercing through dense green leaves during continuous evapotranspiration cycle'
            }}
        ]
      },
      {
        id: 'tecnologia',
        name: 'Technology & Monitoring',
        shortDesc: 'Satellites, aerial drones, IoT telemetry, and digital registries.',
        leaves: [
          {
            id: 'visao-satelite',
            title: 'Orbital Remote Sensing',
            text: 'Multispectral satellite imagery calculates NDVI vegetative indices to quantify canopy density and detect vegetative deficits across the city.',
            curiosity: 'Enables continuous historical monitoring of municipal green coverage without relying solely on manual field surveys.',
            sourceLabel: 'INPE / Remote Sensing',
            sourceUrl: 'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
          ,
            image: {
              src: 'images/cards/folha-visao-satelite.webp',
              alt: 'Multispectral orbital mapping with NDVI vegetation index highlighting urban green spaces'
            }},
          {
            id: 'drones-ia',
            title: 'Drones & Computer Vision',
            text: 'Automated flights capture high-res aerial views, feeding AI models that detect canopy pests, dead branches, and premature fall hazards.',
            curiosity: 'Builds georeferenced 3D orthomosaic models to assess volume and phytosanitary vitality per tree specimen.',
            sourceLabel: 'MCTI / Technological Innovation',
            sourceUrl: 'https://www.gov.br/mcti/pt-br'
          ,
            image: {
              src: 'images/cards/folha-drones-ia.webp',
              alt: 'Aerial drone flight capturing canopy details and generating orthomosaics for artificial intelligence'
            }},
          {
            id: 'sensores-iot',
            title: '24/7 Real-Time IoT Telemetry',
            text: 'Dedicated microcontrollers record soil moisture, ambient temperature, and plant stress around the clock, triggering early warnings.',
            curiosity: 'ESP32 devices deliver continuous telemetry with ultra-low power consumption and long-range connectivity.',
            sourceLabel: 'Espressif Systems IoT',
            sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
          ,
            image: {
              src: 'images/cards/folha-sensores-iot.webp',
              alt: 'Environmental telemetry station and sensor unit for 24/7 microclimate monitoring'
            }},
          {
            id: 'cadastro-tecnico',
            title: 'Phytosanitary Digital Inventory',
            text: 'Georeferenced management tool for city halls to track pruning schedules, fertilizer history, and health logs for every tree.',
            curiosity: 'Replaces paper clipboards with cloud-based dashboards accessible to public works and environmental crews.',
            sourceLabel: 'IBGE Cities',
            sourceUrl: 'https://cidades.ibge.gov.br/'
          ,
            image: {
              src: 'images/cards/folha-cadastro-tecnico.webp',
              alt: 'Detailed inspection of tree bark and trunk for digital phytosanitary diagnostics'
            }}
        ]
      },
      {
        id: 'como-participar',
        name: 'How to Get Involved',
        shortDesc: 'Citizens, schools, universities, and municipal leadership.',
        leaves: [
          {
            id: 'cidadao-bairros',
            title: 'Citizen & Community Action',
            text: 'Residents can adopt sidewalk saplings, ensure unpaved planting beds, and report improper pruning to local environmental agencies.',
            curiosity: 'Keeping permeable soil basins around sidewalk trees delivers water to roots and prevents sidewalk pavement buckling.',
            sourceLabel: 'Brazilian Society of Urban Forestry (SBAU)',
            sourceUrl: 'https://sbau.org.br/'
          ,
            image: {
              src: 'images/cards/folha-cidadao-bairros.webp',
              alt: 'Hands of residents and volunteers planting a tree sapling in soil during community action'
            }},
          {
            id: 'escolas-educacao',
            title: 'Education & Citizen Science',
            text: 'Schools and universities can turn neighborhood trees into living labs for botany, climate study, and environmental stewardship.',
            curiosity: 'Hands-on student planting days build civic pride and dramatically reduce vandalism against young trees.',
            sourceLabel: 'Ministry of Education (MEC)',
            sourceUrl: 'https://www.gov.br/mec/pt-br'
          ,
            image: {
              src: 'images/cards/folha-escolas-educacao.webp',
              alt: 'Botanical identification and tree study during citizen science and environmental education fieldwork'
            }},
          {
            id: 'poder-publico',
            title: 'Public Policy & Urban Masterplans',
            text: 'Municipalities need sound forestry guidelines, native seedling nurseries, and long-term climate adaptation blueprints.',
            curiosity: 'Cities with structured forestry laws see lower public healthcare costs related to heatstroke and respiratory disease.',
            sourceLabel: 'Ministry of Environment (MMA)',
            sourceUrl: 'https://www.gov.br/mma/pt-br'
          ,
            image: {
              src: 'images/cards/folha-poder-publico.webp',
              alt: 'Urban tree blossom with pollinator symbolizing green space integration in city master plans'
            }}
        ]
      }
    ]
  },
  es: {
    sectionTitle: 'Árbol del Conocimiento: Arborización Urbana',
    sectionSubtitle:
      'Navega por las ramas y hojas para descubrir cómo la infraestructura verde transforma el clima, la biodiversidad y la calidad de vida de nuestras ciudades.',
    trunkTitle: 'Arborización Urbana',
    trunkSubtitle: 'Infraestructura Verde Vital',
    progressTitle: 'Progreso de tu exploración',
    progressExplored: 'Has explorado',
    progressOf: 'de',
    progressLeaves: 'hojas',
    progressPercent: 'completado',
    progressCompleteMsg: '¡Felicitaciones! Has descubierto todo el conocimiento del bosque urbano.',
    restartBtn: 'Reiniciar',
    restartAria: 'Restablecer progreso de exploración del árbol',
    hintText: 'Haz clic en una rama para resaltarla o selecciona una hoja para leer sus datos.',
    zoomFullTreeBtn: 'Ver Árbol Completo',
    mobileHintTapBranch: 'Toca una rama o filtro para hacer zoom',
    mobileZoomingIn: 'Rama enfocada:',
    closeModalAria: 'Cerrar detalles de la hoja',
    prevLeafBtn: 'Anterior',
    nextLeafBtn: 'Siguiente',
    leafExploredBadge: 'Explorada',
    leafNewBadge: 'Nueva',
    curiosityBadge: 'Dato Destacado',
    sourceLabel: 'Fuente Oficial:',
    todoTag: 'TODO: validar fonte',
    branchSelectorAll: 'Todas las ramas',
    branches: [
      {
        id: 'beneficios',
        name: 'Beneficios',
        shortDesc: 'Sombra, calidad del aire, confort térmico y salud colectiva.',
        leaves: [
          {
            id: 'conforto-termico',
            title: 'Confort Térmico Urbano',
            text: 'Las copas arbóreas mitigan el calor extremo mediante sombra directa y evapotranspiración, enfriando de forma natural el microclima circundante.',
            curiosity: 'Reducción comprobada de 2°C a 5°C en la temperatura ambiente de calles y avenidas arboladas.',
            sourceLabel: 'Embrapa Florestas',
            sourceUrl: 'https://www.embrapa.br/florestas'
          ,
            image: {
              src: 'images/cards/folha-conforto-termico.webp',
              alt: 'Sombra natural proyectada por copas frondosas sobre calle urbana refrescando el microclima'
            }},
          {
            id: 'qualidade-ar',
            title: 'Calidad del Aire Respirable',
            text: 'Las hojas funcionan como biofiltros naturales eficaces, reteniendo material particulado tóxico del tráfico y absorbiendo gases contaminantes.',
            curiosity: 'Árboles maduros retienen toneladas de partículas suspendidas por kilómetro cuadrado anualmente.',
            sourceLabel: 'OMS (Organización Mundial de la Salud)',
            sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health'
          ,
            image: {
              src: 'images/cards/folha-qualidade-ar.webp',
              alt: 'Avenida arbolada con árboles filtrando material particulado y purificando el aire urbano'
            }},
          {
            id: 'saude-bem-estar',
            title: 'Salud Mental y Bienestar',
            text: 'El contacto visual cotidiano con áreas verdes reduce el estrés y la presión arterial, fomentando la convivencia comunitaria.',
            curiosity: 'Caminar por calles con arbolado denso disminuye hasta un 30% los biomarcadores de cortisol y ansiedad.',
            sourceLabel: 'ONU-Hábitat (Ciudades Sostenibles)',
            sourceUrl: 'https://brasil.un.org/pt-br/sdgs/11'
          ,
            image: {
              src: 'images/cards/folha-saude-bem-estar.webp',
              alt: 'Sendero sereno en parque urbano arbolado proporcionando tranquilidad y conexión con la naturaleza'
            }},
          {
            id: 'drenagem-solo',
            title: 'Drenaje y Suelo Permeable',
            text: 'Los sistemas radiculares estructuran el subsuelo abriendo macroporos que elevan la infiltración pluvial y evitan inundaciones repentinas.',
            curiosity: 'Suelos con cobertura arbórea aumentan hasta 4 veces la velocidad de infiltración de lluvias frente a suelos compactados.',
            sourceLabel: 'ANA (Agencia Nacional de Aguas)',
            sourceUrl: 'https://www.gov.br/ana/pt-br'
          ,
            image: {
              src: 'images/cards/folha-drenagem-solo.webp',
              alt: 'Jardín de lluvia y suelo permeable con vegetación absorbiendo agua pluvial y previniendo inundaciones'
            }}
        ]
      },
      {
        id: 'biodiversidade',
        name: 'Especies y Biodiversidad',
        shortDesc: 'Especies nativas frente a invasoras, fauna urbana y compatibilidad.',
        leaves: [
          {
            id: 'nativas-exoticas',
            title: 'Especies Nativas vs Exóticas',
            text: 'Priorizar árboles nativos preserva los biomas locales, reduce riesgos fitosanitarios e impide la proliferación de especies invasoras.',
            curiosity: 'Especies exóticas invasoras alteran redes tróficas y suelen dañar aceras por carecer de raíces adaptadas al suelo local.',
            sourceLabel: 'ICMBio / Instituto Hórus',
            sourceUrl: 'https://www.gov.br/icmbio/pt-br'
          ,
            image: {
              src: 'images/cards/folha-nativas-exoticas.webp',
              alt: 'Floración dorada de Ipê Amarillo destacando la belleza y resiliencia de las especies nativas'
            }},
          {
            id: 'refugio-fauna',
            title: 'Refugio para la Fauna Urbana',
            text: 'Los árboles proporcionan poso, nidos y alimento indispensables para aves, abejas nativas polinizadoras y fauna menor.',
            curiosity: 'Corredores verdes continuos elevan en más del 60% el tránsito seguro de aves nativas entre parques y reservas.',
            sourceLabel: 'Flora do Brasil 2020',
            sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
          ,
            image: {
              src: 'images/cards/folha-refugio-fauna.webp',
              alt: 'Ave posada en rama de árbol urbano demostrando la importancia del refugio para la fauna'
            }},
          {
            id: 'porte-calcadas',
            title: 'Porte y Compatibilidad Urbana',
            text: 'La planificación silvícola exige adecuar la altura de la copa y el volumen radicular al ancho de las veredas y cableado eléctrico.',
            curiosity: 'Seleccionar la especie correcta para cada espacio evita podas agresivas y quiebres durante vendavales.',
            sourceLabel: 'Ministerio del Medio Ambiente (MMA)',
            sourceUrl: 'https://www.gov.br/mma/pt-br'
          ,
            image: {
              src: 'images/cards/folha-porte-calcadas.webp',
              alt: 'Poda técnica y manejo cuidadoso de árbol urbano compatibilizando copas con aceras y redes eléctricas'
            }}
        ]
      },
      {
        id: 'clima-cidade',
        name: 'Clima y Ciudad',
        shortDesc: 'Islas de calor, balance pluviométrico y el desafío en Sergipe.',
        leaves: [
          {
            id: 'ilhas-calor',
            title: 'Combate a las Islas de Calor',
            text: 'El asfalto y hormigón acumulan calor extremo durante el día. La sombra vegetal continua genera quiebres térmicos en cuadras enteras.',
            curiosity: 'Barrios sin árboles registran hasta 8°C más de temperatura en el asfalto en comparación con calles arboladas contiguas.',
            sourceLabel: 'INPE / Teledetección',
            sourceUrl: 'https://earthobservatory.nasa.gov/'
          ,
            image: {
              src: 'images/cards/folha-ilhas-calor.webp',
              alt: 'Túnel verde de árboles generando sombra densa y alivio térmico contra el calor del asfalto'
            }},
          {
            id: 'desafio-sergipe',
            title: 'El Desafío Crítico en Sergipe',
            text: 'Según datos del Censo del IBGE (2022), Sergipe registra el menor índice de vías públicas arboladas de todo Brasil, agravando las islas de calor.',
            curiosity: 'TODO: validar fonte — Menor tasa de arbolado urbano del país según el Censo Demográfico 2022 del IBGE.',
            sourceLabel: 'Censo Demográfico IBGE 2022 (TODO: validar fonte)',
            sourceUrl: 'https://censo2022.ibge.gov.br/',
            isTodo: true,
            image: {
              src: 'images/cards/folha-desafio-sergipe.webp',
              alt: 'Calle residencial arbolada ejemplificando la necesidad de expandir la cobertura arbórea urbana'
            }
          },
          {
            id: 'chuvas-umidade',
            title: 'Regulación de Lluvias y Humedad',
            text: 'La vegetación urbana actúa como un humidificador biológico continuo, alimentando la humedad del aire mediante transpiración constante.',
            curiosity: 'Un árbol maduro bombea a diario cientos de litros de agua del subsuelo hacia la atmósfera en forma de vapor limpio.',
            sourceLabel: 'Embrapa Solos',
            sourceUrl: 'https://www.embrapa.br/solos'
          ,
            image: {
              src: 'images/cards/folha-chuvas-umidade.webp',
              alt: 'Luz solar atravesando copas verdes densas durante el ciclo continuo de evapotranspiración'
            }}
        ]
      },
      {
        id: 'tecnologia',
        name: 'Tecnología y Monitoreo',
        shortDesc: 'Satélites, drones, sensores IoT e inventarios fitosanitarios.',
        leaves: [
          {
            id: 'visao-satelite',
            title: 'Teledetección Satelital',
            text: 'Imágenes multiespectrales capturadas por satélite generan índices NDVI para evaluar la densidad de la copa e identificar áreas con déficit.',
            curiosity: 'Permite monitorear la evolución histórica de la cobertura vegetal municipal sin depender solo de visitas en campo.',
            sourceLabel: 'INPE / Teledetección',
            sourceUrl: 'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
          ,
            image: {
              src: 'images/cards/folha-visao-satelite.webp',
              alt: 'Mapeo orbital multiespectral con índice de vegetación NDVI resaltando áreas verdes urbanas'
            }},
          {
            id: 'drones-ia',
            title: 'Drones y Visión Artificial',
            text: 'Vuelos automáticos realizan inspecciones de alta resolución en las copas, alimentando modelos de IA para detectar plagas y riesgo de caída.',
            curiosity: 'Genera ortomosaicos 3D para calcular la volumetría y el vigor fitosanitario de cada ejemplar.',
            sourceLabel: 'MCTI / Innovación Tecnológica',
            sourceUrl: 'https://www.gov.br/mcti/pt-br'
          ,
            image: {
              src: 'images/cards/folha-drones-ia.webp',
              alt: 'Vuelo de dron aéreo captando detalles de copas y generando ortomosaicos para inteligencia artificial'
            }},
          {
            id: 'sensores-iot',
            title: 'Telemetría IoT en Tiempo Real',
            text: 'Microcontroladores acoplados a los árboles miden temperatura, humedad del aire y del suelo 24 horas al día, alertando sobre estrés hídrico.',
            curiosity: 'Dispositivos con ESP32 transmiten telemetría continua con mínimo consumo y largo alcance de comunicación.',
            sourceLabel: 'Espressif Systems IoT',
            sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
          ,
            image: {
              src: 'images/cards/folha-sensores-iot.webp',
              alt: 'Estación de telemetría ambiental y sensor para monitoreo microclimático las 24 horas'
            }},
          {
            id: 'cadastro-tecnico',
            title: 'Inventario Digital Fitosanitario',
            text: 'Herramienta georreferenciada para municipios con registro digital de podas, fertilización y estado de conservación de cada árbol.',
            curiosity: 'Reemplaza registros en papel por paneles en la nube accesibles a técnicos y cuadrillas de manejo.',
            sourceLabel: 'IBGE Ciudades',
            sourceUrl: 'https://cidades.ibge.gov.br/'
          ,
            image: {
              src: 'images/cards/folha-cadastro-tecnico.webp',
              alt: 'Inspección detallada de corteza y tronco de árbol para diagnóstico fitosanitario digital'
            }}
        ]
      },
      {
        id: 'como-participar',
        name: 'Cómo Participar',
        shortDesc: 'Ciudadanía, escuelas, universidades y el rol de los municipios.',
        leaves: [
          {
            id: 'cidadao-bairros',
            title: 'Acción Ciudadana y Comunitaria',
            text: 'Vecinos pueden proteger árboles jóvenes en sus aceras, mantener canteros permeables y avisar podas inadecuadas a las autoridades.',
            curiosity: 'Preservar tierra absorbente alrededor del tronco asegura agua y oxígeno a las raíces y evita quiebres en las veredas.',
            sourceLabel: 'Sociedad Brasileña de Arborización Urbana (SBAU)',
            sourceUrl: 'https://sbau.org.br/'
          ,
            image: {
              src: 'images/cards/folha-cidadao-bairros.webp',
              alt: 'Manos de vecinos y voluntarios plantando una plántula de árbol en la tierra durante acción comunitaria'
            }},
          {
            id: 'escolas-educacao',
            title: 'Educación y Ciencia Ciudadana',
            text: 'Escuelas y universidades pueden usar árboles barriales como aulas vivas de botánica, clima, cuidado ambiental y proyectos de extensión.',
            curiosity: 'Proyectos de plantación participativa crean arraigo y reducen notablemente el vandalismo en el arbolado público.',
            sourceLabel: 'Ministerio de Educación (MEC)',
            sourceUrl: 'https://www.gov.br/mec/pt-br'
          ,
            image: {
              src: 'images/cards/folha-escolas-educacao.webp',
              alt: 'Identificación botánica y estudio de árbol en actividad práctica de ciencia ciudadana y educación ambiental'
            }},
          {
            id: 'poder-publico',
            title: 'Gestión Pública y Planificación',
            text: 'Los municipios requieren normativas técnicas de arbolado, viveros de especies nativas y planes maestros verdes de largo plazo.',
            curiosity: 'Ciudades con planes silvícolas estructurados reducen costos en salud pública vinculados a golpes de calor y afecciones respiratorias.',
            sourceLabel: 'Ministerio del Medio Ambiente (MMA)',
            sourceUrl: 'https://www.gov.br/mma/pt-br'
          ,
            image: {
              src: 'images/cards/folha-poder-publico.webp',
              alt: 'Floración urbana con polinizador simbolizando la integración de áreas verdes en la planificación municipal'
            }}
        ]
      }
    ]
  }
};

