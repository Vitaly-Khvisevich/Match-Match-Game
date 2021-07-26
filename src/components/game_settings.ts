import { ImageCategoryModel } from './models/image-category-models';

export const GAME_SETTINGS = {
  Game_cards: 0 as number,
  Difficulty: 4 as number,
  is_run: false,
};

export const PROGRAM_DATA = {
  categories: [] as Array<string>,
  game_tupe: ['4x4', '6x6'],
  CardShowTime: 30,
  FLIP_DELAY: 2,
};

export const OBJECTS = {
  categories: [] as ImageCategoryModel[],
  database: {} as IDBDatabase,
  activeEl: '',
};
export const RESULT_DATA = {
  UTCHours: '00' as string,
  UTCMinutes: '00' as string,
  UTCSeconds: '00' as string,
  UTCMilliseconds: '00' as string,
  number_of_comparisons: 0 as number,
  number_of_errors: 0 as number,
  result: 0 as number,
};

/* Выделяет из обьекта список категорий и записывает в PROGRAM_DATA */
export function setcategories(obj_categories: ImageCategoryModel[]): void {
  OBJECTS.categories = obj_categories;
  PROGRAM_DATA.categories = [];
  obj_categories.forEach((elem) => PROGRAM_DATA.categories.push(elem.category));
}
