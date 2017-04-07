import angular from 'angular';

import Graph from './directives/graph';
import SoundGenerator from './directives/sound-generator';
import Slider from './directives/slider';

import Synthesizer from './services/synthesizer';

angular.module("synthAnalysis", [])
.controller('Controller', ['$scope', 'synthesizer', ($scope, synthesizer) => {
  $scope.synthesizer = synthesizer;
}])
.directive('graph', Graph)
.directive('soundGenerator', SoundGenerator)
.directive('slider', Slider)
.service('synthesizer', Synthesizer);
