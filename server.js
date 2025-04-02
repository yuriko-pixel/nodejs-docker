const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// **テスト環境ではサーバーを起動しない**
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
