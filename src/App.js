import {BrowserRouter, Routes, Route} from 'react-router-dom'

import routers from './routers/index.ts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routers.map((router, index) => {

            const Comp = router.element
            const Layout = router.layout
            
            return <Route key={index} path={router.path} element={<Layout><Comp /></Layout>}/>
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
