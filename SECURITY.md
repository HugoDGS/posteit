# Sécurité

## Signaler une faille

N'ouvrez pas d'issue publique. Utilisez le signalement privé de GitHub : onglet **Security**, puis **Report a vulnerability**. L'équipe répond sous 48 heures.

Décrivez la faille, les étapes pour la reproduire et son impact. Une preuve de concept aide, mais elle n'est pas obligatoire.

## Ce que Poste-it protège

Poste-it traite des CV, donc des données personnelles. Ces protections font partie du périmètre du projet :

- **Accès** : chaque route est réservée à des rôles précis, et chaque service vérifie que la ressource appartient bien à la personne qui la demande.
- **Fichiers** : le type d'un CV est vérifié sur son contenu, pas sur son extension, et sa taille est limitée.
- **Injections** : toutes les entrées passent par une validation stricte, et le contenu riche est nettoyé côté serveur.
- **Sessions** : les jetons sont révoqués à la déconnexion, et les tentatives répétées sont limitées.
- **Données personnelles** : la suppression d'un compte efface ses données dans tous les services.
