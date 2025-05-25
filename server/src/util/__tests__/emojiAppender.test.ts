import "../../config/logger";
import { $log } from "@tsed/common";

describe("EmojiAppender", () => {
  const originalLevel = $log.level;
  beforeEach(() => {
    $log.level = "info";
  });
  afterEach(() => {
    $log.level = originalLevel;
  });
  it("summarizes object info logs", () => {
    const spy = jest.spyOn(process.stdout, "write").mockImplementation(() => true as any);
    $log.info({ b: 1, a: 2, d: 3, c: 4 });
    expect(spy).toHaveBeenCalledWith(`➡️ {\"a\":2,\"b\":1,\"c\":4}\n`);
    spy.mockRestore();
  });

  it("summarizes object error logs with category", () => {
    const spy = jest.spyOn(process.stdout, "write").mockImplementation(() => true as any);
    $log.error({ code: 1, message: "bad", extra: true }, "error");
    expect(spy).toHaveBeenCalledWith(`❌ \x1b[31m{\"code\":1,\"message\":\"bad\"}\x1b[0m\n`);
    spy.mockRestore();
  });
});
