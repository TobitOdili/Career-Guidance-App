export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          career_path: string | null;
          specialization: string | null;
          experience: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          career_path?: string | null;
          specialization?: string | null;
          experience?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          career_path?: string | null;
          specialization?: string | null;
          experience?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'resume' | 'cover-letter';
          url: string;
          metadata: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: 'resume' | 'cover-letter';
          url: string;
          metadata?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'resume' | 'cover-letter';
          url?: string;
          metadata?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_skills: {
        Row: {
          id: string;
          user_id: string;
          skill: string;
          level: 'beginner' | 'intermediate' | 'advanced' | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill: string;
          level?: 'beginner' | 'intermediate' | 'advanced' | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill?: string;
          level?: 'beginner' | 'intermediate' | 'advanced' | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}