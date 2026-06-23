import { BOOK_CHAPTERS } from './book-chapters';
import type { BookChapter } from './book-chapters';

export const AGENT_ORDER = ['profil','realisations','stack','parcours','livre','notes','contact'] as const;
export type AgentId = typeof AGENT_ORDER[number];
export type Lang = 'fr' | 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DATA: Record<Lang, Record<AgentId, any>> = {
    fr:{
      profil:{
        name:'@profil', role:'résumé recruteur · 30 secondes', badge:'◎', tab:'profile.md', color:'var(--accent)',
        type:'profile', tool:{fn:'analyze', arg:'cv + portfolio --target fullstack-senior', res:'4 signaux forts'},
        intro:"Je sais identifier quand l’IA apporte un avantage compétitif, mais aussi quand elle ajoute de la complexité inutile. Cette approche pragmatique me permet de concevoir des produits qui résolvent des problèmes concrets plutôt que de suivre les tendances du moment.",
        data:{
          metrics:[
            ['8 ans','de code en production'],
            ['10 ans','d’expérience métier terrain'],
            ['4','environnements produit livrés'],
            ['1','SaaS IA fondé']
          ],
          signals:[
            {k:"Produit", t:"Je construis pour un usage réel", d:"Revise, outils internes, add-ins Office et modules métiers : le code sert une expérience et un workflow, pas une démo."},
            {k:"Production", t:"Je connais les contraintes de livraison", d:"APIs, données, qualité, revues, documentation, formation et maintien d’applications en contexte entreprise."},
            {k:"IA appliquée", t:"Je sais quand ne pas faire un agent", d:"Réécriture assistée par IA, analyse narrative, workflows agentiques, context engineering, RAG, automatisation métier : je maîtrise ces outils, mais mon véritable métier est de faire les bons choix d’architecture."},
            {k:"Métier", t:"Je modélise avant d’automatiser", d:"Dix ans d’hôtellerie de luxe ont installé une discipline : écouter, comprendre le processus, livrer fiable."}
          ],
          cta1:'Me contacter', cta2:'Télécharger le CV'
        }
      },
      livre:{
        name:'@livre-ia', role:'preuve d’expertise IA', badge:'✦', tab:'ai-book.md', color:'var(--accent)',
        type:'book', tool:{fn:'open', arg:'writing/from-demo-to-production.md', res:'manuscrit · ~134 p.'},
        intro:"Cet ouvrage est le fruit de douze mois passés à concevoir, déployer et faire évoluer des agents IA dans des environnements réels, avec de vrais utilisateurs, de vraies contraintes et de vraies conséquences.\n\nIl ne s’agit pas d’un guide théorique sur les modèles, mais d’un retour d’expérience sur ce qui fait réellement la différence entre une démonstration impressionnante et un système fiable en production.\n\nLa thèse est simple : lorsqu’un agent échoue, le problème vient rarement du modèle. Dans la majorité des cas, la cause se trouve dans l’architecture, le contexte, les garde-fous, les workflows ou les choix de conception qui l’entourent.\n\nCet essai explore ce constat à travers des exemples concrets, des échecs observés sur le terrain et des principes applicables à la construction d’agents capables de survivre au monde réel.",
        data:{
          kicker:"essai · à paraître 2026", title:"From Demo<br>to Production",
          sub:"Building AI Agents That Survive the Real World",
          meta:"≈ 134 p. · guide en français · en cours d’écriture",
          lead:"Le livre corrige les six erreurs d’architecture qui transforment un agent prometteur en dette opérationnelle :",
          six:[
            "<b>Un agent là où un workflow suffit.</b> Une grille de décision pour trancher.",
            "<b>Chercher l’autonomie immédiate.</b> La progression Assisté → Supervisé → Autonome.",
            "<b>Traiter le contexte comme illimité.</b> Construire un budget de contexte.",
            "<b>Ignorer l’amnésie des LLMs.</b> Externaliser la mémoire correctement.",
            "<b>Des boucles ReAct naïves.</b> Pourquoi la planification structurée change tout.",
            "<b>Ajouter l’évaluation après coup.</b> L’intégrer dès le jour zéro."
          ],
          note:"// méta : vous êtes dans un agent. Ce livre explique comment en bâtir qui survivent à la production.",
          cta1:"Télécharger l’extrait (intro + chap. 1–4)", cta2:"Être prévenu de la sortie",
          mailtoSubj:"From%20Demo%20to%20Production%20%E2%80%94%20me%20pr%C3%A9venir%20de%20la%20sortie",
          chapters: BOOK_CHAPTERS
        }
      },
      parcours:{
        name:'@parcours', role:'8 ans de code, 10 ans d’hôtellerie', badge:'⏳', tab:'parcours.md',
        type:'timeline', tool:{fn:'read_file', arg:'career/timeline.json', res:'4 étapes'},
        intro:"Avant le développement logiciel, j’ai passé dix années dans l’hôtellerie de luxe, au contact direct des clients, des opérations et des exigences du terrain.\n\nEn 2017, j’ai choisi de faire du code mon métier. Cette transition n’a pas effacé mon parcours précédent : elle l’a enrichi. Elle m’a apporté une compréhension concrète des enjeux métier, du service, de la qualité d’exécution et de la réalité opérationnelle que les logiciels doivent servir.\n\nVoici la trajectoire qui m’a conduit du terrain à l’ingénierie logicielle.",
        data:[
          ["— 2016","L’hôtellerie de luxe","10 ans à lire un besoin, modéliser un service et livrer une expérience fiable. La matrice de ma façon de concevoir un logiciel."],
          ['2016 — 18','Le pari','Reconversion et DUT Informatique (IUT Paris-Descartes). La passion du code cesse d’être un hobby.'],
          ['2018 — 25','Le code, en prod','Air France KLM Cargo, Open Net, Planair SA. Fullstack, APIs, add-ins, standards qualité et formation d’équipe.'],
          ['Aujourd’hui','L’IA, au cœur','Applications IA, context engineering, workflows agentiques. Construire avec les LLM, et l’expliquer.']
        ]
      },
      realisations:{
        name:'@réalisations', role:'produits livrés, pas des slides', badge:'◆', tab:'projects.json',
        type:'cards', tool:{fn:'query', arg:'projects --order recent', res:'6 résultats'},
        intro:"Cette sélection regroupe des produits personnels, des side projects et des missions professionnelles représentatifs de mon parcours.",
        data:[
          {lead:true, t:"revise.studio", when:"fondateur · SaaS en bêta", d:"Plateforme d’écriture tout-en-un pour auteurs de fiction francophones : idéation, rédaction, correction, édition, publication. Fonctions IA maison, réécriture en 3 variantes, analyse narrative sur 5 axes, développement de scènes, bible de projet. Conçu, construit et lancé par moi.", tags:["Fondateur","Next.js","Applications IA","LLM","SaaS"], proof:["Produit livré","Autonomie complète","IA appliquée","Vision produit"], link:"https://revise.studio", linkTxt:"revise.studio ↗"},
          {t:"Hotelix", when:"fondateur · SaaS hôtellerie", d:"Logiciel de gestion hôtelière : planification des chambres, suivi des équipes, traitement des tickets opérationnels (maintenance, ménage, réclamations, facturation). Cas d’école de ma double culture : l’analyse de 200 tickets réels a montré que 93 % étaient déterministes, d’où un workflow + LLM ciblé sur les 7 % ambigus, plutôt que le multi-agent envisagé.", tags:["Fondateur","Next.js","TypeScript","PostgreSQL","Multi-tenant"], proof:["Métier hôtelier","Workflow > agent","Multi-tenant","Décision d’archi"], chapter:"11.4_cas_hotelix.md", linkTxt:"lire le cas ↗"},
          {t:"openemail · Ralph Loop", when:"side project public", d:"API email pour développeurs, construite via une boucle de développement agentique autonome (Ralph Loop) : l’agent lit un PRD, son journal d’état et le code, décide, implémente, teste, commit, puis reprend. Preuve concrète de ce qu’exige un agent fiable : mémoire externalisée, définition de done et bornes d’itération.", tags:["Next.js","TypeScript","PostgreSQL","Drizzle","AWS SES","Agents"], proof:["Side project public","Agent de dev","Mémoire d’état","Saga pattern"], chapter:"11.5_cas_ralph_loop.md", linkTxt:"lire le cas ↗"},
          {t:'Applications métiers & outils internes', when:'Planair SA · 2024–25', d:'Backend Django, frontend Next.js, APIs REST et librairies Python internes. Add-ins C# pour Word et Outlook. Standards qualité : revues, doc, formations. Impact : outillage métier plus fiable, mieux documenté et transmissible aux équipes.', tags:['Django','Next.js','TypeScript','PostgreSQL','C#'], proof:['Production','Architecture','Formation','Qualité code']},
          {t:'Modules Odoo sur mesure', when:'Open Net · 2020–23', d:'Développement et personnalisation de modules Odoo, interfaces et rapports (QWeb, Excel), scripts de migration de données, tests et formation client. Responsabilité : traduire des besoins client en modules maintenables.', tags:['Python','Odoo','PostgreSQL','QWeb','Linux'], proof:['Client','Données','Migration','ERP']},
          {t:'Plateforme fret — fullstack', when:'Air France KLM Cargo · 2018–19', d:'Conception et développement Angular / Spring Boot. Revues de code, bonnes pratiques, disponibilité et performance avec les équipes DevOps. Première expérience forte en application critique et collaboration production.', tags:['Angular','Java','Spring Boot','JPA','MySQL'], proof:['Fullstack','DevOps','Performance','Revue code']}
        ]
      },
      stack:{
        name:'@stack', role:'langages, IA, pratiques', badge:'⚙', tab:'stack.toml',
        type:'stack', tool:{fn:'scan', arg:'competencies.toml', res:'3 domaines'},
        intro:"Cette matrice présente ce que je suis réellement capable de prendre en charge dans un produit full-stack : architecture, backend, frontend, bases de données, qualité logicielle, déploiement, observabilité, intégration d'IA et pilotage technique.",
        data:[
          {cls:'scol--code', h:'Architecture produit', d:'Backends Django, APIs REST, données PostgreSQL, intégration de services et frontends Next.js pensés pour durer.', items:['Python','Django','TypeScript','Next.js','PostgreSQL','REST APIs']},
          {cls:'scol--craft', h:'Seniorité delivery', d:'Au-delà du code : traduire un besoin flou en architecture, livrer fiable, documenter, former les équipes et corriger les mauvais choix avant qu’ils deviennent de la dette. Une séniorité d’usage, pas de titre.', items:['TDD','Clean architecture','Revue de code','Documentation','Formation','Git']},
          {cls:'scol--ai', h:'Différenciation IA', d:'Fonctions LLM concrètes, context engineering, workflows agentiques et recul architectural sur les limites des agents.', items:['LLM','Applications IA','Context Engineering','Agents','MCP','Evaluation']}
        ]
      },
      notes:{
        name:'@field-notes', role:'écrits sur l’IA', badge:'✎', tab:'writing/index.md',
        type:'notes', tool:{fn:'fetch', arg:'writing/index.md', res:'3 notes'},
        intro:"Construire des logiciels est une partie du métier.\n\nComprendre pourquoi certains réussissent, pourquoi d’autres échouent, comment les équipes travaillent, comment les utilisateurs contournent les systèmes et comment l’IA modifie ces équilibres en est une autre.\n\nJ’écris pour documenter ces observations, partager des retours d’expérience et mettre à l’épreuve certaines idées reçues sur la technologie, les agents IA et la construction de produits.\n\nDes notes de terrain, avant tout.",
        readLabel:"lire ↗",
        data:[
          ['// context engineering','Le contexte est le nouveau code','La valeur d’une app LLM ne se joue plus dans le prompt, mais dans l’orchestration du contexte qu’on lui donne à raisonner.','3.1_le_contexte_nest_pas_un_parametre.md'],
          ['// agents','Concevoir des workflows agentiques fiables','Du jouet de démo au système de production : permissions, garde-fous, boucles de correction et patterns qui tiennent la charge.','1.2_difference_agent_vs_workflow_vs_automation.md'],
          ['// métier & ia','Le meilleur code naît du métier','Ce que dix ans de service apprennent à un développeur sur l’IA : écouter un besoin avant de l’automatiser.','11.4_cas_hotelix.md']
        ]
      },
      contact:{
        name:'@contact', role:'disponibilités & liens', badge:'✉', tab:'contact.vcard',
        type:'contact', tool:{fn:'open', arg:'contact.vcard', res:'prêt'},
        intro:"Je recherche des opportunités full-stack senior où je peux contribuer au-delà du code : compréhension métier, conception produit, architecture, développement et intégration d'IA appliquée.\n\nMa stack principale s'articule autour de Python/Django, TypeScript/Next.js et des technologies modernes de développement web.\n\nVous souhaitez échanger sur un poste, une mission ou un projet ? Voici les liens directs pour me contacter et consulter mon travail."
      }
    },
    en:{
      profil:{
        name:'@profile', role:'recruiter brief · 30 seconds', badge:'◎', tab:'profile.md', color:'var(--accent)',
        type:'profile', tool:{fn:'analyze', arg:'cv + portfolio --target senior-fullstack', res:'4 strong signals'},
        intro:"I know how to identify when AI delivers a competitive edge, and when it only adds unnecessary complexity. This pragmatic approach lets me design products that solve real problems rather than chase the latest trends.",
        data:{
          metrics:[
            ['8 yrs','coding in production'],
            ['10 yrs','business-facing experience'],
            ['4','product environments shipped'],
            ['1','AI SaaS founded']
          ],
          signals:[
            {k:'Product', t:'I build for real usage', d:'Revise, internal tools, Office add-ins and business modules: the code serves an experience and a workflow, not a demo.'},
            {k:'Production', t:'I know delivery constraints', d:'APIs, data, quality standards, reviews, documentation, training and maintaining applications in company contexts.'},
            {k:'Applied AI', t:'I know when not to build an agent', d:'AI-assisted rewriting, narrative analysis, agentic workflows, context engineering, RAG, business automation: I know these tools, but my real craft is making the right architecture calls.'},
            {k:'Domain', t:'I model before automating', d:'Ten years in luxury hospitality built the discipline to listen, understand the process and deliver reliably.'}
          ],
          cta1:'Contact him', cta2:'Download CV'
        }
      },
      livre:{
        name:'@ai-book', role:'AI expertise proof', badge:'✦', tab:'ai-book.md', color:'var(--accent)',
        type:'book', tool:{fn:'open', arg:'writing/from-demo-to-production.md', res:'manuscript · ~134 p.'},
        intro:"This book grew out of twelve months spent designing, deploying and iterating on AI agents in real environments, with real users, real constraints and real consequences.\n\nThis is not a theoretical guide to models, but a field report on what actually makes the difference between an impressive demo and a reliable production system.\n\nThe thesis is simple: when an agent fails, the problem is rarely the model. In most cases, the cause lies in the architecture, the context, the guardrails, the workflows or the design choices surrounding it.\n\nThis essay explores that observation through concrete examples, failures observed in the field and principles applicable to building agents capable of surviving the real world.",
        data:{
          kicker:"essay · coming 2026", title:"From Demo<br>to Production",
          sub:"Building AI Agents That Survive the Real World",
          meta:"≈ 134 p. · French-language guide · in progress",
          lead:"The book fixes the six architecture mistakes that turn a promising agent into operational debt:",
          six:[
            "<b>An agent where a workflow would do.</b> A decision grid to settle it.",
            "<b>Chasing full autonomy too early.</b> The Assisted → Supervised → Autonomous path.",
            "<b>Treating context as unlimited.</b> Building a context budget.",
            "<b>Ignoring the LLM’s amnesia.</b> Externalizing memory properly.",
            "<b>Naïve ReAct loops.</b> Why structured planning changes everything.",
            "<b>Bolting on evaluation later.</b> Build it in from day zero."
          ],
          note:"// meta: you’re inside an agent. This book explains how to build ones that survive production.",
          cta1:"Download the extract (intro + chap. 1–4)", cta2:"Get notified at launch",
          mailtoSubj:"From%20Demo%20to%20Production%20%E2%80%94%20notify%20me%20at%20launch",
          chapters: BOOK_CHAPTERS
        }
      },
      parcours:{
        name:'@career', role:'8 yrs of code, 10 yrs in hospitality', badge:'⏳', tab:'career.md',
        type:'timeline', tool:{fn:'read_file', arg:'career/timeline.json', res:'4 steps'},
        intro:"Before software development, I spent ten years in luxury hospitality, in direct contact with clients, operations and the demands of the field.\n\nIn 2017, I chose to make code my craft. That transition didn’t erase what came before, it enriched it. It gave me a concrete understanding of business challenges, service, execution quality and the operational reality that software must serve.\n\nHere is the path that took me from the field to software engineering.",
        data:[
          ['— 2016','Luxury hospitality','Ten years reading a need, modeling a service and delivering a reliable experience. The matrix of how I design software.'],
          ['2016 — 18','The leap','Career change and a CS degree (IUT Paris-Descartes). Coding stops being a hobby.'],
          ['2018 — 25','Code, in prod','Air France KLM Cargo, Open Net, Planair SA. Fullstack, APIs, add-ins, quality standards and team training.'],
          ['Today','AI, at the core','AI applications, context engineering, agentic workflows. Building with LLMs, and explaining it.']
        ]
      },
      realisations:{
        name:'@work', role:'shipped products, not slides', badge:'◆', tab:'projects.json',
        type:'cards', tool:{fn:'query', arg:'projects --order recent', res:'6 results'},
        intro:"This selection brings together personal products, side projects and professional assignments representative of my career.",
        data:[
          {lead:true, t:'revise.studio', when:'founder · SaaS in beta', d:'All-in-one writing platform for French-language fiction authors: ideation, drafting, editing, layout, publishing. In-house AI features, 3-variant rewriting, 5-axis narrative analysis, scene development, project bible. Designed, built and shipped by me.', tags:['Founder','Next.js','AI apps','LLM','SaaS'], proof:['Shipped product','Full autonomy','Applied AI','Product vision'], link:'https://revise.studio', linkTxt:'revise.studio ↗'},
          {t:'Hotelix', when:'founder · hospitality SaaS', d:'Hotel management software: room planning, team tracking, operational ticket handling (maintenance, housekeeping, complaints, billing). A textbook case of my dual culture: analyzing 200 real tickets showed 93% were deterministic, hence a workflow + LLM targeted at the 7% ambiguous cases, rather than the multi-agent system first considered.', tags:['Founder','Next.js','TypeScript','PostgreSQL','Multi-tenant'], proof:['Hospitality domain','Workflow > agent','Multi-tenant','Architecture call'], chapter:'11.4_cas_hotelix.md', linkTxt:'read the case ↗'},
          {t:'openemail · Ralph Loop', when:'public side project', d:'An email API for developers, built through an autonomous agentic dev loop (Ralph Loop): the agent reads a PRD, its state journal and the code, decides, implements, tests, commits, then resumes. A concrete proof of what a reliable agent requires: externalized memory, a definition of done and bounded iterations.', tags:['Next.js','TypeScript','PostgreSQL','Drizzle','AWS SES','Agents'], proof:['Public side project','Dev agent','State memory','Saga pattern'], chapter:'11.5_cas_ralph_loop.md', linkTxt:'read the case ↗'},
          {t:'Business apps & internal tooling', when:'Planair SA · 2024–25', d:'Django backend, Next.js frontend, REST APIs and internal Python libraries. C# add-ins for Word and Outlook. Quality standards: reviews, docs, training. Impact: more reliable, documented and transferable internal tooling.', tags:['Django','Next.js','TypeScript','PostgreSQL','C#'], proof:['Production','Architecture','Training','Code quality']},
          {t:'Custom Odoo modules', when:'Open Net · 2020–23', d:'Building and customizing Odoo modules, interfaces and reports (QWeb, Excel), data-migration scripts, functional tests and client training. Responsibility: turning client needs into maintainable business modules.', tags:['Python','Odoo','PostgreSQL','QWeb','Linux'], proof:['Client','Data','Migration','ERP']},
          {t:'Cargo platform — fullstack', when:'Air France KLM Cargo · 2018–19', d:'Angular / Spring Boot design and development. Code reviews, best practices, availability and performance with the DevOps teams. A strong early exposure to critical applications and production collaboration.', tags:['Angular','Java','Spring Boot','JPA','MySQL'], proof:['Fullstack','DevOps','Performance','Code review']}
        ]
      },
      stack:{
        name:'@stack', role:'languages, AI, practices', badge:'⚙', tab:'stack.toml',
        type:'stack', tool:{fn:'scan', arg:'competencies.toml', res:'3 areas'},
        intro:"This matrix shows what I can actually own in a full-stack product: architecture, backend, frontend, databases, software quality, deployment, observability, AI integration and technical leadership.",
        data:[
          {cls:'scol--code', h:'Product architecture', d:'Django backends, REST APIs, PostgreSQL data, service integration and durable Next.js frontends.', items:['Python','Django','TypeScript','Next.js','PostgreSQL','REST APIs']},
          {cls:'scol--craft', h:'Delivery seniority', d:'Beyond the code: turning a fuzzy need into architecture, shipping reliably, documenting, training teams and fixing bad calls before they become debt. Seniority by impact, not by title.', items:['TDD','Clean architecture','Code review','Documentation','Training','Git']},
          {cls:'scol--ai', h:'AI differentiation', d:'Concrete LLM features, context engineering, agentic workflows and architectural judgment about agent limits.', items:['LLM','AI apps','Context Engineering','Agents','MCP','Evaluation']}
        ]
      },
      notes:{
        name:'@field-notes', role:'writing on AI', badge:'✎', tab:'writing/index.md',
        type:'notes', tool:{fn:'fetch', arg:'writing/index.md', res:'3 notes'},
        intro:"Building software is one part of the craft.\n\nUnderstanding why some products succeed, why others fail, how teams work, how users work around systems and how AI is shifting these dynamics is another.\n\nI write to document these observations, share experience and challenge some received ideas about technology, AI agents and product building.\n\nField notes, above all.",
        readLabel:"read ↗",
        data:[
          ['// context engineering','Context is the new code','The value of an LLM app no longer lives in the prompt, but in orchestrating the context you give it to reason over.','3.1_le_contexte_nest_pas_un_parametre.md'],
          ['// agents','Designing reliable agentic workflows','From demo toy to production system: permissions, guardrails, correction loops and patterns that hold under real load.','1.2_difference_agent_vs_workflow_vs_automation.md'],
          ['// craft & ai','The best code comes from the domain','What ten years of service teach a developer about AI: listen to a need before automating it.','11.4_cas_hotelix.md']
        ]
      },
      contact:{
        name:'@contact', role:'availability & links', badge:'✉', tab:'contact.vcard',
        type:'contact', tool:{fn:'open', arg:'contact.vcard', res:'ready'},
        intro:"I'm looking for senior full-stack opportunities where I can contribute beyond the code: business understanding, product design, architecture, development and applied AI integration.\n\nMy main stack is built around Python/Django, TypeScript/Next.js and modern web development technologies.\n\nInterested in discussing a role, a contract or a project? Here are the direct links to reach me and review my work."
      }
    }
  };

export type BookChapterRef = BookChapter;
