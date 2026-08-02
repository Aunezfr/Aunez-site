# Aunez — Guide de déploiement

Ce dossier contient le site (le quiz olfactif en page d'accueil). Voici comment le mettre en ligne, sans utiliser de ligne de commande.

## Étape 1 — Créer un compte GitHub
1. Va sur https://github.com et crée un compte gratuit
2. Une fois connecté, clique sur "New repository" (Nouveau dépôt)
3. Donne-lui un nom, par exemple `aunez-site`
4. Laisse-le en "Public" ou "Private", peu importe
5. Ne coche PAS "Add a README file" (on a déjà tout ce qu'il faut)
6. Clique sur "Create repository"

## Étape 2 — Envoyer les fichiers sur GitHub (sans ligne de commande)
1. Sur la page de ton nouveau dépôt vide, clique sur le lien
   "uploading an existing file"
2. Fais glisser TOUT le contenu de ce dossier (`aunez-site`) dans la zone
   (attention : glisse le CONTENU du dossier, pas le dossier lui-même)
3. En bas de page, clique sur "Commit changes"

## Étape 3 — Créer un compte Vercel
1. Va sur https://vercel.com
2. Clique sur "Sign Up" puis choisis "Continue with GitHub"
   (ça connecte directement les deux comptes)

## Étape 4 — Déployer le site
1. Une fois connecté sur Vercel, clique sur "Add New..." puis "Project"
2. Trouve ton dépôt `aunez-site` dans la liste et clique sur "Import"
3. Laisse les réglages par défaut (Vercel détecte automatiquement Next.js)
4. Clique sur "Deploy"
5. Attends 1-2 minutes — tu obtiens une URL du type `aunez-site.vercel.app`
   où le site est déjà en ligne et fonctionnel

## Étape 5 — Connecter ton domaine aunez.fr
1. Dans ton projet Vercel, va dans l'onglet "Settings" puis "Domains"
2. Tape `aunez.fr` et clique sur "Add"
3. Vercel affiche 1 ou 2 lignes DNS à configurer (souvent un enregistrement
   de type A et/ou CNAME)
4. Va dans ton espace client OVH, section "Zone DNS" de ton domaine
5. Ajoute les enregistrements exactement comme indiqué par Vercel
6. Patiente quelques heures (propagation DNS) — `aunez.fr` pointera
   ensuite directement vers ton site

## Après ça
Chaque fois qu'on modifiera le code (nouvelles pages, nouvelles
fonctionnalités), il suffira de remettre à jour les fichiers sur GitHub
(même méthode glisser-déposer) — Vercel redéploie automatiquement le
site à chaque changement.
