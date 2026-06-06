import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// Register Chart.js components required for the Bar chart
ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

/**
 * Graph Component
 * Renders a responsive bar chart using Chart.js to visualize click data over time.
 * Includes a subtle fallback state if no data is provided.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.graphData - Array of objects containing click metrics. 
 * Expected format: [{ clickDate: 'YYYY-MM-DD', count: number }]
 * @returns {JSX.Element}
 */
const Graph = ({ graphData = [] }) => {
  // 1. Data Processing
  // Extract labels (dates) and data points (click counts) from the incoming prop.
  // Using optional chaining and default empty arrays for safety.
  const labels = graphData?.map((item) => item.clickDate) || [];
  const clickCounts = graphData?.map((item) => item.count) || [];

  // Determine if we have valid data to show
  const hasData = graphData && graphData.length > 0;

  // 2. Chart Configuration - Data
  const data = {
    // If no data, provide empty labels to draw the grid for the fallback state
    labels: hasData
      ? labels
      : ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        // If no data, provide dummy data to create a "ghost" chart effect
        data: hasData
          ? clickCounts
          : [1, 2, 3, 2, 1, 2, 1],
        
        // Styling the bars to match the SaaS theme (brand blue)
        backgroundColor: hasData ? "#2563eb" : "rgba(148, 163, 184, 0.2)", // slate-400 with opacity for fallback
        hoverBackgroundColor: hasData ? "#1d4ed8" : "rgba(148, 163, 184, 0.2)",
        
        // Remove borders for a cleaner, modern look
        borderWidth: 0,
        
        // Bar sizing adjustments
        barThickness: 'flex',
        maxBarThickness: 40,
        borderRadius: 4, // Slightly round the tops of the bars
      },
    ],
  };

  // 3. Chart Configuration - Options
  const options = {
    maintainAspectRatio: false, // Important for responsive containers
    responsive: true,
    
    // Smooth out animations
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    
    plugins: {
      legend: {
        display: false, // Hidden for cleaner UI; the title handles context
      },
      tooltip: {
        // Only show tooltips if we have actual data
        enabled: hasData,
        backgroundColor: '#1e293b', // slate-800
        padding: 12,
        titleFont: { size: 14, family: "'Inter', sans-serif" },
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} clicks`;
          }
        }
      }
    },
    
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9', // slate-100 - very subtle horizontal grid lines
          drawBorder: false,
        },
        ticks: {
          color: '#64748b', // slate-500
          font: { family: "'Inter', sans-serif", size: 12 },
          // Ensure Y-axis only shows whole numbers (you can't have half a click)
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Clicks",
          color: '#94a3b8', // slate-400
          font: { family: "'Inter', sans-serif", size: 12, weight: '600' },
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines for cleaner look
          drawBorder: false,
        },
        ticks: {
          color: '#64748b', // slate-500
          font: { family: "'Inter', sans-serif", size: 12 },
          maxRotation: 45,
          minRotation: 45,
        },
        title: {
          display: true,
          text: "Date",
          color: '#94a3b8', // slate-400
          font: { family: "'Inter', sans-serif", size: 12, weight: '600' },
        },
      },
    },
  };

  return (
    // Wrapper div ensures the chart fills the container provided by the Dashboard
    <div className="w-full h-full p-2">
       <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;