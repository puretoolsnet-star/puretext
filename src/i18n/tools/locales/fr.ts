import type { ToolsLocalePack } from "@/i18n/tools/types";

export const fr: ToolsLocalePack = {
  categories: {
    analysis: { name: "Analyse et compteurs", nav: "Analyse", hubTitle: "Analyse et compteurs", hubLead: "Caractères, mots, lecture, fréquence." },
    cleanup: { name: "Nettoyage et format", nav: "Nettoyer", hubTitle: "Nettoyage et format", hubLead: "Casse, espaces, HTML, paragraphes." },
    lines: { name: "Lignes et listes", nav: "Lignes", hubTitle: "Lignes et listes", hubLead: "Doublons, tri, extraction." },
    diff: { name: "Comparer des textes", nav: "Diff", hubTitle: "Comparaison", hubLead: "Original vs. modifié en couleur." },
  },
  tools: {
    "analysis/char-counter": { title: "Compteur de caractères", description: "Caractères, mots, phrases, paragraphes.", hint: "En direct.", seoDescription: "Compteur dans le navigateur." },
    "analysis/word-frequency": { title: "Fréquence des mots", description: "Mots les plus répétés.", hint: "Ignore les tokens d'une lettre.", seoDescription: "Fréquence des mots locale." },
    "cleanup/case": { title: "Casse du texte", description: "MAJ, min, titre, phrase, alterné.", hint: "Tout le buffer.", seoDescription: "Changer la casse en ligne." },
    "cleanup/clean": { title: "Nettoyer le texte", description: "Espaces, lignes vides, tabs, HTML.", hint: "Appliquer à l'éditeur.", seoDescription: "Nettoyer espaces et HTML." },
    "cleanup/format-post": {
      title: "Format pour posts",
      description: "Paragraphes, longueur, limites et préréglages avec aperçu en direct.",
      hint: "Essayez les préréglages, réglez phrases ou taille, puis copiez ou appliquez.",
      seoDescription: "Découpez le texte pour les réseaux et coupez aux limites des mots.",
    },
    "lines/dedupe": {
      title: "Supprimer doublons",
      description: "Première occurrence, options, stats et liste des doublons — en local.",
      hint: "Texte démo, options, puis copie ou application de la liste unique.",
      seoDescription: "Dédupliquer des lignes dans le navigateur.",
    },
    "lines/sort-lines": { title: "Trier et numéroter", description: "A–Z, longueur, affixes.", hint: "Locale de l'interface.", seoDescription: "Trier des lignes de texte." },
    "lines/extract": { title: "Extraire des données", description: "E-mails, URL, nombres.", hint: "Liste copiable.", seoDescription: "Extraire e-mails du texte." },
    "diff/compare": {
      title: "Diff texte",
      description: "Diff lignes et mots, stats, filtres, échanger A↔B et exporter le rapport.",
      hint: "Chargez la démo, réglez les options, copiez ou téléchargez le rapport.",
      seoDescription: "Comparer deux textes dans le navigateur — privé et rapide.",
    },
  },
};