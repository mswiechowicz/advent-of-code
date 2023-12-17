fn main() {
    let input: String = std::fs::read_to_string("src/input.txt").unwrap();

    let mut grid: Vec<_> = input
        .lines()
        .collect::<Vec<_>>()
        .iter()
        .map(|line| {
            line.chars().collect::<Vec<_>>()
        })
        .collect();

    let grid_len = grid.len();

    for col in 0..(grid_len) {
        for i in 0..(grid_len) {
            for row in 0..(grid_len - 1) {
                match grid[row][col] {
                    '.' => {
                        if grid[row + 1][col] == 'O' {
                            let temp = grid[row + 1][col];
                            grid[row + 1][col] = grid[row][col];
                            grid[row][col] = temp;
                        }
                    }
                    _ => {}
                }
            }
        }
    }

    let reverse_grid = grid
        .into_iter()
        .rev()
        .collect::<Vec<_>>();

    println!("\n");
    let mut part1 = 0;
    for (idx, line) in reverse_grid.iter().enumerate() {
        let o_count = line
            .iter()
            .filter(|&&char| char == 'O')
            .count();
        println!("{} {}: {:?}", o_count, idx+1, line);
        part1 += (idx+1) * o_count;
    };

    println!("part1: {}", part1);
}