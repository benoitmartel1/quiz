import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://qeiifykrrpinlmpxlaol.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMDA0OTcyOSwiZXhwIjoxOTI1NjI1NzI5fQ.tK8WgzxRCrtkxKs7n5lZ8yCWLcZgsAKc6ObC0JFaa34"
);

export default ({ app }, inject) => {
  inject("db", supabase);
};
