
export default () => {
  function startAnimating(ctx, maxAmp, analyzer) {
    const canvasHeight = ctx.canvas.height;
    const canvasWidth = ctx.canvas.width;
    const timeData = getTimeDomainData(analyzer);
    const sliceWidth = canvasWidth / 1024;

    let x = 0, y;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    timeData.forEach((point) => {
      point /= -1 * maxAmp; // this needs to be the amp max
      if (point < 0) {
        y = canvasHeight/2 - (canvasHeight/2 * point * -1);
      } else {
        y = canvasHeight/2 + (canvasHeight/2 * point);
      }
      ctx.lineTo(x, y);
      x += sliceWidth;
    });
    ctx.stroke();

    window.requestAnimationFrame(() => {
      startAnimating(ctx, maxAmp, analyzer);
    });
  }

  function getTimeDomainData(analyzer) {
    // TODO maybe don't recreate this every call?
    let timeDomainData = new Float32Array(analyzer.frequencyBinCount);

    if (typeof analyzer.frequencyBinCount === 'undefined') {
      return [];
    }

    analyzer.getFloatTimeDomainData(timeDomainData);
    return timeDomainData;
  }

  return {
    startAnimating,
    getTimeDomainData
  }
}