import request from "supertest";
import app from "../src/app";

describe("Tasks API", () => {
  describe("GET /tasks", () => {
    test("responds with a 200 status code and an array of tasks", async () => {
      const response = await request(app).get("/tasks").send();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /tasks", () => {
    const newTask = {
      title: "Some title",
      description: "Some description",
    };

    test("responds with a 200 status code and a JSON content type", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("responds with a task ID when a title and description are provided", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });

    test("responds with a 400 status code when either title or description is missing", async () => {
      const fields = [
        { title: "Some title" },
        { description: "Some description" },
      ];

      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
