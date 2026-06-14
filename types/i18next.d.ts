import 'i18next';

// `t()` is configured with returnNull: false, so it returns `string` (never
// `null`). This makes translated strings usable directly in typed props like
// `placeholder`/`label`/`title`. (CustomTypeOptions lives in `i18next`.)
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
