import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

const ServerStatus = () => {
  const [status, setStatus] = useState(null);
  const [graphData, setGraphData] = useState([]);

  const fetchStatus = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000');
      setStatus(data);

      const timestamp = new Date().toLocaleTimeString();
      setGraphData(prev => [
        ...prev.slice(-19), // keep last 20 records
        {
          time: timestamp,
          rss: data.memoryUsage.rss / (1024 * 1024),
          heapUsed: data.memoryUsage.heapUsed / (1024 * 1024),
          heapTotal: data.memoryUsage.heapTotal / (1024 * 1024),
          cpuUser: data.cpuUsage.user / 1000,
          cpuSystem: data.cpuUsage.system / 1000,
        }
      ]);
    } catch (error) {
      console.error('Error fetching server status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return <div className="p-8 text-center text-white bg-gray-900 min-h-screen">Loading server status...</div>;

  return (
    <div className="bg-gray-950 text-green-400 font-mono p-6 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-green-300">🚀 Server Dashboard</h1>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Server Info */}
          <div className="bg-gray-900 p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Server Info</h2>
            <p><strong>Status:</strong> {status.status}</p>
            <p><strong>Uptime:</strong> {status.uptime.toFixed(2)}s</p>
            <p><strong>Platform:</strong> {status.platform} | <strong>Arch:</strong> {status.arch}</p>
            <p><strong>Node Version:</strong> {status.version}</p>
            <p><strong>PID:</strong> {status.pid}</p>
          </div>

          {/* Project Info */}
          <div className="bg-gray-900 p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Project Info</h2>
            <p><strong>Name:</strong> {status.projectName}</p>
            <p><strong>Description:</strong> {status.projectDescription}</p>
            <p><strong>Version:</strong> {status.projectVersion}</p>
            <p><strong>License:</strong> {status.projectLicense}</p>
          </div>

          {/* Team Info */}
          <div className="bg-gray-900 p-4 rounded-xl shadow-md col-span-full">
            <h2 className="text-lg font-semibold mb-2">👥 Team</h2>
            <p><strong>Author:</strong> {status.Author}</p>
            <p><strong>Team:</strong> {status.Team}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              {status.TeamMembers.map(member => (
                <li key={member.id}>{member.name} — <span className="italic">{member.role}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Memory Graph */}
        <div className="bg-gray-900 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">📊 Memory Usage (MB)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rss" stroke="#34d399" name="RSS" />
              <Line type="monotone" dataKey="heapUsed" stroke="#facc15" name="Heap Used" />
              <Line type="monotone" dataKey="heapTotal" stroke="#60a5fa" name="Heap Total" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CPU Graph */}
        <div className="bg-gray-900 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">⚙️ CPU Usage (ms)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpuUser" stroke="#fb7185" name="CPU User" />
              <Line type="monotone" dataKey="cpuSystem" stroke="#f97316" name="CPU System" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <footer className="text-sm text-gray-400 text-center pt-6 border-t border-gray-700">
          Last updated: {new Date(status.timestamp).toLocaleString()}
        </footer>
      </div>
    </div>
  );
};

export default ServerStatus;
