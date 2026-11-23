import type { ToolsLocalePack } from "@/i18n/tools/types";

export const es: ToolsLocalePack = {
  categories: {
    analysis: { name: "Análisis y contadores", nav: "Análisis", hubTitle: "Análisis y conteo", hubLead: "Caracteres, palabras, lectura y frecuencia." },
    cleanup: { name: "Limpieza y formato", nav: "Limpiar", hubTitle: "Limpieza y formato", hubLead: "Mayúsculas, espacios, HTML y párrafos." },
    lines: { name: "Líneas y listas", nav: "Líneas", hubTitle: "Líneas y listas", hubLead: "Duplicados, orden, extracción." },
    diff: { name: "Comparar textos", nav: "Diff", hubTitle: "Comparación", hubLead: "Original vs. editado con colores." },
  },
  tools: {
    "analysis/char-counter": { title: "Contador de caracteres", description: "Caracteres, palabras, frases, párrafos y lectura.", hint: "En vivo al escribir.", seoDescription: "Contador en el navegador." },
    "analysis/word-frequency": { title: "Frecuencia de palabras", description: "Palabras más repetidas.", hint: "Ignora tokens de una letra.", seoDescription: "Frecuencia de palabras local." },
    "cleanup/case": { title: "Mayúsculas/minúsculas", description: "MAYÚS, minús, título, oración, alterno.", hint: "Todo el buffer.", seoDescription: "Cambiar mayúsculas online." },
    "cleanup/clean": { title: "Limpiar texto", description: "Espacios, líneas vacías, tabs, HTML.", hint: "Aplicar al editor.", seoDescription: "Limpiar espacios y HTML." },
    "cleanup/format-post": {
      title: "Formato para posts",
      description: "Párrafos, longitud de línea, límites y presets con vista previa en vivo.",
      hint: "Prueba presets, elige frases o caracteres por párrafo y copia o aplica el resultado.",
      seoDescription: "Divide texto para redes y ajusta líneas en límites de palabra.",
    },
    "lines/dedupe": {
      title: "Quitar líneas duplicadas",
      description: "Primera aparición, opciones de comparación, estadísticas e informe de duplicados.",
      hint: "Demo, ajusta opciones y copia o aplica la lista única.",
      seoDescription: "Deduplicar líneas en el navegador.",
    },
    "lines/sort-lines": { title: "Ordenar y numerar", description: "A–Z, longitud, prefijos.", hint: "Locale del idioma.", seoDescription: "Ordenar líneas de texto." },
    "lines/extract": { title: "Extraer datos", description: "Emails, URLs y números.", hint: "Lista para copiar.", seoDescription: "Extraer enlaces del texto." },
    "diff/compare": {
      title: "Diff de texto",
      description: "Diff por líneas y palabras, estadísticas, filtros, intercambiar A↔B y exportar informe.",
      hint: "Carga la demo, ajusta opciones, copia o descarga el informe diff.",
      seoDescription: "Comparar dos textos en el navegador — privado y rápido.",
    },
  },
};