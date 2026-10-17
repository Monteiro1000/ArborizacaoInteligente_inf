/**
 * SISTEMA DE INTERNACIONALIZAÇÃO (i18n) - PT / EN / ES
 * Dicionário completo de textos visíveis, atributos alt, placeholders, botões e metadados.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'pt', htmlLang: 'pt-BR', label: 'PT', fullName: 'Português' },
  { code: 'en', htmlLang: 'en', label: 'EN', fullName: 'English' },
  { code: 'es', htmlLang: 'es', label: 'ES', fullName: 'Español' }
];

export const TRANSLATIONS = {
  pt: {
    meta: {
      title: 'Arborização Inteligente | Monitoramento Arbóreo para Cidades mais Verdes',
      description:
        'Sistema de monitoramento arbóreo inteligente capaz de analisar déficit vegetal, saúde arbórea e espécies invasoras com sensores IoT, drones e IA nas cidades sergipanas e brasileiras.'
    },
    launch: {
      badge: 'Lançamento em breve',
      bannerText: 'Plataforma de Monitoramento Urbano em Tempo Real — Lançamento em breve'
    },
    nav: {
      brandName: 'Arborização Inteligente',
      brandTagline: 'Monitoramento arbóreo para cidades mais verdes',
      brandAria: 'Página inicial Arborização Inteligente',
      logoAlt: 'Logo Arborização Inteligente',
      openMenu: 'Abrir menu de navegação',
      closeMenu: 'Fechar menu de navegação',
      mainNavAria: 'Menu principal',
      arborizacao: 'Arborização',
      solucao: 'Solução & Planos',
      tecnologia: 'Tecnologia',
      parceiros: 'Parceiros',
      quemSomos: 'Quem somos',
      destaques: 'Destaques',
      blog: 'Blog',
      contato: 'Contato',
      langSelectorAria: 'Selecionar idioma do site'
    },
    hero: {
      comingSoonPill: 'Lançamento em breve',
      slides: {
        slide1: {
          title: 'Arborização Inteligente',
          highlightWord: 'Inteligente',
          desc: 'Monitoramento arbóreo que transforma dados em qualidade de vida urbana.',
          alt: 'Equipe da startup Arborização Inteligente apresentando protótipos de monitoramento arbóreo urbano'
        },
        slide2: {
          title: 'Sustentabilidade e Tecnologia',
          highlightWord: 'Sustentabilidade',
          desc: 'Sensores IoT, drones e satélite unidos para proteger a floresta urbana.',
          alt: 'Vias urbanas arborizadas monitoradas por sensores IoT e sensoriamento remoto para redução de ilhas de calor'
        },
        slide3: {
          title: 'Cidades com mais vida, cidades mais verdes',
          highlightWord: 'verdes',
          desc: 'Gestão preventiva para reduzir ilhas de calor e preservar a flora nativa.',
          alt: 'Mapeamento aéreo com drones e análise preditiva da cobertura vegetal nas cidades brasileiras'
        }
      },
      metrics: {
        iotVal: 'IoT',
        iotLbl: 'Sensores & Telemetria',
        aiVal: 'IA & Drones',
        aiLbl: 'Diagnóstico Preventivo',
        odsVal: 'ODS ONU',
        odsLbl: 'ODS 11, 13 e 15'
      },
      carousel: {
        regionAria: 'Carrossel de imagens de destaque no cabeçalho',
        dotAriaPrefix: 'Ir para slide'
      }
    },
    arborizacao: {
      eyebrow: 'Conhecimento & Ecologia Urbana',
      title: 'Árvore do Conhecimento: Arborização Urbana',
      subtitle:
        'Navegue pelos galhos e folhas para descobrir como a infraestrutura verde transforma o clima, a biodiversidade e a qualidade de vida das nossas cidades.'
    },
    solution: {
      eyebrow: 'Tecnologia & Inovação',
      title: 'Solução: Sistema de Monitoramento Arbóreo',
      subtitle:
        'Um sistema de monitoramento arbóreo capaz de analisar áreas com déficit vegetal, avaliar a saúde das árvores em tempo real e diferenciar espécies nativas de invasoras por meio de sensores IoT, inteligência artificial e drones.',
      videoTitle: 'Vídeo demonstrativo do projeto Arborização Inteligente',
      treeBadge: 'Modelos de Atendimento',
      treeTitle: 'Os 4 Planos do Projeto Arborização Inteligente',
      treeSubtitle:
        'Da visão orbital por satélite até a raiz cadastrada em campo: clique em cada galho ou raiz da árvore-circuito para explorar o plano correspondente.',
      treeAria: 'Árvore interativa dos 4 planos de monitoramento arbóreo',
      srListAria: 'Resumo completo dos 4 planos',
      soilLabel: 'SOLO URBANO',
      featuredTag: 'MAIS INDICADO',
      featuredBadge: 'Mais indicado',
      treeHint:
        'Clique em qualquer nó dourado da árvore para inspecionar o plano',
      planWord: 'Plano',
      closePanelAria: 'Fechar painel do plano',
      howItWorksTitle: 'Como funciona',
      audienceLabel: 'Público-alvo',
      priceLabel: 'Investimento',
      ctaText: 'Solicitar Proposta deste Plano',
      prevBtn: 'Anterior',
      prevAria: 'Plano anterior',
      nextBtn: 'Próximo',
      nextAria: 'Próximo plano',
      plans: [
        {
          id: 'satelite',
          num: '01',
          altitudeLabel: 'Galho Alto',
          shortTitle: 'Satélite',
          title: 'Satélite - Plano Base',
          summary:
            'Mapeamento e diagnóstico macroscópico por sensoriamento remoto via satélite.',
          howItWorks: [
            {
              text: 'Imagens de satélite multiespectrais em alta resolução espacial',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Cálculo de índices de vegetação (NDVI)',
              sourceLabel: 'INPE / Sensoriamento Remoto',
              sourceUrl:
                'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
            },
            {
              text: 'Identificação de áreas com déficit crítico de cobertura vegetal e relatório panorâmico municipal',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Diagnóstico inicial para municípios',
          price: 'Sob consulta'
        },
        {
          id: 'drones',
          num: '02',
          altitudeLabel: 'Galho Médio',
          shortTitle: 'Drones',
          title: 'Drones - Plano Integrado a Drones',
          summary:
            'Análise avançada da cobertura vegetal e copas através de voos aéreos especializados.',
          howItWorks: [
            {
              text: 'Voo automatizado com sensores de alta definição óptica',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Modelagem tridimensional (3D) e ortomosaicos georreferenciados',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Detecção precoce de pragas, galhos secos, risco de tombamento e avaliação volumétrica da copa',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Grandes avenidas, praças e corredores verdes',
          price: 'Sob consulta'
        },
        {
          id: 'sensores',
          num: '03',
          altitudeLabel: 'Galho Baixo',
          shortTitle: 'Sensores por Árvore',
          title: 'Sensores por Árvore - Plano Sensores IoT',
          summary:
            'Monitoramento contínuo em tempo real por telemetria dedicada e Internet das Coisas.',
          howItWorks: [
            {
              text: 'Estações de monitoramento IoT em vias críticas e árvores estratégicas',
              sourceLabel: 'Espressif IoT',
              sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
            },
            {
              text: 'Leitura 24/7 de microclima: umidade do ar, temperatura e umidade do solo',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Alertas automáticos preditivos de estresse hídrico, risco fitossanitário e visão computacional',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Locais críticos com ilhas de calor e árvores históricas',
          price: 'Sob consulta'
        },
        {
          id: 'cadastro',
          num: '04',
          altitudeLabel: 'Raiz',
          shortTitle: 'Cadastro em Campo',
          title: 'Cadastro Técnico em Campo - Plano Técnico',
          summary:
            'Ambiente interativo corporativo para técnicos e gestores mapearem e gerenciarem árvores.',
          howItWorks: [
            {
              text: 'Dashboard de gestão técnica para prefeituras e secretarias com geolocalização individual',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Histórico completo de podas, adubações, laudos fitossanitários e manutenções',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Classificação assistida de espécies nativas versus invasoras',
              sourceLabel: 'Flora do Brasil 2020',
              sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
            }
          ],
          audience: 'Secretarias de Meio Ambiente e Obras',
          price: 'Sob consulta'
        }
      ]
    },
    partners: {
      eyebrow: 'Ecossistema & Apoio',
      title: 'Parceiros Institucionais',
      ariaLabel: 'Parceiros institucionais',
      items: [
        {
          id: 'ufs-itabaiana',
          name: 'UFS — Campus Itabaiana',
          subtitle: 'Universidade Federal de Sergipe',
          logo: '/assets/partners/ufs-itabaiana.png',
          alt: 'Logo da Universidade Federal de Sergipe - UFS Campus Itabaiana'
        },
        {
          id: 'immun',
          name: 'IMMUN',
          subtitle: 'Projeto de Simulação da ONU',
          logo: '/assets/partners/immun.png',
          alt: 'Logo do projeto de simulação da ONU IMMUN'
        }
      ]
    },
    team: {
      title: 'Nossa Equipe',
      subtitle:
        'Conheça o time de estudantes, pesquisadores e inovadores sergipanos dedicado a construir cidades sustentáveis e inteligentes.',
      photoAltPrefix: 'Foto de',
      linkedinAriaPrefix: 'LinkedIn de',
      instagramAriaPrefix: 'Instagram de',
      goalsTitle: 'Compromisso com os ODS da ONU',
      goalsSubtitle:
        'Nosso projeto está diretamente alinhado às diretrizes globais da Organização das Nações Unidas para um futuro urbano sustentável e resiliente:',
      odsLabelPrefix: 'Alinhamento Estratégico com os',
      odsLinkText: 'Objetivos de Desenvolvimento Sustentável (ONU Brasil',
      odsLinkTitle: 'Acessar página oficial dos ODS na ONU Brasil',
      odsCardTitlePrefix: 'Ver detalhes oficiais do',
      members: {
        'julio-monteiro': {
          role: 'Fundador, Desenvolvedor & Designer',
          desc: 'Idealizador da iniciativa, atua na liderança técnica, desenvolvimento de software e experiência visual. Graduando em Ciência da Computação pela UFS.'
        },
        otavio: {
          role: 'Pesquisa Ambiental & Sustentabilidade',
          desc: 'Dedicado à pesquisa ecossistêmica, conservação e aplicação de métricas sustentáveis. Graduando em Ciências Biológicas pela UFS.'
        },
        'yann-vinicius': {
          role: 'Pesquisa Ambiental & Sustentabilidade',
          desc: 'Atua no mapeamento botânico, rigor ecológico e diretrizes de sustentabilidade do projeto. Graduando em Ciências Biológicas pela UFS.'
        },
        'asafe-emanuel': {
          role: 'Hardware, Eletrônica & IoT',
          desc: 'Desenvolve a arquitetura de sensores, firmware em IoT, calibração e prototipagem física. Graduando em Engenharia Eletrônica pela UFS.'
        },
        jonatas: {
          role: 'Técnico em Podas',
          desc: 'Atua no manejo técnico de podas, avaliação estrutural e conservação da saúde arbórea em campo. Graduando em Agroindústria pela UFS.'
        },
        ellen: {
          role: 'Pesquisa Ambiental & Sustentabilidade',
          desc: 'Atua na pesquisa biológica, avaliação da saúde arbórea e conservação da flora nativa urbana. Graduanda em Ciências Biológicas pela UFS.'
        },
        evilyn: {
          role: 'Comunicação & Mídias Digitais',
          desc: 'Criação de narrativas digitais, design de peças informativas e cobertura institucional de campo. Graduanda em Publicidade e Propaganda pela UFS.'
        },
        'pedro-moises': {
          role: 'Hardware, Eletrônica & IoT',
          desc: 'Atua no desenvolvimento de hardware, integração de sensores IoT e instrumentação eletrônica do sistema. Graduando pela UFS.'
        },
        'vanessa-simplicio': {
          role: 'Comunicação & Relações Públicas',
          desc: 'Responsável pela narrativa, assessoria editorial e divulgação estratégica do projeto. Graduanda em Jornalismo pela UFS.'
        }
      },
      ods: [
        {
          id: 'ods-11',
          code: 'ODS 11',
          title: 'Cidades e Comunidades Sustentáveis',
          desc: 'Tornar as cidades e assentamentos inclusivos, seguros, resilientes e sustentáveis.'
        },
        {
          id: 'ods-13',
          code: 'ODS 13',
          title: 'Ação Contra a Mudança Global do Clima',
          desc: 'Adotar medidas urgentes para combater a mudança climática e seus impactos locais.'
        },
        {
          id: 'ods-15',
          code: 'ODS 15',
          title: 'Vida Terrestre',
          desc: 'Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres.'
        }
      ]
    },
    events: {
      eyebrow: 'Destaques',
      title: 'Destaques do Projeto',
      subtitle:
        'Reconhecimento, premiações e participações oficiais da Arborização Inteligente em feiras científicas, eventos de inovação e conferências climáticas.',
      prevAria: 'Destaque anterior',
      nextAria: 'Próximo destaque',
      carouselAria: 'Carrossel de eventos e premiações em destaque',
      dotAriaPrefix: 'Ir para evento',
      sourcePrefix: 'Órgão / Realização:',
      items: [
        {
          id: 'cienart-2025',
          title: 'CIENART 2025',
          statusPill: 'Ouro Duplo',
          statusType: 'past',
          image: 'assets/eventos/cienart.jpg',
          alt: 'Equipe Arborização Inteligente premiada com duas medalhas de ouro na feira científica CIENART',
          dateTag: 'Setembro 2025 | Aracaju, SE',
          desc: 'Feira Científica de Sergipe reunindo projetos inovadores de todo o estado. A Arborização Inteligente foi consagrada como bimedalhista de ouro em duas categorias pelo desenvolvimento e impacto da solução para a sustentabilidade urbana.',
          highlightIcon: 'medal-duotone',
          highlightTag: 'Bimedalhistas de Ouro',
          attendeesTag: '2 Categorias Premiadas',
          sourceOrg: 'Universidade Federal de Sergipe (UFS) / FAPITEC',
          sourceUrl: 'https://www.ufs.br/'
        },
        {
          id: 'robot-se',
          title: 'ROBOT-SE',
          statusPill: 'Vice-Campeões',
          statusType: 'past',
          image: 'assets/eventos/robotse.jpg',
          alt: 'Equipe Arborização Inteligente apresentando protótipo IoT na competição ROBOT-SE',
          dateTag: 'Sergipe | Edição Oficial',
          desc: 'Maior competição de robótica e tecnologia STEM da região. Conquistamos o título de vice-campeões demonstrando na prática o funcionamento do protótipo IoT com ESP32 e telemetria arbórea em tempo real.',
          highlightIcon: 'medal-duotone',
          highlightTag: 'Vice-Campeões',
          attendeesTag: 'Demonstração Prática IoT',
          sourceOrg: 'Competição Regional de Robótica e STEM',
          sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
        },
        {
          id: 'mini-cop-30',
          title: 'Mini COP 30 Sergipe',
          statusPill: 'Realizado',
          statusType: 'past',
          image: 'assets/eventos/mini-cop.jpg',
          alt: 'Apresentação da Arborização Inteligente na conferência climática Mini COP 30 Sergipe',
          dateTag: 'Agosto 2025 | Aracaju, SE',
          desc: 'Conferência preparatória sobre mudanças climáticas e adaptação sustentável. Apresentação do projeto como referência em uso de tecnologia para preservação da vida e combate às ilhas de calor.',
          highlightIcon: 'globe-hemisphere-west-duotone',
          highlightTag: 'Adaptação Climática',
          attendeesTag: '500+ participantes',
          sourceOrg: 'Conferência do Clima / Ministério do Meio Ambiente (MMA)',
          sourceUrl: 'https://www.gov.br/mma/pt-br/assuntos/mudanca-do-clima/cop30'
        }
      ]
    },
    blog: {
      eyebrow: 'Atualizações e Artigos',
      title: 'Blog & Notícias do Projeto',
      subtitle:
        'Acompanhe as publicações mais recentes, artigos técnicos, pesquisas de campo e marcos da Arborização Inteligente.',
      searchFormAria: 'Pesquisar publicações',
      searchPlaceholder: 'Buscar artigos...',
      searchInputAria: 'Buscar artigos',
      clearSearchAria: 'Limpar busca',
      searchBtnAria: 'Pesquisar',
      categoriesAria: 'Filtrar por categoria',
      featuredBadge: 'Destaque',
      readFullBtn: 'Ler artigo completo',
      gridTitle: 'Publicações do Projeto',
      readMoreBtn: 'Ler mais',
      counterZero: 'Nenhuma notícia encontrada',
      counterOne: '1 publicação encontrada',
      counterManySuffix: 'publicações encontradas',
      emptySearchTitle: 'Nenhum resultado encontrado',
      emptySearchDescPrefix: 'Não encontramos nenhuma publicação para',
      emptySearchDescSuffix: 'Tente outros termos de busca.',
      emptyDefaultTitle: 'Artigos em Produção',
      emptyDefaultDesc:
        'Ainda não há publicações nesta categoria. Nossos artigos técnicos e científicos estão em fase de produção por nossa equipe e serão lançados em breve!',
      resetBtn: 'Ver todas as notícias',
      modalCloseAria: 'Fechar modal',
      modalShareBtn: 'Compartilhar',
      modalCloseBtn: 'Fechar',
      shareToastSuccess:
        '✓ Link do artigo copiado para a área de transferência!',
      shareToastError: 'Não foi possível copiar o link.',
      categories: [
        { id: 'all', label: 'Todos' },
        { id: 'tecnologia', label: 'Tecnologia' },
        { id: 'sustentabilidade', label: 'Sustentabilidade' },
        { id: 'inovacao', label: 'Inovação' },
        { id: 'comunidade', label: 'Comunidade' },
        { id: 'pesquisa', label: 'Pesquisa' }
      ],
      posts: [
        {
          id: 'lancamento-novo-site-oficial',
          title: 'Lançamento do Novo Site Oficial da Arborização Inteligente',
          category: 'tecnologia',
          badge: 'Lançamento Oficial',
          date: '25 de Setembro, 2026',
          readTime: '3 min de leitura',
          author: 'Equipe Arborização Inteligente',
          image: 'assets/equipe.jpg',
          featured: true,
          excerpt:
            'É com grande satisfação que apresentamos o novo portal oficial da Arborização Inteligente: um espaço moderno, acessível e transparente para conectar tecnologia IoT, IA e gestão ecológica urbana.',
          content: `
            <p>Seja muito bem-vindo ao <strong>novo portal oficial da Arborização Inteligente</strong>! Desenvolvemos esta plataforma para ser o ponto de encontro central entre a nossa pesquisa científica, a tecnologia de monitoramento ambiental e a sociedade.</p>
            <h3>O que você encontra no novo portal?</h3>
            <p>O site foi estruturado para apresentar com clareza e profundidade técnica cada pilar da nossa solução:</p>
            <ul>
              <li><strong>Diagnóstico Urbano:</strong> Contextualização do desafio urgente da cobertura vegetal no Brasil e em Sergipe, com base em dados oficiais do <a href="https://censo2022.ibge.gov.br/" target="_blank" rel="noopener noreferrer">Censo Demográfico do IBGE (2022)</a>.</li>
              <li><strong>Tecnologia & Hardware IoT:</strong> Detalhamento dos sensores em campo (<a href="https://www.espressif.com/en/products/socs/esp32" target="_blank" rel="noopener noreferrer">ESP32</a>, DHT11, AHT25), inteligência artificial preditiva e monitoramento aéreo por drones.</li>
              <li><strong>Alinhamento aos ODS da ONU:</strong> Nosso compromisso direto com os <a href="https://brasil.un.org/pt-br/sdgs" target="_blank" rel="noopener noreferrer">Objetivos de Desenvolvimento Sustentável da ONU</a>: ODS 11 (Cidades Sustentáveis), 13 (Ação Climática) e 15 (Vida Terrestre).</li>
              <li><strong>Equipe e Reconhecimentos:</strong> Quem faz a ciência acontecer e as premiações conquistadas pelo projeto, como <a href="https://www.ufs.br/" target="_blank" rel="noopener noreferrer">CIENART (UFS)</a>, ROBOT-SE e Mini COP 30.</li>
              <li><strong>Canais Abertos de Contato:</strong> Acesso direto para parcerias governamentais, acadêmicas e comunitárias.</li>
            </ul>
            <blockquote class="blog-quote">
              O site foi desenvolvido com o objetivo de mostrar uma visão geral do projeto e publicar notícias e conteúdos relevantes sobre arborização. Posteriormente, iremos lançar o sistema de monitoramento em tempo real, com dashboards e relatórios técnicos para pesquisadores e gestores públicos.
            </blockquote>
            <h3>Artigos científicos e técnicos em produção</h3>
            <p>Informamos à comunidade acadêmica e aos parceiros que os <strong>artigos científicos e relatórios técnicos aprofundados</strong> sobre a metodologia de sensoriamento, calibração e algoritmos preditivos estão atualmente em fase de produção e revisão por nossos pesquisadores. Em breve, todos os artigos estarão disponíveis para leitura e download gratuito diretamente aqui nesta área do blog!</p>
          `
        },
        {
          id: 'apresentacao-nova-logo-oficial',
          title: 'Nova Identidade Visual: Conheça o Logotipo Oficial do Projeto',
          category: 'inovacao',
          badge: 'Identidade Visual',
          date: '24 de Setembro, 2026',
          readTime: '2 min de leitura',
          author: 'Comunicação & Design',
          image: 'assets/logo.png',
          featured: false,
          excerpt:
            'Apresentamos oficialmente a nova identidade visual da Arborização Inteligente. Uma marca moderna que simboliza a união entre a natureza viva das árvores urbanas e as trilhas de dados da tecnologia.',
          content: `
            <p>O projeto <strong>Arborização Inteligente</strong> dá mais um passo decisivo em sua trajetória institucional e apresenta ao público a sua <strong>nova identidade visual oficial</strong>.</p>
            <p>Desenvolvida para refletir a maturidade e a sofisticação tecnológica da nossa iniciativa, a nova marca traduz visualmente a essência do que pesquisamos e construímos todos os dias: a perfeita harmonia entre a biologia vegetal e a inovação computacional.</p>
            <h3>O Conceito do Novo Logotipo</h3>
            <p>Cada detalhe da nova composição foi planejado estrategicamente:</p>
            <ul>
              <li><strong>A Árvore Tecnológica:</strong> O tronco e os galhos se transformam em trilhas de circuito impresso com nós e conectores, representando os sensores IoT e os fluxos contínuos de telemetria ambiental.</li>
              <li><strong>Folhagem Viva e Sustentável:</strong> As folhas em tons verdes e esmeralda simbolizam a fotossíntese, a flora nativa e o compromisso urgente com o conforto térmico urbano.</li>
              <li><strong>Azul Profundo e Borda Dourada:</strong> O azul royal confere rigor científico, engenharia e confiabilidade aos dados, contornado por um aro que celebra a excelência e o impacto socioambiental.</li>
            </ul>
            <blockquote class="blog-quote">
              "Uma marca forte para um propósito urgente: usar inteligência artificial e robótica para proteger a vida e refrescar as cidades brasileiras."
            </blockquote>
            <p>A nova identidade já está integrada a este portal e será utilizada em todas as publicações científicas, apresentações em congressos e dispositivos de sensoriamento em campo.</p>
          `
        }
      ]
    },
    contact: {
      eyebrow: 'Canais de Atendimento',
      title: 'Entre em Contato Conosco',
      subtitle:
        'Tem interesse em implementar a Arborização Inteligente na sua cidade, instituição ou projeto? Fale diretamente com nossa equipe.',
      emailCardLabel: 'E-mail Oficial',
      emailCardTitle: 'Fale por E-mail',
      emailCardDesc:
        'Envie propostas, solicitações de parcerias municipais, convênios acadêmicos ou dúvidas técnicas.',
      emailCardBtn: 'Enviar E-mail',
      phoneCardLabel: 'Telefone & WhatsApp',
      phoneCardTitle: 'Atendimento Direto',
      phoneCardDesc:
        'Converse diretamente com a coordenação do projeto para demonstrações e parcerias institucionais.',
      phoneCardBtn: 'Ligar Agora',
      formBadge: 'Mensagem Direta',
      formTitle: 'Envie sua Mensagem',
      formDesc:
        'Preencha os campos abaixo e nossa equipe responderá o mais breve possível pelo seu e-mail.',
      nameLabel: 'Nome completo',
      namePlaceholder: 'Digite seu nome ou instituição',
      emailLabel: 'E-mail para contato',
      emailPlaceholder: 'seuemail@exemplo.com.br',
      messageLabel: 'Mensagem',
      messagePlaceholder:
        'Conte-nos como podemos colaborar com sua cidade, pesquisa ou instituição...',
      submitBtn: 'Enviar Mensagem',
      sendingBtn: 'Enviando...',
      errorRequired: 'Por favor, preencha todos os campos obrigatórios.',
      errorEmail: 'Por favor, informe um endereço de e-mail válido.',
      successMsg:
        '✓ Mensagem enviada com sucesso! Entraremos em contato em breve pelo e-mail informado.',
      errorSend:
        'Ocorreu um erro ao enviar. Tente novamente ou envie diretamente para arborizacaointeligente1@gmail.com.'
    },
    footer: {
      brandSubtitle: 'Tecnologia e dados para cidades sustentáveis',
      tagline:
        '"Uma cidade inteligente é aquela que usa tecnologia para preservar a vida."',
      navTitle: 'Navegação',
      navArborizacao: 'Arborização Urbana',
      navSolucao: 'Nossa Solução & Planos',
      navTecnologia: 'Segmentos Tecnológicos',
      navParceiros: 'Parceiros Institucionais',
      navQuemSomos: 'Quem Somos',
      navDestaques: 'Destaques do Projeto',
      navBlog: 'Blog do Projeto',
      navContato: 'Fale Conosco',
      contactTitle: 'Contato & Redes',
      instagramAria: 'Instagram oficial da Arborização Inteligente',
      linkedinAria: 'LinkedIn oficial da Arborização Inteligente',
      emailAria: 'Enviar e-mail para Arborização Inteligente',
      phoneAria: 'Ligar para Arborização Inteligente',
      copyright:
        '© 2026 Arborização Inteligente. Todos os direitos reservados.',
      ods11: 'ODS 11 - Cidades Sustentáveis',
      ods13: 'ODS 13 - Ação Climática',
      ods15: 'ODS 15 - Vida Terrestre'
    }
  },

  /* ========================================================================
     ENGLISH (EN)
     ======================================================================== */
  en: {
    meta: {
      title: 'Smart Urban Forestry | Tree Monitoring for Greener Cities',
      description:
        'Smart tree monitoring system capable of analyzing vegetation deficit, tree health, and invasive species using IoT sensors, drones, and AI in Brazilian cities.'
    },
    launch: {
      badge: 'Coming soon',
      bannerText: 'Real-Time Urban Monitoring Platform — Coming soon'
    },
    nav: {
      brandName: 'Arborização Inteligente',
      brandTagline: 'Tree monitoring for greener cities',
      brandAria: 'Arborização Inteligente Home Page',
      logoAlt: 'Arborização Inteligente Logo',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      mainNavAria: 'Main navigation',
      arborizacao: 'Urban Forestry',
      solucao: 'Solution & Plans',
      tecnologia: 'Technology',
      parceiros: 'Partners',
      quemSomos: 'About Us',
      destaques: 'Highlights',
      blog: 'Blog',
      contato: 'Contact',
      langSelectorAria: 'Select website language'
    },
    hero: {
      comingSoonPill: 'Coming soon',
      slides: {
        slide1: {
          title: 'Smart Urban Forestry',
          highlightWord: 'Smart',
          desc: 'Smart tree monitoring turning environmental data into urban quality of life.',
          alt: 'Arborização Inteligente startup team presenting urban tree monitoring prototypes'
        },
        slide2: {
          title: 'Sustainability and Technology',
          highlightWord: 'Sustainability',
          desc: 'IoT sensors, drones, and satellite united to protect the urban forest.',
          alt: 'Tree-lined urban streets monitored by IoT sensors and remote sensing to reduce heat islands'
        },
        slide3: {
          title: 'Cities with more life, greener cities',
          highlightWord: 'greener',
          desc: 'Preventive management to reduce heat islands and preserve native flora.',
          alt: 'Aerial drone mapping and predictive analysis of canopy cover in Brazilian cities'
        }
      },
      metrics: {
        iotVal: 'IoT',
        iotLbl: 'Sensors & Telemetry',
        aiVal: 'AI & Drones',
        aiLbl: 'Preventive Diagnostics',
        odsVal: 'UN SDGs',
        odsLbl: 'SDGs 11, 13 & 15'
      },
      carousel: {
        regionAria: 'Header featured image carousel',
        dotAriaPrefix: 'Go to slide'
      }
    },
    arborizacao: {
      eyebrow: 'Knowledge & Urban Ecology',
      title: 'Tree of Knowledge: Urban Forestry',
      subtitle:
        'Explore branches and leaves to discover how green infrastructure transforms climate, biodiversity, and urban life quality.'
    },
    solution: {
      eyebrow: 'Technology & Innovation',
      title: 'Solution: Smart Tree Monitoring System',
      subtitle:
        'A comprehensive tree monitoring system capable of analyzing vegetation deficit areas, assessing tree health in real time, and differentiating native from invasive species using IoT sensors, artificial intelligence, and drones.',
      videoTitle: 'Arborização Inteligente project overview video',
      treeBadge: 'Service Models',
      treeTitle: 'The 4 Plans of Arborização Inteligente',
      treeSubtitle:
        'From orbital satellite vision down to field-registered roots: click each branch or root on the circuit tree to explore the corresponding plan.',
      treeAria: 'Interactive tree of the 4 tree monitoring plans',
      srListAria: 'Complete summary of the 4 plans',
      soilLabel: 'URBAN SOIL',
      featuredTag: 'MOST RECOMMENDED',
      featuredBadge: 'Most recommended',
      treeHint:
        'Click any golden node on the tree to inspect the plan',
      planWord: 'Plan',
      closePanelAria: 'Close plan panel',
      howItWorksTitle: 'How it works',
      audienceLabel: 'Target Audience',
      priceLabel: 'Investment',
      ctaText: 'Request a Proposal for this Plan',
      prevBtn: 'Previous',
      prevAria: 'Previous plan',
      nextBtn: 'Next',
      nextAria: 'Next plan',
      plans: [
        {
          id: 'satelite',
          num: '01',
          altitudeLabel: 'High Branch',
          shortTitle: 'Satellite',
          title: 'Satellite - Base Plan',
          summary:
            'Macroscopic mapping and diagnosis via satellite remote sensing.',
          howItWorks: [
            {
              text: 'High spatial resolution multispectral satellite imagery',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Normalized Difference Vegetation Index (NDVI) calculation',
              sourceLabel: 'INPE / Remote Sensing',
              sourceUrl:
                'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
            },
            {
              text: 'Identification of critical vegetation deficit areas and municipal panoramic reports',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Initial diagnosis for municipalities',
          price: 'Upon request'
        },
        {
          id: 'drones',
          num: '02',
          altitudeLabel: 'Mid Branch',
          shortTitle: 'Drones',
          title: 'Drones - Drone-Integrated Plan',
          summary:
            'Advanced canopy and vegetation cover analysis through specialized aerial flights.',
          howItWorks: [
            {
              text: 'Automated flights with high-definition optical sensors',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: '3D modeling and georeferenced orthomosaics',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Early detection of pests, dry branches, fall risks, and volumetric canopy assessment',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Major avenues, squares, and green corridors',
          price: 'Upon request'
        },
        {
          id: 'sensores',
          num: '03',
          altitudeLabel: 'Low Branch',
          shortTitle: 'Tree Sensors',
          title: 'Tree Sensors - IoT Sensor Plan',
          summary:
            'Continuous real-time monitoring via dedicated telemetry and Internet of Things.',
          howItWorks: [
            {
              text: 'IoT monitoring stations on critical streets and strategic trees',
              sourceLabel: 'Espressif IoT',
              sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
            },
            {
              text: '24/7 microclimate readings: air humidity, temperature, and soil moisture',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Predictive automated alerts for water stress, phytosanitary risks, and computer vision',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Critical heat island spots and heritage trees',
          price: 'Upon request'
        },
        {
          id: 'cadastro',
          num: '04',
          altitudeLabel: 'Root',
          shortTitle: 'Field Registry',
          title: 'Technical Field Registry - Technical Plan',
          summary:
            'Interactive platform for technicians and managers to map and manage urban trees.',
          howItWorks: [
            {
              text: 'Technical management dashboard for municipalities with individual geolocation',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Complete history of pruning, fertilization, phytosanitary reports, and maintenance',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Assisted classification of native versus invasive species',
              sourceLabel: 'Flora do Brasil 2020',
              sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
            }
          ],
          audience: 'Departments of Environment and Public Works',
          price: 'Upon request'
        }
      ]
    },
    partners: {
      eyebrow: 'Ecosystem & Support',
      title: 'Institutional Partners',
      ariaLabel: 'Institutional partners',
      items: [
        {
          id: 'ufs-itabaiana',
          name: 'UFS — Campus Itabaiana',
          subtitle: 'Federal University of Sergipe',
          logo: '/assets/partners/ufs-itabaiana.png',
          alt: 'Logo of the Federal University of Sergipe - UFS Itabaiana Campus'
        },
        {
          id: 'immun',
          name: 'IMMUN',
          subtitle: 'UN Model Simulation Project',
          logo: '/assets/partners/immun.png',
          alt: 'Logo of the IMMUN United Nations Simulation Project'
        }
      ]
    },
    team: {
      title: 'Our Team',
      subtitle:
        'Meet the team of students, researchers, and innovators from Sergipe dedicated to building sustainable, smart cities.',
      photoAltPrefix: 'Photo of',
      linkedinAriaPrefix: 'LinkedIn of',
      instagramAriaPrefix: 'Instagram of',
      goalsTitle: 'Commitment to the UN SDGs',
      goalsSubtitle:
        'Our project is directly aligned with the global guidelines of the United Nations for a sustainable and resilient urban future:',
      odsLabelPrefix: 'Strategic Alignment with the',
      odsLinkText: 'Sustainable Development Goals (UN Brazil',
      odsLinkTitle: 'Visit the official UN SDGs page',
      odsCardTitlePrefix: 'View official details for',
      members: {
        'julio-monteiro': {
          role: 'Founder, Developer & Designer',
          desc: 'Project creator leading technical architecture, software development, and visual experience. Computer Science undergraduate at UFS.'
        },
        otavio: {
          role: 'Environmental Research & Sustainability',
          desc: 'Dedicated to ecosystem research, conservation, and applying sustainability metrics. Biological Sciences undergraduate at UFS.'
        },
        'yann-vinicius': {
          role: 'Environmental Research & Sustainability',
          desc: 'Works on botanical mapping, ecological rigor, and project sustainability guidelines. Biological Sciences undergraduate at UFS.'
        },
        'asafe-emanuel': {
          role: 'Hardware, Electronics & IoT',
          desc: 'Develops sensor architecture, IoT firmware, calibration, and physical prototyping. Electronic Engineering undergraduate at UFS.'
        },
        jonatas: {
          role: 'Pruning Technician',
          desc: 'Works on technical tree pruning management, structural assessment, and field tree health conservation. Agroindustry undergraduate at UFS.'
        },
        ellen: {
          role: 'Environmental Research & Sustainability',
          desc: 'Works on biological research, tree health assessment, and urban native flora conservation. Biological Sciences undergraduate at UFS.'
        },
        evilyn: {
          role: 'Communications & Digital Media',
          desc: 'Digital storytelling, informational design, and institutional field coverage. Advertising undergraduate at UFS.'
        },
        'pedro-moises': {
          role: 'Hardware, Electronics & IoT',
          desc: 'Works on hardware development, IoT sensor integration, and electronic instrumentation. Undergraduate student at UFS.'
        },
        'vanessa-simplicio': {
          role: 'Communications & Public Relations',
          desc: 'Responsible for institutional narrative, editorial press, and strategic outreach. Journalism undergraduate at UFS.'
        }
      },
      ods: [
        {
          id: 'ods-11',
          code: 'SDG 11',
          title: 'Sustainable Cities and Communities',
          desc: 'Make cities and human settlements inclusive, safe, resilient, and sustainable.'
        },
        {
          id: 'ods-13',
          code: 'SDG 13',
          title: 'Climate Action',
          desc: 'Take urgent action to combat climate change and its local impacts.'
        },
        {
          id: 'ods-15',
          code: 'SDG 15',
          title: 'Life on Land',
          desc: 'Protect, restore, and promote sustainable use of terrestrial ecosystems.'
        }
      ]
    },
    events: {
      eyebrow: 'Highlights',
      title: 'Project Highlights',
      subtitle:
        'Recognition, awards, and official participations of Arborização Inteligente in science fairs, innovation events, and climate conferences.',
      prevAria: 'Previous highlight',
      nextAria: 'Next highlight',
      carouselAria: 'Featured events and awards carousel',
      dotAriaPrefix: 'Go to event',
      sourcePrefix: 'Organization / Host:',
      items: [
        {
          id: 'cienart-2025',
          title: 'CIENART 2025',
          statusPill: 'Double Gold',
          statusType: 'past',
          image: 'assets/eventos/cienart.jpg',
          alt: 'Arborização Inteligente team awarded two gold medals at the CIENART science fair',
          dateTag: 'September 2025 | Aracaju, SE',
          desc: 'Sergipe Science Fair gathering innovative projects from across the state. Arborização Inteligente won two gold medals in two categories for its development and impact on urban sustainability.',
          highlightIcon: 'medal-duotone',
          highlightTag: 'Double Gold Medalists',
          attendeesTag: '2 Awarded Categories',
          sourceOrg: 'Federal University of Sergipe (UFS) / FAPITEC',
          sourceUrl: 'https://www.ufs.br/'
        },
        {
          id: 'robot-se',
          title: 'ROBOT-SE',
          statusPill: 'Runners-Up',
          statusType: 'past',
          image: 'assets/eventos/robotse.jpg',
          alt: 'Arborização Inteligente team demonstrating the IoT prototype at ROBOT-SE',
          dateTag: 'Sergipe | Official Edition',
          desc: 'Largest robotics and STEM competition in the region. We won 2nd place demonstrating live our ESP32 IoT prototype and real-time tree telemetry.',
          highlightIcon: 'medal-duotone',
          highlightTag: 'Runners-Up',
          attendeesTag: 'Live IoT Demonstration',
          sourceOrg: 'Regional Robotics & STEM Competition',
          sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
        },
        {
          id: 'mini-cop-30',
          title: 'Mini COP 30 Sergipe',
          statusPill: 'Completed',
          statusType: 'past',
          image: 'assets/eventos/mini-cop.jpg',
          alt: 'Arborização Inteligente presentation at the Mini COP 30 Sergipe climate conference',
          dateTag: 'August 2025 | Aracaju, SE',
          desc: 'Preparatory conference on climate change and sustainable adaptation. Featured as a benchmark in using technology to preserve life and combat urban heat islands.',
          highlightIcon: 'globe-hemisphere-west-duotone',
          highlightTag: 'Climate Adaptation',
          attendeesTag: '500+ attendees',
          sourceOrg: 'Climate Conference / Ministry of the Environment (MMA)',
          sourceUrl: 'https://www.gov.br/mma/pt-br/assuntos/mudanca-do-clima/cop30'
        }
      ]
    },
    blog: {
      eyebrow: 'Updates & Articles',
      title: 'Project Blog & News',
      subtitle:
        'Follow our latest publications, technical articles, field research, and milestones of Arborização Inteligente.',
      searchFormAria: 'Search publications',
      searchPlaceholder: 'Search articles...',
      searchInputAria: 'Search articles',
      clearSearchAria: 'Clear search',
      searchBtnAria: 'Search',
      categoriesAria: 'Filter by category',
      featuredBadge: 'Featured',
      readFullBtn: 'Read full article',
      gridTitle: 'Project Publications',
      readMoreBtn: 'Read more',
      counterZero: 'No articles found',
      counterOne: '1 publication found',
      counterManySuffix: 'publications found',
      emptySearchTitle: 'No results found',
      emptySearchDescPrefix: 'We could not find any publication matching',
      emptySearchDescSuffix: 'Try different search terms.',
      emptyDefaultTitle: 'Articles in Production',
      emptyDefaultDesc:
        'There are no publications in this category yet. Our technical and scientific articles are currently being produced by our team and will be released soon!',
      resetBtn: 'View all news',
      modalCloseAria: 'Close modal',
      modalShareBtn: 'Share',
      modalCloseBtn: 'Close',
      shareToastSuccess: '✓ Article link copied to clipboard!',
      shareToastError: 'Could not copy the link.',
      categories: [
        { id: 'all', label: 'All' },
        { id: 'tecnologia', label: 'Technology' },
        { id: 'sustentabilidade', label: 'Sustainability' },
        { id: 'inovacao', label: 'Innovation' },
        { id: 'comunidade', label: 'Community' },
        { id: 'pesquisa', label: 'Research' }
      ],
      posts: [
        {
          id: 'lancamento-novo-site-oficial',
          title: 'Launch of the New Official Arborização Inteligente Website',
          category: 'tecnologia',
          badge: 'Official Launch',
          date: 'September 25, 2026',
          readTime: '3 min read',
          author: 'Arborização Inteligente Team',
          image: 'assets/equipe.jpg',
          featured: true,
          excerpt:
            'We are proud to present the new official portal of Arborização Inteligente: a modern, accessible, and transparent space connecting IoT technology, AI, and urban ecological management.',
          content: `
            <p>Welcome to the <strong>new official portal of Arborização Inteligente</strong>! We built this platform as the central hub connecting our scientific research, environmental monitoring technology, and society.</p>
            <h3>What will you find on the new portal?</h3>
            <p>The website is structured to clearly present each pillar of our solution:</p>
            <ul>
              <li><strong>Urban Diagnosis:</strong> Context on the urgent canopy cover challenge in Brazil and Sergipe, grounded in official data from the <a href="https://censo2022.ibge.gov.br/" target="_blank" rel="noopener noreferrer">2022 IBGE Census</a>.</li>
              <li><strong>IoT Technology & Hardware:</strong> Details on field sensors (<a href="https://www.espressif.com/en/products/socs/esp32" target="_blank" rel="noopener noreferrer">ESP32</a>, DHT11, AHT25), predictive AI, and drone aerial monitoring.</li>
              <li><strong>Alignment with UN SDGs:</strong> Our direct commitment to the <a href="https://brasil.un.org/pt-br/sdgs" target="_blank" rel="noopener noreferrer">UN Sustainable Development Goals</a>: SDG 11 (Sustainable Cities), 13 (Climate Action), and 15 (Life on Land).</li>
              <li><strong>Team & Recognition:</strong> The researchers behind the science and awards won by the project, such as <a href="https://www.ufs.br/" target="_blank" rel="noopener noreferrer">CIENART (UFS)</a>, ROBOT-SE, and Mini COP 30.</li>
              <li><strong>Open Contact Channels:</strong> Direct access for municipal, academic, and community partnerships.</li>
            </ul>
            <blockquote class="blog-quote">
              This website was created to provide a comprehensive overview of the project and publish relevant news on urban forestry. Soon, we will launch the real-time monitoring system featuring interactive dashboards and technical reports for researchers and public managers.
            </blockquote>
            <h3>Scientific and technical papers in production</h3>
            <p>We inform the academic community and partners that our <strong>in-depth scientific papers and technical reports</strong> on sensing methodology, calibration, and predictive algorithms are currently in production and peer review. They will soon be available for free reading and download right here!</p>
          `
        },
        {
          id: 'apresentacao-nova-logo-oficial',
          title: 'New Visual Identity: Meet the Official Project Logo',
          category: 'inovacao',
          badge: 'Visual Identity',
          date: 'September 24, 2026',
          readTime: '2 min read',
          author: 'Communications & Design',
          image: 'assets/logo.png',
          featured: false,
          excerpt:
            'We officially present the new visual identity of Arborização Inteligente. A modern brand symbolizing the union between living urban trees and technological data pathways.',
          content: `
            <p><strong>Arborização Inteligente</strong> takes another decisive step in its institutional journey and introduces its <strong>new official visual identity</strong>.</p>
            <p>Designed to reflect the maturity and technological sophistication of our initiative, the new brand visually translates the essence of what we research and build every day: the harmony between plant biology and computational innovation.</p>
            <h3>The Concept Behind the New Logo</h3>
            <p>Every detail of the composition was strategically planned:</p>
            <ul>
              <li><strong>The Circuit Tree:</strong> The trunk and branches transform into printed circuit board traces with nodes and connectors, representing IoT sensors and continuous environmental telemetry flows.</li>
              <li><strong>Living Sustainable Foliage:</strong> Leaves in green and emerald tones symbolize photosynthesis, native flora, and our urgent commitment to urban thermal comfort.</li>
              <li><strong>Deep Blue & Golden Rim:</strong> Royal blue conveys scientific rigor, engineering, and data reliability, framed by a golden rim celebrating excellence and socio-environmental impact.</li>
            </ul>
            <blockquote class="blog-quote">
              "A strong brand for an urgent purpose: using artificial intelligence and robotics to protect life and cool Brazilian cities."
            </blockquote>
            <p>The new identity is already integrated into this portal and will be used across all scientific publications, conference presentations, and field sensing devices.</p>
          `
        }
      ]
    },
    contact: {
      eyebrow: 'Contact Channels',
      title: 'Get in Touch With Us',
      subtitle:
        'Interested in implementing Arborização Inteligente in your city, institution, or project? Speak directly with our team.',
      emailCardLabel: 'Official Email',
      emailCardTitle: 'Reach Out by Email',
      emailCardDesc:
        'Send proposals, municipal partnership requests, academic agreements, or technical questions.',
      emailCardBtn: 'Send Email',
      phoneCardLabel: 'Phone & WhatsApp',
      phoneCardTitle: 'Direct Support',
      phoneCardDesc:
        'Speak directly with our project coordination team for demos and institutional partnerships.',
      phoneCardBtn: 'Call Now',
      formBadge: 'Direct Message',
      formTitle: 'Send Your Message',
      formDesc:
        'Fill out the fields below and our team will reply as soon as possible via email.',
      nameLabel: 'Full name',
      namePlaceholder: 'Enter your name or organization',
      emailLabel: 'Contact email',
      emailPlaceholder: 'youremail@example.com',
      messageLabel: 'Message',
      messagePlaceholder:
        'Tell us how we can collaborate with your city, research, or institution...',
      submitBtn: 'Send Message',
      sendingBtn: 'Sending...',
      errorRequired: 'Please fill in all required fields.',
      errorEmail: 'Please enter a valid email address.',
      successMsg:
        '✓ Message sent successfully! We will contact you soon at the provided email.',
      errorSend:
        'An error occurred while sending. Please try again or email arborizacaointeligente1@gmail.com directly.'
    },
    footer: {
      brandSubtitle: 'Technology and data for sustainable cities',
      tagline:
        '"A smart city is one that uses technology to preserve life."',
      navTitle: 'Navigation',
      navArborizacao: 'Urban Forestry',
      navSolucao: 'Our Solution & Plans',
      navTecnologia: 'Technology Segments',
      navParceiros: 'Institutional Partners',
      navQuemSomos: 'About Us',
      navDestaques: 'Project Highlights',
      navBlog: 'Project Blog',
      navContato: 'Contact Us',
      contactTitle: 'Contact & Social',
      instagramAria: 'Arborização Inteligente official Instagram',
      linkedinAria: 'Arborização Inteligente official LinkedIn',
      emailAria: 'Send an email to Arborização Inteligente',
      phoneAria: 'Call Arborização Inteligente',
      copyright:
        '© 2026 Arborização Inteligente. All rights reserved.',
      ods11: 'SDG 11 - Sustainable Cities',
      ods13: 'SDG 13 - Climate Action',
      ods15: 'SDG 15 - Life on Land'
    }
  },

  /* ========================================================================
     ESPAÑOL (ES)
     ======================================================================== */
  es: {
    meta: {
      title: 'Arborización Inteligente | Monitoreo Arbóreo para Ciudades más Verdes',
      description:
        'Sistema de monitoreo arbóreo inteligente capaz de analizar el déficit vegetal, la salud arbórea y las especies invasoras con sensores IoT, drones e IA en las ciudades brasileñas.'
    },
    launch: {
      badge: 'Próximamente',
      bannerText: 'Plataforma de Monitoreo Urbano en Tiempo Real — Próximamente'
    },
    nav: {
      brandName: 'Arborização Inteligente',
      brandTagline: 'Monitoreo arbóreo para ciudades más verdes',
      brandAria: 'Página principal de Arborização Inteligente',
      logoAlt: 'Logo de Arborização Inteligente',
      openMenu: 'Abrir menú de navegación',
      closeMenu: 'Cerrar menú de navegación',
      mainNavAria: 'Menú principal',
      arborizacao: 'Arborización',
      solucao: 'Solución y Planes',
      tecnologia: 'Tecnología',
      parceiros: 'Socios',
      quemSomos: 'Quiénes somos',
      destaques: 'Destacados',
      blog: 'Blog',
      contato: 'Contacto',
      langSelectorAria: 'Seleccionar idioma del sitio'
    },
    hero: {
      comingSoonPill: 'Próximamente',
      slides: {
        slide1: {
          title: 'Arborización Inteligente',
          highlightWord: 'Inteligente',
          desc: 'Monitoreo arbóreo que transforma datos ambientales en calidad de vida urbana.',
          alt: 'Equipo de la startup Arborização Inteligente presentando prototipos de monitoreo arbóreo urbano'
        },
        slide2: {
          title: 'Sustentabilidad y Tecnología',
          highlightWord: 'Sustentabilidad',
          desc: 'Sensores IoT, drones y satélite unidos para proteger el bosque urbano.',
          alt: 'Vías urbanas arboladas monitoreadas por sensores IoT y teledetección para reducir islas de calor'
        },
        slide3: {
          title: 'Ciudades con más vida, ciudades más verdes',
          highlightWord: 'verdes',
          desc: 'Gestión preventiva para reducir islas de calor y preservar la flora nativa.',
          alt: 'Mapeo aéreo con drones y análisis predictivo de la cobertura vegetal en ciudades brasileñas'
        }
      },
      metrics: {
        iotVal: 'IoT',
        iotLbl: 'Sensores y Telemetría',
        aiVal: 'IA y Drones',
        aiLbl: 'Diagnóstico Preventivo',
        odsVal: 'ODS ONU',
        odsLbl: 'ODS 11, 13 y 15'
      },
      carousel: {
        regionAria: 'Carrusel de imágenes destacadas en el encabezado',
        dotAriaPrefix: 'Ir a la diapositiva'
      }
    },
    arborizacao: {
      eyebrow: 'Conocimiento y Ecología Urbana',
      title: 'Árbol del Conocimiento: Arborización Urbana',
      subtitle:
        'Explore las ramas y hojas para descubrir cómo la infraestructura verde transforma el clima, la biodiversidad y la calidad de vida urbana.'
    },
    solution: {
      eyebrow: 'Tecnología e Innovación',
      title: 'Solución: Sistema de Monitoreo Arbóreo',
      subtitle:
        'Un sistema de monitoreo arbóreo capaz de analizar áreas con déficit vegetal, evaluar la salud de los árboles en tiempo real y diferenciar especies nativas de invasoras mediante sensores IoT, inteligencia artificial y drones.',
      videoTitle: 'Video demostrativo del proyecto Arborização Inteligente',
      treeBadge: 'Modelos de Atención',
      treeTitle: 'Los 4 Planes del Proyecto Arborização Inteligente',
      treeSubtitle:
        'Desde la visión orbital por satélite hasta la raíz registrada en campo: haga clic en cada rama o raíz del árbol-circuito para explorar el plan correspondiente.',
      treeAria: 'Árbol interactivo de los 4 planes de monitoreo arbóreo',
      srListAria: 'Resumen completo de los 4 planes',
      soilLabel: 'SUELO URBANO',
      featuredTag: 'MÁS RECOMENDADO',
      featuredBadge: 'Más recomendado',
      treeHint:
        'Haga clic en cualquier nodo dorado del árbol para inspeccionar el plan',
      planWord: 'Plan',
      closePanelAria: 'Cerrar panel del plan',
      howItWorksTitle: 'Cómo funciona',
      audienceLabel: 'Público objetivo',
      priceLabel: 'Inversión',
      ctaText: 'Solicitar Propuesta de este Plan',
      prevBtn: 'Anterior',
      prevAria: 'Plan anterior',
      nextBtn: 'Siguiente',
      nextAria: 'Siguiente plan',
      plans: [
        {
          id: 'satelite',
          num: '01',
          altitudeLabel: 'Rama Alta',
          shortTitle: 'Satélite',
          title: 'Satélite - Plan Base',
          summary:
            'Mapeo y diagnóstico macroscópico por teledetección satelital.',
          howItWorks: [
            {
              text: 'Imágenes satelitales multiespectrales de alta resolución espacial',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Cálculo de índices de vegetación (NDVI)',
              sourceLabel: 'INPE / Teledetección',
              sourceUrl:
                'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
            },
            {
              text: 'Identificación de áreas con déficit crítico de cobertura vegetal e informe panorámico municipal',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Diagnóstico inicial para municipios',
          price: 'A consultar'
        },
        {
          id: 'drones',
          num: '02',
          altitudeLabel: 'Rama Media',
          shortTitle: 'Drones',
          title: 'Drones - Plan Integrado con Drones',
          summary:
            'Análisis avanzado de la cobertura vegetal y copas mediante vuelos aéreos especializados.',
          howItWorks: [
            {
              text: 'Vuelo automatizado con sensores ópticos de alta definición',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Modelado tridimensional (3D) y ortomosaicos georreferenciados',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Detección temprana de plagas, ramas secas, riesgo de caída y evaluación volumétrica de la copa',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Grandes avenidas, plazas y corredores verdes',
          price: 'A consultar'
        },
        {
          id: 'sensores',
          num: '03',
          altitudeLabel: 'Rama Baja',
          shortTitle: 'Sensores por Árbol',
          title: 'Sensores por Árbol - Plan Sensores IoT',
          summary:
            'Monitoreo continuo en tiempo real por telemetría dedicada e Internet de las Cosas.',
          howItWorks: [
            {
              text: 'Estaciones de monitoreo IoT en vías críticas y árboles estratégicos',
              sourceLabel: 'Espressif IoT',
              sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
            },
            {
              text: 'Lectura 24/7 de microclima: humedad del aire, temperatura y humedad del suelo',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Alertas automáticas predictivas de estrés hídrico, riesgo fitosanitario y visión artificial',
              sourceLabel: null,
              sourceUrl: null
            }
          ],
          audience: 'Puntos críticos con islas de calor y árboles históricos',
          price: 'A consultar'
        },
        {
          id: 'cadastro',
          num: '04',
          altitudeLabel: 'Raíz',
          shortTitle: 'Registro en Campo',
          title: 'Registro Técnico en Campo - Plan Técnico',
          summary:
            'Entorno interactivo corporativo para que técnicos y gestores mapeen y gestionen árboles.',
          howItWorks: [
            {
              text: 'Panel de gestión técnica para alcaldías y secretarías con geolocalización individual',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Historial completo de podas, fertilizaciones, informes fitosanitarios y mantenimientos',
              sourceLabel: null,
              sourceUrl: null
            },
            {
              text: 'Clasificación asistida de especies nativas frente a invasoras',
              sourceLabel: 'Flora do Brasil 2020',
              sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
            }
          ],
          audience: 'Secretarías de Medio Ambiente y Obras Públicas',
          price: 'A consultar'
        }
      ]
    },
    partners: {
      eyebrow: 'Ecosistema y Apoyo',
      title: 'Socios Institucionales',
      ariaLabel: 'Socios institucionales',
      items: [
        {
          id: 'ufs-itabaiana',
          name: 'UFS — Campus Itabaiana',
          subtitle: 'Universidad Federal de Sergipe',
          logo: '/assets/partners/ufs-itabaiana.png',
          alt: 'Logo de la Universidad Federal de Sergipe - UFS Campus Itabaiana'
        },
        {
          id: 'immun',
          name: 'IMMUN',
          subtitle: 'Proyecto de Simulación de la ONU',
          logo: '/assets/partners/immun.png',
          alt: 'Logo del proyecto de simulación de la ONU IMMUN'
        }
      ]
    },
    team: {
      title: 'Nuestro Equipo',
      subtitle:
        'Conozca al equipo de estudiantes, investigadores e innovadores de Sergipe dedicado a construir ciudades sostenibles e inteligentes.',
      photoAltPrefix: 'Foto de',
      linkedinAriaPrefix: 'LinkedIn de',
      instagramAriaPrefix: 'Instagram de',
      goalsTitle: 'Compromiso con los ODS de la ONU',
      goalsSubtitle:
        'Nuestro proyecto está directamente alineado con las directrices globales de la Organización de las Naciones Unidas para un futuro urbano sostenible y resiliente:',
      odsLabelPrefix: 'Alineación Estratégica con los',
      odsLinkText: 'Objetivos de Desarrollo Sostenible (ONU Brasil',
      odsLinkTitle: 'Acceder a la página oficial de los ODS en ONU Brasil',
      odsCardTitlePrefix: 'Ver detalles oficiales del',
      members: {
        'julio-monteiro': {
          role: 'Fundador, Desarrollador y Diseñador',
          desc: 'Creador de la iniciativa, lidera el desarrollo técnico, software y experiencia visual. Estudiante de Ciencias de la Computación en la UFS.'
        },
        otavio: {
          role: 'Investigación Ambiental y Sostenibilidad',
          desc: 'Dedicado a la investigación ecosistémica, conservación y aplicación de métricas sostenibles. Estudiante de Ciencias Biológicas en la UFS.'
        },
        'yann-vinicius': {
          role: 'Investigación Ambiental y Sostenibilidad',
          desc: 'Actúa en el mapeo botánico, rigor ecológico y directrices de sostenibilidad del proyecto. Estudiante de Ciencias Biológicas en la UFS.'
        },
        'asafe-emanuel': {
          role: 'Hardware, Electrónica e IoT',
          desc: 'Desarrolla la arquitectura de sensores, firmware IoT, calibración y prototipado físico. Estudiante de Ingeniería Electrónica en la UFS.'
        },
        jonatas: {
          role: 'Técnico en Podas',
          desc: 'Actúa en el manejo técnico de podas, evaluación estructural y conservación de la salud arbórea en campo. Estudiante de Agroindustria en la UFS.'
        },
        ellen: {
          role: 'Investigación Ambiental y Sostenibilidad',
          desc: 'Actúa en la investigación biológica, evaluación de la salud arbórea y conservación de la flora nativa urbana. Estudiante de Ciencias Biológicas en la UFS.'
        },
        evilyn: {
          role: 'Comunicación y Medios Digitales',
          desc: 'Creación de narrativas digitales, diseño de piezas informativas y cobertura institucional en campo. Estudiante de Publicidad y Propaganda en la UFS.'
        },
        'pedro-moises': {
          role: 'Hardware, Electrónica e IoT',
          desc: 'Actúa en el desarrollo de hardware, integración de sensores IoT e instrumentación electrónica del sistema. Estudiante en la UFS.'
        },
        'vanessa-simplicio': {
          role: 'Comunicación y Relaciones Públicas',
          desc: 'Responsable de la narrativa institucional, asesoría editorial y divulgación estratégica del proyecto. Estudiante de Periodismo en la UFS.'
        }
      },
      ods: [
        {
          id: 'ods-11',
          code: 'ODS 11',
          title: 'Ciudades y Comunidades Sostenibles',
          desc: 'Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, resilientes y sostenibles.'
        },
        {
          id: 'ods-13',
          code: 'ODS 13',
          title: 'Acción por el Clima',
          desc: 'Adoptar medidas urgentes para combatir el cambio climático y sus impactos locales.'
        },
        {
          id: 'ods-15',
          code: 'ODS 15',
          title: 'Vida de Ecosistemas Terrestres',
          desc: 'Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres.'
        }
      ]
    },
    events: {
      eyebrow: 'Destacados',
      title: 'Destacados del Proyecto',
      subtitle:
        'Reconocimientos, premios y participaciones oficiales de Arborização Inteligente en ferias científicas, eventos de innovación y conferencias climáticas.',
      prevAria: 'Destacado anterior',
      nextAria: 'Siguiente destacado',
      carouselAria: 'Carrusel de eventos y premios destacados',
      dotAriaPrefix: 'Ir al evento',
      sourcePrefix: 'Organismo / Realización:',
      items: [
        {
          id: 'cienart-2025',
          title: 'CIENART 2025',
          statusPill: 'Doble Oro',
          statusType: 'past',
          image: 'assets/eventos/cienart.jpg',
          alt: 'Equipo de Arborização Inteligente premiado con dos medallas de oro en la feria científica CIENART',
          dateTag: 'Septiembre 2025 | Aracaju, SE',
          desc: 'Feria Científica de Sergipe que reúne proyectos innovadores de todo el estado. Arborização Inteligente obtuvo doble medalla de oro en dos categorías por el desarrollo e impacto de su solución para la sostenibilidad urbana.',
          highlightIcon: 'medal-duotone',
          highlightTag: 'Doble Medallistas de Oro',
          attendeesTag: '2 Categorías Premiadas',
          sourceOrg: 'Universidad Federal de Sergipe (UFS) / FAPITEC',
          sourceUrl: 'https://www.ufs.br/'
        },
        {
          id: 'robot-se',
          title: 'ROBOT-SE',
          statusPill: 'Subcampeones',
          statusType: 'past',
          image: 'assets/eventos/robotse.jpg',
          alt: 'Equipo de Arborização Inteligente demostrando el prototipo IoT en la competencia ROBOT-SE',
          dateTag: 'Sergipe | Edición Oficial',
          desc: 'Mayor competencia de robótica y tecnología STEM de la región. Obtuvimos el título de subcampeones demostrando en vivo el funcionamiento del prototipo IoT con ESP32 y telemetría arbórea en tiempo real.',
          highlightIcon: 'medal-duotone',
          highlightTag: 'Subcampeones',
          attendeesTag: 'Demostración Práctica IoT',
          sourceOrg: 'Competencia Regional de Robótica y STEM',
          sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
        },
        {
          id: 'mini-cop-30',
          title: 'Mini COP 30 Sergipe',
          statusPill: 'Realizado',
          statusType: 'past',
          image: 'assets/eventos/mini-cop.jpg',
          alt: 'Presentación de Arborização Inteligente en la conferencia climática Mini COP 30 Sergipe',
          dateTag: 'Agosto 2025 | Aracaju, SE',
          desc: 'Conferencia preparatoria sobre cambio climático y adaptación sostenible. Presentación del proyecto como referente en el uso de tecnología para preservar la vida y combatir las islas de calor.',
          highlightIcon: 'globe-hemisphere-west-duotone',
          highlightTag: 'Adaptación Climática',
          attendeesTag: '500+ participantes',
          sourceOrg: 'Conferencia del Clima / Ministerio del Medio Ambiente (MMA)',
          sourceUrl: 'https://www.gov.br/mma/pt-br/assuntos/mudanca-do-clima/cop30'
        }
      ]
    },
    blog: {
      eyebrow: 'Actualizaciones y Artículos',
      title: 'Blog y Noticias del Proyecto',
      subtitle:
        'Siga las publicaciones más recientes, artículos técnicos, investigaciones de campo e hitos de Arborização Inteligente.',
      searchFormAria: 'Buscar publicaciones',
      searchPlaceholder: 'Buscar artículos...',
      searchInputAria: 'Buscar artículos',
      clearSearchAria: 'Limpiar búsqueda',
      searchBtnAria: 'Buscar',
      categoriesAria: 'Filtrar por categoría',
      featuredBadge: 'Destacado',
      readFullBtn: 'Leer artículo completo',
      gridTitle: 'Publicaciones del Proyecto',
      readMoreBtn: 'Leer más',
      counterZero: 'No se encontraron noticias',
      counterOne: '1 publicación encontrada',
      counterManySuffix: 'publicaciones encontradas',
      emptySearchTitle: 'Sin resultados',
      emptySearchDescPrefix: 'No encontramos ninguna publicación para',
      emptySearchDescSuffix: 'Intente con otros términos de búsqueda.',
      emptyDefaultTitle: 'Artículos en Producción',
      emptyDefaultDesc:
        'Aún no hay publicaciones en esta categoría. ¡Nuestros artículos técnicos y científicos están en fase de producción por nuestro equipo y se publicarán pronto!',
      resetBtn: 'Ver todas las noticias',
      modalCloseAria: 'Cerrar modal',
      modalShareBtn: 'Compartir',
      modalCloseBtn: 'Cerrar',
      shareToastSuccess: '✓ ¡Enlace del artículo copiado al portapapeles!',
      shareToastError: 'No fue posible copiar el enlace.',
      categories: [
        { id: 'all', label: 'Todos' },
        { id: 'tecnologia', label: 'Tecnología' },
        { id: 'sustentabilidade', label: 'Sostenibilidad' },
        { id: 'inovacao', label: 'Innovación' },
        { id: 'comunidade', label: 'Comunidad' },
        { id: 'pesquisa', label: 'Investigación' }
      ],
      posts: [
        {
          id: 'lancamento-novo-site-oficial',
          title: 'Lanzamiento del Nuevo Sitio Oficial de Arborização Inteligente',
          category: 'tecnologia',
          badge: 'Lanzamiento Oficial',
          date: '25 de Septiembre, 2026',
          readTime: '3 min de lectura',
          author: 'Equipo Arborização Inteligente',
          image: 'assets/equipe.jpg',
          featured: true,
          excerpt:
            'Con gran satisfacción presentamos el nuevo portal oficial de Arborização Inteligente: un espacio moderno, accesible y transparente para conectar tecnología IoT, IA y gestión ecológica urbana.',
          content: `
            <p>¡Bienvenido al <strong>nuevo portal oficial de Arborização Inteligente</strong>! Desarrollamos esta plataforma como el punto de encuentro entre nuestra investigación científica, la tecnología de monitoreo ambiental y la sociedad.</p>
            <h3>¿Qué encontrará en el nuevo portal?</h3>
            <p>El sitio fue estructurado para presentar con claridad cada pilar de nuestra solución:</p>
            <ul>
              <li><strong>Diagnóstico Urbano:</strong> Contextualización del desafío urgente de la cobertura vegetal en Brasil y Sergipe, con datos oficiales del <a href="https://censo2022.ibge.gov.br/" target="_blank" rel="noopener noreferrer">Censo Demográfico del IBGE (2022)</a>.</li>
              <li><strong>Tecnología y Hardware IoT:</strong> Detalle de los sensores en campo (<a href="https://www.espressif.com/en/products/socs/esp32" target="_blank" rel="noopener noreferrer">ESP32</a>, DHT11, AHT25), inteligencia artificial predictiva y monitoreo aéreo con drones.</li>
              <li><strong>Alineación con los ODS de la ONU:</strong> Nuestro compromiso directo con los <a href="https://brasil.un.org/pt-br/sdgs" target="_blank" rel="noopener noreferrer">Objetivos de Desarrollo Sostenible de la ONU</a>: ODS 11 (Ciudades Sostenibles), 13 (Acción por el Clima) y 15 (Vida de Ecosistemas Terrestres).</li>
              <li><strong>Equipo y Reconocimientos:</strong> Quiénes hacen posible la ciencia y los premios obtenidos, como <a href="https://www.ufs.br/" target="_blank" rel="noopener noreferrer">CIENART (UFS)</a>, ROBOT-SE y Mini COP 30.</li>
              <li><strong>Canales Abiertos de Contacto:</strong> Acceso directo para alianzas gubernamentales, académicas y comunitarias.</li>
            </ul>
            <blockquote class="blog-quote">
              El sitio fue desarrollado para mostrar una visión general del proyecto y publicar noticias relevantes sobre arborización. Próximamente lanzaremos el sistema de monitoreo en tiempo real con paneles e informes técnicos para investigadores y gestores públicos.
            </blockquote>
            <h3>Artículos científicos y técnicos en producción</h3>
            <p>Informamos a la comunidad académica y a los socios que los <strong>artículos científicos e informes técnicos detallados</strong> sobre la metodología de sensado, calibración y algoritmos predictivos están actualmente en producción y revisión. ¡Pronto estarán disponibles para lectura y descarga gratuita aquí mismo!</p>
          `
        },
        {
          id: 'apresentacao-nova-logo-oficial',
          title: 'Nueva Identidad Visual: Conozca el Logotipo Oficial del Proyecto',
          category: 'inovacao',
          badge: 'Identidad Visual',
          date: '24 de Septiembre, 2026',
          readTime: '2 min de lectura',
          author: 'Comunicación y Diseño',
          image: 'assets/logo.png',
          featured: false,
          excerpt:
            'Presentamos oficialmente la nueva identidad visual de Arborização Inteligente. Una marca moderna que simboliza la unión entre la naturaleza viva de los árboles urbanos y las rutas de datos de la tecnología.',
          content: `
            <p>El proyecto <strong>Arborização Inteligente</strong> da un paso decisivo en su trayectoria institucional y presenta al público su <strong>nueva identidad visual oficial</strong>.</p>
            <p>Desarrollada para reflejar la madurez y sofisticación tecnológica de nuestra iniciativa, la nueva marca traduce visualmente la esencia de lo que investigamos y construimos cada día: la armonía entre la biología vegetal y la innovación computacional.</p>
            <h3>El Concepto del Nuevo Logotipo</h3>
            <p>Cada detalle de la composición fue planificado estratégicamente:</p>
            <ul>
              <li><strong>El Árbol Tecnológico:</strong> El tronco y las ramas se transforman en pistas de circuito impreso con nodos y conectores, representando los sensores IoT y los flujos continuos de telemetría ambiental.</li>
              <li><strong>Follaje Vivo y Sostenible:</strong> Las hojas en tonos verdes y esmeralda simbolizan la fotosíntesis, la flora nativa y el compromiso urgente con el confort térmico urbano.</li>
              <li><strong>Azul Profundo y Borde Dorado:</strong> El azul real aporta rigor científico, ingeniería y confiabilidad a los datos, enmarcado por un aro dorado que celebra la excelencia y el impacto socioambiental.</li>
            </ul>
            <blockquote class="blog-quote">
              "Una marca sólida para un propósito urgente: usar inteligencia artificial y robótica para proteger la vida y refrescar las ciudades brasileñas."
            </blockquote>
            <p>La nueva identidad ya está integrada en este portal y se utilizará en todas las publicaciones científicas, presentaciones en congresos y dispositivos de monitoreo en campo.</p>
          `
        }
      ]
    },
    contact: {
      eyebrow: 'Canales de Atención',
      title: 'Póngase en Contacto con Nosotros',
      subtitle:
        '¿Tiene interés en implementar Arborização Inteligente en su ciudad, institución o proyecto? Hable directamente con nuestro equipo.',
      emailCardLabel: 'Correo Oficial',
      emailCardTitle: 'Escríbanos por Correo',
      emailCardDesc:
        'Envíe propuestas, solicitudes de alianzas municipales, convenios académicos o consultas técnicas.',
      emailCardBtn: 'Enviar Correo',
      phoneCardLabel: 'Teléfono y WhatsApp',
      phoneCardTitle: 'Atención Directa',
      phoneCardDesc:
        'Hable directamente con la coordinación del proyecto para demostraciones y alianzas institucionales.',
      phoneCardBtn: 'Llamar Ahora',
      formBadge: 'Mensaje Directo',
      formTitle: 'Envíe su Mensaje',
      formDesc:
        'Complete los campos a continuación y nuestro equipo le responderá lo antes posible a su correo.',
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Ingrese su nombre o institución',
      emailLabel: 'Correo electrónico de contacto',
      emailPlaceholder: 'sucorreo@ejemplo.com',
      messageLabel: 'Mensaje',
      messagePlaceholder:
        'Cuéntenos cómo podemos colaborar con su ciudad, investigación o institución...',
      submitBtn: 'Enviar Mensaje',
      sendingBtn: 'Enviando...',
      errorRequired: 'Por favor, complete todos los campos obligatorios.',
      errorEmail: 'Por favor, ingrese una dirección de correo electrónico válida.',
      successMsg:
        '✓ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto a través del correo informado.',
      errorSend:
        'Ocurrió un error al enviar. Inténtelo de nuevo o escriba directamente a arborizacaointeligente1@gmail.com.'
    },
    footer: {
      brandSubtitle: 'Tecnología y datos para ciudades sostenibles',
      tagline:
        '"Una ciudad inteligente es aquella que usa tecnología para preservar la vida."',
      navTitle: 'Navegación',
      navArborizacao: 'Arborización Urbana',
      navSolucao: 'Nuestra Solución y Planes',
      navTecnologia: 'Segmentos Tecnológicos',
      navParceiros: 'Socios Institucionales',
      navQuemSomos: 'Quiénes Somos',
      navDestaques: 'Destacados del Proyecto',
      navBlog: 'Blog del Proyecto',
      navContato: 'Contáctenos',
      contactTitle: 'Contacto y Redes',
      instagramAria: 'Instagram oficial de Arborização Inteligente',
      linkedinAria: 'LinkedIn oficial de Arborização Inteligente',
      emailAria: 'Enviar correo a Arborização Inteligente',
      phoneAria: 'Llamar a Arborização Inteligente',
      copyright:
        '© 2026 Arborização Inteligente. Todos los derechos reservados.',
      ods11: 'ODS 11 - Ciudades Sostenibles',
      ods13: 'ODS 13 - Acción por el Clima',
      ods15: 'ODS 15 - Vida de Ecosistemas Terrestres'
    }
  }
};
