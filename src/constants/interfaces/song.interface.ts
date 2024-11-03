export interface Song {
  id: string;
  name: string;
  type: string;
  year?: string | null;
  releaseDate?: string | null;
  duration?: number | null;
  label?: string | null;
  explicitContent: boolean;
  playCount?: number | null;
  language: string;
  hasLyrics: boolean;
  lyricsId?: string | null;
  url: string;
  copyright?: string | null;
  album?: Album | null;
  artists?: Artists | null;
  image: Image[];
  downloadUrl: DownloadUrl[];
}

export interface Album {
  id: string | null;
  name: string | null;
  url: string | null;
}

export interface Artists {
  primary: Artist[];
  featured?: Artist[];
  all?: Artist[];
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  image: Image[];
  type: string;
  url: string;
}

export interface Image {
  quality: string;
  url: string;
}

export interface DownloadUrl {
  quality: string;
  url: string;
}
