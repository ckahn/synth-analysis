const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default function () {
  // create carrier
  this.oscCarrier = audioCtx.createOscillator();
  this.oscCarrier.type = 'sine';

  // [carrier] => [gain] => [analyzer]
  this.carrierGain = audioCtx.createGain();
  this.carrierAnalyzer = audioCtx.createAnalyser();
  this.oscCarrier
  .connect(this.carrierGain)
  .connect(this.carrierAnalyzer);

  // create modulator
  this.oscModulator = audioCtx.createOscillator();
  this.oscModulator.type = 'sine';

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
  
  return {
    carrierWave: {
      amplitude: this.carrierGain.gain,
      frequency: this.oscCarrier.frequency,
      analyzer: null
    },
    modulatorWave: {
      amplitude: this.modulatorGain.gain,
      frequency: this.oscModulator.frequency,
      analyzer: this.modulatorAnalyzer
    },
    outputAnalyzer: this.carrierAnalyzer
  };
}
