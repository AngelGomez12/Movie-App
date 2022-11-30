import './App.css'
import { Login } from "./components/Login";
import { Route, Switch } from "react-router-dom";
import { Listado } from "./components/Listado";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Detalle } from './components/Detalle';
import { Resultados } from './components/Resultados';


function App() {
  return (
    <div className='overflow-hidden'>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/listado" component={Listado} />
        <Route path="/detalle" component={Detalle} />
        <Route path="/resultados" component={Resultados} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
