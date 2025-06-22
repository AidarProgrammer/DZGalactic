export const roundMetricsValues = (metrics) => {
  const roundedMetrics = {};
  
  for (const [key, value] of Object.entries(metrics)) {
    roundedMetrics[key] = typeof value === 'number' ? Math.round(value) : value;
  }
  
  return roundedMetrics;
};