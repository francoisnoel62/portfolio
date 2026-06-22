# Conclusion

J'ai commencé cet essai avec un constat simple.

Les agents échouent. Pas parce que les modèles sont mauvais. Parce que l'architecture l'est.

Douze mois de production m'ont appris ça. Pas des benchmarks, pas des démos. Des agents déployés chez des équipes réelles, avec des utilisateurs réels, des conséquences réelles.

Et ce que j'ai vu se répéter, encore et encore, c'est six erreurs structurelles. Pas des bugs. Des choix d'architecture mal pensés.

---

## Six erreurs. Six corrections.

**Erreur 1 : Construire un agent là où un workflow suffit.**

Nous avons ce réflexe. Dès qu'un problème est complexe, on pense "agent". Mais complexe ne veut pas dire adaptatif. Un processus linéaire avec des règles explicites n'a pas besoin d'un LLM pour décider.

La correction : une règle unique. Si la complexité de décision dépasse la complexité d'exécution, agent. Sinon, workflow. Cette règle ne résout pas tout. Mais elle tranche 80% des débats en moins de cinq minutes.

**Erreur 2 : Chercher l'autonomie immédiate.**

L'attrait du "set and forget" est compréhensible. Déployer un agent autonome et s'en aller. Le problème, c'est que l'autonomie prématurée produit des erreurs silencieuses sur les cas limites — précisément ceux que la démo n'avait jamais montrés.

La correction : Assisté → Supervisé → Autonome. Trois phases. Des critères mesurables pour passer de l'une à l'autre. Une rétrogradation automatique si les métriques chutent. L'autonomie se mérite par les données, pas par la confiance.

**Erreur 3 : Traiter le contexte comme illimité.**

"J'ai 128K tokens, j'y mets tout." Cette logique détruit la qualité des décisions. Le modèle dilue son attention sur des informations irrelevantes. L'information critique est noyée au milieu. Le "lost in the middle" n'est pas une théorie — j'en ai mesuré les effets directement sur des agents de support qui rataient systématiquement la procédure de remboursement noyée en position 37 d'un contexte surchargé.

La correction : un budget de contexte explicite. Zones réservée, principale, secondaire, tampon. Priorisation délibérée. Retrieval ciblé plutôt que chargement global. Le contexte minimal pour une décision optimale — pas plus, pas moins.

**Erreur 4 : Ignorer l'amnésie de l'agent.**

Les LLMs sont stateless. Ce n'est pas un bug à corriger — c'est l'architecture. Chaque session commence avec une ardoise vide. Ce qu'on appelle "mémoire" dans un agent est une illusion de continuité temporaire. J'ai vu un agent commercial redemander les mêmes informations à chaque session pendant six semaines avant que quelqu'un s'en aperçoive.

La correction : une architecture mémoire explicite. Trois stores selon le type d'information — base relationnelle pour le state structuré, vector store pour la mémoire sémantique, cache pour la session active. Une couche d'abstraction qui orchestre le tout. Une identité ancrée dans `user_id` et `session_id`. La continuité ne se configure pas avec un prompt — elle se construit.

**Erreur 5 : Boucles naïves sans planification.**

ReAct est un pattern solide. Seul, sans garde-fous, c'est une boucle aveugle. Les erreurs s'accumulent silencieusement. Une hypothèse fausse à l'étape 2 contamine toutes les étapes suivantes. En production, cette boucle peut tourner jusqu'à épuisement — ou pire, produire un résultat confiant et faux.

La correction : Plan → Execute → Verify. Trois phases séparées avec des responsabilités distinctes. Une validation intermédiaire à chaque étape. Un nombre maximum d'itérations. Une phase de vérification globale qui contrôle l'atteinte de l'objectif — pas juste la réussite technique des outils.

**Erreur 6 : Ajouter l'évaluation après coup.**

"On ajoutera le monitoring quand le système sera stable." Cette phrase, je l'ai prononcée. Et j'ai payé le prix. Parce qu'un agent "silencieux" n'est pas un agent qui fonctionne bien. C'est un agent dont on ne sait rien. J'ai découvert un agent de validation de notes de frais qui prenait de mauvaises décisions depuis trois mois — invisible, parce qu'on ne mesurait pas ses décisions, seulement ses réponses.

La correction : eval-first. Définir le succès avant de coder. Constituer un jeu de données de référence avant le déploiement. Mettre en place le monitoring décisionnel dès le jour zéro. Parce qu'on ne peut pas retrouver le raisonnement d'un agent sur les décisions passées — ces données sont perdues si on ne les a pas collectées.

---

## Ce qui change vraiment

Ces six corrections ne sont pas des recettes. Ce sont des changements de perspective.

