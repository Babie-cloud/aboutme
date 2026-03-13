// Données des croquis – partagées entre galerie et pages détail
export const sketches = [
  {
    id: 1,
    slug: 'innocence-du-trait',
    title: "L'innocence du trait",
    description:
      'Un premier jet au crayon HB, explorant les courbes du visage. Ce portrait capture la douceur des traits et la lumière sur la peau.',
    longDescription:
      "Cette étude au crayon HB a été réalisée en une séance. L'objectif était de saisir la fraîcheur du modèle sans surtravailler les ombres. Le grain du papier donne une texture organique au dessin.",
    technique: 'Crayon HB sur papier grainé 180 g/m²',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600',
  },
  {
    id: 2,
    slug: 'ombre-et-lumiere',
    title: "L'ombre et la lumière",
    description: 'Travail sur les contrastes au stylo bille noir.',
    longDescription:
      "Une exploration des valeurs avec un simple stylo bille. Les hachures croisées créent des dégradés subtils et donnent du volume au visage. Inspiré par les maîtres de l'illustration classique.",
    technique: 'Stylo bille noir sur papier Canson',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600',
  },
  {
    id: 3,
    slug: 'regard-de-buja',
    title: 'Le regard de Buja',
    description: 'Inspiré par une répétition de Buja sans Tabou.',
    longDescription:
      "Croquis réalisé en coulisses lors d'une répétition. Le regard du personnage exprime toute l'intensité du texte joué. Le théâtre et le dessin se nourrissent l'un l'autre.",
    technique: 'Graphite et fusain sur papier kraft',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=600',
  },
  {
    id: 4,
    slug: 'mouvement-suspendu',
    title: 'Mouvement suspendu',
    description: "Capture d'un instant fugace au graphite.",
    longDescription:
      "Un geste saisi en quelques secondes. Le mouvement est au cœur de ma pratique : qu'il soit théâtral ou graphique, c'est l'instant qui compte.",
    technique: 'Graphite 2B sur papier grainé',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=600',
  },
  {
    id: 5,
    slug: 'force-du-silence',
    title: 'La force du silence',
    description: "Étude de posture et d'émotion brute.",
    longDescription:
      "Le corps ne ment jamais. Cette pose exprime une tension intérieure sans un mot. Le crayon souligne les muscles et les ombres pour révéler l'émotion.",
    technique: 'Graphite sur papier grainé 180 g/m²',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600',
  },
];

export function getSketchBySlug(slug) {
  return sketches.find((s) => s.slug === slug) || null;
}

export function getSketchById(id) {
  return sketches.find((s) => s.id === Number(id)) || null;
}
