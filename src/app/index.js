import angular from 'angular';

import App from './directives/app';

angular.module("synthAnalysis", [])
.directive('app', App);
