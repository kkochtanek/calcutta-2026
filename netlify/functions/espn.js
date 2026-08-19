exports.handler = async (event) => {
  // Site is inactive — short-circuited to avoid Netlify function invocations.
  // Remove this block to re-enable.
  return {
    statusCode: 503,
    body: JSON.stringify({ error: 'This feature is temporarily disabled.' }),
  };

  const date = event.queryStringParameters?.date || '';
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=100&dates=${date}&limit=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`ESPN returned ${response.status}`);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: err.message })
    };
  }
};
