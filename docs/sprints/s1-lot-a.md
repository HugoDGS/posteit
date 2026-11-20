# Sprint 1, lot A : intégration continue et règles du dépôt

|               |                                                     |
| ------------- | --------------------------------------------------- |
| Séance        | 20 novembre 2026, avec la création du dépôt le 17   |
| Rôles         | Scrum Master, DevSecOps                             |
| Objectif      | dépôt protégé, board en place, CI verte sur develop |
| Résultat      | atteint, sauf le coverage                           |
| Points livrés | 4                                                   |

## Ce qui est livré

| Issue | PR  | Points | Contenu                                                                                                             |
| ----- | --- | -----: | ------------------------------------------------------------------------------------------------------------------- |
| #7    | #9  |      3 | CI : format, lint, typecheck, tests sur Node 24 et 26, commitlint, audit des dépendances                            |
| #8    | #10 |      1 | Dependabot : montées incompatibles bloquées, délai de 7 jours avant une mise à jour, lockfile replié dans les diffs |

Sans PR, dans les réglages du dépôt :

- 17 novembre : dépôt, branches `main` et `develop` protégées (PR, une approbation, approbation annulée à chaque push, pas de force push), seuls les merge commits permis, modèles d'issues et de PR, board GitHub Projects avec les champs Lot, Points et Sprint.
- 20 novembre : le check « CI ok » devient obligatoire sur `main` et `develop`.

## Ce qui ne l'est pas

| Prévu                  | Raison                                  | Reporté à                        |
| ---------------------- | --------------------------------------- | -------------------------------- |
| Coverage affiché en CI | aucun test dans le dépôt pour l'instant | avec les premiers tests du lot A |

## Faits marquants

**La CI.** Six jobs en parallèle, chacun avec un temps limite, et un job « CI ok » qui les agrège : c'est le seul check exigé par la protection des branches, donc un job ajouté plus tard ne demande pas de changer les réglages. Les actions sont épinglées par SHA, les droits sont en lecture seule, et les valeurs de l'événement passent par l'environnement plutôt que d'être interpolées dans les scripts. Le workflow passe actionlint sans erreur ; zizmor ne relève qu'une suggestion, écartée pour la raison ci-dessous.

**Une syntaxe écartée.** zizmor suggère `$/` pour charger l'action locale. actionlint 1.7.12 ne la reconnaît pas encore, et elle n'apporte rien ici puisque l'action est chargée juste après le checkout du dépôt. Le workflow garde `./`.

**Une mise à jour Dependabot qui cassait le lint.** La PR #6 passait à TypeScript 7 et ESLint 10. Testée en local, elle fait planter ESLint : typescript-eslint 8 exige TypeScript < 6.1, eslint-plugin-react ne supporte pas ESLint 10. Elle a été fermée, et la #10 bloque ces montées, chacune avec sa raison en commentaire. La relecture a montré que TypeScript 6.1, une version mineure, casserait aussi le lint : le blocage couvre aussi les mineures de TypeScript.

**Une branche à jour non exigée.** L'option qui impose une branche à jour avec `develop` avant la fusion reste désactivée. Avec l'annulation des approbations à chaque push, elle demanderait une nouvelle relecture après chaque mise à jour. La CI qui tourne sur `develop` après chaque fusion couvre le risque restant.

## Indicateurs

| Mesure                                    |                   Valeur |
| ----------------------------------------- | -----------------------: |
| PR fusionnées                             |                        2 |
| Commits sur `develop`, hors merges        |                       16 |
| Délai moyen d'une PR (ouverture → fusion) |                   22 min |
| CI sur `develop`                          | verte, 1 min 20 au total |
| Coverage du lot                           |   non mesuré, aucun test |

## Rétrospective

**À garder**

- Des PR courtes (151 et 23 lignes), avec un commit par sujet.
- Le workflow passé à actionlint et zizmor, et les commandes de la CI rejouées en local avant de pousser.

**À changer**

- Les issues #7 et #8 ont été créées après le code. Elles doivent exister avant.
- Les suggestions de relecture sont arrivées après l'approbation, et le push des corrections l'a annulée : il a fallu une deuxième relecture. Demander la relecture une fois les vérifications d'outils faites, et traiter toutes les suggestions dans un seul push.

**Action pour le prochain sprint**

- Créer l'issue, avec son lot, ses points et son sprint, avant la première ligne de code.

## Sprint 2

- docker-compose et Dockerfiles en premier : 5 bases Mongo, Redis, Mailpit.
- identity : inscription, connexion, mots de passe hachés.
- gateway : démarrage, Swagger, guard JWT.
- Socle du job-runner : `JOB_QUEUES` et connexion BullMQ.
