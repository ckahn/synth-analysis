import template from './template.html';

export default () => ({
  template,
  scope: {
    wave: '=',
    defaultFreq: '=',
    freqRange: '=',
    defaultAmp: '=',
    ampRange: '='
  },
  link: (scope) => {
    if (scope.defaultAmp) {
      scope.wave.amplitude.value = scope.defaultAmp;    
    }
    if (scope.defaultFreq) {
      scope.wave.frequency.value = scope.defaultFreq;
    }
  }
})
