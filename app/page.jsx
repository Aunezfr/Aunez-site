"use client";

import { useState, useEffect, useRef } from "react";

// --- Données du quiz -------------------------------------------------

const FAMILLES = {
  floral: {
    label: "Floral",
    desc: "Rose, jasmin, fleur d'oranger — élégant et lumineux",
    color: "#e07bb0",
    angle: 0,
    recos: [
      {
        nom: "L'Eau Papier",
        marque: "Diptyque",
        accroche: "Un parfum né d'une collaboration entre un parfumeur et une artiste, en hommage au papier",
        histoire: "Diptyque a réuni le parfumeur Fabrice Pellegrin et l'artiste française Alix Waline pour composer ce parfum en hommage au papier, support de l'imaginaire créatif depuis toujours chez la maison. Mimosa, muscs blancs et un accord vapeur de riz forment une fragrance lumineuse, pensée comme une aquarelle olfactive plutôt qu'un parfum classique.",
        pasFait: "Pas pour toi si tu cherches un floral sucré et gourmand — ici la fleur reste aérienne, presque abstraite, jamais capiteuse.",
        lien: "#",
        lienEchantillon: "#",
      },
    ],
  },
  boise: {
    label: "Boisé",
    desc: "Bois de santal, vétiver, cèdre — chaud et enveloppant",
    color: "#c98a4b",
    angle: 90,
    recos: [
      {
        nom: "Tam Dao",
        marque: "Diptyque",
        accroche: "Le souvenir d'enfance d'un des fondateurs de la maison, transformé en parfum",
        histoire: "Yves Coueslant, l'un des fondateurs de Diptyque, n'a jamais oublié l'odeur du bois de santal brûlé dans les temples des forêts sacrées d'Indochine durant son enfance. Tam Dao en est la traduction olfactive : le santal de Mysore, rafraîchi par le cyprès et le myrte, comme une forêt de bois précieux au petit matin.",
        pasFait: "Pas pour toi si tu veux un boisé discret — Tam Dao a un vrai sillage, on le remarque.",
        lien: "#",
        lienEchantillon: "#",
      },
    ],
  },
  oriental: {
    label: "Oriental",
    desc: "Vanille, ambre, épices — intense et sensuel",
    color: "#8b5fd9",
    angle: 180,
    recos: [
      {
        nom: "Eau Duelle",
        marque: "Diptyque",
        accroche: "Une vanille pensée comme un clair-obscur, entre lumière et épices",
        histoire: "Composée par Fabrice Pellegrin, Eau Duelle explore la vanille Bourbon de Madagascar sous un angle inhabituel : ni sucrée ni évidente, mais traversée d'une dualité entre douceur et épices. Le parfum se construit comme un voyage le long de la route des épices, entre accents lumineux de calamus et nuances plus sombres et fumées de cypriol.",
        pasFait: "Pas pour toi si tu cherches une vanille gourmande et sucrée façon dessert — celle-ci est plus sèche, plus épicée.",
        lien: "#",
        lienEchantillon: "#",
      },
    ],
  },
  frais: {
    label: "Frais",
    desc: "Agrumes, notes marines, herbes vertes — léger et vif",
    color: "#3fc9c2",
    angle: 270,
    recos: [
      {
        nom: "Philosykos",
        marque: "Diptyque",
        accroche: "\"Ami du figuier\" en grec — un parfum-souvenir d'un été en Grèce",
        histoire: "Philosykos signifie \"ami du figuier\" en grec. Le parfum est né du souvenir d'un été passé au Mont Pélion, où il fallait traverser un verger sauvage de figuiers pour rejoindre la mer. La fraîcheur verte des feuilles, la sève lactée du fruit et le bois du figuier composent une fragrance qui tient plus du souvenir précis que du simple produit.",
        pasFait: "Pas pour toi si tu n'aimes pas du tout les notes vertes — le côté feuille de figuier est bien présent, pas juste suggéré.",
        lien: "#",
        lienEchantillon: "#",
      },
    ],
  },
};

