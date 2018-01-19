import React  from 'react';
import '../styles/App.css';
import '../styles/flags.css'
import Sidebar from '../components/SideBar';

class App extends React.Component {
  render() {
    return ( 
     <Sidebar />
    );
  }
}

export default App;
