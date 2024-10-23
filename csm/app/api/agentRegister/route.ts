// This api route is meant to register a new working agent to the pool of agents.
// It expects [ agent name, UUID]
// UUID is a unique identifier that is created from the UI side

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  return new Response("Hello");
}