const POOL_AFFINITY = [
  { id: "a1", title: "Un dimanche idéal ressemble plutôt à…", options: [
    { label: "Un brunch dans un jardin fleuri", points: { floral: 2 } },
    { label: "Une balade en forêt", points: { boise: 2 } },
    { label: "Un after-midi cocooning, plaid et bougie", points: { oriental: 2 } },
    { label: "Une baignade en mer tôt le matin", points: { frais: 2 } },
  ]},
  { id: "a2", title: "Pour l'occasion, tu portes le parfum surtout…", options: [
    { label: "Au quotidien, au bureau", points: { frais: 1, floral: 1 } },
    { label: "En soirée, pour marquer les esprits", points: { oriental: 2 } },
    { label: "Toute l'année, sans distinction", points: { boise: 1 } },
    { label: "Pour les grandes occasions", points: { oriental: 1, floral: 1 } },
  ]},
  { id: "a3", title: "L'intensité que tu recherches…", options: [
    { label: "Discrète, on doit s'approcher pour la sentir", points: { frais: 2 } },
    { label: "Présente sans envahir", points: { floral: 1, boise: 1 } },
    { label: "Marquante, un vrai sillage", points: { oriental: 2 } },
    { label: "Peu importe, tant qu'elle est unique", points: { boise: 2 } },
  ]},
  { id: "a4", title: "Le mot qui te correspond le plus…", options: [
    { label: "Romantique", points: { floral: 2 } },
    { label: "Mystérieux", points: { boise: 2, oriental: 1 } },
    { label: "Audacieux", points: { oriental: 2 } },
    { label: "Naturel", points: { frais: 2 } },
  ]},
  { id: "a5", title: "Ta boisson pour un moment cocooning…", options: [
    { label: "Une infusion à la fleur d'oranger", points: { floral: 2 } },
    { label: "Un chocolat chaud épicé", points: { oriental: 2 } },
    { label: "Un thé fumé près du feu", points: { boise: 2 } },
    { label: "Une eau citronnée bien fraîche", points: { frais: 2 } },
  ]},
  { id: "a6", title: "Ta saison préférée à sentir dehors…", options: [
    { label: "Le printemps en fleurs", points: { floral: 2 } },
    { label: "L'automne et les sous-bois", points: { boise: 2 } },
    { label: "L'hiver et ses épices", points: { oriental: 2 } },
    { label: "L'été et l'air marin", points: { frais: 2 } },
  ]},
  { id: "a7", title: "Le cadeau qui te ferait le plus plaisir…", options: [
    { label: "Un bouquet composé avec soin", points: { floral: 2 } },
    { label: "Un objet en bois brut, fait main", points: { boise: 2 } },
    { label: "Un bijou ancien, chargé d'histoire", points: { oriental: 2 } },
    { label: "Un week-end improvisé au bord de l'eau", points: { frais: 2 } },
  ]},
  { id: "a8", title: "L'ambiance musicale qui te correspond…", options: [
    { label: "Douce et mélodique", points: { floral: 2 } },
    { label: "Acoustique et organique", points: { boise: 2 } },
    { label: "Profonde, avec du grain", points: { oriental: 2 } },
    { label: "Légère, entraînante", points: { frais: 2 } },
  ]},
  { id: "a9", title: "Ton type de vacances idéal…", options: [
    { label: "Un jardin japonais, calme et fleuri", points: { floral: 2 } },
    { label: "Un chalet perdu en forêt", points: { boise: 2 } },
    { label: "Un souk animé et parfumé", points: { oriental: 2 } },
    { label: "Une île, pieds dans l'eau", points: { frais: 2 } },
  ]},
  { id: "a10", title: "La texture qui te plaît le plus au toucher…", options: [
    { label: "La soie", points: { floral: 2 } },
    { label: "Le bois brut", points: { boise: 2 } },
    { label: "Le velours", points: { oriental: 2 } },
    { label: "Le lin froissé", points: { frais: 2 } },
  ]},
  { id: "a11", title: "Ta couleur refuge…", options: [
    { label: "Rose poudré", points: { floral: 2 } },
    { label: "Vert forêt", points: { boise: 2 } },
    { label: "Bordeaux profond", points: { oriental: 2 } },
    { label: "Bleu azur", points: { frais: 2 } },
  ]},
  { id: "a12", title: "L'endroit où tu te sens le plus toi…", options: [
    { label: "Dans un jardin", points: { floral: 2 } },
    { label: "En pleine nature", points: { boise: 2 } },
    { label: "Dans une pièce tamisée", points: { oriental: 2 } },
    { label: "Face à la mer", points: { frais: 2 } },
  ]},
  { id: "a13", title: "Ton petit-déjeuner idéal…", options: [
    { label: "Une viennoiserie à la fleur d'oranger", points: { floral: 2 } },
    { label: "Un granola aux noix et miel", points: { boise: 2 } },
    { label: "Un chaï épicé", points: { oriental: 2 } },
    { label: "Un jus d'agrumes pressé", points: { frais: 2 } },
  ]},
  { id: "a14", title: "La lumière que tu préfères chez toi…", options: [
    { label: "Douce et diffuse", points: { floral: 2 } },
    { label: "Naturelle, filtrée par des plantes", points: { boise: 2 } },
    { label: "Tamisée, façon bougie", points: { oriental: 2 } },
    { label: "Franche et lumineuse", points: { frais: 2 } },
  ]},
  { id: "a15", title: "Un film pour un soir de pluie…", options: [
    { label: "Une comédie romantique", points: { floral: 2 } },
    { label: "Un film d'aventure en forêt", points: { boise: 2 } },
    { label: "Un thriller mystérieux", points: { oriental: 2 } },
    { label: "Un film qui donne envie de voyager", points: { frais: 2 } },
  ]},
  { id: "a16", title: "L'objet que tu emporterais sur une île déserte…", options: [
    { label: "Un carnet et des fleurs séchées", points: { floral: 2 } },
    { label: "Un couteau et une corde", points: { boise: 2 } },
    { label: "Une bougie parfumée", points: { oriental: 2 } },
    { label: "Un maillot de bain", points: { frais: 2 } },
  ]},
  { id: "a17", title: "Le compliment qui te touche le plus…", options: [
    { label: "\"Tu es d'une élégance folle\"", points: { floral: 2 } },
    { label: "\"Tu as quelque chose d'authentique\"", points: { boise: 2 } },
    { label: "\"Tu as un charme mystérieux\"", points: { oriental: 2 } },
    { label: "\"Tu respires la vitalité\"", points: { frais: 2 } },
  ]},
  { id: "a18", title: "Ta tenue pour une soirée improvisée…", options: [
    { label: "Une robe fleurie", points: { floral: 2 } },
    { label: "Une matière brute, façon lin", points: { boise: 2 } },
    { label: "Du velours ou de la soie sombre", points: { oriental: 2 } },
    { label: "Quelque chose de simple et fluide", points: { frais: 2 } },
  ]},
  { id: "a19", title: "Ton rituel du matin idéal…", options: [
    { label: "Arroser ses plantes fleuries", points: { floral: 2 } },
    { label: "Une marche en forêt", points: { boise: 2 } },
    { label: "Un thé épicé pris lentement", points: { oriental: 2 } },
    { label: "Une douche fraîche et énergisante", points: { frais: 2 } },
  ]},
  { id: "a20", title: "Ton dessert préféré…", options: [
    { label: "Une tarte à la fleur d'oranger", points: { floral: 2 } },
    { label: "Un gâteau aux noix et miel", points: { boise: 2 } },
    { label: "Un dessert épicé, façon pain d'épices", points: { oriental: 2 } },
    { label: "Une salade de fruits frais", points: { frais: 2 } },
  ]},
  { id: "a21", title: "L'ambiance d'un restaurant que tu choisirais…", options: [
    { label: "Une terrasse fleurie", points: { floral: 2 } },
    { label: "Une cabane en bois, feutrée", points: { boise: 2 } },
    { label: "Une salle tamisée, feutrée et intime", points: { oriental: 2 } },
    { label: "Un bord de mer, les pieds dans le sable", points: { frais: 2 } },
  ]},
  { id: "a22", title: "Ta plante d'intérieur préférée…", options: [
    { label: "Un jasmin grimpant", points: { floral: 2 } },
    { label: "Un bonsaï", points: { boise: 2 } },
    { label: "Un cactus imposant", points: { oriental: 2 } },
    { label: "Une plante aromatique fraîche", points: { frais: 2 } },
  ]},
  { id: "a23", title: "Le type de lecture que tu privilégies…", options: [
    { label: "Un roman romantique", points: { floral: 2 } },
    { label: "Un récit d'aventure ou de nature", points: { boise: 2 } },
    { label: "Un roman mystérieux et sensuel", points: { oriental: 2 } },
    { label: "Un carnet de voyage", points: { frais: 2 } },
  ]},
  { id: "a24", title: "Ton style d'art préféré…", options: [
    { label: "Des tableaux floraux, impressionnistes", points: { floral: 2 } },
    { label: "Des œuvres en matières naturelles", points: { boise: 2 } },
    { label: "Des toiles sombres et intenses", points: { oriental: 2 } },
    { label: "Des œuvres lumineuses, abstraites", points: { frais: 2 } },
  ]},
  { id: "a25", title: "L'élément auquel tu t'identifies le plus…", options: [
    { label: "La fleur qui éclot", points: { floral: 2 } },
    { label: "La terre et les racines", points: { boise: 2 } },
    { label: "Le feu", points: { oriental: 2 } },
    { label: "L'eau", points: { frais: 2 } },
  ]},
  { id: "a26", title: "Ta façon idéale de fêter un anniversaire…", options: [
    { label: "Un thé entre proches, fleurs sur la table", points: { floral: 2 } },
    { label: "Un feu de camp entre amis", points: { boise: 2 } },
    { label: "Un dîner intime aux chandelles", points: { oriental: 2 } },
    { label: "Une sortie en pleine nature ou à la mer", points: { frais: 2 } },
  ]},
  { id: "a27", title: "Le climat dans lequel tu te sens le mieux…", options: [
    { label: "Doux et printanier", points: { floral: 2 } },
    { label: "Frais et humide, façon sous-bois", points: { boise: 2 } },
    { label: "Chaud et sec, façon désert", points: { oriental: 2 } },
    { label: "Iodé, avec du vent", points: { frais: 2 } },
  ]},
  { id: "a28", title: "L'endroit où tu ferais un pique-nique…", options: [
    { label: "Un champ de fleurs", points: { floral: 2 } },
    { label: "Une clairière en forêt", points: { boise: 2 } },
    { label: "Un jardin oriental à la tombée du jour", points: { oriental: 2 } },
    { label: "Une plage au lever du soleil", points: { frais: 2 } },
  ]},
  { id: "a29", title: "Ton style d'intérieur préféré…", options: [
    { label: "Romantique, avec beaucoup de fleurs", points: { floral: 2 } },
    { label: "Naturel, bois brut et rotin", points: { boise: 2 } },
    { label: "Feutré, tons chauds et épicés", points: { oriental: 2 } },
    { label: "Épuré, lumineux, façon bord de mer", points: { frais: 2 } },
  ]},
  { id: "a30", title: "Ton rapport au silence et au bruit…", options: [
    { label: "J'aime le bruissement léger d'un jardin", points: { floral: 2 } },
    { label: "J'aime le silence profond d'une forêt", points: { boise: 2 } },
    { label: "J'aime une ambiance feutrée et intime", points: { oriental: 2 } },
    { label: "J'aime le son du vent et des vagues", points: { frais: 2 } },
  ]},
  { id: "a31", title: "La matière de bijou que tu préfères…", options: [
    { label: "L'or rose délicat", points: { floral: 2 } },
    { label: "Le bois ou la corne", points: { boise: 2 } },
    { label: "L'or ancien et les pierres sombres", points: { oriental: 2 } },
    { label: "L'argent brut", points: { frais: 2 } },
  ]},
  { id: "a32", title: "Ton rythme de vie idéal…", options: [
    { label: "Doux et posé", points: { floral: 2 } },
    { label: "Ancré, proche de la nature", points: { boise: 2 } },
    { label: "Intense, riche en émotions", points: { oriental: 2 } },
    { label: "Actif, toujours en mouvement", points: { frais: 2 } },
  ]},
  { id: "a33", title: "L'ambiance de soirée entre amis que tu préfères…", options: [
    { label: "Un jardin éclairé de guirlandes", points: { floral: 2 } },
    { label: "Un feu de camp", points: { boise: 2 } },
    { label: "Un salon tamisé, musique et épices", points: { oriental: 2 } },
    { label: "Une terrasse face à l'eau", points: { frais: 2 } },
  ]},
  { id: "a34", title: "Ta relation à la nuit et aux étoiles…", options: [
    { label: "Une balade dans un jardin nocturne", points: { floral: 2 } },
    { label: "Une nuit sous tente en forêt", points: { boise: 2 } },
    { label: "Une nuit à observer le ciel, enveloppé·e", points: { oriental: 2 } },
    { label: "Une nuit près de l'océan", points: { frais: 2 } },
  ]},
  { id: "a35", title: "Le marché que tu préfères visiter en voyage…", options: [
    { label: "Un marché aux fleurs", points: { floral: 2 } },
    { label: "Un marché d'artisanat en bois", points: { boise: 2 } },
    { label: "Un souk aux épices", points: { oriental: 2 } },
    { label: "Un marché de bord de mer, poissons frais", points: { frais: 2 } },
  ]},
  { id: "a36", title: "Ton animal totem…", options: [
    { label: "Le papillon", points: { floral: 2 } },
    { label: "Le loup", points: { boise: 2 } },
    { label: "Le chat", points: { oriental: 2 } },
    { label: "Le dauphin", points: { frais: 2 } },
  ]},
  { id: "a37", title: "La chanson qui te représente le mieux…", options: [
    { label: "Une mélodie douce et aérienne", points: { floral: 2 } },
    { label: "Un morceau organique, acoustique", points: { boise: 2 } },
    { label: "Un titre grave et habité", points: { oriental: 2 } },
    { label: "Un titre entraînant, plein d'énergie", points: { frais: 2 } },
  ]},
  { id: "a38", title: "Ton style de voyage préféré…", options: [
    { label: "Une escapade dans une roseraie", points: { floral: 2 } },
    { label: "Une randonnée en forêt", points: { boise: 2 } },
    { label: "Un voyage riche en couleurs et en épices", points: { oriental: 2 } },
    { label: "Un road-trip le long de la côte", points: { frais: 2 } },
  ]},
  { id: "a39", title: "L'odeur qui te rappelle de bons souvenirs…", options: [
    { label: "Un jardin après la pluie", points: { floral: 2 } },
    { label: "Le bois qui brûle", points: { boise: 2 } },
    { label: "Les épices d'un marché lointain", points: { oriental: 2 } },
    { label: "L'air marin", points: { frais: 2 } },
  ]},
  { id: "a40", title: "Ta façon de te ressourcer…", options: [
    { label: "S'occuper de ses fleurs", points: { floral: 2 } },
    { label: "Marcher en forêt", points: { boise: 2 } },
    { label: "S'envelopper dans une ambiance chaleureuse", points: { oriental: 2 } },
    { label: "Nager ou prendre l'air au bord de l'eau", points: { frais: 2 } },
  ]},
];

