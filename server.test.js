process.env.NODE_ENV = "test"; // テスト環境を明示的に設定
require("dotenv").config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const request = require("supertest");
const db = require("./db");
const app = require("./server"); // Express アプリをインポート

beforeAll(async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE
        );
    `);
});

beforeEach(async () => {
    await db.query("DELETE FROM users");
    await db.query("INSERT INTO users (name, email) VALUES ('Test User', 'test@example.com')");
});

describe("GET /users", () => {
    it("ユーザーリストを取得できる", async () => {
        const response = await request(app).get("/users");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("name", "Test User");
        expect(response.body[0]).toHaveProperty("email", "test@example.com");
    });
});

afterAll(async () => {
    await db.query("DROP TABLE IF EXISTS users");
});
