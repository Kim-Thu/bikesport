import { getDataSourceProvider } from "@/data-access/data-source.config";
import { checkMongoRuntime } from "@/data-access/mongodb/mongodb-database-provider";

export async function GET() {
  const provider = getDataSourceProvider();
  const mongoRuntimeReady = provider === "mongodb" ? await checkMongoRuntime() : true;
  const ready = provider === "json" || mongoRuntimeReady;

  return Response.json(
    {
      data: {
        status: ready ? "ready" : "not-ready",
        dataSource: provider,
        mongoRuntimeReady,
      },
    },
    { status: ready ? 200 : 503 },
  );
}
