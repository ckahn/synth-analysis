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

  // [modulator] => [gain] => [carrier frequency]
  this.modulatorGain = audioCtx.createGain();
  this.oscModulator.connect(this.modulatorGain);
  this.modulatorGain.connect(this.oscCarrier.frequency);

  // [carrier] => [output]
  this.carrierGain.connect(audioCtx.destination);

  this.oscCarrier.start();
  this.oscModulator.start();

  return {
    carrierWave: {
      amplitude: this.carrierGain.gain,
      frequency: this.oscCarrier.frequency
    },
    modulatorWave: {
      amplitude: this.modulatorGain.gain,
      frequency: this.oscModulator.frequency
    },
    outputWave: {}
  };
}
