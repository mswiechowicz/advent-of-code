const std = @import("std");
const data = @embedFile("input.txt");
const split = std.mem.split;

pub fn main() !void {
    var lines = split(u8, data, "\n");

    while (lines.next()) |line| {
        std.debug.print("{s}\n", .{line});
    }
}
