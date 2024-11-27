import Hero from '../components/hero/hero.jsx';
import OnDisplay from '../components/onDisplay/onDisplay.jsx';
import Movies from '../components/movies/movies.jsx';
import transition from '../transition';

import '../index.css';

function App() {
    return (
        <div className="App">
            <section className="heroSection" id="home">
                <Hero />
            </section>
            <main>
                <section className="onDisplaySection" id="onDisplay">
                    <OnDisplay />
                </section>
                <section className="moviesSection" id="movies">
                    <Movies />
                </section>
            </main>
        </div>
    );
}

export default transition(App);
