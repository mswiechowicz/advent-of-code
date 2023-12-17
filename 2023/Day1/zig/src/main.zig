const std = @import("std");

pub fn main() !void {
    const file = try std.fs.cwd().openFile("input.txt", .{});
    defer file.close();

    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();

    const read_buf = try file.readToEndAlloc(allocator, 1024 * 1024);
    defer allocator.free(read_buf);

    // try std.io.getStdOut().writeAll(read_buf);
    var lines = std.mem.split(u8, read_buf, "\n");

    while (lines.next()) |line| {
        std.debug.print("{s}\n", .{line});

        // while (chars.next()) |c| {
        //     std.debug.print("{}", c);
        // }
    }
}
