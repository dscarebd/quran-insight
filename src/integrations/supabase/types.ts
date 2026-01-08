export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_emails: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          surah_number: number
          user_id: string
          verse_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          surah_number: number
          user_id: string
          verse_number: number
        }
        Update: {
          created_at?: string
          id?: string
          surah_number?: number
          user_id?: string
          verse_number?: number
        }
        Relationships: []
      }
      dua_bookmarks: {
        Row: {
          category_id: string
          created_at: string
          dua_id: string
          id: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          dua_id: string
          id?: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          dua_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      dua_categories: {
        Row: {
          category_id: string
          created_at: string
          display_order: number
          icon: string
          id: string
          name_bengali: string
          name_english: string
          name_hindi: string | null
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          name_bengali: string
          name_english: string
          name_hindi?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          name_bengali?: string
          name_english?: string
          name_hindi?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      duas: {
        Row: {
          arabic: string
          bengali: string
          category_id: string
          created_at: string
          dua_id: string
          english: string
          hindi: string | null
          id: string
          reference: string | null
          title_bengali: string
          title_english: string
          title_hindi: string | null
          transliteration: string | null
          transliteration_bengali: string | null
          transliteration_hindi: string | null
          updated_at: string
        }
        Insert: {
          arabic: string
          bengali: string
          category_id: string
          created_at?: string
          dua_id: string
          english: string
          hindi?: string | null
          id?: string
          reference?: string | null
          title_bengali: string
          title_english: string
          title_hindi?: string | null
          transliteration?: string | null
          transliteration_bengali?: string | null
          transliteration_hindi?: string | null
          updated_at?: string
        }
        Update: {
          arabic?: string
          bengali?: string
          category_id?: string
          created_at?: string
          dua_id?: string
          english?: string
          hindi?: string | null
          id?: string
          reference?: string | null
          title_bengali?: string
          title_english?: string
          title_hindi?: string | null
          transliteration?: string | null
          transliteration_bengali?: string | null
          transliteration_hindi?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hadith_bookmarks: {
        Row: {
          book_slug: string
          created_at: string
          hadith_number: number
          id: string
          user_id: string
        }
        Insert: {
          book_slug: string
          created_at?: string
          hadith_number: number
          id?: string
          user_id: string
        }
        Update: {
          book_slug?: string
          created_at?: string
          hadith_number?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      hadith_books: {
        Row: {
          created_at: string
          display_order: number
          icon: string
          id: string
          name_arabic: string
          name_bengali: string
          name_english: string
          slug: string
          total_hadiths: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          name_arabic: string
          name_bengali: string
          name_english: string
          slug: string
          total_hadiths?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          name_arabic?: string
          name_bengali?: string
          name_english?: string
          slug?: string
          total_hadiths?: number
          updated_at?: string
        }
        Relationships: []
      }
      hadiths: {
        Row: {
          arabic: string | null
          bengali: string | null
          book_slug: string
          chapter_name_bengali: string | null
          chapter_name_english: string | null
          chapter_number: number | null
          created_at: string
          english: string | null
          grade: string | null
          grade_bengali: string | null
          hadith_number: number
          id: string
          narrator_bengali: string | null
          narrator_english: string | null
          updated_at: string
        }
        Insert: {
          arabic?: string | null
          bengali?: string | null
          book_slug: string
          chapter_name_bengali?: string | null
          chapter_name_english?: string | null
          chapter_number?: number | null
          created_at?: string
          english?: string | null
          grade?: string | null
          grade_bengali?: string | null
          hadith_number: number
          id?: string
          narrator_bengali?: string | null
          narrator_english?: string | null
          updated_at?: string
        }
        Update: {
          arabic?: string | null
          bengali?: string | null
          book_slug?: string
          chapter_name_bengali?: string | null
          chapter_name_english?: string | null
          chapter_number?: number | null
          created_at?: string
          english?: string | null
          grade?: string | null
          grade_bengali?: string | null
          hadith_number?: number
          id?: string
          narrator_bengali?: string | null
          narrator_english?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hadiths_book_slug_fkey"
            columns: ["book_slug"]
            isOneToOne: false
            referencedRelation: "hadith_books"
            referencedColumns: ["slug"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempt_time: string
          email: string | null
          id: string
          ip_address: string
          success: boolean
        }
        Insert: {
          attempt_time?: string
          email?: string | null
          id?: string
          ip_address: string
          success?: boolean
        }
        Update: {
          attempt_time?: string
          email?: string | null
          id?: string
          ip_address?: string
          success?: boolean
        }
        Relationships: []
      }
      mushaf_words: {
        Row: {
          char_type: string | null
          created_at: string | null
          id: number
          line_number: number
          page_number: number
          surah_number: number
          text_v1: string
          verse_key: string
          verse_number: number
          word_position: number
        }
        Insert: {
          char_type?: string | null
          created_at?: string | null
          id?: number
          line_number: number
          page_number: number
          surah_number: number
          text_v1: string
          verse_key: string
          verse_number: number
          word_position: number
        }
        Update: {
          char_type?: string | null
          created_at?: string | null
          id?: number
          line_number?: number
          page_number?: number
          surah_number?: number
          text_v1?: string
          verse_key?: string
          verse_number?: number
          word_position?: number
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          page_path: string
          referrer: string | null
          user_agent: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          page_path: string
          referrer?: string | null
          user_agent?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          page_path?: string
          referrer?: string | null
          user_agent?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      surahs: {
        Row: {
          created_at: string | null
          id: number
          meaning_bengali: string
          meaning_english: string
          name_arabic: string
          name_bengali: string
          name_english: string
          number: number
          revelation_type: string
          total_verses: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          meaning_bengali: string
          meaning_english: string
          name_arabic: string
          name_bengali: string
          name_english: string
          number: number
          revelation_type: string
          total_verses: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          meaning_bengali?: string
          meaning_english?: string
          name_arabic?: string
          name_bengali?: string
          name_english?: string
          number?: number
          revelation_type?: string
          total_verses?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verses: {
        Row: {
          arabic: string
          bengali: string
          created_at: string | null
          english: string
          id: number
          page_number: number | null
          surah_number: number
          tafsir_bengali: string | null
          tafsir_english: string | null
          text_v1: string | null
          updated_at: string | null
          verse_number: number
        }
        Insert: {
          arabic: string
          bengali: string
          created_at?: string | null
          english: string
          id?: number
          page_number?: number | null
          surah_number: number
          tafsir_bengali?: string | null
          tafsir_english?: string | null
          text_v1?: string | null
          updated_at?: string | null
          verse_number: number
        }
        Update: {
          arabic?: string
          bengali?: string
          created_at?: string | null
          english?: string
          id?: number
          page_number?: number | null
          surah_number?: number
          tafsir_bengali?: string | null
          tafsir_english?: string | null
          text_v1?: string | null
          updated_at?: string | null
          verse_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "verses_surah_number_fkey"
            columns: ["surah_number"]
            isOneToOne: false
            referencedRelation: "surahs"
            referencedColumns: ["number"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_login_attempts: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_email: { Args: { _email: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
