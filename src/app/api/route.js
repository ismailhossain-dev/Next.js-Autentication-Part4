//auth sever api
export async function GET(request) {
  return Response.json({
    status: 200,
    message: "This is Next-Auth page",
  });
}
