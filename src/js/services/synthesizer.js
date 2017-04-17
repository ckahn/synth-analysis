const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default function () {
  // create carrier
  this.oscCarrier = audioCtx.createOscillator();
  this.oscCarrier.type = 'sine';

  // [carrier] => [gain]
  this.carrierGain = audioCtx.createGain();
  this.oscCarrier.connect(this.carrierGain);

  // create modulator
  this.oscModulator = audioCtx.createOscillator();
  this.oscModulator.type = 'sine';
  window.mod = this.oscModulator;

  // [modulator] => [gain] => [analyzer] => [carrier frequency]
  this.modulatorGain = audioCtx.createGain();
  this.modulatorAnalyzer = audioCtx.createAnalyser();

  this.oscModulator
  .connect(this.modulatorGain)
  .connect(this.modulatorAnalyzer)
  .connect(this.oscCarrier.frequency);

  // [carrier] => [output]
  this.carrierGain.connect(audioCtx.destination);

  // start em up
  this.oscCarrier.start();
  this.oscModulator.start();


  window.az = this.modulatorAnalyzer;
  
  return {
    carrierWave: {
      amplitude: this.carrierGain.gain,
      frequency: this.oscCarrier.frequency,
      analyzer: {}
    },
    modulatorWave: {
      amplitude: this.modulatorGain.gain,
      frequency: this.oscModulator.frequency,
      analyzer: this.modulatorAnalyzer
    },
    outputWave: {}
  };
}
