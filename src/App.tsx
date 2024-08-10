
import './App.css'
import Block from './component/Block';
import Loading from './component/Loading'
import Hero from './component/Hero';
import Text from './component/Text';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Skills from './component/Skills';

function App() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  return (
    <>
   
    <Loading/>
    {/* <Hero/> */}
    <Block/>
    
    {isSidebarOpen ? (
    " "
    ):(<Text/>)} 
    </>
  )
}

export default App
