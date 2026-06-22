import type { AgentId } from '../data/agents';

export type RouteResult = AgentId | 'help' | 'clear' | null;

export function route(text: string): RouteResult {
  const t = text.toLowerCase();
  if (/help|aide|\?|menu/.test(t)) return 'help';
  if (/clear|cls|efface/.test(t)) return 'clear';
  if (/profil|profile|brief|r[ée]sum[ée]|resume|30|senior|fullstack|recrut/.test(t)) return 'profil';
  if (/projet|r[ée]alis|produit|revise|work|app/.test(t)) return 'realisations';
  if (/livre|ouvrage|book|essai|publi|ia|ai|agent|llm/.test(t)) return 'livre';
  if (/parcours|carri|career|exp[ée]rience|h[ôo]tel|histoire|story/.test(t)) return 'parcours';
  if (/stack|techno|comp[ée]tence|skill|outil|tool|langage|language|python|django/.test(t)) return 'stack';
  if (/[ée]crit|note|article|blog|id[ée]e|advocate|writing|essay/.test(t)) return 'notes';
  if (/contact|mail|email|joindre|reach|hire|embauch|dispo|cv/.test(t)) return 'contact';
  return null;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] ?? c));
}
