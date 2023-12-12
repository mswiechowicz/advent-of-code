use std::collections::HashMap;

fn part1(input: String) -> u32 {
    let mut sum = 0;
    for line in input.lines() {
        let filtered_digits: String = line
            .chars()
            .filter(|x| x.is_digit(10))
            .collect();

        let first_digit = filtered_digits.chars().next().unwrap_or_default();
        let last_digit = filtered_digits.chars().last().unwrap_or_default();

        let number_str = format!("{}{}", first_digit, last_digit);

        if let Some(number) = number_str.parse::<u32>().ok() {
            sum += number;
        }
    }

    return sum;
}

fn part2(input: String) -> u32 {
    let map: HashMap<&str, char> = [
        ("one", '1'),
        ("two", '2'),
        ("three", '3'),
        ("four", '4'),
        ("five", '5'),
        ("six", '6'),
        ("seven", '7'),
        ("eight", '8'),
        ("nine", '9'),
    ].iter().cloned().collect();

    let mut sum = 0;
    for line in input.lines() {
        let mut digits = String::new();
        for (idx, _) in line.chars().enumerate() {
            for (word, number) in &map {
                let remaining = &line[idx..line.len()];
                if remaining.starts_with(word) || remaining.starts_with(*number) {
                    digits.push(*number);
                }
            }
        }

        let first_digit = digits.chars().next().unwrap_or_default();
        let last_digit = digits.chars().last().unwrap_or_default();

        let number_str = format!("{}{}", first_digit, last_digit);

        if let Some(number) = number_str.parse::<u32>().ok() {
            sum += number;
        }
    }

    return sum;
}

fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();

    println!("part1: {}", part1(input.clone()));
    println!("part2: {}", part2(input.clone()));
}