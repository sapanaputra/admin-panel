import { useEffect, useRef } from 'react';

const SalesByDayChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Mock data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sales = [320, 580, 420, 690, 530, 850, 760];
    
    // Chart dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find max value
    const maxSale = Math.max(...sales);
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();
    
    // Draw grid lines
    const gridCount = 5;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#9ca3af';
    
    for (let i = 0; i <= gridCount; i++) {
      const y = padding + (chartHeight / gridCount) * i;
      const value = Math.round(maxSale - (maxSale / gridCount) * i);
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.strokeStyle = '#f3f4f6';
      ctx.stroke();
      
      ctx.fillText(`$${value}`, padding - 5, y);
    }
    
    // Draw bars
    const barWidth = chartWidth / days.length * 0.6;
    const barSpacing = chartWidth / days.length;
    
    for (let i = 0; i < days.length; i++) {
      const x = padding + barSpacing * i + barSpacing / 2 - barWidth / 2;
      const barHeight = (sales[i] / maxSale) * chartHeight;
      const y = height - padding - barHeight;
      
      // Draw bar
      ctx.beginPath();
      ctx.rect(x, y, barWidth, barHeight);
      const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#60a5fa');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw day label
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(days[i], x + barWidth / 2, height - padding + 10);
      
      // Draw value on top of bar
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 10px sans-serif';
      if (barHeight > 30) { // Only show if bar is tall enough
        ctx.fillText(`$${sales[i]}`, x + barWidth / 2, y - 5);
      }
    }
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={300} 
      className="w-full h-[300px]"
    />
  );
};

export default SalesByDayChart;