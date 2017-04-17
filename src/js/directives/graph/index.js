import template from './template.html';

export default ['visualizer', (visualizer) => ({
  restrict: 'E',
  scope: {
    analyzer: '='
  },
  template,
  link: (scope, el, attrs) => {
    console.log(scope.analyzer);
    const ctx = el.find('canvas')[0].getContext('2d');
    visualizer.startAnimating(ctx, scope.analyzer);
  }
})]