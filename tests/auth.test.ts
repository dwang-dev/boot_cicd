import { describe, expect, test } from "vitest";
import { getAPIKey } from "../src/api/auth"

const person = {
  isActive: true,
  age: 32,
};

describe("person", () => {
  test("person is defined", () => {
    expect(person).toBeDefined();
  });

  test("is active", () => {
    expect(person.isActive).toBeTruthy();
  });
});

describe("getAPIKey", () => {

  test("Invalid type returns null", () => {
    const res = getAPIKey(2);
    expect(res).toBe(null);
  }); 

  test("Empty object returns null", () => {
    const res = getAPIKey({});
    expect(res).toBe(null);
  }); 

  test("Empty key returns null.", () => {
    const res = getAPIKey({authorization: ""});
    expect(res).toBe(null);
  });

  test("Invalid authorization header returns null (does not start with 'ApiKey'.", () => {
    const res = getAPIKey({authorization: "Invalid header"});
    expect(res).toBe(null);
  });

  test("Invalid authorization header", () => {
    const res = getAPIKey({authorization: "ApiKey"});
    expect(res).toBe(null);
  }); 

  test("Valid authorization header returns ApiKey", () => {
    const res = getAPIKey({authorization: "ApiKey 123"});
    expect(res).toBe("123");
  });

  test("Valid authorization header returns first ApiKey listed", () => {
    const res = getAPIKey({authorization: "ApiKey 123 456"});
    expect(res).toBe("123");
  });

});