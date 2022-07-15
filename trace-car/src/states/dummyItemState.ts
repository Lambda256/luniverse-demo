//TODO: 초기 데이터 만드는 파일, 나중에 파일 삭제하기
import { atom } from "recoil";
import { Keys } from "./keys";

export let items: ItemData[] = [];

const owners = ["Glen", "Conrad", "Paul", "Melissa", "Erin", "Christine"]
const plateNumbers = ["MAS 11N", "DOS 49R", "TAS 91T", "DEN 7NK", "DAM 4K7", "MD8 NET"]
const models = ["Hatchback", "Mini bus", "Convertible", "Sedan", "Sports", "Convertible"]
const years = [2015, 2020, 2017, 2022, 2010, 2019]
const mileages = [144000, 13000, 62000, 3400, 126000, 25000]
const id = ["4Y1SL65848Z411439", "1BAGNB7A3TF071506", "1GCHK29U87E198693", "1G4GD5EDXBF330171", "JHMFA16586S014014", "1N6AA06B74N530577", ]
const descriptions = ["Scratches on right-back bumper", "Mostly used for camping", "Never fixed", "Electric car", "Cleaned regulary", "Replaced front bumper", ]

for (let i = 0; i < 6; i++) {
  items.push({
    id: id[i],
    image: i,
    owner: owners[i],
    plateNumber: plateNumbers[i],
    model: models[i],
    year: years[i],
    mileage: mileages[i],
    description: descriptions[i],
  });
}

export const dummyDataState = atom({
  key: Keys.DUMMY_DATA,
  default: items,
})