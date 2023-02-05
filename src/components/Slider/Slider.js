import { useEffect, useState } from 'react';
import { LeftArrow, RightArrow, Info } from '../icons';
import Loader from '../Loader/Loader';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import exifr from 'exifr';
import styles from './Slider.module.css';
import NavigationHint from '../icons/NavigationHint/NavigationHint';

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const Slider = ({ sources }) => {
	const [images] = useState(sources);
	const [index, setIndex] = useState(0);
	const [exif, setExif] = useState(null);
	const [showExif, setShowExif] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const left = useAnimation();
	const right = useAnimation();

	const handleImageDirection = (direction) => {
		let newIndex = 0;
		if (direction > 0) {
			newIndex = index + direction > images.length - 1 ? 0 : index + direction;
		} else {
			newIndex = index + direction < 0 ? images.length - 1 : index + direction;
		}

		setIndex(newIndex);
	};

	const handleKeyUp = (e) => {
		if (e.key === 'ArrowLeft') {
			handleImageDirection(-1);
			const sequence = async () => {
				await left.start({ x: -10, transition: { duration: 0.1 } });
				return await left.start({ x: 0 });
			};

			left.start(sequence);
		}
		if (e.key === 'ArrowRight') {
			handleImageDirection(1);
			const sequence = async () => {
				await right.start({ x: 10, transition: { duration: 0.1 } });
				return await right.start({ x: 0 });
			};

			right.start(sequence);
		}
	};

	useEffect(() => {
		window.addEventListener('keyup', handleKeyUp);
		return () => window.removeEventListener('keyup', handleKeyUp);
	}, [index]);

	useEffect(() => {
		exifr.parse(images[index]).then((output) => {
			setExif(output);
		});
	}, [index, images]);

	const handleCloseExif = () => {
		if (showExif) {
			setShowExif(false);
		}
	};

	const handleToggleExif = (e) => {
		const { className } = e.target;
		if (typeof className !== 'string') return;
		if (className.includes('Slider_controls') || className.includes('Slider_info')) {
			setShowExif(!showExif);
		}
	};

	const handleImageLoaded = () => setIsLoading(false);

	useEffect(() => {
		setIsLoading(true);
	}, [index]);

	return (
		<div className={styles.container}>
			<div className={styles.root} onClick={handleToggleExif}>
				<div className={styles.controls}>
					<motion.div
						whileTap={{ x: -10 }}
						animate={left}
						className={styles.leftControl}
						onClick={() => handleImageDirection(-1)}>
						<LeftArrow />
					</motion.div>
					<motion.div
						whileTap={{ x: 10 }}
						animate={right}
						className={styles.rightControl}
						onClick={() => handleImageDirection(1)}>
						<RightArrow />
					</motion.div>
				</div>
				<AnimatePresence>
					{isLoading && (
						<motion.div
							className={styles.loader}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							style={{ color: 'red' }}>
							<Loader />
						</motion.div>
					)}
				</AnimatePresence>
				<motion.img
					onLoad={handleImageLoaded}
					whileHover={{ filter: 'url(#brightness)' }}
					className={styles.image}
					src={images[index]}
					key={images[index]}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					alt='Something descriptive...'></motion.img>
				{exif && (
					<div className={styles.info}>
						<div className={styles.infoIconContainer}>
							<Info cssClass={styles.hintIcons} />
							<span className={styles.hint}>Click the image to toggle exif info</span>
						</div>
					</div>
				)}
				<AnimatePresence>
					{exif && showExif && (
						<motion.div
							onClick={handleCloseExif}
							initial={{ y: 300 }}
							animate={{ y: 75 }}
							exit={{ y: 500 }}
							className={styles.exifDataContainer}>
							<div className={styles.gridContainer}>
								<p className={styles.exifDataContainerTitle}>Make</p>
								<p className={styles.exifDataContainerData}>{exif.Make || '-'}</p>
								<p className={styles.exifDataContainerTitle}>Model</p>
								<p className={styles.exifDataContainerData}>{exif.Model || '-'}</p>
								<p className={styles.exifDataContainerTitle}>Shutter Speed</p>
								<p className={styles.exifDataContainerData}>
									{secondsToFractions(exif.ExposureTime) || '-'}
								</p>
								<p className={styles.exifDataContainerTitle}>Aperture</p>
								<p className={styles.exifDataContainerData}>{`ƒ${exif.FNumber}` || '-'}</p>
							</div>
							<div className={styles.gridContainer}>
								<p className={styles.exifDataContainerTitle}>Focal Length</p>
								<p className={styles.exifDataContainerData}>
									{exif?.FocalLength?.toFixed(1) || '-'}
								</p>
								<p className={styles.exifDataContainerTitle}>ISO</p>
								<p className={styles.exifDataContainerData}>{exif.ISO || '-'}</p>
								<p className={styles.exifDataContainerTitle}>Dimensions</p>
								<p className={styles.exifDataContainerData}>
									{exif.ExifImageWidth || '-'} x {exif.ExifImageHeight || '-'}
								</p>
								<p className={styles.exifDataContainerTitle}>Date</p>
								<p className={styles.exifDataContainerData}>
									{new Date(exif.DateTimeOriginal || exif.ModifyDate).toLocaleDateString(
										undefined,
										options
									) || '-'}
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className={styles.hintContainer}>
				<span className={styles.hint}>Press</span>
				<NavigationHint cssClass={styles.hintIcons} />
				<span className={styles.hint}>from your keyboard to navigate through images</span>
			</div>
		</div>
	);
};

const secondsToFractions = (sec) => {
	try {
		if (isNaN(sec)) {
			throw new Error();
		}
		return `1/${1 / parseFloat(sec)}`;
	} catch (err) {
		return '-';
	}
};

export default Slider;
