import './App.css';
import WareHouseList from './pages/WareHouseList';
import WareHouseDetail from './pages/WareHouseDetail';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import store from './Store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<WareHouseList />} />
            <Route path="/warehousedetails/:id" element={<WareHouseDetail operation="update" />} />
            <Route path="/adddetail" element={<WareHouseDetail operation="save" />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
