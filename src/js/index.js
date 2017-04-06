import angular from 'angular';

import Graph from './directives/graph';
import Oscillator from './directives/oscillator';
import Slider from './directives/slider';

angular.module("synthAnalysis", [])
.controller('Controller', ['$scope', ($scope) => {
  $scope.synthesizedWave = {
    carrierWave: {
      amplitude: 0,
      frequency: 0
    }, 
    modulatorWave: {
      amplitude: 0,
      frequency: 0
    },
    amplitude: 50
  }
}])
.directive('graph', Graph)
.directive('oscillator', Oscillator)
.directive('slider', Slider);
