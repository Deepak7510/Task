# 📊 Global Sales Analytics Platform (MERN Stack)

This is a full-stack analytics platform designed to handle **large-scale global sales data**.  
The project demonstrates **high-performance backend aggregation**, **optimized MongoDB queries**,

---

### **📁 Document Schema**

Each transaction document includes:

| Field             | Type            | Description                                |
| ----------------- | --------------- | ------------------------------------------ |
| `transactionId`   | String (unique) | Unique ID for the transaction              |
| `timestamp`       | Date            | Transaction date (1–2 year range)          |
| `region`          | String          | NA, EMEA, APAC, LATAM                      |
| `productCategory` | String          | Electronics, Apparel, Home Goods, Software |
| `salesAmount`     | Number          | Random float between 10 and 5000           |
| `customerTier`    | String          | Bronze, Silver, Gold, Platinum             |

### ✔ Data Generation

The dataset is generated using **Faker.js** and seeded into MongoDB in optimized batches of **50,000 documents** for high performance.

# 🖥️ 2. Backend (Node.js + Express + MongoDB)

The backend is designed to handle **massive datasets** efficiently using:

- Optimized aggregation pipelines
- Indexed queries
- Pagination
- Fast sorting
- Disk-enabled aggregation

The backend exposes two primary REST APIs:

## ✅ A. Analytics Summary API

### `GET /api/v1/analytics/summary`

This API performs **complex aggregations** on millions of documents without timing out.

### **📌 Query Parameters**

| Param       | Type   | Required | Description                                        |
| ----------- | ------ | -------- | -------------------------------------------------- |
| `groupBy`   | String | Yes      | One of `region`, `productCategory`, `customerTier` |
| `startDate` | Date   | No       | Filter transactions after this date                |
| `endDate`   | Date   | No       | Filter transactions before this date               |
| `minAmount` | Number | No       | salesAmount >= minAmount                           |

### **🔍 Output Structure**

```json
[
  {
    "groupName": "NA",
    "totalSales": 5029931.23,
    "totalTransactions": 140233,
    "averageSale": 358.12
  }
]

⚡ MongoDB Optimization Techniques Used

-> Compound indexes

-> $match before $group

-> Disk-based execution with allowDiskUse

-> Controlled date filtering to avoid full scans


✅ B. Paginated Transactions API
GET /api/v1/transactions

Returns a paged list of transactions (never loads all 5M+ records at once).

📌 Query Parameters

| Param    | Type   | Required | Purpose                          |
| -------- | ------ | -------- | -------------------------------- |
| `page`   | Number | Yes      | Current page number              |
| `limit`  | Number | Yes      | Items per page (10, 20, 50)      |
| `sortBy` | String | No       | Sort by timestamp or salesAmount |

📦 Output Example

{
  "currentPage": 1,
  "totalPages": 120000,
  "totalRecords": 5000000,
  "dataList": [...]
}


⚡ Optimization

-> .skip() + .limit() for pagination

-> Optional cursor-based pagination for ultra-fast results

-> Indexed .sort() on timestamp and salesAmount


🎨 3. Frontend (React.js)

The frontend consumes the APIs and provides a smooth, lag-free UI even with large datasets.

🅰️ A. Analytics View
Features:

Dropdown to choose groupBy

Date pickers (start/end date)

Min salesAmount input

Table and bar chart visualization

Loader state for long-running requests
(aggregation on 5M documents can take ~1 sec)

🅱️ B. Paginated Transactions Table
Features:

Shows paginated transaction list

Page controls: First, Prev, Page Numbers, Next, Last

Column click = sorting (timestamp, salesAmount

⚡ Performance Focus:

-> Only ~10–50 rows render at a time

-> Virtual DOM windowing prevents UI freeze

-> No blocking even with heavy data loads


Technologies Used

MongoDB — High-volume data store

Express.js — Server + API

React.js and Shadcn — Frontend UI

Mongoose — ODM

Faker.js — Data generation


# ⚙️ Installation & Setup

## 🔧 Backend Setup

1️⃣ Create .env file

CLIENT_URL=http://localhost:5173
PORT = 3000
MONGO_URI= "mongodb://localhost:27017/analyticsDB"

### 2️⃣ Install dependencies

cd server

npm install

node ./src/Seeds/transactions_seed.js

3️⃣ Start backend

npm run dev

🎨 Frontend Setup

1️⃣ Add frontend .env

VITE_BACKEND_URL=http://localhost:3000

2️⃣ Install dependencies

cd client

npm install

npm run dev


📄 License
This project is licensed under the MIT License.

👨‍💻 Author

Deepak Kumar Yadav
Full-Stack Developer | MERN Stack | Laravel
GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile
```
