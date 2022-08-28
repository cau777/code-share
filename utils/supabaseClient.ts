import {createClient} from "@supabase/supabase-js";

const AnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcXd0YW9yc250d2dxbWNmc21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE2MzcyODAsImV4cCI6MTk3NzIxMzI4MH0.G1mNvuMnYRW-ZzNrQvqrKOmHhpAqVeSbT_WBf8-nClw";
const Url = "https://ckqwtaorsntwgqmcfsmi.supabase.co";

export const supabase = createClient(Url, AnonKey);