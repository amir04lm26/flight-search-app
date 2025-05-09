import { ResponseUtil } from "./response";

describe("ResponseUtil Class", () => {
  describe("success method", () => {
    it("should return a success response with correct data, message, and status code", () => {
      const response = ResponseUtil.success(
        { message: "Success" },
        "Custom success message",
        200
      );

      expect(response).toEqual({
        data: { message: "Success" },
        error: false,
        status_code: 200,
        message: "Custom success message",
      });
    });

    it('should default to message "Request successful" if not provided', () => {
      const response = ResponseUtil.success({ message: "Success" });

      expect(response.message).toBe("Request successful");
    });

    it("should default to status code 200 if not provided", () => {
      const response = ResponseUtil.success({ message: "Success" });

      expect(response.status_code).toBe(200);
    });
  });

  describe("error method", () => {
    it("should return an error response with correct message and status code", () => {
      const response = ResponseUtil.error("Something went wrong", 400);

      expect(response).toEqual({
        data: null,
        error: true,
        status_code: 400,
        message: "Something went wrong",
      });
    });

    it("should default to status code 400 if not provided", () => {
      const response = ResponseUtil.error("Something went wrong");

      expect(response.status_code).toBe(400);
    });
  });
});
