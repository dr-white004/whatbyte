
import Image from 'next/image'
import PerformanceTracker from './getting.js'
import Header from './header.js'
import skill from '../public/science-svgrepo-com.svg'
import dash from '../public/dashboard-alt-svgrepo-com.svg'
import intern from '../public/note-text-svgrepo-com.svg'

export default function Home() {
  return (
    <main className="h-screen flex flex-col ">
    
      <Header className="w-full" />

      <div className="flex flex-grow">
      
        {/* Sidebar with dynamic width based on content */}
        <div className="w-auto sm:w-auto md:w-auto h-full p-4 bg-white border-r border-gray-300 flex flex-col justify-start">
          <button className="flex items-center p-8">
            <Image src={dash} alt="Dashboard" width={15} height={15} />
            <h5>Dashboard</h5>
          </button>

          <button className="flex items-center p-4 bg-blue-300 text-white shadow rounded">
            <Image src={skill} alt="Skill Test" width={15} height={15} />
            <h5>Skill Test</h5>
          </button>

          <button className="flex items-center p-8">
            <Image src={intern} alt="Intern" width={15} height={15} />
            <h5>Internship</h5>
          </button>
        </div>

        <div className="flex-grow">
          <PerformanceTracker />
        </div>
      </div>
    </main>
  );
}

