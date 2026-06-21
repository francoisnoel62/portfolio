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
  hint: string;
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
    placeholder: "posez une question, ou tapez /help — ex. « résumé 30 secondes »",
    hint: 'Agents en ligne&nbsp;: <b>profil · réalisations · stack · parcours · IA · contact</b>. Cliquez-en un, ou écrivez.',
    send: "Envoyer ⏎",
    orientName: "@orienteur", orientRole: "accueil & routage",
    greet: "Développeur fullstack senior, formé par 10 ans de métier terrain, spécialisé dans les produits web robustes et les usages IA concrets. Cette session condense son profil pour recruteur pressé : preuves livrées, stack, trajectoire et contact direct.",
    chips: [['profil','Résumé 30 secondes'],['realisations','Preuves livrées'],['stack','Matrice seniorité'],['parcours','Parcours'],['livre','Expertise IA'],['contact','Le contacter']],
    fallback: "Je n'ai pas d'agent dédié à cette requête, mais ceux-ci peuvent vous aider :",
    langName: { fr: "français", en: "anglais" },
    runVerb: "run"
  },
  en: {
    tbSession: "agent session",
    online: "online", session: "session", model: "model",
    ready: "ready", agentsWord: "agents", ctx: "context",
    placeholder: "ask anything, or type /help — e.g. “30-second brief”",
    hint: 'Agents online&nbsp;: <b>profile · work · stack · career · AI · contact</b>. Click one, or type.',
    send: "Send ⏎",
    orientName: "@host", orientRole: "welcome & routing",
    greet: "Senior fullstack developer shaped by 10 years of business-facing service, focused on robust web products and practical AI use cases. This session gives a recruiter-speed read: shipped proof, stack, career path and direct contact.",
    chips: [['profil','30-second brief'],['realisations','Shipped proof'],['stack','Seniority matrix'],['parcours','Career path'],['livre','AI expertise'],['contact','Contact him']],
    fallback: "I don't have a dedicated agent for that, but these can help:",
    langName: { fr: "French", en: "English" },
    runVerb: "run"
  }
};
