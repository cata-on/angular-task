interface Theme {
  text: string;
  accent: string;
  border: string;
  background: string;
  backgroundAlternative: string;
  backgroundHighlight: string;
  shadow: string;
}

export const lightTheme: Theme = {
  text: '80, 80, 80',
  border: '16, 16, 16',
  accent: '0, 100, 182',
  backgroundAlternative: '250, 250, 250',
  backgroundHighlight: '216, 230, 239',
  background: '240, 240, 240',
  shadow: '0, 0, 0',
};

export const darkTheme: Theme = {
  text: '200, 200, 200',
  border: '230, 230, 230',
  accent: '225, 160, 2',
  background: '20, 20, 20',
  backgroundAlternative: '30, 30, 30',
  backgroundHighlight: '0, 0, 0',
  shadow: '255, 255, 255',
  //   shadow: '0, 0, 0',
};
