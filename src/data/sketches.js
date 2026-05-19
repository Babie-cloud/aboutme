// Sketch entries — detail pages at /sketch/:slug
export const sketches = [
  {
    id: 1,
    slug: 'innocence-du-trait',
    title: 'Innocence of the line',
    description:
      'Early pencil study exploring contour and light across the face. The aim is lightness of touch.',
    longDescription:
      'This HB graphite study happened in one sitting. I wanted freshness without overdrawing the shadows—the paper grain carries a little organic grit.',
    technique: 'HB pencil on textured 180 gsm paper',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600',
  },
  {
    id: 2,
    slug: 'ombre-et-lumiere',
    title: 'Shadow and light',
    description: 'Value study pushed with everyday black ink ballpoint.',
    longDescription:
      'Exploring tonal range without fancy tools—cross-hatching builds quieter gradients while keeping the likeness readable.',
    technique: 'Black ballpoint pen on sketch paper',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600',
  },
  {
    id: 3,
    slug: 'regard-de-buja',
    title: "Buja's gaze",
    description: 'Captured during rehearsal backstage energy.',
    longDescription:
      'Sketched backstage while rhythms of blocking and text still floated in the room. Theatre and drawing both chase the charged instant.',
    technique: 'Graphite and charcoal on kraft stock',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=600',
  },
  {
    id: 4,
    slug: 'mouvement-suspendu',
    title: 'Suspended motion',
    description: 'A graphite flash of a fleeting gesture.',
    longDescription:
      'Chasing kinetic truth in seconds—whether theatrical or illustrative, gesture is memory written as line.',
    technique: '2B graphite on lightly textured sheet',
    year: '2025',
    url: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=600',
  },
  {
    id: 5,
    slug: 'force-du-silence',
    title: 'The weight of silence',
    description: 'Posture-focused study stripping everything back to silhouette.',
    longDescription:
      'Bodies rarely lie—the pose holds tension wordlessly. Shadows define volume and sharpen the emotion.',
    technique: 'Graphite on 180 gsm paper',
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
