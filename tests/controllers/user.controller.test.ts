import { expect } from "chai";
import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/user.model";

let token: string;

describe("User Endpoints", () => {
  before(async () => {
    await User.sync({ force: true });

    // Register and log in a user to obtain a token
    await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    token = res.body.token;
  });

  describe("GET /api/users", () => {
    it("should retrieve a list of users", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update an existing user", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "John Updated",
          email: "johnupdated@example.com",
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "User updated successfully");
      expect(res.body.user).to.include({
        name: "John Updated",
        email: "johnupdated@example.com",
      });
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete an existing user", async () => {
      const res = await request(app)
        .delete("/api/users/1")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "User deleted successfully");
    });
  });
});
