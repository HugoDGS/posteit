# Contribuer à Poste-it

Ce guide est la règle commune de l'équipe. Il vaut pour tout le monde, relecteurs compris.

## Le cycle d'une story

1. **L'issue d'abord.** Chaque travail part d'une issue, avec ses critères d'acceptation et son jalon.
2. **Une branche par issue**, créée depuis `develop`.
3. **Une pull request vers `develop`**, relue et approuvée par un autre membre.
4. **À chaque jalon**, une pull request de `develop` vers `main`, puis un tag.

`main` est la branche évaluée. On n'y pousse jamais directement, et on n'y fusionne qu'avec un merge commit : le squash et le rebase sont désactivés.

## Les branches

```text
<type>/<app>-<sujet>
```

| Exemple                     | Pour                   |
| --------------------------- | ---------------------- |
| `feat/offer-search`         | une fonctionnalité     |
| `fix/gateway-refresh-token` | une correction         |
| `docs/redis-keys`           | de la documentation    |
| `ci/coverage-report`        | l'intégration continue |

## Les commits

Le format [Conventional Commits](https://www.conventionalcommits.org/fr/) est obligatoire. Un commit qui ne le respecte pas est retiré de la codebase finale.

```text
<type>(<scope>): <description> (#<issue>)
```

```text
feat(matching): split profiles into batches of 500 (#41)
fix(gateway): reject revoked refresh tokens (#57)
```

- **Types** : `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `ci`, `build`, `chore`.
- **Scopes** : le nom de l'app ou du package concerné, par exemple `gateway`, `offer`, `job-runner` ou `contracts`.
- **Description** : en anglais, à l'impératif, sans majuscule ni point final.
- **Taille** : plusieurs petits commits valent mieux qu'un gros. Chacun doit compiler.

## Les pull requests

- Une pull request traite une seule issue et la ferme (`Closes #41`).
- Elle reste petite : au-delà de 400 lignes, on la découpe.
- L'auteur ne fusionne qu'après une approbation et une CI verte.
- Le relecteur répond dans la journée. Personne ne garde plus de deux pull requests ouvertes.
- Une pull request qui modifie un contrat gRPC est relue par le référent technique.

## Une story est terminée quand

- [ ] la CI est verte : lint, typecheck, tests ;
- [ ] le nouveau code est testé, et ce qui ne l'est pas porte un `/* v8 ignore */` avec sa raison ;
- [ ] aucun `any` n'apparaît sans un commentaire qui le justifie ;
- [ ] le Swagger décrit la route, les rôles autorisés et les erreurs possibles ;
- [ ] la fonctionnalité marche dans Docker Compose, pas seulement en local ;
- [ ] le Product Owner a validé les critères d'acceptation.

## Le code

- **TypeScript strict** partout, avec `noImplicitAny`.
- **ESLint et Prettier** tranchent les questions de style : on corrige le code, pas la règle.
- **Une base par service.** Un service qui a besoin d'une donnée d'un autre la demande en gRPC.
- **Les droits sont vérifiés deux fois** : le rôle dans la gateway, l'appartenance à la ressource dans le service qui la possède.
