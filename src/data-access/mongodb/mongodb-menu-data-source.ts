import type { MenuDataSource } from "@/data-access/contracts/menu-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { NavMenuData } from "@/interfaces/navigation.interface";

export function createMongoMenuDataSource(getDatabase: MongoDatabaseProvider): MenuDataSource {
  return {
    async getById(menuId) {
      const db = await getDatabase();
      return db.collection<NavMenuData>(MONGODB_COLLECTIONS.menus).findOne({ _id: menuId });
    },
  };
}
