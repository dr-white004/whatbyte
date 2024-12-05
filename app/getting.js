"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import logo from '../public/html-5-svgrepo-com.svg';
import rank from "../public/cup-svgrepo-com.svg"
import note from '../public/note-text-svgrepo-com.svg'
import cup from '../public/cup-first-svgrepo-com.svg'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement
);


const skills = [
  { name: 'HTML Tools', level: 75 },
  { name: 'Tables', level: 65 },
  { name: 'JavaScript', level: 19 },
  { name: 'Labels', level: 67 },
  { name: 'Css basics', level: 28 }
];



//assumption data 
const INITIAL_PERCENTILE_DATA = {
  labels: ['20', '40', '60', '80', '100'],
  datasets: [
    {
      label: 'Performance Distribution',
      data: [2, 25, 45, 20, 5], 
      borderColor: '#4B9CD3',
      backgroundColor: 'rgba(75, 156, 211, 0.2)',
      fill: true,
      tension: 0.4
    }
  ]
};

const INITIAL_PIE_DATA = {
 
  datasets: [
    {
      data: [0, 15], // Initial mock score
      backgroundColor: ['#5F8DFF', '#A9D1FF'],
      borderWidth: 1
    }
  ]
};

export default function PerformanceTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    rank: '',
    percentage: '',
    score: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [percentileData, setPercentileData] = useState(INITIAL_PERCENTILE_DATA);
  const [pieData, setPieData] = useState(INITIAL_PIE_DATA);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate percentage (1-100) and score (1-15)
    if (!formData.rank || !formData.percentage || !formData.score) {
      alert('Please fill all fields');
      return;
    }
  
    const percentage = parseFloat(formData.percentage);
    const score = parseInt(formData.score);
  
    if (percentage < 1 || percentage > 100) {
      alert('Please enter a valid percentile between 1 and 100.');
      return;
    }
  
    if (score < 1 || score > 15) {
      alert('Please enter a valid score between 1 and 15.');
      return;
    }
  
  
    const newPerformance = {
      ...formData,
      percentage: parseFloat(formData.percentage),
      score: parseInt(formData.score)
    };

    // Prepare new graph data with user's vertical line
    const updatedPercentileData = JSON.parse(JSON.stringify(INITIAL_PERCENTILE_DATA));
    const percentileRange = Math.floor(newPerformance.percentage / 20);
    
    updatedPercentileData.datasets.push({
      label: 'Your Percentile',
      data: Array(5).fill(null),
      borderColor: 'rgba(255, 0, 0, 0.3)',
      borderWidth: 2,
      type: 'line',
      pointRadius: 5,
      pointBackgroundColor: 'red',
      pointHoverRadius: 10
    });
    
    // Mark the user's percentile point
    updatedPercentileData.datasets[1].data[percentileRange] = INITIAL_PERCENTILE_DATA.datasets[0].data[percentileRange];

  
    setSubmittedData(newPerformance);
    setPercentileData(updatedPercentileData);
    setPieData({
      labels: ['Score', 'Remaining'],
      datasets: [
        {
          data: [newPerformance.score, 15 - newPerformance.score],
          backgroundColor: ['#4B9CD3', '#D3D3D3'],
          borderWidth: 1
        }
      ]
    });

    // Close the  modal
    setIsModalOpen(false);
    setFormData({ rank: '', percentage: '', score: '' });
  };

  
  const calculateAveragePercentile = () => {
    // for actual calculation if i want to use in future
    return 50;
  };
  
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 min-h-screen">
      {/* my first Column*/}
      <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-md  ">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center shadow  p-4 w-full mb-4">
        <Image  src={logo}  alt="HTML5"  width={50}   height={50}  className="flex-shrink-0"  />
        <span className="text-center sm:text-left text-xs sm:text-sm md:text-base">Hyper text markup language</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md text-xs sm:text-sm md:text-base"
        >
          Update
        </button>
