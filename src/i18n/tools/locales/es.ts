import type { ToolsLocalePack } from "@/i18n/tools/types";

export const es: ToolsLocalePack = {
  categories: {
    analysis: {
      name: "Análisis y contadores",
      nav: "Análisis",
      hubTitle: "Análisis y contadores",
      hubLead: "Caracteres, palabras, tiempo de lectura y frecuencia.",
      seoTitle: "Análisis de texto y contadores",
      seoDescription:
        "Contador de caracteres y palabras, tiempo de lectura y frecuencia en el navegador. Seis idiomas en text.kixt.net — sin subidas.",
      pageIntro:
        "Mide longitud, tiempo de lectura y repetición antes de publicar. Todo se calcula en tu navegador; los borradores no se envían a ningún servidor.",
    },
    cleanup: {
      name: "Limpiar y formatear",
      nav: "Limpiar",
      hubTitle: "Limpieza y formato",
      hubLead: "Mayúsculas, espacios, HTML y ajuste para publicaciones.",
      seoTitle: "Limpiar y formatear texto online",
      seoDescription:
        "Cambiar mayúsculas, quitar HTML, normalizar espacios y formatear posts. Herramientas privadas en text.kixt.net.",
      pageIntro:
        "Arregla texto sucio, marcado sobrante y saltos incómodos en un solo lugar. El procesamiento es local: pega, ajusta opciones y copia sin subir archivos.",
    },
    lines: {
      name: "Líneas y listas",
      nav: "Líneas",
      hubTitle: "Líneas y listas",
      hubLead: "Duplicados, ordenar, numerar, extraer datos.",
      seoTitle: "Líneas: deduplicar, ordenar, extraer",
      seoDescription:
        "Eliminar líneas duplicadas, ordenar y numerar, extraer emails, URLs y números. En el navegador en text.kixt.net.",
      pageIntro:
        "Trabaja con listas, registros y exportaciones línea a línea. Deduplicación, ordenación y extracción ocurren en el navegador — tu texto no se guarda en nuestros servidores.",
    },
    diff: {
      name: "Comparar textos",
      nav: "Diff",
      hubTitle: "Comparar textos",
      hubLead: "Diff visual con filtros opcionales.",
      seoTitle: "Comparar dos textos (diff)",
      seoDescription:
        "Diff por líneas y palabras con estadísticas, filtros e informe. Privado en text.kixt.net.",
      pageIntro:
        "Detecta adiciones, eliminaciones y cambios palabra a palabra entre dos versiones. La comparación es 100 % en el navegador; los borradores no salen de tu equipo.",
    },
  },
  tools: {
    "analysis/char-counter": {
      title: "Contador de caracteres y palabras",
      description: "Estadísticas, tiempo de lectura, límites y exportación local.",
      hint: "Límites y reportes sin subir datos.",
      seoTitle: "Contador de caracteres y palabras",
      seoDescription:
        "Cuenta caracteres, palabras, frases y tiempo de lectura. Local en text.kixt.net — gratis.",
      pageIntro:
        "Pega o escribe texto para ver conteos y tiempos al instante. Las estadísticas se calculan solo en tu navegador; no hay carga ni almacenamiento en servidor.",
    },
    "analysis/word-frequency": {
      title: "Frecuencia de palabras",
      description: "Unigramas, bigramas y trigramas con filtros y exportación.",
      hint: "Toca una fila para ver coincidencias.",
      seoTitle: "Frecuencia y repetición de palabras",
      seoDescription:
        "Palabras, bigramas y trigramas más frecuentes. Análisis en el navegador en text.kixt.net.",
      pageIntro:
        "Descubre qué términos dominan tu texto y salta a cada aparición. Las tablas se generan en tu dispositivo — el contenido sensible permanece privado.",
    },
    "cleanup/case": {
      title: "Mayúsculas y minúsculas",
      description: "Vista previa para todos los modos de caso.",
      hint: "El original permanece hasta que aplicas el resultado.",
      seoTitle: "Cambiar mayúsculas/minúsculas",
      seoDescription:
        "MAYÚS, minús, título, oración e invertido con vista previa. text.kixt.net sin servidor.",
      pageIntro:
        "Normaliza la capitalización en segundos. La vista previa se actualiza en el navegador; tu texto no se transmite.",
    },
    "cleanup/clean": {
      title: "Limpiar texto",
      description: "Quitar HTML, espacios e invisibles con estadísticas.",
      hint: "Presets o opciones propias con vista previa.",
      seoTitle: "Limpiar texto: HTML y espacios",
      seoDescription:
        "Elimina HTML, espacios extra y caracteres invisibles. Local en text.kixt.net.",
      pageIntro:
        "Convierte contenido web pegado en texto plano consistente. La limpieza es client-side con vista antes/después — sin almacenar en servidor.",
    },
    "cleanup/format-post": {
      title: "Formato para publicaciones",
      description: "Párrafos, saltos y límites con vista previa en vivo.",
      hint: "Prueba presets de feed y copia el resultado.",
      seoTitle: "Formatear texto para redes",
      seoDescription:
        "Divide en párrafos, ajusta saltos y límites de caracteres. Herramienta en text.kixt.net.",
      pageIntro:
        "Prepara hilos o pies de foto con párrafos legibles y control de longitud. Todo se procesa en la pestaña — el borrador no se sube.",
    },
    "lines/dedupe": {
      title: "Quitar líneas duplicadas",
      description: "Primera ocurrencia, opciones de comparación y informe.",
      hint: "Demo, opciones y lista única lista para copiar.",
      seoTitle: "Eliminar líneas duplicadas",
      seoDescription:
        "Deduplica listas con reglas flexibles (caja, espacios). text.kixt.net en el navegador.",
      pageIntro:
        "Colapsa filas repetidas en listas o logs conservando la primera línea. La comparación es totalmente local — la lista no se envía al servidor.",
    },
    "lines/sort-lines": {
      title: "Ordenar y numerar líneas",
      description: "A–Z, longitud, prefijos y numeración.",
      hint: "Elige modo, añade prefijos o números.",
      seoTitle: "Ordenar y numerar líneas",
      seoDescription:
        "Orden A–Z o por longitud, prefijos, sufijos y numeración. text.kixt.net.",
      pageIntro:
        "Reordena listas y añade numeración si lo necesitas. El orden usa la locale del idioma de la interfaz en el navegador — sin persistencia en servidor.",
    },
    "lines/extract": {
      title: "Extraer datos",
      description: "Emails, URLs y números con filtro único.",
      hint: "Cambia de pestaña y exporta .txt.",
      seoTitle: "Extraer emails, URLs y números",
      seoDescription:
        "Encuentra correos, enlaces y números en cualquier texto. text.kixt.net sin subir.",
      pageIntro:
        "Escanea contenido pegado en un solo paso. La detección ocurre en tu máquina — documentos confidenciales siguen siendo privados.",
    },
    "diff/compare": {
      title: "Diff de texto",
      description: "Diff por líneas y palabras, estadísticas e informe.",
      hint: "Carga demo, ajusta opciones, copia el informe.",
      seoTitle: "Diff de texto — comparar versiones",
      seoDescription:
        "Comparación visual por líneas y palabras con filtros. Privado en text.kixt.net.",
      pageIntro:
        "Pega original y revisión para resaltar altas, bajas y cambios internos. El cálculo es local — ninguna versión se sube para procesarse.",
    },
  },
};