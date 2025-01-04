export interface UserRole {
  role_id: number;
  role: {
    name: string;
  };
}

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          role_id: number;
        };
        Insert: {
          id: string;
          role_id: number;
        };
      };
      roles: {
        Row: {
          id: number;
          name: string;
        };
      };
    };
  };
}