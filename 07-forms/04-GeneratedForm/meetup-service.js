export const DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
export const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
export const MINUTE_IN_MILLISECONDS = 60 * 1000;

export function getMillisecondsFromString(string) {
  let hours = parseInt(string.slice(0, 2));
  let minutes = parseInt(string.slice(3));

  return hours * HOUR_IN_MILLISECONDS + minutes * MINUTE_IN_MILLISECONDS;
}

export const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

export const getAgendaIconsMap = () => ({
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
});

export const getAgendaItemLanguageOptions = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export const getAgendaItemsFieldSpecifications = () => {
  const common = [
    {
      title: 'Нестандартный текст (необязательно)',
      field: 'title',
      component: 'app-input',
      model: { prop: 'value', event: 'input' },
      props: {},
    },
  ];

  return {
    registration: [...common],
    opening: [...common],
    talk: [
      {
        title: 'Тема',
        field: 'title',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {},
      },
      {
        title: 'Докладчик',
        field: 'speaker',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {},
      },
      {
        title: 'Описание',
        field: 'description',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {
          multiline: true,
        },
      },
      {
        title: 'Язык',
        field: 'language',
        component: 'dropdown-button',
        model: { prop: 'value', event: 'change' },
        props: {
          options: getAgendaItemLanguageOptions(),
          title: 'Язык',
        },
      },
    ],
    break: [...common],
    coffee: [...common],
    closing: [...common],
    afterparty: [...common],
    other: [
      {
        title: 'Заголовок',
        field: 'title',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {},
      },
      {
        title: 'Описание',
        field: 'description',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {
          multiline: true,
        },
      },
    ],
  };
};
