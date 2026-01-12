export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id: string;
          id_token: string | null;
          provider: string;
          provider_account_id: string;
          refresh_token: string | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          provider: string;
          provider_account_id: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          user_id: string;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          provider?: string;
          provider_account_id?: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          material_id: string;
          role: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          material_id: string;
          role: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          material_id?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "study_materials";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      flashcards: {
        Row: {
          answer: string;
          created_at: string;
          id: string;
          material_id: string;
          question: string;
        };
        Insert: {
          answer: string;
          created_at?: string;
          id?: string;
          material_id: string;
          question: string;
        };
        Update: {
          answer?: string;
          created_at?: string;
          id?: string;
          material_id?: string;
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flashcards_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "study_materials";
            referencedColumns: ["id"];
          }
        ];
      };
      material_chunks: {
        Row: {
          chunk_text: string;
          created_at: string;
          embedding: Json;
          id: string;
          material_id: string;
        };
        Insert: {
          chunk_text: string;
          created_at?: string;
          embedding: Json;
          id?: string;
          material_id: string;
        };
        Update: {
          chunk_text?: string;
          created_at?: string;
          embedding?: Json;
          id?: string;
          material_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "material_chunks_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "study_materials";
            referencedColumns: ["id"];
          }
        ];
      };
      notes: {
        Row: {
          created_at: string;
          id: string;
          key_points: string[];
          material_id: string;
          summary: string;
          topics: string[];
        };
        Insert: {
          created_at?: string;
          id?: string;
          key_points: string[];
          material_id: string;
          summary: string;
          topics: string[];
        };
        Update: {
          created_at?: string;
          id?: string;
          key_points?: string[];
          material_id?: string;
          summary?: string;
          topics?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "notes_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "study_materials";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          image: string | null;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          image?: string | null;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          image?: string | null;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      quiz_lobbies: {
        Row: {
          created_at: string;
          current_question_index: number;
          host_id: string;
          id: string;
          material_id: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          current_question_index?: number;
          host_id: string;
          id?: string;
          material_id: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          current_question_index?: number;
          host_id?: string;
          id?: string;
          material_id?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_lobbies_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_lobbies_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "study_materials";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_participants: {
        Row: {
          id: string;
          joined_at: string;
          lobby_id: string;
          score: number;
          user_id: string;
        };
        Insert: {
          id?: string;
          joined_at?: string;
          lobby_id: string;
          score?: number;
          user_id: string;
        };
        Update: {
          id?: string;
          joined_at?: string;
          lobby_id?: string;
          score?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_participants_lobby_id_fkey";
            columns: ["lobby_id"];
            isOneToOne: false;
            referencedRelation: "quiz_lobbies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      quizzes: {
        Row: {
          correct_answer: string;
          created_at: string;
          id: string;
          material_id: string;
          options: string[];
          question: string;
        };
        Insert: {
          correct_answer: string;
          created_at?: string;
          id?: string;
          material_id: string;
          options: string[];
          question: string;
        };
        Update: {
          correct_answer?: string;
          created_at?: string;
          id?: string;
          material_id?: string;
          options?: string[];
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quizzes_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "study_materials";
            referencedColumns: ["id"];
          }
        ];
      };
      sessions: {
        Row: {
          expires: string;
          id: string;
          session_token: string;
          user_id: string;
        };
        Insert: {
          expires: string;
          id?: string;
          session_token: string;
          user_id: string;
        };
        Update: {
          expires?: string;
          id?: string;
          session_token?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      study_materials: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_public: boolean;
          source_type: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          is_public?: boolean;
          source_type: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_public?: boolean;
          source_type?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "study_materials_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          email: string | null;
          email_verified: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          email_verified?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          email_verified?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      EXAM_questionnaires: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          description: string | null;
          total_questions: number;
          questions_to_show: number;
          is_randomized: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          title: string;
          description?: string | null;
          total_questions?: number;
          questions_to_show: number;
          is_randomized?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string;
          title?: string;
          description?: string | null;
          total_questions?: number;
          questions_to_show?: number;
          is_randomized?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EXAM_questionnaires_creator_id_fkey";
            columns: ["creator_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      EXAM_questions: {
        Row: {
          id: string;
          questionnaire_id: string;
          question_text: string;
          question_order: number;
          options: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          questionnaire_id: string;
          question_text: string;
          question_order?: number;
          options: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          questionnaire_id?: string;
          question_text?: string;
          question_order?: number;
          options?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EXAM_questions_questionnaire_id_fkey";
            columns: ["questionnaire_id"];
            isOneToOne: false;
            referencedRelation: "EXAM_questionnaires";
            referencedColumns: ["id"];
          }
        ];
      };
      EXAM_submissions: {
        Row: {
          id: string;
          questionnaire_id: string;
          user_id: string;
          started_at: string;
          completed_at: string | null;
          is_completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          questionnaire_id: string;
          user_id: string;
          started_at?: string;
          completed_at?: string | null;
          is_completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          questionnaire_id?: string;
          user_id?: string;
          started_at?: string;
          completed_at?: string | null;
          is_completed?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EXAM_submissions_questionnaire_id_fkey";
            columns: ["questionnaire_id"];
            isOneToOne: false;
            referencedRelation: "EXAM_questionnaires";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "EXAM_submissions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      EXAM_answers: {
        Row: {
          id: string;
          submission_id: string;
          question_id: string;
          selected_option_index: number;
          is_correct: boolean | null;
          answered_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          question_id: string;
          selected_option_index: number;
          is_correct?: boolean | null;
          answered_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string;
          question_id?: string;
          selected_option_index?: number;
          is_correct?: boolean | null;
          answered_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EXAM_answers_submission_id_fkey";
            columns: ["submission_id"];
            isOneToOne: false;
            referencedRelation: "EXAM_submissions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "EXAM_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "EXAM_questions";
            referencedColumns: ["id"];
          }
        ];
      };
      EXAM_focus_events: {
        Row: {
          id: string;
          submission_id: string;
          event_type: string;
          timestamp: string;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          submission_id: string;
          event_type: string;
          timestamp?: string;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          submission_id?: string;
          event_type?: string;
          timestamp?: string;
          metadata?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "EXAM_focus_events_submission_id_fkey";
            columns: ["submission_id"];
            isOneToOne: false;
            referencedRelation: "EXAM_submissions";
            referencedColumns: ["id"];
          }
        ];
      };
      verification_tokens: {
        Row: {
          expires: string;
          identifier: string;
          token: string;
        };
        Insert: {
          expires: string;
          identifier: string;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string;
          token?: string;
        };
        Relationships: [];
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