const POOL_AVERSION = [
  { id: "v1", title: "Il y a une ambiance olfactive que tu évites clairement…", options: [
    { label: "Les parfums trop fleuris, ça me dérange vite", points: { floral: -2 } },
    { label: "Les notes boisées/terreuses, pas trop mon truc", points: { boise: -2 } },
    { label: "Les parfums lourds, épicés ou sucrés", points: { oriental: -2 } },
    { label: "Non, je suis ouvert·e à tout", points: {} },
  ]},
  { id: "v2", title: "Ce qui te dérange le plus dans un parfum…", options: [
    { label: "Un côté trop poudré ou fleuri", points: { floral: -2 } },
    { label: "Un côté trop terreux ou renfermé", points: { boise: -2 } },
    { label: "Un côté trop capiteux ou sucré", points: { oriental: -2 } },
    { label: "Aucune de ces options ne me dérange", points: {} },
  ]},
  { id: "v3", title: "Une note que tu évites en général…", options: [
    { label: "La rose ou le jasmin, trop appuyés", points: { floral: -2 } },
    { label: "Le vétiver ou le patchouli", points: { boise: -2 } },
    { label: "La vanille ou l'ambre, trop enveloppants", points: { oriental: -2 } },
    { label: "Je n'ai pas d'aversion particulière", points: {} },
  ]},
  { id: "v4", title: "Le style de parfum qui ne te correspond pas du tout…", options: [
    { label: "Un bouquet floral classique", points: { floral: -2 } },
    { label: "Un boisé austère et sec", points: { boise: -2 } },
    { label: "Un oriental dense et enveloppant", points: { oriental: -2 } },
    { label: "Aucun style en particulier", points: {} },
  ]},
  { id: "v5", title: "Ce que tu ne veux surtout pas sentir…", options: [
    { label: "Une odeur de fleurs fanées ou de poudre", points: { floral: -2 } },
    { label: "Une odeur de sous-bois humide", points: { boise: -2 } },
    { label: "Une odeur d'épices trop marquée", points: { oriental: -2 } },
    { label: "Rien de spécial ne me dérange", points: {} },
  ]},
  { id: "v6", title: "Un souvenir olfactif que tu n'aimes pas revivre…", options: [
    { label: "Un parfum floral trop présent, façon salon de thé", points: { floral: -2 } },
    { label: "Une odeur de bois humide et fermé", points: { boise: -2 } },
    { label: "Un parfum épicé trop lourd, façon encens saturé", points: { oriental: -2 } },
    { label: "Aucun souvenir de ce genre", points: {} },
  ]},
  { id: "v7", title: "Sur quelqu'un d'autre, tu trouves ça too much…", options: [
    { label: "Un parfum très fleuri", points: { floral: -2 } },
    { label: "Un parfum très boisé", points: { boise: -2 } },
    { label: "Un parfum très oriental", points: { oriental: -2 } },
    { label: "Rien ne me semble too much en soi", points: {} },
  ]},
  { id: "v8", title: "Ce que tu voudrais absolument éviter dans ton parfum…", options: [
    { label: "Un côté trop \"vieille rose\"", points: { floral: -2 } },
    { label: "Un côté trop \"tisane de forêt\"", points: { boise: -2 } },
    { label: "Un côté trop \"bougie d'église\"", points: { oriental: -2 } },
    { label: "Aucune de ces images ne me dérange", points: {} },
  ]},
  { id: "v9", title: "La famille de parfum qui t'a déjà déçu·e…", options: [
    { label: "Les floraux, souvent trop sages", points: { floral: -2 } },
    { label: "Les boisés, souvent trop plats", points: { boise: -2 } },
    { label: "Les orientaux, souvent trop écrasants", points: { oriental: -2 } },
    { label: "Aucune, je n'ai pas de déception particulière", points: {} },
  ]},
  { id: "v10", title: "Le mot qui te fait fuir sur une fiche parfum…", options: [
    { label: "\"Bouquet fleuri généreux\"", points: { floral: -2 } },
    { label: "\"Sous-bois profond\"", points: { boise: -2 } },
    { label: "\"Ambre intense et sucré\"", points: { oriental: -2 } },
    { label: "Aucun de ces mots ne me fait fuir", points: {} },
  ]},
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions() {
  const affinity = shuffle(POOL_AFFINITY).slice(0, 4);
  const aversion = shuffle(POOL_AVERSION).slice(0, 1);
  return [...affinity, ...aversion];
}

const GENRE_OPTIONS = [
  { label: "Dans les codes classiquement féminins", value: "feminin" },
  { label: "Dans les codes classiquement masculins", value: "masculin" },
  { label: "Sans étiquette de genre, juste ce qui me ressemble", value: "unisexe" },
];

const OCCASION_OPTIONS = [
  { label: "Au quotidien", value: "quotidien", phrase: "un parfum du quotidien, celui qu'on ne retire plus" },
  { label: "En soirée", value: "soiree", phrase: "un parfum de soirée, pensé pour marquer les esprits" },
  { label: "Pour un rendez-vous précis", value: "rdv", phrase: "un parfum pour l'occasion que tu as en tête" },
  { label: "En cadeau pour quelqu'un", value: "cadeau", phrase: "un parfum à offrir, pas juste à porter" },
];

const SCAN_STEPS = [
  "Détection des notes dominantes…",
  "Calcul de l'affinité olfactive…",
  "Génération de ta signature…",
];

function useStarField(count = 140) {
  return useState(() =>
    Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.8 + 0.6,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 4,
    }))
  )[0];
}

