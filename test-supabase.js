const { createClient } = require('@supabase/supabase-js');

async function test() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceKey) {
    console.log("Missing URL or Key");
    return;
  }
  
  console.log("Testing Service Key length:", serviceKey.length);
  const supabase = createClient(supabaseUrl, serviceKey);
  
  const { data, error } = await supabase.from('products').select('*').limit(1);
  console.log("Select Result:", { data, error });
  
  const { error: insertError } = await supabase.from('products').insert({
    id: "test-123",
    name: "test",
    slug: "test-123",
    category_id: "cat-mouse",
    price: 0,
    short_description: "test",
    description: "test",
    image_url: "http://example.com/a.jpg",
    features: [],
    specs: []
  });
  console.log("Insert Result:", insertError);
}
test();
