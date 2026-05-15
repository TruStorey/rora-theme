export type Swatch = {
  name: string;
  hex: string;
  role: string;
};

export type Group = {
  title: string;
  tagline: string;
  swatches: Swatch[];
};

export const palette: Group[] = [
  {
    title: "Backgrounds",
    tagline: "Five stops from deepest void to visible horizon.",
    swatches: [
      { name: "Void", hex: "#0d0b14", role: "Deepest background · window chrome" },
      { name: "Abyss", hex: "#12101c", role: "Editor background · main surface" },
      { name: "Dusk", hex: "#1a1728", role: "Sidebar · panels" },
      { name: "Twilight", hex: "#231f35", role: "Hover · selection" },
      { name: "Horizon", hex: "#2e2a45", role: "Active line · borders" },
    ],
  },
  {
    title: "Foregrounds",
    tagline: "Five steps from primary text down to barely-there.",
    swatches: [
      { name: "Starlight", hex: "#eddeff", role: "Primary text · code" },
      { name: "Veil", hex: "#a89cc8", role: "Secondary text · labels" },
      { name: "Mist", hex: "#7a7096", role: "Comments · muted UI" },
      { name: "Haze", hex: "#5c5175", role: "Disabled · placeholders" },
      { name: "Shadow", hex: "#4e4468", role: "Line numbers · barely-there" },
    ],
  },
  {
    title: "Aurora accents",
    tagline: "Ten colours spanning the full cool arc — violet through blue-green.",
    swatches: [
      { name: "Violet", hex: "#b59eff", role: "Keywords" },
      { name: "Dusk Rose", hex: "#c084fc", role: "Operators · punctuation" },
      { name: "Nebula", hex: "#d97fff", role: "Numbers · constants" },
      { name: "Rosa", hex: "#f06cb8", role: "Strings" },
      { name: "Dusk Pink", hex: "#e86fa8", role: "Deprecated · removed" },
      { name: "Polar", hex: "#7ec8f4", role: "Types · classes" },
      { name: "Glacier", hex: "#5ab4e8", role: "Links · references" },
      { name: "Aurora", hex: "#72f0c8", role: "Functions · methods" },
      { name: "Boreal", hex: "#4dd9b0", role: "Added · success" },
      { name: "Tundra", hex: "#38c4a8", role: "Variables · decorators" },
    ],
  },
  {
    title: "Moonlight",
    tagline: "Soft silver-gold. The moon through arctic clouds. Used sparingly.",
    swatches: [
      { name: "Halo", hex: "#f0e6c0", role: "Moonlight bright · emphasis" },
      { name: "Moonlight", hex: "#e8d5a3", role: "Warnings · special · cursor option" },
      { name: "Dusk Gold", hex: "#d4bc82", role: "Moonlight dim · modified" },
    ],
  },
];

export const totalSwatches = palette.reduce(
  (sum, group) => sum + group.swatches.length,
  0,
);
