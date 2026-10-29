/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  cache: true,
  rules: {
    'block-no-empty': true,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'custom-property-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'at-rule-prelude-no-invalid': null,
  },
};
