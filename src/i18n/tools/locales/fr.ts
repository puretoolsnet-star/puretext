import type { ToolsLocalePack } from "@/i18n/tools/types";

export const fr: ToolsLocalePack = {
  categories: {
    analysis: {
      name: "Analyse & compteurs",
      nav: "Analyse",
      hubTitle: "Analyse et compteurs",
      hubLead: "Caractères, mots, temps de lecture, fréquence.",
      seoTitle: "Analyse de texte et compteurs",
      seoDescription:
        "Compteur de caractères et mots, temps de lecture, fréquence des mots dans le navigateur. Six langues sur text.kixt.net.",
      pageIntro:
        "Mesurez longueur, temps de lecture et répétitions avant publication. Tout s’exécute localement dans le navigateur — les brouillons ne sont pas envoyés au serveur.",
    },
    cleanup: {
      name: "Nettoyer & formater",
      nav: "Nettoyer",
      hubTitle: "Nettoyage et formatage",
      hubLead: "Casse, espaces, HTML, mise en forme pour posts.",
      seoTitle: "Nettoyer et formater du texte",
      seoDescription:
        "Changer la casse, retirer le HTML, normaliser les espaces, formater les posts. Outils privés sur text.kixt.net.",
      pageIntro:
        "Corrigez texte sale, balisage et sauts de ligne au même endroit. Le traitement reste sur votre appareil : collez, réglez les options, copiez sans envoyer de fichier.",
    },
    lines: {
      name: "Lignes & listes",
      nav: "Lignes",
      hubTitle: "Lignes et listes",
      hubLead: "Doublons, tri, numérotation, extraction.",
      seoTitle: "Lignes : dédoublonner, trier, extraire",
      seoDescription:
        "Supprimer les doublons, trier et numéroter, extraire e-mails, URL et nombres. Dans le navigateur sur text.kixt.net.",
      pageIntro:
        "Travaillez ligne par ligne sur listes, journaux et exports. Dédoublonnage, tri et extraction dans le navigateur — votre texte n’est pas stocké sur nos serveurs.",
    },
    diff: {
      name: "Comparer des textes",
      nav: "Diff",
      hubTitle: "Comparer des textes",
      hubLead: "Diff visuel avec filtres.",
      seoTitle: "Comparer deux textes (diff)",
      seoDescription:
        "Diff lignes et mots avec stats, filtres et rapport. Privé sur text.kixt.net.",
      pageIntro:
        "Repérez ajouts, suppressions et modifications mot à mot entre deux versions. La comparaison est entièrement côté client — les brouillons confidentiels restent locaux.",
    },
  },
  tools: {
    "analysis/char-counter": {
      title: "Compteur de caractères et mots",
      description: "Stats, temps de lecture, limites, export local.",
      hint: "Limites et rapports sans envoi.",
      seoTitle: "Compteur de caractères et mots",
      seoDescription:
        "Comptez caractères, mots, phrases et temps de lecture. Local sur text.kixt.net — gratuit.",
      pageIntro:
        "Collez ou saisissez du texte pour des compteurs et temps de lecture instantanés. Les stats sont calculées uniquement dans le navigateur — aucun téléversement.",
    },
    "analysis/word-frequency": {
      title: "Fréquence des mots",
      description: "Unigrammes, bigrammes, trigrammes et export.",
      hint: "Cliquez une ligne pour les occurrences.",
      seoTitle: "Fréquence et répétition des mots",
      seoDescription:
        "Mots, bigrammes et trigrammes les plus fréquents. Analyse navigateur sur text.kixt.net.",
      pageIntro:
        "Identifiez les termes dominants et allez à chaque occurrence. Les tableaux sont générés sur votre appareil — le texte sensible reste privé.",
    },
    "cleanup/case": {
      title: "Casse du texte",
      description: "Aperçu pour tous les modes de casse.",
      hint: "L’original reste jusqu’à application.",
      seoTitle: "Changer la casse du texte",
      seoDescription:
        "MAJUSCULES, minuscules, titre, phrase, inversé. text.kixt.net sans serveur.",
      pageIntro:
        "Normalisez la capitalisation en quelques secondes. L’aperçu se met à jour dans le navigateur ; votre texte n’est pas transmis.",
    },
    "cleanup/clean": {
      title: "Nettoyer le texte",
      description: "Retirer HTML, espaces et caractères invisibles.",
      hint: "Préréglages et aperçu avant/après.",
      seoTitle: "Nettoyer : HTML et espaces",
      seoDescription:
        "Supprimez HTML, espaces superflus et caractères invisibles. Local sur text.kixt.net.",
      pageIntro:
        "Transformez du contenu web collé en texte propre. Le nettoyage est client avec vue avant/après — pas de stockage serveur.",
    },
    "cleanup/format-post": {
      title: "Format pour publications",
      description: "Paragraphes, retours à la ligne et limites.",
      hint: "Presets feed puis copie.",
      seoTitle: "Formater pour les réseaux sociaux",
      seoDescription:
        "Découpez en paragraphes, coupez les lignes, suivez les limites. text.kixt.net.",
      pageIntro:
        "Préparez threads ou légendes avec des paragraphes lisibles. Le traitement reste dans l’onglet — le brouillon n’est pas envoyé.",
    },
    "lines/dedupe": {
      title: "Supprimer les doublons de lignes",
      description: "Première occurrence, options, statistiques.",
      hint: "Démo, options, liste unique.",
      seoTitle: "Supprimer les lignes en double",
      seoDescription:
        "Dédoublonnez avec règles flexibles (casse, espaces). text.kixt.net.",
      pageIntro:
        "Réduisez les répétitions dans listes ou logs en gardant la première ligne. Comparaison 100 % navigateur — pas d’envoi de la liste.",
    },
    "lines/sort-lines": {
      title: "Trier et numéroter",
      description: "A–Z, longueur, préfixes, numérotation.",
      hint: "Mode, préfixes ou numéros.",
      seoTitle: "Trier et numéroter les lignes",
      seoDescription:
        "Tri A–Z ou par longueur, préfixes, suffixes, numéros. text.kixt.net.",
      pageIntro:
        "Réordonnez des listes et ajoutez une numérotation. Le tri utilise la locale de l’interface dans le navigateur — pas de persistance serveur.",
    },
    "lines/extract": {
      title: "Extraire des données",
      description: "E-mails, URL, nombres, filtre unique.",
      hint: "Onglets par type, export .txt.",
      seoTitle: "Extraire e-mails, URL et nombres",
      seoDescription:
        "Trouvez adresses, liens et nombres dans un texte. text.kixt.net sans upload.",
      pageIntro:
        "Scannez un collage en une passe. La détection se fait sur votre machine — les documents sensibles restent confidentiels.",
    },
    "diff/compare": {
      title: "Diff de texte",
      description: "Diff lignes et mots, stats, filtres, rapport.",
      hint: "Démo, options, copier le rapport.",
      seoTitle: "Diff texte — comparer des versions",
      seoDescription:
        "Comparaison lignes et mots avec filtres et rapport. Privé sur text.kixt.net.",
      pageIntro:
        "Collez original et révision pour surligner ajouts, suppressions et changements. Calcul local — aucune version n’est téléversée.",
    },
  },
};