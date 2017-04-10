import template from './template.html';

export default () => ({
  restrict: 'E',
  scope: {
    parameter: '=',
    min: '=',
    max: '=',
    step: '='
  },
  template
})
