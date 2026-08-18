import { getDataSourceProvider } from "@/data-access/data-source.config";
import { checkMongoRuntime } from "@/data-access/mongodb/mongodb-database-provider";

export async function GET() {
  const provider = getDataSourceProvider();
  const ready = provider === "json" || (provider === "mongodb" && (await checkMongoRuntime()));

  return Response.json(
    {
      data: {
        status: ready ? "ready" : "not-ready",
      },
    },
    {
      status: ready ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
