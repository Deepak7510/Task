import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

// ---------- CONFIG ---------- //
const URI = "mongodb://localhost:27017";
const DB_NAME = "analyticsDB";
const COLLECTION_NAME = "transactions";

const TOTAL_DOCS = 5_000_000;
const BATCH_SIZE = 50_000;

const REGIONS = ["NA", "EMEA", "APAC", "LATAM"];
const CATEGORIES = ["Electronics", "Apparel", "Home Goods", "Software"];
const TIERS = ["Bronze", "Silver", "Gold", "Platinum"];

async function seed() {
  const client = new MongoClient(URI);
  await client.connect();

  console.log("Connected to MongoDB");

  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  // Drop existing collection
  try {
    await collection.drop();
    console.log("Old collection dropped.");
  } catch (_) {}

  let inserted = 0;
  console.log(`Seeding ${TOTAL_DOCS.toLocaleString()} documents...`);

  for (let i = 0; i < TOTAL_DOCS; i += BATCH_SIZE) {
    const batch = new Array(BATCH_SIZE);

    for (let j = 0; j < BATCH_SIZE; j++) {
      batch[j] = {
        transactionId: faker.string.uuid(),
        timestamp: faker.date.between({
          from: "2023-01-01",
          to: "2024-12-31",
        }),
        region: faker.helpers.arrayElement(REGIONS),
        productCategory: faker.helpers.arrayElement(CATEGORIES),
        salesAmount: parseFloat(
          faker.number.float({ min: 10, max: 5000, precision: 0.01 }).toFixed(2)
        ),
        customerTier: faker.helpers.arrayElement(TIERS),
      };
    }

    await collection.insertMany(batch, { ordered: false });
    inserted += BATCH_SIZE;

    console.log(`Inserted: ${inserted.toLocaleString()}`);
  }

  console.log("Creating OPTIMIZED INDEXES...");

  // Compound indexes for common query patterns
  await collection.createIndex({ timestamp: 1 });
  await collection.createIndex({ region: 1 });
  await collection.createIndex({ productCategory: 1 });
  await collection.createIndex({ customerTier: 1 });
  await collection.createIndex({ salesAmount: 1 });

  // Compound indexes for aggregation queries
  await collection.createIndex({
    region: 1,
    timestamp: 1,
    salesAmount: 1,
  });

  await collection.createIndex({
    productCategory: 1,
    timestamp: 1,
    salesAmount: 1,
  });

  await collection.createIndex({
    customerTier: 1,
    timestamp: 1,
    salesAmount: 1,
  });

  // Text index for any potential search functionality
  await collection.createIndex(
    {
      transactionId: 1,
    },
    { unique: true }
  );

  console.log("ALL INDEXES CREATED SUCCESSFULLY!");

  await client.close();
  console.log("DONE! All documents inserted.");
}

seed();
