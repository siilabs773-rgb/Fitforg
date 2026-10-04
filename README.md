# FitForge

Application de musculation et fitness 100 % hors-ligne (PWA) : exercices illustrés, séances guidées, programmes selon ton matériel.

## Lancer en local

```bash
npm install
npm run dev
```

## Obtenir l'APK Android

1. Envoie le projet sur la branche `main` : le workflow `Construire l'APK Android` se lance seul (onglet **Actions**, environ 5 minutes).
2. Télécharge `FitForge.apk` dans la page **Releases** du dépôt (release `apk-latest`), ou dans **Actions → l'exécution → Artifacts**.
3. Installe-le sur le téléphone (autorise « sources inconnues »).

## Déployer sur GitHub Pages (dépôt public uniquement)

1. Crée un dépôt GitHub et envoie le projet sur la branche `main`.
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Chaque `git push` sur `main` lance le workflow `.github/workflows/deploy.yml`.
4. L'app est disponible sur `https://<ton-compte>.github.io/<nom-du-depot>/`.

Si tu utilises un domaine personnalisé ou un dépôt nommé `<ton-compte>.github.io`, mets `BASE_PATH: /` dans le workflow.

## Installer sur le téléphone

Ouvre l'adresse dans Chrome (Android) ou Safari (iPhone), puis « Ajouter à l'écran d'accueil ». L'app fonctionne ensuite sans connexion.

## Crédits

Illustrations de mouvements : [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (domaine public).