**De "prompt" à "système".**

Un agent n'est pas un prompt sophistiqué avec des outils autour. C'est un système avec plusieurs couches : décision, exécution, contexte, mémoire, évaluation, supervision. Chaque couche a ses contraintes, ses modes de défaillance, ses besoins en monitoring. Ignorer une couche, c'est construire sur une fondation qui tremble.

**De "démo" à "production".**

La démo sélectionne les cas réussis. La production reçoit tout — les cas tordus, les entrées malformées, les utilisateurs qui font exactement ce qu'on n'avait pas prévu. Ce gap n'est pas une question de puissance du modèle. C'est une question d'architecture.

**De "autonomie" à "contrôle progressif".**

Vouloir l'autonomie, c'est naturel. Mais l'autonomie immédiate est un pari. Le contrôle progressif est une stratégie. On donne à l'agent exactement autant d'autonomie que ses performances justifient — ni plus, ni moins. Et on le surveille activement pour détecter le moment où cette autonomie doit être réduite.

**De "résultat" à "décision".**

Monitorer les réponses d'un agent, c'est regarder la surface. Monitorer ses décisions, c'est regarder le jugement. Un texte bien formulé peut masquer une décision profondément incorrecte. Ce qui compte en production, c'est ce que l'agent choisit de faire — pas comment il le formule.

---

## Ce que je sais maintenant

J'aurais aimé lire cet essai il y a un an.

J'aurais évité l'agent de scheduling qui aurait dû être un formulaire. L'agent RH qui a validé des clauses incorrectes parce qu'il n'y avait aucun gating sur les décisions contractuelles. L'agent support qui a produit six mois de décisions douteuses parce qu'on n'avait pas mis le monitoring en place dès le départ.

Ces erreurs m'ont coûté du temps, de la confiance, et de l'argent.

Mais elles m'ont aussi appris quelque chose d'essentiel : construire un agent robuste n'est pas plus difficile que construire un agent fragile. C'est juste différent. Ça demande de réfléchir à l'architecture avant de réfléchir au prompt. De définir le succès avant de définir les outils. D'accepter que l'autonomie est une destination, pas un point de départ.

Ces principes ne sont pas des contraintes. Ce sont des accélérateurs. Un système bien architecturé s'améliore plus vite, se corrige plus facilement, et survit aux mises à jour du modèle sans déraillement silencieux.

---

## La prochaine étape

Commence petit.

Prends ton use case le plus simple — celui où tu hésites encore entre workflow et agent. Applique la règle : la complexité de décision dépasse-t-elle la complexité d'exécution ?

Si oui : construis l'agent. Mais construis-le en phase assistée d'abord. Avec un jeu d'évaluation constitué avant le premier déploiement. Avec un monitoring décisionnel dès la première semaine. Avec des checkpoints HITL sur toutes les décisions à fort impact.

Si non : construis le workflow. Économise les ressources pour le prochain use case — celui qui mérite vraiment un agent.

Mesure tout. Les décisions, pas seulement les réponses. Le raisonnement, pas seulement l'output. Les outcomes réels, pas seulement les retours utilisateurs immédiats.

Progresse graduellement. Ton agent n'a pas besoin d'être autonome au premier jour. Il a besoin d'être fiable. L'autonomie viendra quand les données le justifieront.

Et quand quelque chose casse — et quelque chose cassera — traite ça comme de l'information, pas comme un échec. Les boucles de feedback ne servent à rien si on n'y injecte pas ce que le terrain apprend.

---

## La question qui reste

Les modèles vont continuer à s'améliorer. Les fenêtres de contexte vont s'élargir. Les capacités de raisonnement vont s'affiner.

Mais les principes architecturaux, eux, restent.

La question n'est pas "Est-ce que les agents vont fonctionner ?"

Ils fonctionnent déjà. En démo. En conditions idéales. Sur des cas choisis.

La vraie question est : "Comment va-t-on les construire pour qu'ils survivent au réel ?"

Et la réponse est la même qu'il y a douze mois, la même qu'elle sera dans douze mois.

**Un agent n'est pas un prompt intelligent. C'est un système.**

Un système avec un contexte géré comme une ressource. Une mémoire construite, persistée, injectée. Une boucle d'exécution structurée avec planification et validation. Une évaluation intégrée depuis le premier jour. Une autonomie gagnée progressivement, pas accordée par impatience.

C'est ça, un agent qui survit en production.

Pas parce que le modèle est parfait.

Parce que l'architecture l'est.

---

*Ce guide est basé sur une année d'erreurs — les miennes. Tu en feras d'autres. Mais j'espère que tu en feras des nouvelles, pas les mêmes.*
