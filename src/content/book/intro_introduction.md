---
section_id: "intro"
titre: "Introduction"
mots_cibles: 2000
mots_obtenus: 2047
these_locale: "Les agents IA échouent en production non pas à cause des modèles, mais à cause de choix d'architecture mal pensés."
role_dans_argument: "Établir la crédibilité de l'auteur par un parcours honnête, poser la thèse centrale, présenter les 6 erreurs structurelles + les nouvelles parties (7-11), et créer l'envie de lire la suite."
sources_utilisees: []
ecarts_au_plan:
  constat: "Ajout section Parcours honnête + mise à jour références parties 7-11"
  justification: "Réécriture selon le plan approuvé — ancrer les 12 mois, double culture, MCP/A2A"
---

# From Demo to Production: Building AI Agents That Survive the Real World

## Introduction

J'ai passé 12 mois à construire des agents IA en production.

Pas en démo.
Pas dans un notebook Jupyter.
Pas dans un environnement sandbox où tout fonctionne parfaitement.

En production réelle. Avec des utilisateurs réels. Des conséquences réelles.

Et j'ai vu des choses que les benchmarks ne montrent jamais.

J'ai vu un agent RH valider un contrat avec une clause de non-concurrence illégale — parce qu'on lui avait donné l'autonomie de valider sans lui donner les garde-fous pour le faire correctement. J'ai vu un agent de support client inventer une procédure de remboursement qui n'existait pas, promettre 200€ à un client, et créer un incident financier qu'il a fallu gérer manuellement pendant deux semaines. J'ai vu des agents internes — prometteurs en démo, unanimement approuvés en démo — devenir inutilisables en production, abandonnés par les équipes au bout de six semaines.

Ces échecs ont un point commun. Ce n'est pas GPT-4 qui était en cause. Ce n'est pas Claude. Ce n'est pas Llama.

C'est l'architecture.

---

## D'où viennent ces leçons

J'écris ce guide parce que j'ai construit des agents qui ont tenu en production — et d'autres qui n't tenu qu'en démo. Les leçons viennent de là : revise.studio (context engineering sur fiction longue), Hotelix (workflow hôtelier où l'agent était la mauvaise réponse), Ralph Loop (agent de développement autonome qui re-dérivait tout sans mémoire externe), et des missions de consulting dans des contextes que je n'identifierai pas.

Ce ne sont pas des leçons abstraites. Ce sont des erreurs que j'ai commises, des corrections que j'ai apportées, et des patterns que j'ai observés se répéter d'un projet à l'autre.

---

## Le problème qu'on ne voit pas

L'industrie a un biais. Quand un agent échoue, on cherche d'abord du côté du modèle. On change le prompt. On passe à un modèle plus puissant. On ajoute du few-shot. On optimise le chain-of-thought. Et parfois ça aide — mais le plus souvent, le problème est ailleurs.

Le problème, c'est qu'on a construit un agent là où un workflow aurait suffi. Ou qu'on a déployé en autonomie complète un agent qui n'avait pas encore prouvé qu'il pouvait prendre des décisions fiables. Ou qu'on a traité la fenêtre de contexte comme un buffer infini et qu'on s'est retrouvé avec un agent qui perd le fil sur des tâches longues. Ou qu'on n'a jamais pensé à la mémoire entre les sessions. Ou que la boucle ReAct s'effondre à la quatrième itération parce qu'il n'y a aucun mécanisme de planification. Ou qu'on a ajouté l'évaluation après coup — c'est-à-dire jamais vraiment.

Ces six erreurs, je les ai vues se répéter. Pas une fois. Pas deux fois. À chaque projet, dans des équipes différentes, avec des contextes différents, elles réapparaissaient.

Ce guide est construit autour de ces six erreurs — et de ce qui vient après : la sécurité, la conformité, la production, les outils actuels, et les preuves terrain.

---

## Ce que ce guide n'est pas

Ce n'est pas un tutoriel sur les LLMs. Si tu ne sais pas ce qu'est un context window, un pattern ReAct, ou du retrieval augmenté (RAG), commence par les bases et reviens ici.

