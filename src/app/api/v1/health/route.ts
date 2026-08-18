import { getDataSourceProvider } from "@/data-access/data-source.config";
import { isMongoRuntimeReady } from "@/data-access/mongodb/mongodb-database-provider";

export async function GET() {
  const provider = getDataSourceProvider();
  const ready = provider === "json" || isMongoRuntimeReady();

  return Response.json(
    {
      data: {
        status: ready ? "ready" : "not-ready",
        dataSource: provider,
        mongoRuntimeRegistered: isMongoRuntimeReady(),
      },
    },
    { status: ready ? 200 : 503 },
  );
}
