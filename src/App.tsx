

function App() {
  const checked = false
  return (
    <div className="App">
      <div>
        <h3>What to learn</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={checked} /> <span>HTML&CSS</span> </li>
          <li><input type="checkbox" checked={true} /> <span>JS</span> </li>
          <li><input type="checkbox" checked={true} /> <span>React</span> </li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
      
  )
}
  

export default App;
