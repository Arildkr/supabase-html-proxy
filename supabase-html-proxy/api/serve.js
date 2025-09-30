export default async function handler(req, res) {
  const { file } = req.query;
  
  if (!file) {
    return res.status(400).send('Missing file parameter');
  }

  try {
    const supabaseUrl = 'https://copwvpghphrsmdswrlop.supabase.co';
    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/public/undervisningsopplegg/${file}`
    );
    
    if (!response.ok) {
      throw new Error('File not found');
    }
    
    const html = await response.text();
    
    // Serverer HTML uten CSP-restriksjoner
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(html);
  } catch (error) {
    res.status(500).send(`Error loading file: ${error.message}`);
  }
}