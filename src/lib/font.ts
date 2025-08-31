import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Inter,
  Mulish,
  Noto_Sans_Mono,
} from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const fontInstrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
});

const fontNotoMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-mono',
});

const fontMullish = Mulish({
  subsets: ['latin'],
  variable: '--font-mullish',
});

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '700'], // Specify desired weights, e.g., regular and bold
  subsets: ['latin'], // Specify required subsets
  variable: '--font-ibm-plex-sans', // Optional: Define a CSS variable for easier use with Tailwind CSS
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInstrument.variable,
  fontNotoMono.variable,
  fontMullish.variable,
  fontInter.variable,
  ibmPlexSans.variable,
);