</div>

    <div className='flex flex-col bg-white  shadow '>
         <h3 className='ml-6'>Quick Statistics</h3>
      <div className="flex flex-wrap justify-around gap-4 mb-8 mt-8 ">
          <div className="flex items-center space-x-2 border-r border-gray-300 pr-4">
            <Image src={rank} alt="Image" width={30} height={30}/>
            <h5 className="text-sm sm:text-base md:text-lg">Rank: {submittedData ? submittedData.rank : "2"}</h5>
          </div>
          <div className="flex items-center space-x-2 border-r border-gray-300 pr-4">
            <Image src={note} alt="Image" width={30} height={30}/>
            <h5 className="text-xs sm:text-base md:text-lg">Percentile: {submittedData ? `${submittedData.percentage}%` : "78%"}</h5>
          </div>
          <div className="flex items-center space-x-2 border-r border-gray-300 pr-4">
            <Image src={cup} alt="Image" width={30} height={30}/>
            <h5 className="text-sm sm:text-base md:text-lg">Score: {submittedData ? submittedData.score : '12'}</h5>
          </div>
      </div>

      </div>

        {/* experiment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl mb-4">Update score</h2>
              <Image src={logo} alt="HTML5" width={25} height={255} className="flex-shrink-0 mb-4" />
            </div>

   <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="block w-2/3 text-sm">Update your Rank:</label>
      <input
        type="text"
        name="rank"
        value={formData.rank}
        onChange={handleInputChange}
        className="w-1/3 border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="flex justify-between items-center">
      <label className="block w-2/3 text-sm">Percentile(1-100):</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleInputChange}
            min="1"
            max="100"
            className="w-1/3 border border-gray-300 rounded-md p-2"
          />
    </div>

    <div className="flex justify-between items-center">
          <label className="block w-2/3 text-sm">current Score :</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
            min="1"
            max="15"
            className="w-1/3 border border-gray-300 rounded-md p-2"
          />
    </div>
  </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black p-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Percentile  Graph */}
        {submittedData && (
          <div className="bg-white-100 p-3 rounded-md mt-4">
            <p className="text-center">
              You scored {submittedData.percentage}% percentile, which is{' '}
              {submittedData.percentage > calculateAveragePercentile()
                ? 'higher'
                : submittedData.percentage < calculateAveragePercentile()
                ? 'lower'
                : 'equal to'}{' '}
              the average percentile of {calculateAveragePercentile()}% among all engineers
              who took the assessment.
            </p>
          </div>
        )}

        <div className="bg-white p-2 rounded-md shadow mt-4">
          <h3 className="text-center font-semibold mb-2">Comparism graph</h3>
          <Line
            data={percentileData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>

      {/* my Second Column identifier*/}
      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-md gap-4">
        <div className='shadow p-4 mb-4 '>
          <h3 className="text-center font-semibold mb-4 ">Skill-wise Analysis</h3>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Skill</th>
                <th className="text-right p-2">Level</th>
              </tr>
            </thead>
           <tbody>
            {skills.map((skill, index) => {
              let progressColor;
              if (skill.level <= 30) {
                progressColor = 'bg-red-500';
              } else if (skill.level <= 60) {
                progressColor = 'bg-yellow-500';
              } else {
                progressColor = 'bg-green-500';
              }

              return (
                <tr key={index}>
                  <td colSpan={2} className="p-4">
                    <div className="text-sm font-semibold mb-1">{skill.name}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`${progressColor} h-2.5 rounded-full`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
          </div>

        <div className="bg-white p-2 rounded-md shadow">
        
         <div  className="flex justify-between items-center">
            <h3 className="text-center font-semibold mb-2">Score Breakdown</h3>
            <span> {submittedData ? `${submittedData.score}/15` : ""}</span>
          </div>
          {submittedData && (
          <div className="bg-white-100 p-3 rounded-md mt-4">
            <p className="text-center">
              You scored {submittedData.rank} out of 15. However it still needs some improvements
              
            </p>
          </div>
        )}

          <Doughnut
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              cutout: '60%',
            }}
          />
        </div>
      </div>
    </div>
  );
}