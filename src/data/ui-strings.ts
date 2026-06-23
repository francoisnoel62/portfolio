export type Lang = 'fr' | 'en';

export interface UIStrings {
  tbSession: string;
  online: string;
  session: string;
  model: string;
  ready: string;
  agentsWord: string;
  ctx: string;
  placeholder: string;
  hintPrefix: string;
  hintSuffix: string;
  hintAgents: [string, string][];
  send: string;
  orientName: string;
  orientRole: string;
  greet: string;
  chips: [string, string][];
  fallback: string;
  langName: { fr: string; en: string };
  runVerb: string;
}

export const UI: Record<Lang, UIStrings> = {
  fr: {
    tbSession: "session d'agents",
    online: "en ligne", session: "session", model: "modèle",
    ready: "prêt", agentsWord: "agents", ctx: "contexte",
    placeholder: "posez une question, ou tapez /help, ex. « résumé 30 secondes »",
    hintPrefix: "Agents en ligne\u00a0:",
    hintSuffix: "Cliquez-en un, ou écrivez.",
    hintAgents: [
      ['profil', 'profil'],
      ['realisations', 'réalisations'],
      ['stack', 'stack'],
      ['parcours', 'parcours'],
      ['livre', 'IA'],
      ['contact', 'contact'],
    ],
    send: "Envoyer ⏎",
    orientName: "@orienteur", orientRole: "accueil & routage",
    greet: "Développeur full-stack senior, fort de 10 années d'expérience opérationnelle, je conçois des applications web fiables, maintenables et centrées sur les besoins métier. Spécialisé dans les usages concrets de l'intelligence artificielle, je privilégie les solutions qui créent une valeur réelle plutôt que les effets de mode. Cette page rassemble les éléments essentiels de mon profil : projets livrés, stack technique, expertise et moyens de contact.",
    chips: [['profil','Résumé 30 secondes'],['realisations','Preuves livrées'],['stack','Matrice seniorité'],['parcours','Parcours'],['livre','Expertise IA'],['contact','Le contacter']],
    fallback: "Je n'ai pas d'agent dédié à cette requête, mais ceux-ci peuvent vous aider :",
    langName: { fr: "français", en: "anglais" },
    runVerb: "run"
  },
  en: {
    tbSession: "agent session",
    online: "online", session: "session", model: "model",
    ready: "ready", agentsWord: "agents", ctx: "context",
    placeholder: 'ask anything, or type /help, e.g. "30-second brief"',
    hintPrefix: "Agents online\u00a0:",
    hintSuffix: "Click one, or type.",
    hintAgents: [
      ['profil', 'profile'],
      ['realisations', 'work'],
      ['stack', 'stack'],
      ['parcours', 'career'],
      ['livre', 'AI'],
      ['contact', 'contact'],
    ],
    send: "Send ⏎",
    orientName: "@host", orientRole: "welcome & routing",
    greet: "Senior full-stack developer with 10 years of operational experience, I design reliable, maintainable web applications centred on real business needs. Specialised in practical applications of artificial intelligence, I favour solutions that create genuine value over fleeting trends. This page brings together the key elements of my profile: shipped projects, technical stack, expertise and contact details.",
    chips: [['profil','30-second brief'],['realisations','Shipped proof'],['stack','Seniority matrix'],['parcours','Career path'],['livre','AI expertise'],['contact','Contact him']],
    fallback: "I don't have a dedicated agent for that, but these can help:",
    langName: { fr: "French", en: "English" },
    runVerb: "run"
  }
};
