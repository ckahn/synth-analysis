import template from './template.html';

export default ['visualizer', (visualizer) => ({
  restrict: 'E',
  scope: {
    analyzer: '=',
    maxAmp: '='
  },
  template,
  link: (scope, el, attrs) => {
    if (!scope.analyzer) {
      return;
    }
    const ctx = el.find('canvas')[0].getContext('2d');
    visualizer.startAnimating(ctx, scope.maxAmp, scope.analyzer);
  }
})]