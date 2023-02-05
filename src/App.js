import { Slider } from './components';
import './App.css';

import photo1 from './assets/images/DSC05847.jpg';
import photo2 from './assets/images/DSC05853.jpg';
import photo3 from './assets/images/DSC05856.jpg';
import photo4 from './assets/images/DSC05838.jpg';
import photo5 from './assets/images/DSC05857.jpg';
import photo6 from './assets/images/DSC05858.jpg';

const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

function App() {
	return (
		<div className='App'>
			<Slider sources={photos} />
		</div>
	);
}

export default App;
