fs = require('node:fs')
const input = fs.readFileSync('./input.txt', 'utf8').trimEnd().split('\n');

console.time('solve time')
function getNumbers(startIndex, endIndex) {
  let numbers = [];
  for (let i = startIndex; i < endIndex; i++) {
    numbers.push(input[i].split(' ').map(Number))
  }
  return numbers;
}

const seedToSoilIndex = input.indexOf("seed-to-soil map:")
const soilToFertilizerIndex = input.indexOf("soil-to-fertilizer map:")
const fertilizerToWaterIndex = input.indexOf("fertilizer-to-water map:")
const waterToLightIndex = input.indexOf("water-to-light map:")
const lightToTemperatureIndex = input.indexOf("light-to-temperature map:")
const temperatureToHumidityIndex = input.indexOf("temperature-to-humidity map:")
const humidityToLocationIndex = input.indexOf("humidity-to-location map:")

const seeds = input[0].split(': ')[1].split(' ').map(Number);
const seedToSoil = getNumbers(seedToSoilIndex + 1, soilToFertilizerIndex - 1);
const soiltoFertilizer = getNumbers(soilToFertilizerIndex + 1, fertilizerToWaterIndex - 1);
const fertilizerToWater = getNumbers(fertilizerToWaterIndex + 1, waterToLightIndex - 1);
const waterToLight = getNumbers(waterToLightIndex + 1, lightToTemperatureIndex - 1);
const lightToTemperature = getNumbers(lightToTemperatureIndex + 1, temperatureToHumidityIndex - 1);
const temperatureToHumidity = getNumbers(temperatureToHumidityIndex + 1, humidityToLocationIndex - 1);
const humidityToLocation = getNumbers(humidityToLocationIndex + 1, input.length);

const maps = [
  seedToSoil,
  soiltoFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation
]

let result = []
for (let i = 0; i < seeds.length; i++) {
  let location = seeds[i];
  for (let m = 0; m < maps.length; m++) {
    for (let l = 0; l < maps[m].length; l++) {
      const [dest, source, range] = maps[m][l]

      if (location >= source && location <= source + range - 1) {
        location = dest + (location - source)
        break;
      }
    }
  }
  result.push(location)
}

console.log("part1:", Math.min(...result));
console.timeEnd('solve time')