Ce n'est pas non plus un comparatif de frameworks. LangChain, LlamaIndex, CrewAI, LangGraph, OpenAI Agents SDK — ils ont tous leur place, aucun ne règle les problèmes architecturaux qu'on va aborder. Ce guide est **framework-agnostic** : les patterns qu'il décrit s'implémentent dans n'importe quelle stack. Comprendre *pourquoi* un contrat standardisé entre agent et outil est nécessaire vaut plus que de savoir configurer un serveur MCP. Comprendre *pourquoi* les guardrails existent vaut plus que de connaître l'API `InputGuardrail`. Les standards changent — MCP, A2A, Agents SDK sont apparus en 2024–2025. Les problèmes qu'ils résolvent existaient avant eux, et existeront après leurs successeurs.

Et ce n'est pas une liste de best practices génériques du type "écris de bons prompts". Ces conseils sont vrais mais insuffisants. On va aller plus loin.

---

## Les six erreurs que ce guide corrige

**Erreur 1 : Construire un agent là où un workflow aurait suffi.** L'agent n'est pas le marteau universel. Il y a des cas où la complexité d'un agent est injustifiée — et où un workflow simple, déterministe, serait plus fiable, moins coûteux, et plus maintenable.

**Erreur 2 : Chercher l'autonomie immédiate.** L'autonomie complète est une destination, pas un point de départ. Un agent qu'on déploie sans filets de sécurité est un agent qui va faire des erreurs coûteuses.

**Erreur 3 : Traiter le contexte comme un paramètre illimité.** "J'ai 200K tokens, je peux tout mettre dedans." Non. La fenêtre de contexte est une ressource limitée qui se gère activement.

**Erreur 4 : Ignorer l'amnésie fondamentale des LLMs.** Un LLM est stateless. Chaque requête repart de zéro. Sans architecture mémoire explicite, ton agent perd le fil sur les tâches longues et ne capitalise jamais sur son expérience passée.

**Erreur 5 : Utiliser des boucles ReAct naïves.** Le pattern ReAct fonctionne bien en démo. En production, sur des tâches complexes, il s'effondre. Les erreurs s'accumulent. Les boucles divergent.

**Erreur 6 : Ajouter l'évaluation après coup.** L'évaluation qu'on prévoit d'ajouter "quand le système sera stable" ne se fait jamais. Sans évaluation dès le début, on ne détecte pas le drift comportemental, et on ne peut pas améliorer ce qu'on ne mesure pas.

---

## Ce que les Parties 7 à 11 ajoutent

Les six premières parties posent les fondations architecturales. Mais elles ne couvrent pas tout ce qu'un agent en production doit affronter.

**Partie 7 — Sécurité** : le threat model spécifique aux agents. Prompt injection directe et indirecte, exfiltration de données, sandboxing des outils, moindre privilège. Fondé sur l'OWASP LLM Top 10 (2025).

**Partie 8 — Conformité et gouvernance** : où ton agent tombe dans le cadre réglementaire (EU AI Act, NIST AI RMF). Ce n'est pas de la paperasse — c'est une contrainte architecturale qui détermine ce que tu peux construire et comment.

**Partie 9 — Production operations** : un agent est un système distribué. Idempotence, retries, saga pattern, RBAC, isolation multi-tenant, SLO, rollback, runbooks. Ce qui manque pour passer de "ça fonctionne" à "ça tient en production".

**Partie 10 — État de l'art 2025–2026** : MCP, A2A, OpenAI Agents SDK, OpenTelemetry, sandboxing (E2B, Docker). Ces standards sont des implémentations des principes des parties précédentes — pas des substituts.

**Partie 11 — Études de cas** : cinq projets réels (contexte gouvernemental, outils internes, revise.studio, Hotelix, Ralph Loop). Pas des exemples fabriqués. Des cas avec leurs hésitations, leurs erreurs et leurs corrections.

---

## Comment lire ce guide

Chaque partie est autonome. Tu peux les lire dans l'ordre ou sauter directement à l'erreur qui correspond à ton problème du moment.

Chaque partie se termine avec un livrable concret : une grille de décision, un modèle de déploiement, un framework de gestion du contexte, une architecture mémoire, un pattern de planification, un système d'évaluation, un threat model, une grille de gouvernance, une checklist de production-readiness, ou une matrice de choix d'outillage.

Les exemples viennent du terrain. Les noms et détails sont changés là où la confidentialité l'exige, mais les situations sont réelles.

Le code est simplifié pour la clarté. L'objectif n'est pas de te donner du code production-ready — c'est d'illustrer les concepts avec des patterns précis.

---

Un agent n'est pas un prompt intelligent.

C'est un système.

Et construire un système qui survit au monde réel — pas seulement à la démo — ça s'apprend.

Commençons.
