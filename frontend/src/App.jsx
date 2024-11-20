import Navbar from "./component/navbar";
import Home from './home/home';
import Footer from './component/Footer';
import Signin from './user/signin';
import Signup from './user/signup';
import Details from './details/details';
import AddListing from './listing/addListing';
import Edit from './listing/edit';
import Profile from './user/profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/addlisting" element={<AddListing />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/profile" element={<Profile />} />
            
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
