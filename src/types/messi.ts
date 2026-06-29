export interface PersonalInfo {
  id: string;
  slug: string;
  full_name: string;
  known_as: string;
  nicknames: string[];
  personal_information: {
    date_of_birth: string;
    place_of_birth: {
      city: string;
      province: string;
      country: string;
      hospital?: string;
    };
    nationality: string;
    citizenship: string[];
    ethnicity?: string;
    gender: string;
    height: {
      cm: number;
      ft: string;
    };
    weight: {
      kg: number;
      lbs: number;
    };
    eye_color: string;
    hair_color: string;
    dominant_foot: string;
    dominant_hand?: string;
    playing_position: string[];
    shirt_number: number;
    captain: boolean;
    religion: string;
    languages: string[];
  };
  current_status: {
    club: string;
    league: string;
    country: string;
    national_team: string;
    contract_status: string;
    career_status: string;
  };
  family: {
    father: string;
    mother: string;
    siblings: string[];
    spouse: string;
    children: string[];
  };
  education?: {
    highest_level: string;
    schools: Array<{ name: string; location: string }>;
  };
  medical_history?: {
    condition: string;
    diagnosed_age: number;
    treatment: {
      type: string;
      duration: string;
      funded_by: string;
    };
  };
  professional_information?: {
    preferred_foot: string;
    stronger_foot: string;
    weak_foot_rating: number;
    skill_moves_rating: number;
    primary_role: string;
    secondary_roles: string[];
  };
  playing_style?: {
    strengths: string[];
    traits: string[];
  };
  social_media?: {
    instagram: string;
    facebook: string;
    website: string;
  };
  sponsorships?: string[];
}

export interface ClubData {
  club: {
    id: string;
    name: string;
    short_name: string;
    nickname: string[];
    country: string;
    city: string;
    stadium: {
      name: string;
      capacity: number;
    };
    league: string;
    joined: {
      academy?: string;
      first_team: string;
    } | string;
    left?: string;
    years: number;
    academy_years?: number;
    first_team_years: number;
  };
  career: {
    status: string;
    start_date: string;
    end_date: string | null;
    age_on_debut: number;
    age_on_departure?: number;
    positions: string[];
    preferred_foot: string;
    shirt_numbers: number[];
  };
}

export interface NationalTeamData {
  national_team: {
    id: string;
    name: string;
    short_name: string;
    nickname: string[];
    country: string;
    confederation: string;
    association: string;
    stadium: {
      name: string;
      capacity: number;
    };
    joined: string;
    senior_debut: string;
    active: boolean;
    years: number;
  };
  career: {
    status: string;
    start_date: string;
    end_date: string | null;
    age_on_debut: number;
    age_current: number;
    positions: string[];
    preferred_foot: string;
    shirt_numbers: number[];
  };
}

export interface StatItem {
  matches: number;
  goals: number;
  assists?: number;
}

export interface CareerStatistics {
  overview: {
    player: string;
    common_name: string;
    date_of_birth: string;
    nationality: string;
    years_active: {
      professional: number;
      international: number;
    };
  };
  career_totals: {
    official: {
      matches: number;
      goals: number;
      assists: number;
      goals_per_match: number;
      minutes_per_goal: number;
      goal_contributions: number;
      hat_tricks: number;
      penalties: {
        scored: number;
        taken: number;
        success_rate_pct: number;
      };
      free_kicks_scored: number;
    };
  };
}

export interface TrophyRoomData {
  overview: {
    player: string;
    total_official_trophies: number;
    club_trophies: number;
    international_trophies: number;
    major_club_trophies: {
      league_titles: number;
      domestic_cups: number;
      domestic_super_cups: number;
      continental_titles: number;
      continental_super_cups: number;
      club_world_titles: number;
    };
    major_international_trophies: {
      fifa_world_cup: number;
      copa_america: number;
      finalissima: number;
      olympic_gold_medal: number;
      fifa_u20_world_cup: number;
      intercontinental_cup_of_champions: number;
    };
    trophies_by_team: {
      barcelona: number;
      paris_saint_germain: number;
      inter_miami: number;
      argentina: number;
    };
  };
}

export interface AwardItem {
  id: string;
  name: string;
  years: number[];
  total: number;
  description?: string;
  icon?: string;
}

export interface AwardsData {
  overview: {
    player: string;
    major_awards_summary: {
      ballon_dor: number;
      fifa_world_player_of_the_year?: number;
      fifa_ballon_dor?: number;
      the_best_fifa_mens_player: number;
      european_golden_shoe: number;
      pichichi_trophy: number;
      uefa_best_player_in_europe: number;
      champions_league_top_scorer: number;
      world_cup_golden_ball: number;
      copa_america_best_player: number;
    };
  };
}

export interface RecordItem {
  record: string;
  details: string;
  date?: string;
  competition?: string;
}

export interface RecordsCategory {
  category: string;
  description?: string;
  records: RecordItem[];
}

export interface RecordsData {
  overview: {
    player: string;
    last_updated: string;
  };
  categories: {
    [key: string]: RecordsCategory;
  } | RecordsCategory[];
}

export interface TimelineEvent {
  date?: string;
  year: number;
  age?: number;
  title: string;
  description: string;
  location?: string;
  category: string;
  club?: string;
}

export interface TimelineData {
  personal_life_timeline: {
    timeline: TimelineEvent[];
  };
}

export interface ImageItem {
  id: string;
  title: string;
  file: string;
  category: string;
  alt?: string;
}

export interface GalleryData {
  hero: {
    file: string;
    title: string;
    alt?: string;
  };
  featured: ImageItem[];
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
  duration?: string;
}
