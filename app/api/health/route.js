export async function GET(request) {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
