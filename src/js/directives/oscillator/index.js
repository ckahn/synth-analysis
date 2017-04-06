import template from './template.html';

export default () => ({
  template,
  scope: {
    wave: '=',
    omitFrequency: '='
  }
})
