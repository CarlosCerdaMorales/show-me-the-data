import SalesChartJS from '../components/SalesChartJS';
import SalesD3 from '../components/SalesD3';

function App() {
  return (
    <div className="App">
      <h1>Comparativa de Herramientas</h1>
      <div style={{ width: '800px', margin: '0 auto' }}>
        <h2>Implementación con Chart.js</h2>
        <SalesChartJS />
        <h2>Implementación con D3.js (Low Level)</h2>
        <SalesD3 />
      </div>
    </div>
  )
}

export default App