function StarField({ revealCount }) {
  const stars = useStarField(140);
  return (
    <div style={styles.starLayer}>
      {stars.map((s, i) => {
        const visible = i < revealCount;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#f5f0e6",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease",
              animation: visible ? `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite` : "none",
              boxShadow: visible ? "0 0 4px rgba(245,240,230,0.6)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

function AuraBackground({ percentages }) {
  const fams = Object.keys(FAMILLES);
  const configs = {
    floral: { top: "-14%", left: "-10%", anim: "floatA", duration: 16 },
    boise: { top: "-10%", left: "56%", anim: "floatB", duration: 20 },
    oriental: { top: "52%", left: "60%", anim: "floatC", duration: 18 },
    frais: { top: "56%", left: "-12%", anim: "floatD", duration: 22 },
  };
  return (
    <div style={styles.aura}>
      {fams.map((f) => {
        const cfg = configs[f];
        const pct = percentages[f] || 0;
        return (
          <div
            key={f}
            style={{
              position: "absolute",
              top: cfg.top,
              left: cfg.left,
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${FAMILLES[f].color} 0%, transparent 68%)`,
              filter: "blur(50px) saturate(1.4)",
              mixBlendMode: "screen",
              opacity: 0.3 + (pct / 100) * 0.7,
              transition: "opacity 1s ease",
              animation: `${cfg.anim} ${cfg.duration}s ease-in-out infinite`,
              pointerEvents: "none",
            }}
          />
        );
      })}
      <div style={styles.grain} />
    </div>
  );
}

// --- Petits composants génératifs -------------------------------------

function ScentOrb({ percentages, size = 150 }) {
  const stops = [];
  let acc = 0;
  Object.entries(percentages).forEach(([fam, pct]) => {
    const start = acc;
    acc += pct;
    stops.push(`${FAMILLES[fam].color} ${start}% ${acc}%`);
  });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        margin: "0 auto",
        background: `conic-gradient(${stops.join(", ")})`,
        boxShadow: `0 0 40px -6px rgba(201,147,47,0.5), 0 0 0 1px rgba(245,240,230,0.15)`,
        animation: "spin 14s linear infinite",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 10,
          borderRadius: "50%",
          background: "#0f0a14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}

function RadarChart({ scores, maxScore, size = 220 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const fams = Object.keys(FAMILLES);

  function pointFor(fam, value) {
    const angleRad = ((FAMILLES[fam].angle - 90) * Math.PI) / 180;
    const dist = (value / maxScore) * r;
    return [cx + dist * Math.cos(angleRad), cy + dist * Math.sin(angleRad)];
  }

  const dataPoints = fams.map((f) => pointFor(f, scores[f]));
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  const rings = [0.33, 0.66, 1];

  return (
    <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
      {rings.map((ringPct, i) => {
        const pts = fams
          .map((f) => {
            const angleRad = ((FAMILLES[f].angle - 90) * Math.PI) / 180;
            const dist = ringPct * r;
            return `${cx + dist * Math.cos(angleRad)},${cy + dist * Math.sin(angleRad)}`;
          })
          .join(" ");
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="rgba(245,240,230,0.12)"
            strokeWidth="1"
          />
        );
      })}
      {fams.map((f) => {
        const angleRad = ((FAMILLES[f].angle - 90) * Math.PI) / 180;
        const x2 = cx + r * Math.cos(angleRad);
        const y2 = cy + r * Math.sin(angleRad);
        const lx = cx + (r + 18) * Math.cos(angleRad);
        const ly = cy + (r + 18) * Math.sin(angleRad);
        return (
          <g key={f}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(245,240,230,0.12)" strokeWidth="1" />
            <text
              x={lx}
              y={ly}
              fill="rgba(245,240,230,0.55)"
              fontSize="10"
              fontFamily="'Helvetica Neue', Arial, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {FAMILLES[f].label}
            </text>
          </g>
        );
      })}
      <polygon
        points={dataPath}
        fill="rgba(201,147,47,0.22)"
        stroke="#c9932f"
        strokeWidth="1.5"
        style={{ transition: "all 0.6s ease" }}
      />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={FAMILLES[fams[i]].color} />
      ))}
    </svg>
  );
}

function useCountUp(target, durationMs = 900, start = false) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, durationMs]);
  return value;
}

// --- App principale ----------------------------------------------------

export default function App() {
  const [step, setStep] = useState(-1); // -1 intro, 0..N-1 questions, "genre", "scanning", "result"
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [questions, setQuestions] = useState(() => generateQuestions());
  const [scanIndex, setScanIndex] = useState(0);
  const [openReco, setOpenReco] = useState(null);
  const [genrePref, setGenrePref] = useState(null);
  const [occasionPref, setOccasionPref] = useState(null);
  const [shareLabel, setShareLabel] = useState("Partager mon résultat");

  const totalSteps = questions.length;

  function handleAnswer(points) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = points;
      return next;
    });
    const isLast = step === totalSteps - 1;
    setStep(isLast ? "genre" : step + 1);
  }

  function goBack() {
    if (step === "occasion") {
      setStep("genre");
    } else if (step === "genre") {
      setStep(totalSteps - 1);
    } else if (typeof step === "number" && step > 0) {
      setStep(step - 1);
    }
  }

  function handleGenre(value) {
    setGenrePref(value);
    setStep("occasion");
  }

  function handleOccasion(value) {
    setOccasionPref(value);
    setStep("scanning");
  }

  useEffect(() => {
    if (step !== "scanning") return;
    setScanIndex(0);
    const t1 = setTimeout(() => setScanIndex(1), 550);
    const t2 = setTimeout(() => setScanIndex(2), 1100);
    const t3 = setTimeout(() => setStep("result"), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step]);

  function restart() {
    const fresh = generateQuestions();
    setQuestions(fresh);
    setAnswers(Array(fresh.length).fill(null));
    setGenrePref(null);
    setOccasionPref(null);
    setStep(-1);
  }

  async function handleShare() {
    const shareData = {
      title: "Aunez — Mon profil de parfum",
      text: `Mon profil olfactif sur Aunez : ${FAMILLES[top].label}. Découvre le tien !`,
      url: typeof window !== "undefined" ? window.location.href : "https://aunez.fr",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareLabel("Lien copié !");
        setTimeout(() => setShareLabel("Partager mon résultat"), 2000);
      }
    } catch (e) {
      // partage annulé par la personne, on ne fait rien
    }
  }

  const scores = { floral: 0, boise: 0, oriental: 0, frais: 0 };
  answers.forEach((a) => {
    if (!a) return;
    Object.entries(a).forEach(([fam, val]) => {
      scores[fam] = Math.max(0, scores[fam] + val);
    });
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const percentages = Object.fromEntries(
    Object.entries(scores).map(([f, v]) => [f, Math.round((v / total) * 100)])
  );
  const maxScore = Math.max(...Object.values(scores), 1);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0][0];
  const topPct = useCountUp(percentages[top], 1100, step === "result");

  const answeredCount = typeof step === "number" ? Math.max(step, 0) : totalSteps;
  const starsToReveal = 20 + answeredCount * 22;

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatA { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(60px,40px) scale(1.15); } 66% { transform: translate(-20px,60px) scale(0.95); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-50px,50px) scale(1.1); } 66% { transform: translate(-70px,-20px) scale(1.05); } }
        @keyframes floatC { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-60px,-40px) scale(1.2); } 66% { transform: translate(30px,-60px) scale(0.9); } }
        @keyframes floatD { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px,-50px) scale(1.05); } 66% { transform: translate(70px,20px) scale(1.15); } }
        @keyframes twinkle { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
        @media (max-width: 420px) {
          .aunez-card { padding: 28px 20px !important; }
          .aunez-h1 { font-size: 26px !important; }
          .aunez-h2 { font-size: 19px !important; }
          .aunez-orb { transform: scale(0.85); }
        }
      `}</style>
      <StarField revealCount={starsToReveal} />
      <AuraBackground percentages={percentages} />
      <div style={styles.card} className="aunez-card">
        {step === -1 && (
          <div style={styles.center}>
            <div style={styles.eyebrow}>Quiz olfactif</div>
            <h1 style={styles.h1} className="aunez-h1">Quel est ton profil de parfum ?</h1>
            <p style={styles.lead}>
              Une odeur ne s'hérite pas, elle se choisit. Tes réponses
              dessinent ton histoire — et révèlent l'odeur qui te
              ressemble vraiment.
            </p>
            <button style={styles.primaryBtn} onClick={() => setStep(0)}>
              Commencer
            </button>
          </div>
        )}

        {typeof step === "number" && step >= 0 && step < totalSteps && (
          <div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${(step / totalSteps) * 100}%` }} />
            </div>
            <div style={styles.stepRow}>
              <div style={styles.stepLabel}>Question {step + 1} / {totalSteps}</div>
              {step > 0 && (
                <button style={styles.backBtn} onClick={goBack}>
                  ← précédent
                </button>
              )}
            </div>
            <h2 style={styles.h2} className="aunez-h2">{questions[step].title}</h2>
            <div style={styles.optionsGrid}>
              {questions[step].options.map((opt, i) => {
                const isSelected =
                  answers[step] && JSON.stringify(opt.points) === JSON.stringify(answers[step]);
                return (
                  <button
                    key={i}
                    style={{
                      ...styles.optionBtn,
                      borderColor: isSelected ? "#c9932f" : "rgba(245,240,230,0.15)",
                      background: isSelected ? "rgba(201,147,47,0.08)" : "rgba(245,240,230,0.04)",
                    }}
                    onClick={() => handleAnswer(opt.points)}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9932f")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = isSelected
                        ? "#c9932f"
                        : "rgba(245,240,230,0.15)")
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "genre" && (
          <div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: "88%" }} />
            </div>
            <div style={styles.stepRow}>
              <div style={styles.stepLabel}>Avant-dernière question</div>
              <button style={styles.backBtn} onClick={goBack}>
                ← précédent
              </button>
            </div>
            <h2 style={styles.h2} className="aunez-h2">Le parfum que tu cherches, tu le veux plutôt…</h2>
            <div style={styles.optionsGrid}>
              {GENRE_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.optionBtn,
                    borderColor: genrePref === opt.value ? "#c9932f" : "rgba(245,240,230,0.15)",
                    background:
                      genrePref === opt.value ? "rgba(201,147,47,0.08)" : "rgba(245,240,230,0.04)",
                  }}
                  onClick={() => handleGenre(opt.value)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9932f")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      genrePref === opt.value ? "#c9932f" : "rgba(245,240,230,0.15)")
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "occasion" && (
          <div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: "100%" }} />
            </div>
            <div style={styles.stepRow}>
              <div style={styles.stepLabel}>Dernière question</div>
              <button style={styles.backBtn} onClick={goBack}>
                ← précédent
              </button>
            </div>
            <h2 style={styles.h2} className="aunez-h2">Tu cherches ce parfum surtout pour…</h2>
            <div style={styles.optionsGrid}>
              {OCCASION_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.optionBtn,
                    borderColor: occasionPref === opt.value ? "#c9932f" : "rgba(245,240,230,0.15)",
                    background:
                      occasionPref === opt.value ? "rgba(201,147,47,0.08)" : "rgba(245,240,230,0.04)",
                  }}
                  onClick={() => handleOccasion(opt.value)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9932f")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      occasionPref === opt.value ? "#c9932f" : "rgba(245,240,230,0.15)")
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "scanning" && (
          <div style={{ ...styles.center, padding: "20px 0" }}>
            <div style={styles.scanRing} />
            <div style={styles.eyebrow}>Analyse en cours</div>
            <div style={{ marginTop: 18 }}>
              {SCAN_STEPS.map((label, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.scanLine,
                    opacity: i <= scanIndex ? 1 : 0.25,
                    animation: i === scanIndex ? "pulse 1s ease infinite" : "none",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "result" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <div style={{ ...styles.center, marginBottom: 8 }} className="aunez-orb">
              <ScentOrb percentages={percentages} />
            </div>
            <div style={{ ...styles.center, marginTop: 18 }}>
              <div style={styles.eyebrow}>Ta signature olfactive</div>
              <div style={styles.bigPct}>{topPct}%</div>
              <h1 style={{ ...styles.h1, marginTop: 0 }} className="aunez-h1">{FAMILLES[top].label}</h1>
              <p style={styles.lead}>{FAMILLES[top].desc}</p>
              {genrePref && (
                <div style={styles.genreTag}>
                  {GENRE_OPTIONS.find((g) => g.value === genrePref)?.label}
                </div>
              )}
            </div>

            <RadarChart scores={scores} maxScore={maxScore} />

            <div style={styles.recosSection}>
              <div style={styles.recosLabel}>
                {occasionPref
                  ? `Sélectionnés pour ${OCCASION_OPTIONS.find((o) => o.value === occasionPref)?.phrase}`
                  : "Sélectionnés pour ton profil"}
              </div>
              {FAMILLES[top].recos.map((p, i) => {
                const isOpen = openReco === i;
                return (
                  <div key={i} style={styles.recoCard}>
                    <button
                      style={styles.recoHeader}
                      onClick={() => setOpenReco(isOpen ? null : i)}
                    >
                      <div style={{ ...styles.recoDot, background: FAMILLES[top].color }} />
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={styles.recoName}>{p.nom}</div>
                        <div style={styles.recoBrand}>{p.marque}</div>
                        <div style={styles.recoAccroche}>{p.accroche}</div>
                      </div>
                      <div style={{ ...styles.recoChevron, transform: isOpen ? "rotate(180deg)" : "none" }}>
                        ⌄
                      </div>
                    </button>
                    {isOpen && (
                      <div style={styles.recoBody}>
                        <p style={styles.recoHistoire}>{p.histoire}</p>
                        {p.pasFait && (
                          <div style={styles.pasFaitBox}>
                            <span style={styles.pasFaitLabel}>Honnêtement</span> {p.pasFait}
                          </div>
                        )}
                        <div style={styles.recoBtnRow}>
                          <a href={p.lien} target="_blank" rel="noopener noreferrer" style={styles.recoBtn}>
                            Découvrir ce parfum
                          </a>
                          {p.lienEchantillon && (
                            <a
                              href={p.lienEchantillon}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.recoBtnGhost}
                            >
                              Tester en échantillon d'abord
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ ...styles.center }}>
              <button style={styles.secondaryBtn} onClick={restart}>
                Refaire le quiz
              </button>
              <button style={styles.shareBtn} onClick={handleShare}>
                {shareLabel}
              </button>
            </div>
            <div style={styles.affiliateNote}>
              Certains liens ci-dessus sont des liens affiliés. Si tu
              achètes via l'un d'eux, Aunez touche une petite commission,
              sans surcoût pour toi.
            </div>
          </div>
        )}
      </div>
      <div style={styles.footerLinks}>
        <a href="/a-propos" style={styles.footerLink}>
          Pourquoi Aunez ?
        </a>
        <a href="/histoire" style={styles.footerLink}>
          Histoire du parfum
        </a>
      </div>
      <div style={styles.legalLinks}>
        <a href="/mentions-legales" style={styles.legalLink}>
          Mentions légales
        </a>
        <span style={styles.legalDot}>·</span>
        <a href="/confidentialite" style={styles.legalLink}>
          Confidentialité
        </a>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#08070c",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    fontFamily: "'Georgia', 'Iowan Old Style', serif",
    position: "relative",
  },
  aura: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  starLayer: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  grain: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "3px 3px",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: 480,
    background: "rgba(20,15,26,0.6)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(245,240,230,0.14)",
    borderRadius: 6,
    padding: "40px 32px",
    boxShadow: "0 20px 70px rgba(0,0,0,0.55)",
    color: "#f5f0e6",
  },
  footerLink: {
    position: "relative",
    zIndex: 1,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    color: "rgba(245,240,230,0.4)",
    textDecoration: "none",
    letterSpacing: "0.04em",
  },
  footerLinks: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    gap: 20,
    marginTop: 18,
  },
  legalLinks: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
  legalLink: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    color: "rgba(245,240,230,0.28)",
    textDecoration: "none",
  },
  legalDot: { color: "rgba(245,240,230,0.2)", fontSize: 11 },
  shareBtn: {
    display: "block",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "transparent",
    color: "#c9932f",
    border: "none",
    fontSize: 12.5,
    letterSpacing: "0.04em",
    cursor: "pointer",
    margin: "14px auto 0",
    textDecoration: "underline",
  },
  affiliateNote: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    lineHeight: 1.6,
    color: "rgba(245,240,230,0.4)",
    textAlign: "center",
    marginTop: 22,
    paddingTop: 16,
    borderTop: "1px solid rgba(245,240,230,0.08)",
  },
  center: { textAlign: "center" },
  eyebrow: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9932f",
    marginBottom: 14,
  },
  h1: { fontSize: 32, lineHeight: 1.2, margin: "0 0 14px", fontWeight: 400 },
  h2: { fontSize: 22, lineHeight: 1.35, margin: "18px 0 24px", fontWeight: 400 },
  lead: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(245,240,230,0.75)",
    margin: "0 0 28px",
  },
  bigPct: {
    fontSize: 52,
    fontWeight: 300,
    letterSpacing: "-0.02em",
    color: "#c9932f",
    margin: "6px 0 2px",
  },
  genreTag: {
    display: "inline-block",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.04em",
    color: "rgba(245,240,230,0.55)",
    background: "rgba(245,240,230,0.06)",
    border: "1px solid rgba(245,240,230,0.15)",
    borderRadius: 20,
    padding: "5px 14px",
    marginBottom: 24,
  },
  primaryBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "#c9932f",
    color: "#1b1420",
    border: "none",
    borderRadius: 2,
    padding: "13px 30px",
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "transparent",
    color: "#f5f0e6",
    border: "1px solid rgba(245,240,230,0.3)",
    borderRadius: 2,
    padding: "12px 26px",
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: 20,
  },
  progressTrack: {
    height: 2,
    width: "100%",
    background: "rgba(245,240,230,0.15)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: { height: "100%", background: "#c9932f", transition: "width 0.3s ease" },
  stepLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(245,240,230,0.5)",
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    background: "transparent",
    border: "none",
    color: "rgba(245,240,230,0.5)",
    cursor: "pointer",
    letterSpacing: "0.04em",
  },
  optionsGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
  optionBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    textAlign: "left",
    background: "rgba(245,240,230,0.04)",
    border: "1px solid rgba(245,240,230,0.15)",
    borderRadius: 3,
    padding: "14px 16px",
    color: "#f5f0e6",
    fontSize: 14.5,
    cursor: "pointer",
    transition: "border-color 0.2s ease",
  },
  scanRing: {
    width: 64,
    height: 64,
    margin: "0 auto 20px",
    borderRadius: "50%",
    border: "2px solid rgba(245,240,230,0.15)",
    borderTopColor: "#c9932f",
    animation: "spin 1s linear infinite",
  },
  scanLine: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    color: "rgba(245,240,230,0.8)",
    marginBottom: 8,
    transition: "opacity 0.3s ease",
  },
  resultNote: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(245,240,230,0.6)",
    background: "rgba(245,240,230,0.04)",
    border: "1px dashed rgba(245,240,230,0.2)",
    borderRadius: 3,
    padding: 14,
    margin: "20px 0 8px",
  },
  recosSection: { margin: "24px 0 8px" },
  recosLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(245,240,230,0.5)",
    marginBottom: 12,
  },
  recoCard: {
    background: "rgba(245,240,230,0.04)",
    border: "1px solid rgba(245,240,230,0.12)",
    borderRadius: 4,
    marginBottom: 10,
    overflow: "hidden",
  },
  recoHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "transparent",
    border: "none",
    padding: "14px 16px",
    cursor: "pointer",
    color: "#f5f0e6",
  },
  recoDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  recoName: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    fontWeight: 600,
  },
  recoBrand: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11.5,
    color: "rgba(245,240,230,0.5)",
    margin: "2px 0 4px",
  },
  recoAccroche: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12.5,
    fontStyle: "italic",
    color: "rgba(245,240,230,0.7)",
  },
  recoChevron: {
    fontSize: 16,
    color: "rgba(245,240,230,0.4)",
    transition: "transform 0.25s ease",
    flexShrink: 0,
  },
  recoBody: {
    padding: "0 16px 18px",
    borderTop: "1px solid rgba(245,240,230,0.08)",
    animation: "fadeUp 0.3s ease",
  },
  recoHistoire: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    lineHeight: 1.65,
    color: "rgba(245,240,230,0.75)",
    margin: "14px 0 16px",
  },
  recoBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11.5,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#c9932f",
    border: "1px solid rgba(201,147,47,0.4)",
    borderRadius: 3,
    padding: "6px 12px",
    textDecoration: "none",
    flexShrink: 0,
  },
  recoBtnGhost: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11.5,
    letterSpacing: "0.02em",
    color: "rgba(245,240,230,0.55)",
    border: "1px dashed rgba(245,240,230,0.25)",
    borderRadius: 3,
    padding: "6px 12px",
    textDecoration: "none",
    flexShrink: 0,
  },
  recoBtnRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pasFaitBox: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12.5,
    lineHeight: 1.6,
    color: "rgba(245,240,230,0.65)",
    background: "rgba(245,240,230,0.03)",
    borderLeft: "2px solid rgba(201,147,47,0.4)",
    padding: "8px 12px",
    margin: "0 0 14px",
  },
  pasFaitLabel: {
    color: "#c9932f",
    fontWeight: 600,
  },
};
